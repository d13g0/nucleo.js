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
 * <p> Handles the interaction between a camera and a view </p>
 * @class
 * @constructor 
 */
nucleo.ViewInteractor = function ViewInteractor(){
    this.view   = undefined;
	this.camera = undefined;
	this.UID    = nucleo.util.generateUID();
	this.keymap = {};
	this.keysEnabled = true; //keys enabled by default
};

/*
* Constants
*/
nucleo.ViewInteractor.TASK = nucleo.define.ViewInteractor.TASK;

/**
 * 
 */
nucleo.ViewInteractor.prototype.getType = function(){
    return "ViewInteractor";
};

nucleo.ViewInteractor.prototype.disconnectFromView = function(){
	var canvas = this.view.canvas;
	canvas.onmousedown 	= null;
	canvas.onmouseup 	= null;
    canvas.onmousemove 	= null;
    canvas.ondragover 	= null;
    canvas.ondragleave 	= null;
    canvas.ondrop 		= null;
    window.onkeydown 	= null;
    window.onkeyup 		= null;
    canvas.ondblclick 	= null;
};

/**
 * @param {View} view the view
 */
nucleo.ViewInteractor.prototype.connectView = function(view){
  
    if (!(view instanceof nucleo.View)){
        throw 'ViewInteractor.connectView: the parameter is not a View';
    }
    var interactor = this;
    var canvas = view.canvas;

    this.view   = view;
    this.camera = view.cameraman.active;

    
    canvas.onmousedown = function(ev) {
        interactor.onMouseDown(ev);
    };

    canvas.onmouseup = function(ev) {
        interactor.onMouseUp(ev);
    };
    
    canvas.onmousemove = function(ev) {
        interactor.onMouseMove(ev);
    };
    
    canvas.ondragover = function(ev){
        interactor.onDragOver(ev);
    };
    
    canvas.ondragleave = function(ev){
        interactor.onDragLeave(ev);
    };
    
    canvas.ondrop = function(ev){
        interactor.onDrop(ev);
    };
    
    window.onkeydown = function(ev){
        interactor.onKeyDown(ev);
    };
    
    window.onkeyup = function(ev){
        interactor.onKeyUp(ev);
    };
    
    canvas.ondblclick = function(ev){
        interactor.onDoubleClick(ev);
    };
};


/**
 * @param {Camera} c the camera to connect to this interactor
 * @todo: validate that the camera belongs to the current view. If not throw an exception.
 */
nucleo.ViewInteractor.prototype.connectCamera = function(c){
	if (c instanceof nucleo.Camera){
		this.camera = c;
		this.camera.interactor = this;
	}
	else {
		throw('ViewInteractor.connectCamera: The object '+c+' is not a valid camera');
	}
};


/**
 * Maps a key code to a function
 * @param {String} key
 * @param {Object} fn
 */
nucleo.ViewInteractor.prototype.addKeyAction = function(key, fn){
    var keycode = key.charCodeAt(0);
    this.keymap[keycode] = fn;
};

/**
 * Removes a key binding
 * @param {String} key
 */
nucleo.ViewInteractor.prototype.removeKeyAction = function(key){
    var keycode = key.charCodeAt(0);
    delete this.keymap[keycode];
};

/**
 * Invokes the function associated with a key code
 * @param {Object} keycode
 */
nucleo.ViewInteractor.prototype.fireKeyAction = function(keycode){
    
    if (!this.keysEnabled) return;
    if (this.keymap[keycode]){
        this.keymap[keycode](this.view, this.camera);
    }
};

nucleo.ViewInteractor.prototype.enableKeyActions = function(flag){
    this.keysEnabled = flag;
};


