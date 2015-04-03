/*-------------------------------------------------------------------------
    This file is part of Nucleo.js

    Nucleo is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation version 3.

    Nucleo is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Nucleo.  If not, see <http://www.gnu.org/licenses/>.
---------------------------------------------------------------------------*/   
/**
 * One of the main classes of Nucleo.js
 * A renderer object encapsulates most of the low level calls to WebGL.
 * It is here where Nucleo obtains a reference to the WebGL context.
 * 
 * It is also here here (and in the Actor class) where all the attributes and uniforms are passed
 * to the rendering program.
 * 
 * @class
 * @constructor
 * @author Diego Cantor
 */
nucleo.Renderer = function Renderer(vw){
    
	this.view       	= vw;
	this.renderRate 	= nucleo.Renderer.RATE.NORMAL;
	this.mode       	= nucleo.Renderer.MODE.TIMER;
    this.fps            = 0;
    this.engine 		= undefined;
    this._time          = 0;
    this._startDate     = 0;
    this._running       = false;
    this.setEngine(nucleo.RenderEngine);
    this.setProgram(nucleo.ESSL.LAMBERT_PROGRAM);
};

nucleo.Renderer.MODE = nucleo.define.Renderer.MODE;
nucleo.Renderer.RATE = nucleo.define.Renderer.RATE;


/**
 * Sets the current rendering engine. 
 * 
 * <p>The parameter can be a class definition or an instance of the engine</p>
 * 
 * @param {Engine} p_engine The engine to be used (function reference or instance)
 */
nucleo.Renderer.prototype.setEngine = function(p_engine){
    
    var instance = undefined;
    //Create a new instance
    if (typeof p_engine == 'function'){
        instance  = new p_engine();
    }
    //Use this instance
    else if (typeof p_engine == 'object'){
        instance = p_engine;
    }
    else{
        console.warn('Renderer.setEngine WARN: '+p_engine+' is not an engine');
        console.warn('Renderer.setEngine WARN: using RenderEngine by default');
        instance = new RenderEngine();
        
    }
    instance.init(this);
    this.engine = instance;
};

/**
 * Sets the current rendering program 
 * 
 * <p>The parameter can be a class definition or an instance of the program</p>
 * 
 * @param {Program} p_program the program to be used (function reference or instance)
 */
nucleo.Renderer.prototype.setProgram = function(p_program,p_force_it){
    this.engine.setProgram(p_program, p_force_it);
};

/**
 * When the current program is being enforced by the renderer (see setProgram), any
 * subsequent call to setProgram will be unsuccessful. So for instance, actors
 * who want to use a different program to be rendered would not be able to do so.
 * 
 * This method releases the current program from being enforced 
 */
nucleo.Renderer.prototype.releaseProgram = function(){
    this.engine.releaseProgram();
};




/**
 * Clears the WebGL scene
 */
nucleo.Renderer.prototype.clear = function(){
    this.engine.clear();
};

/**
 * Sets the color used to clear the rendering context
 * @param {Number, Array, vec3} r it can be the red component, a 3-dimensional Array or a vec3 (glMatrix)
 * @param {Number} g if r is a number, then this parameter corresponds to the green component
 * @param {Number} b if r is a number, then this parameter corresponds to the blue component
 * @see View#setBackgroundColor
 */
nucleo.Renderer.prototype.clearColor = function(r,g,b){
    this.engine.clearColor(r,g,b);
};

/**
 * Sets the clear depth for the rendering context
 * @param {Number} d the new clear depth
 */
nucleo.Renderer.prototype.clearDepth = function(d){
    this.engine.clearDepth(d);
};

/**
 * Reallocates the actors marked as dirty, without requiring rerendering. This mechanism allows
 * to update the GL buffers for dirty actors. 
 */
nucleo.Renderer.prototype.reallocate = function(){
  this.engine.allocate(this.view.scene);  
};

/**
 * Disables offscreen rendering
 *  
 */
nucleo.Renderer.prototype.disableOffscreen = function(){
    this.engine.disableOffscreen();
};


/**
 *Sets the render target for this renderer 
 */
nucleo.Renderer.prototype.enableOffscreen = function(){
    this.engine.enableOffscreen();    
};

/**
 * Returns true if the offscreen rendering is enabled. False otherwise. 
 */
nucleo.Renderer.prototype.isOffscreenEnabled = function(){
    return this.engine.isOffscreenEnabled();  
};


nucleo.Renderer.prototype.readOffscreenPixel = function(x,y){
    return this.engine.readOffscreenPixel(x,y);
};

/**
 * Sets the rendering mode. Options are in nucleo.Renderer.MODE
 * This method updates the rendering mode and tries to restart the rendering process
 * @param {String} mode the mode to set
 * @see nucleo.def.render.mode
 */
nucleo.Renderer.prototype.setMode = function(mode){
    if (this._running){ 
        this.stop();
        this.mode = mode;
        this.start(); 
    }
    else{
        this.mode = mode; //if the renderer has not started yet.
    }
      
};

/**
 * Starts the renderer
 */
nucleo.Renderer.prototype.start = function(){
    
    this._running = true;
    this._startDate = new Date().getTime();
    this._time  = 0;
    
    switch (this.mode){
    	case nucleo.Renderer.MODE.TIMER:
    		
    		nucleo.util.console('Renderer [TIMER]: starting rendering for view ['+this.view.name+'] at '+this.renderRate+ 'ms');
    		this._timeUp();
    		break;
    		
    		//this.timerID = setInterval((function(self) {return function() {self.render();}})(this),this.renderRate); 
    	
    	case nucleo.Renderer.MODE.ANIMFRAME:
    	    
    	    nucleo.util.console('Renderer [ANIMFRAME]: starting request animation frame procedure',true);
    	    var self = this;
    	    function one_infinite_loop(){
    	        this.render();
    	        window.requestAnimFrame(one_infinite_loop.bind(self));
    	    }
    	    one_infinite_loop.bind(this)();
    	    
    	    break;
    
    	case nucleo.Renderer.MODE.ON_DEMAND:
    	    nucleo.util.console('Renderer [ON_DEMAND]: waiting for rendering requests',true);
    	    this.clear(); // let's just wait until someone calls the renderer...
    	   	break;
	}
};

nucleo.Renderer.prototype.doBeforeRendering = function(func){
    this._do_before_rendering = func;
};

nucleo.Renderer.prototype.doAfterRendering = function(func){
    this._do_after_rendering = func;
};

/**
 * Implements a self adjusting timer
 * @see <a href="http://www.sitepoint.com/creating-accurate-timers-in-javascript/">Creating accurate timers in JavasScript</a>
 * @private   
 */
nucleo.Renderer.prototype._timeUp = function(){
    if (!this._running || this.mode == nucleo.Renderer.MODE.ANIMFRAME) return;
    
    this.render();
    
    if (this._time == this.renderRate * 100){  
        this._time = 0;
        this._startDate = new Date().getTime();
    }
    
    this._time += this.renderRate;

    var diff = (new Date().getTime() - this._startDate) - this._time;
    
    if (diff > this.renderRate) diff = 0; //ignore it
    
    setTimeout((function(self){
        return function(){
            self._timeUp();
        };
    })(this), this.renderRate - diff);
};
/**
 * Stops the renderer
 */
nucleo.Renderer.prototype.stop = function(){
	if (this.mode == nucleo.Renderer.MODE.TIMER){
		//clearInterval(this.timerID);
		this._running = false;
	}
	else if (this.mode == nucleo.Renderer.MODE.ANIMFRAME){
		nucleo.go.renderman.cancel();
	}
};

/**
 * Sets the rendering rate in ms
 * @param {Number} /test-baking.htmlrate the new rendering rate in milliseconds
 */
nucleo.Renderer.prototype.setRenderRate = function(rate){ //rate in ms
    
    if (rate == undefined || rate <=0){ 
        throw 'Renderer.setRenderRate: the rate cannot be zero or undefined';
    } 
    
    if (this.mode == nucleo.Renderer.MODE.ANIMFRAME){
        throw 'Renderer.setRenderRate: if the mode is ANIMFRAME render rate is irrelevant';
    }
      
	this.stop();
	this.renderRate = rate;
	this.start();
    
    nucleo.util.console('Renderer: view['+this.view.name+'], render rate = ' + rate,true);

};



/**
 * Renders the scene using the current engine
 */
nucleo.Renderer.prototype.render = function(){
    
    var engine = this.engine, scene = this.view.scene, start = undefined, elapsed = undefined;
    
    if (this._do_before_rendering) this._do_before_rendering();
    
    this.clear();                   //clear the canvas
    engine.allocate(scene);	    //allocate memory for actors added since last rendering
    
    start = new Date().getTime();
    engine.render(scene);
    elapsed = new Date().getTime() - start;
    
    engine.deallocate(scene);     //deallocate memory if necessary
    
    // calculating FPS metric
    if(elapsed >0){
        this.fps = Math.round((this.fps * 0.80 + (1000.0/elapsed) * 0.2)* 100)/100;
    }
    
    if (this._do_after_rendering) this._do_after_rendering();
    
};

/**
 * @class  Encapsulates a renderer exception
 * @param {Object} message
 */
function vxlRendererException(message){
    this.message = message;
};

