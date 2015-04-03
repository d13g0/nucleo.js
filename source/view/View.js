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
 * Each HTML5 canvas is assigned a view object (View) in Nucleo.js.
 *
 * A View provides the code to handle cameras, interaction and rendering capabilities, plus actor handling on the
 * HTML5 canvas that otherwise would need to be written over and over for each application
 * if you were writing a WebGL app from scratch.
 * Luckily this is not the case. You have the awesome View who takes care of all these little details for you.
 * @class the class that manages what it is rendered the HTML5 canvas on the web page
 * @constructor
 * @param {String} canvasID id of the canvas in the DOM tree. That's all we need to setup a View for you
 * @param {Scene} scene if this view is sharing a scene, this parameter corresponds to the scene being shared.
 * @param {Boolean} handleLayout if true or absent, the canvas will be resized dynamically
 * @author Diego Cantor
 */

nucleo.View = function View(canvasID, scene, handleLayout) {

    this.UID = nucleo.util.generateUID();
    this.canvas = document.getElementById(canvasID);

    if (this.canvas == null || this.canvas == undefined) {
        alert('View: the canvas ' + canvasID + ' does not exist.');
        throw('View: the canvas ' + canvasID + ' does not exist.');
    }

    this.name                 = canvasID;
    this.width                = this.canvas.width;
    this.height               = this.canvas.height;
    this.clearDepth           = 1.0;
    this.backgroundColor      = nucleo.View.BACKGROUND.slice(0);
    this._dragndrop           = false;
    this.renderer             = new nucleo.Renderer(this);
    this.cameraman            = new nucleo.CameraManager(this);
    this.interactor           = new nucleo.TrackerInteractor();
    this._fullscreenFlag      = true;


    //Create a new scene or join the current scene
    if (scene != null && scene instanceof nucleo.Scene) {
        this.scene = scene;
    }
    else {
        this.scene = new nucleo.Scene();
    }
    this.scene.views.push(this);


    //Handle layout
    if (handleLayout == undefined) {
        handleLayout = true;
    }
    this.setAutoResize(handleLayout);


    //Pass background and clear depth to the renderer
    this.setBackgroundColor(this.backgroundColor);
    this.setClearDepth(this.clearDepth);

    //Connect view with interactor
    this.interactor.connectView(this);

    //Event handling
    var ntf = nucleo.Notifier.instance;
    var e = nucleo.EVENTS;
    ntf.publish(e.VIEW_NEW, this);
    ntf.subscribe(e.DEFAULT_LUT_LOADED, this);
    ntf.fire(e.VIEW_NEW, this);

    nucleo.util.console('View: the view ' + this.name + ' has been created');
};


/**
 * @static
 */
nucleo.View.BACKGROUND = nucleo.define.View.BACKGROUND;


/**
 * Handles the events to which a view is subscribed in Nucleo.js
 * @param {String} event the name of the event
 * @param {Object} source the origin of the event. Useful to do callbacks if necessary
 */
nucleo.View.prototype.handleEvent = function (event, source) {
    nucleo.util.console('View [' + this.name + ']: receiving event ' + event);
    if (event == nucleo.EVENTS.DEFAULT_LUT_LOADED) {
        this.scene.setLookupTable(nucleo.def.lut.main);
    }
};


/**
 * Clears the scene. Delegates this task to the renderer.
 */
nucleo.View.prototype.clear = function () {
    this.renderer.clear();
};

/**
 * Resizes the canvas so it fits its parent node in the DOM tree
 */
nucleo.View.prototype.resize = function () {

    var canvas = this.canvas,
    parent = canvas.parentElement,
    rect = parent.getBoundingClientRect();

    this.width = rect.width;

    if (parent == document.body) {
        this.height = window.innerHeight - (rect.bottom - rect.height + rect.top);
    } else {
        this.height = rect.height;
    }

    this.canvas.width  = this.width;
    this.canvas.height = this.height;

};

/**
 * Enables automatic resizing of the view when the browser window is resized
 * @param resize_flag enbles automatic resizing if true, disables it if false
 */
nucleo.View.prototype.setAutoResize = function (resize_flag) {

    if (resize_flag){
        this.resize();
    }

    if (nucleo.jquery) {
        if (resize_flag) {
            $(window).resize((function (self) { return function () { self.resize(); } })(this));
        }
        else {
            $(window).unbind('resize');
        }
    }
    else{
         if (resize_flag){
             window.onresize = (function (that){ return function(event){that.resize()} })(this);
         }
        else{
             //@TODO: Dont know how to do this yet
             //window.removeEventListener('resize');
             //this.canvas.style.width = this.canvas.width;
             //this.canvas.style.height = this.canvas.height;
         }
    }
};


/**
 * Run non standard code (mozilla, webkit)
 *@private
 */
nucleo.View.prototype._runPrefixMethod = function (obj, method) {

    var pfx = ["webkit", "moz", "ms", "o", ""];
    var p = 0, m, t;

    while (p < pfx.length && !obj[m]) {
        m = method;
        if (pfx[p] == "") {
            m = m.substr(0, 1).toLowerCase() + m.substr(1);
        }
        m = pfx[p] + m;
        t = typeof obj[m];
        if (t != "undefined") {
            pfx = [pfx[p]];
            return (t == "function" ? obj[m]() : obj[m]);
        }
        p++;
    }
};

/**
 * Handles HTML5 Full screen for this view
 * @param {Boolean} flag set flag to true if fullscreen is wanted. Set it to false to exit fullscreen.
 */
nucleo.View.prototype.fullscreen = function (flag) {
    if (!this._fullscreenFlag) return; //ignore request if fullscreen is not active
    if (flag == true) {
        var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
        if (is_chrome) {
            this._runPrefixMethod(this.canvas, "RequestFullscreen");
        }
        else {
            this._runPrefixMethod(this.canvas, "RequestFullScreen");
        }
    }
    else {

        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }

        /*   if (this._runPrefixMethod(document,"FullScreen") ||
         this._runPrefixMethod(document,"isFullScreen")){
         this._runPrefixMethod(document,"CancelFullScreen");
         }*/
    }

};

/**
 * Forbids this view from going to Full Screen mode
 */
nucleo.View.prototype.disableFullScreen = function () {
    this._fullscreenFlag = false;
};

/**
 * Enables this view to go to Full Screen mode. Fullscreen mode is available by default.
 */
nucleo.View.prototype.enableFullScreen = function () {
    this._fullscreenFlag = true;
};

/**
 * Starts the view
 */
nucleo.View.prototype.start = function () {
    this.renderer.start();
    this.refresh();
};

/**
 * Stops the view
 */
nucleo.View.prototype.stop = function () {
    this.renderer.stop();
};

/**
 * Resets the view
 */
nucleo.View.prototype.reset = function () {
    this.stop();
    this.scene.reset();
    this.cameraman.reset();
    this.start();
};

/**
 * Sets the view's background color
 * @param {Number, Array, vec3} r it can be the red component, a 3-dimensional Array or a vec3 (glMatrix)
 * @param {Number} g if r is a number, then this parameter corresponds to the green component
 * @param {Number} b if r is a number, then this parameter corresponds to the blue component

 * @see Renderer#clearColor
 */
nucleo.View.prototype.setBackgroundColor = function (r, g, b) {
    this.backgroundColor = nucleo.util.createColor(r, g, b);
    this.renderer.clearColor(this.backgroundColor);
};


/**
 * Sets the clear depth
 * @param {Number} d the new depth
 * @see Renderer#clearDepth
 */
nucleo.View.prototype.setClearDepth = function (d) {
    this.renderer.clearDepth(d);
};

/**
 * Refresh the view
 * @see Renderer#render
 */
nucleo.View.prototype.refresh = function () {
    if (this.renderer.mode != nucleo.Renderer.MODE.ANIMFRAME) {
        this.renderer.render();
    }
};

/**
 * Uses the interactor passed as parameter to handle user gestures
 * @param {ViewInteractor} interactor an instance of a ViewInteractor
 *
 */
nucleo.View.prototype.setInteractor = function (i) {
    this.interactor = i;
    this.interactor.connectView(this);
};

/**
 *Sets the drag and drop flag
 * @param {Boolean} flag
 */
nucleo.View.prototype.setDragAndDrop = function (flag) {
    this._dragndrop = flag;
};

/**
 * Get FPS metric from the view renderer
 */
nucleo.View.prototype.getFPS = function () {
    return this.renderer.fps;

};

/**
 * Wrapper method. Returns the active camera from this view's CameraManager
 * @returns {CameraManager.active|*}
 */
nucleo.View.prototype.getCurrentCamera = function () {
    return this.cameraman.active;
}

/**
 * Loads 3D models, textures and other models to a Voxelent's scene.
 *
 * This method is very flexible. It can load one or multiple models depending on the type of the
 * first parameter.
 *
 * Otherwise, if  the parameter 'arguments' is an Array, load will iterate
 * through it and will try to load every element of this list. Every element being the file name.
 *
 * Nucleo supports three different loading modes which are defined in
 * Model.LOADING_MODE:
 *
 * LIVE: As each asset is loaded it is added immediately into the scene by creating the corresponding actor
 *
 * LATER: All the models are loaded first THEN the actors are created.
 * This is useful when you want to display a full scene instead of showing incremental updates.
 *
 * DETACHED: The models are loaded into the ModelManager object but actors are never created.
 * This allows background loading.
 *
 * @param {String|Array} arguments the name of the asset or the list of models (each element being the file name).
 * @param {String} path the path that will be concatenated to the list of files (optional).
 * @param {Model.LOADING_MODE} mode the loading mode
 *
 * @see {Scene#setLoadingMode}
 *
 */
nucleo.View.prototype.load = function (arguments, path, mode) {

    var files = [];

    var p = nucleo.util.getPath(path);

    if (typeof(arguments) == 'string' || arguments instanceof String) {
        files.push(p + arguments);
    }
    else if ((arguments instanceof Array)) {
        for (var i = 0; i < arguments.length; i++) {
            files.push(p + arguments[i]);
        }
    }
    else {
        throw Exception("not a valid argument");
    }

    if (mode != undefined && mode != null) {
        this.scene.setLoadingMode(mode);
    }

    nucleo.ModelManager.instance.loadList(files, this.scene);
};




