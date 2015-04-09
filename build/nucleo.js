/*================================================================================
  This is Nucleo.js [1.0]

  Nucleo is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation version 3.

  Nucleo is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with Nucleo.  If not, see http://www.gnu.org/licenses/.

  WELCOME
                                                  ,     ,
                                                 (\____/)             [ ]
                                                  (_oo_)             (   )
                                                    (-)               |>|
                                                  __||__    \)     __/===\__
                                               []/______\[] /     //| o=o |\\
                                               / \______/ \/    <]  | o=o |  [>
                                              /    /__\             \=====/
                                             (\   /____\            / / | \ \

                                                   /--\           <_________>

================================================================================*/
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

var nucleo = nucleo || {};
/**
 * Nucleo definitions
 * @type {{Camera: {AXIS: {RIGHT: number[], UP: number[], NORMAL: number[]}, FRUSTUM: {FOV: number, NEAR: number, FAR: number}, TRACKING: {DEFAULT: string, ROTATIONAL: string, TRANSLATIONAL: string, CINEMATIC: string}, TYPE: {ORBITING: string, TRACKING: string, EXPLORING: string}}, View: {BACKGROUND: number[]}, ViewInteractor: {TASK: {NONE: number, PAN: number, ROTATE: number, DOLLY: number, ROLL: number}}, Actor: {MODE: {TEXTURED: string, SOLID: string, WIREFRAME: string, POINTS: string, LINES: string, BOUNDING_BOX: string, BB_AND_SOLID: string, WIRED_AND_SOLID: string, FLAT: string}, CULL: {BACK: string, FRONT: string, NONE: string}, PICKING: {DISABLED: string, CELL: string, OBJECT: string}}, Model: {LOADING_MODE: {LIVE: string, LATER: string, DETACHED: string}, MAX_NUM_INDICES: number, TYPE: {SIMPLE: string, MESH: string, BIG_DATA: string}, BoundingBox: {vertices: Array, wireframe: number[], color: number[], shading: boolean}, Floor: {vertices: Array, indices: Array, color: number[], shading: boolean}, Axis: {vertices: number[], wireframe: number[], colors: number[], shading: boolean}}, Renderable: {TASK: {CREATE: string, UPDATE_GEOMETRY: string, UPDATE_COLORS: string}}, Renderer: {MODE: {TIMER: string, ANIMFRAME: string, ON_DEMAND: string}, RATE: {SLOW: number, NORMAL: number}}, Texture: {FILTER: {NEAREST: string, LINEAR: string, NEAREST_MIPMAP_NEAREST: string, LINEAR_MIPMAP_NEAREST: string, NEAREST_MIPMAP_LINEAR: string, LINEAR_MIPMAP_LINEAR: string}}, Material: {DIFFUSE: number[], AMBIENT: number[], SPECULAR: number[], SHININESS: number, OPACITY: number, SHADING: boolean}, LookupTable: {list: string[], main: string}, PI_OVER_2: number, DEG_2_RAD: number, RAD_2_DEG: number}}
 */
nucleo.define = {
    /**
     * Defines the constants that can be used with <code>Camera</code>
     *
     * @namespace Camera definitions
     */
    Camera: {
        /**
         * Camera axis
         * @type {define.Camera.AXIS|*}
         */
        AXIS   : {
            /**
             * Right vector constant: [1,0,0]
             */
            RIGHT : [1, 0, 0],
            /**
             * Up vector constant: [0,1,0]
             */
            UP    : [0, 1, 0],
            /**
             * Camera axial or normal vector constant: [0,0,1]
             */
            NORMAL: [0, 0, 1]
        },
        /**
         * Frustum properties
         * @type {define.Camera.FRUSTUM|*}
         */
        FRUSTUM: {
            /**
             * Default field of view value: 30
             */
            FOV : 30,
            /**
             * Default value for the near field: 0.1
             */
            NEAR: 0.1,
            /**
             * Default value for the far field: 10000
             */
            FAR : 10000
        },

        /**
         * <p>Defines the tracking modes available for instances of Camera</p>
         * <p>A tracking mode is <u>only</u> required when the camera is set to follow an
         * actor using <code>{@link Camera#follow}</code></p>
         * <p>The tracking  modes can be:
         * <ul>
         * <li><code>DEFAULT</code>:  The camera does not follow an actor. Controlled by the user to look around the world.</li>
         * <li><code>ROTATIONAL</code>: The camera does not move but follows an actor position</li>
         * <li><code>TRANSLATIONAL</code>: The camera moves with the actor, the angle is constant</li>
         * <li><code>CINEMATIC</code>: Similar to ROTATIONAL but allowing camera roll for a more dramatic effect</li>
         * </ul>
         * </p>
         * <p> to set the tracking mode of the camera <code>myCamera</code> you should make sure that your camera is of tracking type with:
         *  <code>myCamera.setType(Camera.TYPE.TRACKING)</code>.
         *  For instance:
         * </p>
         *  <pre class='prettyprint'>
         *  var actor = view.scene.getActor('cone'); //from the current scene
         *  var camera = view.getCurrentCamera();
         *  camera.setType(Camera.TYPE.TRACKING);
         *  camera.setTrackingMode(Camera.TRACKING.ROTATIONAL);
         *  camera.follow(actor);
         * </pre>
         * <p> a shorter way would be:</p>
         * <pre class='prettyprint'>
         *  var actor = view.scene.getActor('cone'); //from the current scene
         *  var camera = view.getCurrentCamera();
         *  camera.setType(nucleo.Camera.TYPE.TRACKING);
         *  camera.follow(actor, nucleo.Camera.TRACKING.ROTATIONAL);
         * </pre>
         * @see Camera#follow, Camera#setTrackingMode
         */
        TRACKING: {
            DEFAULT      : 'DEFAULT',
            ROTATIONAL   : 'ROTATIONAL',
            TRANSLATIONAL: 'TRANSLATIONAL',
            CINEMATIC    : 'CINEMATIC'
        },
        /**
         * Camera type available
         *
         * <p>The camera type can be:
         * <ul>
         * <li><code>ORBITING</code>: Orbiting Camera - Around the World</li>
         * <li><code>TRACKING</code>: Tracking Camera - First Person Camera</li>
         * <li><code>EXPLORING</code>: Camera axes are updated on every rotation</li>
         * </ul>
         * </p>
         *
         * <p> These modes can be used with the {@link Camera Camera constructor} or with its {@link Camera#setType setType} method</p>
         */
        TYPE    : {ORBITING: 'ORBITING', TRACKING: 'TRACKING', EXPLORING: 'EXPLORING'}
    },


    /**
     * @namespace Default values for views
     * @property {Array} background  A 4-valued array that contains the default background colour for view. The format is [r,g,b,a]
     */
    View: {
        BACKGROUND: [0.3, 0.3, 0.3]

    },

    /**
     * @namespace Default values for view interactors
     */
    ViewInteractor: {
        /**
         *
         * Enumeration of common camera tasks
         *
         * <p>The camera tasks can be:
         * <ul>
         * <li><code>NONE</code></li>
         * <li><code>PAN</code></li>
         * <li><code>ROTATE</code></li>
         * <li><code>DOLLY</code></li>
         * <li><code>ROLL</code></li>
         * </ul>
         * </p>
         *  These constants are used internally and you probably would never need to use them.
         */
        TASK: {NONE: 0, PAN: 1, ROTATE: 2, DOLLY: 3, ROLL: 4}
    },

    /**
     * Contains the constants and default values that can be associated with <code>Actor</code>
     *
     * @namespace Default values and constants that can be used with the <code>Actor</code> class.
     */
    Actor: {
        /**
         * <p>Defines the visualization modes available for instances of Actor</p>
         * <p>The visualization  modes can be:
         * <ul>
         * <li><code>TEXTURED</code>: Used when the model associated with this actor has a texture</li>
         * <li><code>SOLID</code></li>
         * <li><code>WIREFRAME</code></li>
         * <li><code>POINTS</code></li>
         * <li><code>LINES</code></li>
         * <li><code>BOUNDING_BOX</code> (added in 0.88.1)</li>
         * <li><code>BB_AND_SOLID</code> (added in 0.89)</li>
         * <li><code>WIRED_AND_SOLID</code> (added in 0.89.1)</li>
         * <li><code>FLAT</code> (added in 0.89.1)</li>
         * </ul>
         * </p>
         * <p> to set the actor mode you should use the <code>{@link Actor#setVisualizationMode}</code>
         *  For instance, if you want to visualize the wireframe of your actor you can do something like this:
         * </p>
         *  <pre class='prettyprint'>
         *  var actor = view.scene.getActorByName('example.json'); //from the current scene
         *  actor.setVisualizationMode(Actor.MODE.WIREFRAME)
         * </pre>
         * @see Actor#setVisualizationMode
         */
        MODE: {
            TEXTURED       : 'TEXTURED',
            SOLID          : 'SOLID',
            WIREFRAME      : 'WIREFRAME',
            POINTS         : 'POINTS',
            LINES          : 'LINES',
            BOUNDING_BOX   : 'BOUNDING_BOX',
            BB_AND_SOLID   : 'BBANDSOLID',
            WIRED_AND_SOLID: 'WIRED_AND_SOLID',
            FLAT           : 'FLAT'
        },
        /**
         *  <p>Defines the culling modes available for instances of Actor</p>
         *  <p>These modes can be BACK,FRONT or NONE</p>
         *  <pre class='prettyprint'>
         *   var actor = view.scene.getActorByName('sphere'); //from the current scene
         *   actor.cullFace(Actor.CULL.BACK); //hides the back face.
         *  </pre>
         */
        CULL: {
            BACK : 'BACK',
            FRONT: 'FRONT',
            NONE : 'NONE'
        },

        /**
         * <p>Defines the picking modes available for <code>Actor</code></p>
         */
        PICKING: {
            DISABLED: 'DISABLED',
            CELL    : 'CELL',
            OBJECT  : 'OBJECT'
        }

    },

    /**
     * @namespace Default values for models
     */
    Model: {

        /**
         *  Enumeration with the different loading modes provided for models
         * <ul>
         * <li><code>LIVE</code>: Each asset is added to the scene as soon as it is downloaded</li>
         * <li><code>LATER</code>: The assets are added to the scene only when ALL of them have been downloaded</li>
         * <li><code>DETACHED</code>: The assets are never added to the scene. The programmer decides when to do this.</li>
         * </ul>
         *
         * These modes can be used with {@link nucleo.Scene.setLoadingMode}
         */
        LOADING_MODE   : {LIVE: 'LIVE', LATER: 'LATER', DETACHED: 'DETACHED'},
        /**
         * Maximum number of indices per model (Unsigned Short range)
         */
        MAX_NUM_INDICES: 65535,
        /**
         * Types of models
         * <ul>
         * <li><code>SIMPLE</code>: The model is rendered at all once
         * <li><code>MESH</code>: This model represents a mesh (no shared triangles). Flat shading is required
         * <li><code>BIG_DATA</code>: This model is complex and it may required several rendering cycles.
         */
        TYPE           : {SIMPLE: 'SIMPLE', MESH: 'MESH', BIG_DATA: 'BIG DATA'},

        BoundingBox: {
            "vertices" : [],
            "wireframe": [0, 1, 1, 2, 2, 3, 3, 0, 0, 4, 4, 5, 5, 6, 6, 7, 7, 4, 1, 5, 2, 6, 3, 7],
            "color"    : [1.0, 1.0, 1.0, 1.0],
            "shading"  : false
        },

        Floor: {
            "vertices": [], "indices": [], "color": [0.6, 0.6, 0.6, 1.0], "shading": false
        },

        Axis: {
            "vertices" : [-1, 0, 0, 1, 0, 0, 0, -2, 0, 0, 2, 0, 0, 0, -1, 0, 0, 1],
            "wireframe": [0, 1, 2, 3, 4, 5],
            "colors"   : [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1],
            "shading"  : false
        }

    },

    Renderable: {
        TASK: {CREATE: 'CREATE', UPDATE_GEOMETRY: 'UPDATE_GEOMETRY', UPDATE_COLORS: 'UPDATE_COLORS'}

    },

    /**
     * @namespace Default values for renderers
     */
    Renderer: {
        MODE: {TIMER: 'TIMER', ANIMFRAME: 'ANIMFRAME', ON_DEMAND: 'ON_DEMAND'},
        RATE: {SLOW: 10000, NORMAL: 500}
    },

    /**
     * @namespace Constants to handle textures
     */
    Texture: {
        FILTER: {
            NEAREST               : 'NEAREST',
            LINEAR                : 'LINEAR',
            NEAREST_MIPMAP_NEAREST: 'NEAREST_MIPMAP_NEAREST',
            LINEAR_MIPMAP_NEAREST : 'LINEAR_MIPMAP_NEAREST',
            NEAREST_MIPMAP_LINEAR : 'NEAREST_MIPMAP_LINEAR',
            LINEAR_MIPMAP_LINEAR  : 'LINEAR_MIPMAP_LINEAR'
        }
    },

    /**
     * @namespace Default values for <code>Material</code>
     * @see Material
     */
    Material: {
        /**
         * Diffuse color used by default when a model does
         * not have diffuse color information: [0.8,0.8,0.8,1.0]
         */
        DIFFUSE  : [0.8, 0.8, 0.8, 1.0],
        /**
         * Ambient color used by default when a model
         * does not have ambient color information: [0.0,0.0,0.0,1.0]
         */
        AMBIENT  : [0.0, 0.0, 0.0, 1.0],
        /**
         * Specular color used by default when a model
         * does not have specular color information: [0.0,0.0,0.0,1.0]
         */
        SPECULAR : [0.0, 0.0, 0.0, 1.0],
        /**
         * Shininess used by default when a model
         * does not have shininess information: 0
         */
        SHININESS: 0.0,
        /**
         * Opacity used by default when a model
         * does not have opacity information: 0
         */
        OPACITY  : 1.0,
        /**
         * Shading used by default when a model
         * does not have shading information: 0
         */
        SHADING  : true
    },


    /**
     * @namespace Lookup Table Definitions
     * @property {Array}       list         List of lookup tables available
     * @property {String}      main         Lookup table loaded by default
     */
    LookupTable: {

        list: ["default", "aal", "autumn", "blackbody", "bone", "brodmann", "cardiac",
            "copper", "cortex", "cte", "french", "fs", "ge_color", "gold", "gooch",
            "hot", "hotiron", "hsv", "jet", "nih", "nih_fire", "nih_ice", "pink",
            "rainramp", "spectrum", "surface", "x_hot", "x_rain"],

        main: "default"

    },

    /**
     * Pi divided by 2
     */
    PI_OVER_2: Math.PI / 2,
    /**
     * Multiplicative constant to convert degrees to radians
     */
    DEG_2_RAD: Math.PI / 180,
    /**
     * Multiplicative constant to convert radians to degrees
     */
    RAD_2_DEG: 180 / Math.PI


};


/**
 * Used mainly by <code>RenderEngine</code> and its descendents
 * @namespace GLSL constants
 * @property {String} VERTEX_SHADER Vertex Shader Id
 * @property {String} FRAGMENT_SHADER Fragment Shader Id
 * @property {String} MODEL_VIEW_MATRIX  the model view matrix Id
 * @property {String} NORMAL_MATRIX the normal matrix Id
 * @property {String} PERSPECTIVE_MATRIX the perspective matrix Id
 * @property {String} MVP_MATRIX the model view perspective matrix Id
 * @property {String} VERTEX_ATTRIBUTE the vertex attribute Id
 * @property {String} NORMAL_ATTRIBUTE the normal attribute Id
 * @property {String} COLOR_ATTRIBUTE the color attribute Id
 * @property {JSON} blender The program to render blender scenes
 * @property {JSON} lambert The program to render scenes without specular reflections
 * @property {JSON} phong The program to render scenes with specular reflections
 * @property {JSON} bake The program that interleaves buffers for optimized rendering
 */
nucleo.ESSL = {
    VERTEX_SHADER     : 'VERTEX_SHADER',
    FRAGMENT_SHADER   : 'FRAGMENT_SHADER',
    MODEL_VIEW_MATRIX : 'mModelView',
    NORMAL_MATRIX     : 'mNormal',
    PERSPECTIVE_MATRIX: 'mPerspective',
    MVP_MATRIX        : 'mModelViewPerspective',
    VERTEX_ATTRIBUTE  : 'aVertexPosition',
    NORMAL_ATTRIBUTE  : 'aVertexNormal',
    COLOR_ATTRIBUTE   : 'aVertexColor',
    TEXCOORD_ATTRIBUTE: 'aVertexTextureCoords'
};


/**
 * Congregates all the events fired by Nucleo
 *
 * These events are registered with the Notifier
 *
 * @namespace Nucleo Events
 * @property {String} DEFAULT_LUT_LOADED fired when the default lookup table is loaded
 * @property {String} SCENE_UPDATED fired by Scene when an actor is added to the scene
 * @property {String} MODELS_LOADED fired by ModelManager after loading a set of models
 * @property {String} MODEL_NEW fired by the Model constructor
 * @property {String} ACTOR_MOVED fired by Actor when that actor instance is moved
 * @property {String} ACTOR_SCALED fired by Actor
 * @property {String} ACTOR_CHANGED_COLOR fired by Actor
 * @property {String} ACTOR_CHANGED_SHADING fired by Actor
 * @property {String} VIEW_NEW fired by the View constructor
 * @property {String} SCENE_NEW fired by the Scene constructor
 * @property {String} READER_DONE fired when a reader is done reading window.File(s)
 * @see {Notifier}
 */
nucleo.EVENTS = {
    DEFAULT_LUT_LOADED   : 'nucleo.EVENTS.DEFAULT_LUT_LOADED',
    SCENE_UPDATED        : 'nucleo.EVENTS.SCENE_UPDATED',
    MODELS_LOADING       : 'nucleo.EVENTS.MODELS_LOADING',
    MODEL_NEW            : 'nucleo.EVENTS.MODEL_NEW',
    MODELS_LOADED        : 'nucleo.EVENTS.MODELS_LOADED',
    ACTOR_MOVED          : 'nucleo.EVENTS.ACTOR_MOVED',
    ACTOR_SCALED         : 'nucleo.EVENTS.ACTOR_SCALED',
    ACTOR_ROTATED        : 'nucleo.EVENTS.ACTOR_ROTATED',
    ACTOR_CHANGED_COLOR  : 'nucleo.EVENTS.ACTOR_CHANGED_COLOR',
    ACTOR_CHANGED_SHADING: 'nucleo.EVENTS.ACTOR_CHANGED_SHADING',
    VIEW_NEW             : 'nucleo.EVENTS.VIEW_NEW',
    SCENE_NEW            : 'nucleo.EVENTS.SCENE_NEW',
    READER_DONE          : 'nucleo.EVENTS.READER_DONE'
};

nucleo.DEBUG = true;/*-------------------------------------------------------------------------
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

if (typeof(jQuery) == 'undefined') {
    nucleo.jquery = false;
    console.warn('JQuery is not available');
}
else {
    nucleo.jquery = true;
    console.info('JQuery is available');
}

/**
 * Ajax calls
 * @param params
 */
nucleo.ajax = function (params) {

    if (nucleo.jquery) {
        $.ajax(params);
        return;
    }

    //When JQuery is not present
    var response, request    = new XMLHttpRequest();

    request.open(params.type, params.url, true);

    if (params.mimeType !== undefined){
        request.overrideMimeType(params.mimeType);
    }

    request.onreadystatechange = function(){
        if (request.readyState == 4){
            if (params.dataType === 'json'){
                response = JSON.parse(request.responseText);
            }
            else{
                response = request.responseText;
            }
            params.success(response);
        }
    }

    request.onerror = function(){ params.error(request, request.status, request.statusText);}
    request.send();


};/*-------------------------------------------------------------------------
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
 * Nucleo Utils
 * @type {{piOver2: number, deg2rad: number, rad2deg: number, isMac: Function, int2rgb: Function, frac2rgb: Function, rgb2frac: Function, rgb2hex: Function, hex2rgb: Function, rgb2decimal: Function, createColor: Function, format: Function, createVec3: Function, createArr3: Function, generateUID: Function, extend: Function, getPath: Function, getAngle: Function, deg2rad: number, doTimer: Function, console: Function}}
 */
nucleo.util = {

    /**
     * Pi divided by 2
     */
    piOver2: Math.PI / 2,
    /**
     * Multiplicative constant to convert degrees to radians
     */
    deg2rad: Math.PI / 180,
    /**
     * Multiplicative constant to convert radians to degrees
     */
    rad2deg: 180 / Math.PI,

    isMac  : function () {
        return navigator.platform.toUpperCase().indexOf("MAC") != -1;
    },
    /**
     *Returns a RGB color based on an integer (0..16 millions?)
     */
    int2rgb: function (i) {
        return [((i >> 16) & 0xFF) / 256, ((i >> 8) & 0xFF) / 256, (i & 0xFF) / 256];
    },

    frac2rgb: function (r, g, b) {
        var c = nucleo.util.createArr3(r, g, b);
        c[0]  = Math.round(255 * c[0]);
        c[1]  = Math.round(255 * c[1]);
        c[2]  = Math.round(255 * c[2]);
        return c;
    },

    rgb2frac: function (r, g, b) { //@TODO: is this round  good?
        var c = nucleo.util.createArr3(r, g, b);
        c[0]  = Math.round(c[0] / 255);
        c[1]  = Math.round(c[1] / 255);
        c[2]  = Math.round(c[2] / 255);
        return c;
    },

    rgb2hex: function (r, g, b) {
        var c = nucleo.util.createArr3(r, g, b);
        return "#" + ((1 << 24) + (c[0] << 16) + (c[1] << 8) + c[2]).toString(16).slice(1);
    },

    /**
     * This function is attributed to Tim Down
     * @link{http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb}
     */
    hex2rgb    : function (hex) {
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex                = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16)
        ] : null;
    },
    /**
     * Rescales the color from [0,255] to [0,1]
     * WebGL uses [0,1] range
     */
    rgb2decimal: function (rgb) {
        if (rgb == null || rgb == undefined) return null;
        return [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255];
    },

    createColor: function (r, g, b) {
        var color = [];
        if (r == undefined) {
            return null;
        }

        if (r instanceof Array) {
            var c = r.slice(0);
            r     = c[0];
            g     = c[1];
            b     = c[2];
        }

        if (typeof(r) == 'string') {
            color = this.rgb2decimal(this.hex2rgb(r));
        }
        else if (typeof(r) == 'number') {
            if (r < 0 || g == undefined || b == undefined || g < 0 || b < 0) {
                return null; //invalid color
            }
            else if (r > 1 || g > 1 || b > 1) {
                color = this.rgb2decimal([r, g, b]);
            }
            else {
                color = [r, g, b];
            }
        }

        return color;
    },
    /**
     * Formats Arrays, vec3 and vec4 for display
     *
     * @param {Array, vec3, vec4} arr the object to format
     * @param {Number} digits the number of decimal figures
     */
    format     : function (arr, digits) {
        var p = Math.pow(10, digits);
        if (typeof(arr) == 'object') {

            var result = '[';
            for (var i = 0; i < arr.length - 1; i += 1) {
                result += Math.round(arr[i] * p) / p + ', ';
            }
            result += Math.round(arr[arr.length - 1] * p) / p + ']'
        }
        else if (typeof(arr) == 'number') {
            result = '[' + Math.round(arr * p) / p + ']';
        }
        return result;
    },

    /**
     * Creates a vector from a set of parameters
     * @param {Array, vec3, Number} x it can be an Array, a vec3 or a number
     * @param {Number} y if x is a number, this parameter corresponds to the y-component
     * @param {Number} z if x is a number, this parameter corresponds to the z-component
     */
    createVec3: function (x, y, z) {
        var vvv = vec3.create();
        if (x instanceof Array || x instanceof Float32Array) {
            vvv = vec3.clone(x)
        }
        else {
            vvv = vec3.fromValues(x, y, z);
        }
        return vvv;
    },
    /**
     * Creates an array from a set of parameters
     * @param {Array, vec3, Number} x it can be an Array, a vec3 or a number
     * @param {Number} y if x is a number, this parameter corresponds to the y-component
     * @param {Number} z if x is a number, this parameter corresponds to the z-component
     */
    createArr3: function (x, y, z) {
        var vvv = []
        if (x instanceof Array || x instanceof Float32Array) {
            vvv[0] = x[0];
            vvv[1] = x[1];
            vvv[2] = x[2];
        }
        else {
            vvv[0] = x;
            vvv[1] = y;
            vvv[2] = z;
        }
        return vvv;
    },

    generateUID: function () {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }

        return (S4() + "-" + S4() + "-" + S4() + "-" + S4());
    },

    extend: function () {
        var ret = {};
        var len = arguments.length;
        for (var i = 0; i < len; i++) {
            for (p in arguments[i]) {
                if (arguments[i].hasOwnProperty(p)) {
                    ret[p] = arguments[i][p];
                }
            }
        }
        return ret;
    },

    getPath : function (path) {
        if (path == undefined || path == null) {
            return "";
        }
        else if (path.length - 1 == path.lastIndexOf('/')) {
            return path;
        }
        else if (path.lastIndexOf('.') > path.lastIndexOf('/')) {
            return path.substring(0, path.lastIndexOf('/') + 1)
        }
        else
            return path + '/';
    },
    /**
     * Returns an angle between 0 and 360 deg
     * @param{Number} angle the angle
     */
    getAngle: function (angle) {
        if (angle > 360 || angle < -360) {
            return angle % 360;
        }
        else return angle;
    },
    /**
     *Converts degrees to radians
     * @param{Number} deg angle in degrees
     */
    deg2rad : function (deg) {
        return deg * Math.PI / 180;
    },

    doTimer: function (length, resolution, oninstance, oncomplete) {
        var steps = (length / 100) * (resolution / 10),
            speed = length / steps,
            count = 0,
            start = new Date().getTime();

        function instance() {
            if (count++ == steps) {
                oncomplete(steps, count);
            }
            else {
                oninstance(steps, count);
                var diff = (new Date().getTime() - start) - (count * speed);
                window.setTimeout(instance, (speed - diff));
            }
        };
        window.setTimeout(instance, speed);
    },


    console: function (txt, flag) {
        if (nucleo.DEBUG == true || flag) {
            console.info(txt);
        }
    }
};

Array.prototype.max = function () {
    if (this.length > 65535) {
        var max = this[0];
        for (var i = 0, N = this.length; i < N; i += 1) {
            if (this[i] > max) {
                max = this[i];
            }
        }
        return max;
    }
    else {
        return Math.max.apply(null, this);
    }
};

Array.prototype.min = function () {
    if (this.length > 65535) {
        var min = this[0];
        for (var i = 0, N = this.length; i < N; i += 1) {
            if (this[i] < min) {
                min = this[i];
            }
        }
        return min;
    }
    else {
        return Math.min.apply(null, this);
    }
};


Array.prototype.hasObject = (
    !Array.indexOf ? function (o) {
        var l = this.length + 1;
        while (l -= 1) {
            if (this[l - 1] === o) {
                return true;
            }
        }
        return false;
    } : function (o) {
        return (this.indexOf(o) !== -1);
    }
);

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function ( callback, element) {
            return window.setTimeout(callback, 1000 / 60);
        };
})();

window.cancelRequestAnimFrame = (function () {
    return window.cancelAnimationFrame ||
        window.webkitCancelRequestAnimationFrame ||
        window.mozCancelRequestAnimationFrame ||
        window.oCancelRequestAnimationFrame ||
        window.msCancelRequestAnimationFrame ||
        clearTimeout
})();



/**
 * <p> 
 * Handles asynchronous communication among classes in Nucleo
 * using a publisher-subscriber mechanism
 * </p>
 * 
 * @class Hub for the publish-subscribe mechanism among Nucleo entities
 * @constructor
 */
nucleo.Notifier = function(){
	this.targetList = {};
	this.sourceList = {};
    
};

/**
 * <p>Used by any class to declare the events that the class will listen for.</p>
  
 * @param {Object} list
 * @param {Object} receiver
 */
nucleo.Notifier.prototype.subscribe = function(list,receiver){
	if (typeof(list)=='string'){
		this._addTarget(list,receiver);
	}
	else if (list instanceof Array){
		for (var i=0;i<list.length;i+=1){
			this._addTarget(list[i],receiver);
		}
	}
	else {
		throw 'Notifier.receives: this method receives a string or a list of strings'
	}
};

/**
 * <p>Used by any class to declare the events that the class will generate</p> 
 * @param {Object} list
 * @param {Object} sender
 */
nucleo.Notifier.prototype.publish = function(list,sender){
	if (typeof(list)== 'string'){
		this._addSource(list,sender);
	}
	else if (list instanceof Array){
		for (var i=0;i<list.length;i+=1){
			this._addSource(list[i],sender);
		}
	}
	else {
		throw 'Notifier.sends: this method receives a string or a list of strings';
	}
};


/**
 * Any class can use this method to tell the notifier that it will listen to 
 * a particular event.
 * 
 * @param {Object} event the event the class will listen to
 * @param {Object} target the object that will listen for the event
 * @private
 */
nucleo.Notifier.prototype._addTarget = function(event, target){
	nucleo.util.console('Notifier: adding target for event '+event);
	var targetList = this.targetList;
	if (targetList[event]== undefined){
		targetList[event] = [];
	}
	targetList[event].push(target);
};


/**
 * Any class can use this method to tell the notifier that it will emit a particular event
 * 
 * @param {Object} event the event to emit
 * @param {Object} src the object that will emit the event
 * @private 
 */
nucleo.Notifier.prototype._addSource = function(event,src){
	nucleo.util.console('Notifier: adding source for event '+event);
	var targetList = this.targetList;
	var sourceList = this.sourceList;
	
	if (sourceList[event]== undefined){
		sourceList[event] = [];
	}
	
	if (targetList[event]== undefined){
		targetList[event] = [];
	}
	
	sourceList[event].push(src);
};

/**
 * <p>Invoked by any class when it needs to emit an event that should be propagated to other
 * objects in the library</p>
 * 
 * <p>The notifier will first verify if the object emitting the event has been authorized to do so.
 * This is, the object should have registered using <code>publish</code>.
 * After that, the notifier will retrieve a list of the objects that have registered as listeners of 
 * the particular event and fires the event to them using JQuery.
 * </p>
 *  
 * @param {Object} event
 * @param {Object} src
 */
nucleo.Notifier.prototype.fire = function(event, src){
    
    if (this.targetList[event].length == 0) return; //quick and simple
    
    var self = this;
    
    function processEvent(){
    	var targetList = self.targetList;
        var idx = self.sourceList[event].indexOf(src);
        if (idx == -1){
        	throw 'The source '+src+' is not registered to trigger the event '+event+'. Did you use Notifier.publish?';
        }
    	
    	nucleo.util.console('Notifier: firing ' +event);
    	
    	var targets = self.targetList[event];
    	
    	for (var index=0;index<targets.length;index++){
    	    if (typeof(targets[index]) =='object'){
                targets[index].handleEvent(event,src);
            }
            else if (typeof(targets[index] == 'function')){
                targets[index](event,src);
            }
        }
	}
	setTimeout(function(){processEvent();},0);
};




/**
 * Gets a list of the events handled by this Notifier
 */
nucleo.Notifier.prototype.getEvents = function(){
	var list = [];
	for (var event in this.sourceList){
		list.push(event);
	}
	return list;
};


/**
 * Get a list of the objects that are currently registered to listen for a particular event 
 * @param {Object} event the event in question
 */
nucleo.Notifier.prototype.getTargetsFor = function(event){
	var targets = this.targetList[event];
	var list = [];
	for (var index=0;index<targets.length;index++){
		list.push(targets[index]);
	}
	return list; //@TODO: Reevaluate
};

/**
 *Global notifier object
 * @todo: review if it is possible/advisable to implement a singleton
 */
nucleo.Notifier.instance = new nucleo.Notifier();
 

    



/**
 * @fileoverview gl-matrix - High performance matrix and vector operations
 * @author Brandon Jones
 * @author Colin MacKenzie IV
 * @version 2.2.1
 */

/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

 Redistribution and use in source and binary forms, with or without modification,
 are permitted provided that the following conditions are met:

 * Redistributions of source code must retain the above copyright notice, this
 list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice,
 this list of conditions and the following disclaimer in the documentation
 and/or other materials provided with the distribution.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
 ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */


(function (_global) {
    "use strict";

    var shim = {};
    if (typeof(exports) === 'undefined') {
        if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
            shim.exports = {};
            define(function () {
                return shim.exports;
            });
        } else {
            // gl-matrix lives in a browser, define its namespaces in global
            shim.exports = typeof(window) !== 'undefined' ? window : _global;
        }
    }
    else {
        // gl-matrix lives in commonjs, define its namespaces in exports
        shim.exports = exports;
    }

    (function (exports) {
        /* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

         Redistribution and use in source and binary forms, with or without modification,
         are permitted provided that the following conditions are met:

         * Redistributions of source code must retain the above copyright notice, this
         list of conditions and the following disclaimer.
         * Redistributions in binary form must reproduce the above copyright notice,
         this list of conditions and the following disclaimer in the documentation 
         and/or other materials provided with the distribution.

         THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
         ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
         WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
         DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
         ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
         (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
         LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
         ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
         (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
         SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */


        if (!GLMAT_EPSILON) {
            var GLMAT_EPSILON = 0.000001;
        }

        if (!GLMAT_ARRAY_TYPE) {
            var GLMAT_ARRAY_TYPE = (typeof Float32Array !== 'undefined') ? Float32Array : Array;
        }

        if (!GLMAT_RANDOM) {
            var GLMAT_RANDOM = Math.random;
        }

        /**
         * @class Common utilities
         * @name glMatrix
         */
        var glMatrix = {};

        /**
         * Sets the type of array used when creating new vectors and matricies
         *
         * @param {Type} type Array type, such as Float32Array or Array
         */
        glMatrix.setMatrixArrayType = function (type) {
            GLMAT_ARRAY_TYPE = type;
        }

        if (typeof(exports) !== 'undefined') {
            exports.glMatrix = glMatrix;
        }

        var degree = Math.PI / 180;

        /**
         * Convert Degree To Radian
         *
         * @param {Number} Angle in Degrees
         */
        glMatrix.toRadian = function (a) {
            return a * degree;
        }
        ;
        /* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

         Redistribution and use in source and binary forms, with or without modification,
         are permitted provided that the following conditions are met:

         * Redistributions of source code must retain the above copyright notice, this
         list of conditions and the following disclaimer.
         * Redistributions in binary form must reproduce the above copyright notice,
         this list of conditions and the following disclaimer in the documentation 
         and/or other materials provided with the distribution.

         THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
         ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
         WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
         DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
         ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
         (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
         LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
         ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
         (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
         SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

        /**
         * @class 2 Dimensional Vector
         * @name vec2
         */

        var vec2 = {};

        /**
         * Creates a new, empty vec2
         *
         * @returns {vec2} a new 2D vector
         */
        vec2.create = function () {
            var out = new GLMAT_ARRAY_TYPE(2);
            out[0] = 0;
            out[1] = 0;
            return out;
        };

        /**
         * Creates a new vec2 initialized with values from an existing vector
         *
         * @param {vec2} a vector to clone
         * @returns {vec2} a new 2D vector
         */
        vec2.clone = function (a) {
            var out = new GLMAT_ARRAY_TYPE(2);
            out[0] = a[0];
            out[1] = a[1];
            return out;
        };

        /**
         * Creates a new vec2 initialized with the given values
         *
         * @param {Number} x X component
         * @param {Number} y Y component
         * @returns {vec2} a new 2D vector
         */
        vec2.fromValues = function (x, y) {
            var out = new GLMAT_ARRAY_TYPE(2);
            out[0] = x;
            out[1] = y;
            return out;
        };

        /**
         * Copy the values from one vec2 to another
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a the source vector
         * @returns {vec2} out
         */
        vec2.copy = function (out, a) {
            out[0] = a[0];
            out[1] = a[1];
            return out;
        };

        /**
         * Set the components of a vec2 to the given values
         *
         * @param {vec2} out the receiving vector
         * @param {Number} x X component
         * @param {Number} y Y component
         * @returns {vec2} out
         */
        vec2.set = function (out, x, y) {
            out[0] = x;
            out[1] = y;
            return out;
        };

        /**
         * Adds two vec2's
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a the first operand
         * @param {vec2} b the second operand
         * @returns {vec2} out
         */
        vec2.add = function (out, a, b) {
            out[0] = a[0] + b[0];
            out[1] = a[1] + b[1];
            return out;
        };

        /**
         * Subtracts vector b from vector a
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a the first operand
         * @param {vec2} b the second operand
         * @returns {vec2} out
         */
        vec2.subtract = function (out, a, b) {
            out[0] = a[0] - b[0];
            out[1] = a[1] - b[1];
            return out;
        };

        /**
         * Alias for {@link vec2.subtract}
         * @function
         */
        vec2.sub = vec2.subtract;

        /**
         * Multiplies two vec2's
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a the first operand
         * @param {vec2} b the second operand
         * @returns {vec2} out
         */
        vec2.multiply = function (out, a, b) {
            out[0] = a[0] * b[0];
            out[1] = a[1] * b[1];
            return out;
        };

        /**
         * Alias for {@link vec2.multiply}
         * @function
         */
        vec2.mul = vec2.multiply;

        /**
         * Divides two vec2's
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a the first operand
         * @param {vec2} b the second operand
         * @returns {vec2} out
         */
        vec2.divide = function (out, a, b) {
            out[0] = a[0] / b[0];
            out[1] = a[1] / b[1];
            return out;
        };

        /**
         * Alias for {@link vec2.divide}
         * @function
         */
        vec2.div = vec2.divide;

        /**
         * Returns the minimum of two vec2's
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a the first operand
         * @param {vec2} b the second operand
         * @returns {vec2} out
         */
        vec2.min = function (out, a, b) {
            out[0] = Math.min(a[0], b[0]);
            out[1] = Math.min(a[1], b[1]);
            return out;
        };

        /**
         * Returns the maximum of two vec2's
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a the first operand
         * @param {vec2} b the second operand
         * @returns {vec2} out
         */
        vec2.max = function (out, a, b) {
            out[0] = Math.max(a[0], b[0]);
            out[1] = Math.max(a[1], b[1]);
            return out;
        };

        /**
         * Scales a vec2 by a scalar number
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a the vector to scale
         * @param {Number} b amount to scale the vector by
         * @returns {vec2} out
         */
        vec2.scale = function (out, a, b) {
            out[0] = a[0] * b;
            out[1] = a[1] * b;
            return out;
        };

        /**
         * Adds two vec2's after scaling the second operand by a scalar value
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a the first operand
         * @param {vec2} b the second operand
         * @param {Number} scale the amount to scale b by before adding
         * @returns {vec2} out
         */
        vec2.scaleAndAdd = function (out, a, b, scale) {
            out[0] = a[0] + (b[0] * scale);
            out[1] = a[1] + (b[1] * scale);
            return out;
        };

        /**
         * Calculates the euclidian distance between two vec2's
         *
         * @param {vec2} a the first operand
         * @param {vec2} b the second operand
         * @returns {Number} distance between a and b
         */
        vec2.distance = function (a, b) {
            var x = b[0] - a[0],
                y = b[1] - a[1];
            return Math.sqrt(x * x + y * y);
        };

        /**
         * Alias for {@link vec2.distance}
         * @function
         */
        vec2.dist = vec2.distance;

        /**
         * Calculates the squared euclidian distance between two vec2's
         *
         * @param {vec2} a the first operand
         * @param {vec2} b the second operand
         * @returns {Number} squared distance between a and b
         */
        vec2.squaredDistance = function (a, b) {
            var x = b[0] - a[0],
                y = b[1] - a[1];
            return x * x + y * y;
        };

        /**
         * Alias for {@link vec2.squaredDistance}
         * @function
         */
        vec2.sqrDist = vec2.squaredDistance;

        /**
         * Calculates the length of a vec2
         *
         * @param {vec2} a vector to calculate length of
         * @returns {Number} length of a
         */
        vec2.length = function (a) {
            var x = a[0],
                y = a[1];
            return Math.sqrt(x * x + y * y);
        };

        /**
         * Alias for {@link vec2.length}
         * @function
         */
        vec2.len = vec2.length;

        /**
         * Calculates the squared length of a vec2
         *
         * @param {vec2} a vector to calculate squared length of
         * @returns {Number} squared length of a
         */
        vec2.squaredLength = function (a) {
            var x = a[0],
                y = a[1];
            return x * x + y * y;
        };

        /**
         * Alias for {@link vec2.squaredLength}
         * @function
         */
        vec2.sqrLen = vec2.squaredLength;

        /**
         * Negates the components of a vec2
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a vector to negate
         * @returns {vec2} out
         */
        vec2.negate = function (out, a) {
            out[0] = -a[0];
            out[1] = -a[1];
            return out;
        };

        /**
         * Normalize a vec2
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a vector to normalize
         * @returns {vec2} out
         */
        vec2.normalize = function (out, a) {
            var x = a[0],
                y = a[1];
            var len = x * x + y * y;
            if (len > 0) {
                //TODO: evaluate use of glm_invsqrt here?
                len = 1 / Math.sqrt(len);
                out[0] = a[0] * len;
                out[1] = a[1] * len;
            }
            return out;
        };

        /**
         * Calculates the dot product of two vec2's
         *
         * @param {vec2} a the first operand
         * @param {vec2} b the second operand
         * @returns {Number} dot product of a and b
         */
        vec2.dot = function (a, b) {
            return a[0] * b[0] + a[1] * b[1];
        };

        /**
         * Computes the cross product of two vec2's
         * Note that the cross product must by definition produce a 3D vector
         *
         * @param {vec3} out the receiving vector
         * @param {vec2} a the first operand
         * @param {vec2} b the second operand
         * @returns {vec3} out
         */
        vec2.cross = function (out, a, b) {
            var z = a[0] * b[1] - a[1] * b[0];
            out[0] = out[1] = 0;
            out[2] = z;
            return out;
        };

        /**
         * Performs a linear interpolation between two vec2's
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a the first operand
         * @param {vec2} b the second operand
         * @param {Number} t interpolation amount between the two inputs
         * @returns {vec2} out
         */
        vec2.lerp = function (out, a, b, t) {
            var ax = a[0],
                ay = a[1];
            out[0] = ax + t * (b[0] - ax);
            out[1] = ay + t * (b[1] - ay);
            return out;
        };

        /**
         * Generates a random vector with the given scale
         *
         * @param {vec2} out the receiving vector
         * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
         * @returns {vec2} out
         */
        vec2.random = function (out, scale) {
            scale = scale || 1.0;
            var r = GLMAT_RANDOM() * 2.0 * Math.PI;
            out[0] = Math.cos(r) * scale;
            out[1] = Math.sin(r) * scale;
            return out;
        };

        /**
         * Transforms the vec2 with a mat2
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a the vector to transform
         * @param {mat2} m matrix to transform with
         * @returns {vec2} out
         */
        vec2.transformMat2 = function (out, a, m) {
            var x = a[0],
                y = a[1];
            out[0] = m[0] * x + m[2] * y;
            out[1] = m[1] * x + m[3] * y;
            return out;
        };

        /**
         * Transforms the vec2 with a mat2d
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a the vector to transform
         * @param {mat2d} m matrix to transform with
         * @returns {vec2} out
         */
        vec2.transformMat2d = function (out, a, m) {
            var x = a[0],
                y = a[1];
            out[0] = m[0] * x + m[2] * y + m[4];
            out[1] = m[1] * x + m[3] * y + m[5];
            return out;
        };

        /**
         * Transforms the vec2 with a mat3
         * 3rd vector component is implicitly '1'
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a the vector to transform
         * @param {mat3} m matrix to transform with
         * @returns {vec2} out
         */
        vec2.transformMat3 = function (out, a, m) {
            var x = a[0],
                y = a[1];
            out[0] = m[0] * x + m[3] * y + m[6];
            out[1] = m[1] * x + m[4] * y + m[7];
            return out;
        };

        /**
         * Transforms the vec2 with a mat4
         * 3rd vector component is implicitly '0'
         * 4th vector component is implicitly '1'
         *
         * @param {vec2} out the receiving vector
         * @param {vec2} a the vector to transform
         * @param {mat4} m matrix to transform with
         * @returns {vec2} out
         */
        vec2.transformMat4 = function (out, a, m) {
            var x = a[0],
                y = a[1];
            out[0] = m[0] * x + m[4] * y + m[12];
            out[1] = m[1] * x + m[5] * y + m[13];
            return out;
        };

        /**
         * Perform some operation over an array of vec2s.
         *
         * @param {Array} a the array of vectors to iterate over
         * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
         * @param {Number} offset Number of elements to skip at the beginning of the array
         * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
         * @param {Function} fn Function to call for each vector in the array
         * @param {Object} [arg] additional argument to pass to fn
         * @returns {Array} a
         * @function
         */
        vec2.forEach = (function () {
            var vec = vec2.create();

            return function (a, stride, offset, count, fn, arg) {
                var i, l;
                if (!stride) {
                    stride = 2;
                }

                if (!offset) {
                    offset = 0;
                }

                if (count) {
                    l = Math.min((count * stride) + offset, a.length);
                } else {
                    l = a.length;
                }

                for (i = offset; i < l; i += stride) {
                    vec[0] = a[i];
                    vec[1] = a[i + 1];
                    fn(vec, vec, arg);
                    a[i] = vec[0];
                    a[i + 1] = vec[1];
                }

                return a;
            };
        })();

        /**
         * Returns a string representation of a vector
         *
         * @param {vec2} vec vector to represent as a string
         * @returns {String} string representation of the vector
         */
        vec2.str = function (a) {
            return 'vec2(' + a[0] + ', ' + a[1] + ')';
        };

        if (typeof(exports) !== 'undefined') {
            exports.vec2 = vec2;
        }
        ;
        /* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

         Redistribution and use in source and binary forms, with or without modification,
         are permitted provided that the following conditions are met:

         * Redistributions of source code must retain the above copyright notice, this
         list of conditions and the following disclaimer.
         * Redistributions in binary form must reproduce the above copyright notice,
         this list of conditions and the following disclaimer in the documentation 
         and/or other materials provided with the distribution.

         THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
         ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
         WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
         DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
         ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
         (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
         LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
         ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
         (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
         SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

        /**
         * @class 3 Dimensional Vector
         * @name vec3
         */

        var vec3 = {};

        /**
         * Creates a new, empty vec3
         *
         * @returns {vec3} a new 3D vector
         */
        vec3.create = function () {
            var out = new GLMAT_ARRAY_TYPE(3);
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            return out;
        };

        /**
         * Creates a new vec3 initialized with values from an existing vector
         *
         * @param {vec3} a vector to clone
         * @returns {vec3} a new 3D vector
         */
        vec3.clone = function (a) {
            var out = new GLMAT_ARRAY_TYPE(3);
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            return out;
        };

        /**
         * Creates a new vec3 initialized with the given values
         *
         * @param {Number} x X component
         * @param {Number} y Y component
         * @param {Number} z Z component
         * @returns {vec3} a new 3D vector
         */
        vec3.fromValues = function (x, y, z) {
            var out = new GLMAT_ARRAY_TYPE(3);
            out[0] = x;
            out[1] = y;
            out[2] = z;
            return out;
        };

        /**
         * Copy the values from one vec3 to another
         *
         * @param {vec3} out the receiving vector
         * @param {vec3} a the source vector
         * @returns {vec3} out
         */
        vec3.copy = function (out, a) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            return out;
        };

        /**
         * Set the components of a vec3 to the given values
         *
         * @param {vec3} out the receiving vector
         * @param {Number} x X component
         * @param {Number} y Y component
         * @param {Number} z Z component
         * @returns {vec3} out
         */
        vec3.set = function (out, x, y, z) {
            out[0] = x;
            out[1] = y;
            out[2] = z;
            return out;
        };

        /**
         * Adds two vec3's
         *
         * @param {vec3} out the receiving vector
         * @param {vec3} a the first operand
         * @param {vec3} b the second operand
         * @returns {vec3} out
         */
        vec3.add = function (out, a, b) {
            out[0] = a[0] + b[0];
            out[1] = a[1] + b[1];
            out[2] = a[2] + b[2];
            return out;
        };

        /**
         * Subtracts vector b from vector a
         *
         * @param {vec3} out the receiving vector
         * @param {vec3} a the first operand
         * @param {vec3} b the second operand
         * @returns {vec3} out
         */
        vec3.subtract = function (out, a, b) {
            out[0] = a[0] - b[0];
            out[1] = a[1] - b[1];
            out[2] = a[2] - b[2];
            return out;
        };

        /**
         * Alias for {@link vec3.subtract}
         * @function
         */
        vec3.sub = vec3.subtract;

        /**
         * Multiplies two vec3's
         *
         * @param {vec3} out the receiving vector
         * @param {vec3} a the first operand
         * @param {vec3} b the second operand
         * @returns {vec3} out
         */
        vec3.multiply = function (out, a, b) {
            out[0] = a[0] * b[0];
            out[1] = a[1] * b[1];
            out[2] = a[2] * b[2];
            return out;
        };

        /**
         * Alias for {@link vec3.multiply}
         * @function
         */
        vec3.mul = vec3.multiply;

        /**
         * Divides two vec3's
         *
         * @param {vec3} out the receiving vector
         * @param {vec3} a the first operand
         * @param {vec3} b the second operand
         * @returns {vec3} out
         */
        vec3.divide = function (out, a, b) {
            out[0] = a[0] / b[0];
            out[1] = a[1] / b[1];
            out[2] = a[2] / b[2];
            return out;
        };

        /**
         * Alias for {@link vec3.divide}
         * @function
         */
        vec3.div = vec3.divide;

        /**
         * Returns the minimum of two vec3's
         *
         * @param {vec3} out the receiving vector
         * @param {vec3} a the first operand
         * @param {vec3} b the second operand
         * @returns {vec3} out
         */
        vec3.min = function (out, a, b) {
            out[0] = Math.min(a[0], b[0]);
            out[1] = Math.min(a[1], b[1]);
            out[2] = Math.min(a[2], b[2]);
            return out;
        };

        /**
         * Returns the maximum of two vec3's
         *
         * @param {vec3} out the receiving vector
         * @param {vec3} a the first operand
         * @param {vec3} b the second operand
         * @returns {vec3} out
         */
        vec3.max = function (out, a, b) {
            out[0] = Math.max(a[0], b[0]);
            out[1] = Math.max(a[1], b[1]);
            out[2] = Math.max(a[2], b[2]);
            return out;
        };

        /**
         * Scales a vec3 by a scalar number
         *
         * @param {vec3} out the receiving vector
         * @param {vec3} a the vector to scale
         * @param {Number} b amount to scale the vector by
         * @returns {vec3} out
         */
        vec3.scale = function (out, a, b) {
            out[0] = a[0] * b;
            out[1] = a[1] * b;
            out[2] = a[2] * b;
            return out;
        };

        /**
         * Adds two vec3's after scaling the second operand by a scalar value
         *
         * @param {vec3} out the receiving vector
         * @param {vec3} a the first operand
         * @param {vec3} b the second operand
         * @param {Number} scale the amount to scale b by before adding
         * @returns {vec3} out
         */
        vec3.scaleAndAdd = function (out, a, b, scale) {
            out[0] = a[0] + (b[0] * scale);
            out[1] = a[1] + (b[1] * scale);
            out[2] = a[2] + (b[2] * scale);
            return out;
        };

        /**
         * Calculates the euclidian distance between two vec3's
         *
         * @param {vec3} a the first operand
         * @param {vec3} b the second operand
         * @returns {Number} distance between a and b
         */
        vec3.distance = function (a, b) {
            var x = b[0] - a[0],
                y = b[1] - a[1],
                z = b[2] - a[2];
            return Math.sqrt(x * x + y * y + z * z);
        };

        /**
         * Alias for {@link vec3.distance}
         * @function
         */
        vec3.dist = vec3.distance;

        /**
         * Calculates the squared euclidian distance between two vec3's
         *
         * @param {vec3} a the first operand
         * @param {vec3} b the second operand
         * @returns {Number} squared distance between a and b
         */
        vec3.squaredDistance = function (a, b) {
            var x = b[0] - a[0],
                y = b[1] - a[1],
                z = b[2] - a[2];
            return x * x + y * y + z * z;
        };

        /**
         * Alias for {@link vec3.squaredDistance}
         * @function
         */
        vec3.sqrDist = vec3.squaredDistance;

        /**
         * Calculates the length of a vec3
         *
         * @param {vec3} a vector to calculate length of
         * @returns {Number} length of a
         */
        vec3.length = function (a) {
            var x = a[0],
                y = a[1],
                z = a[2];
            return Math.sqrt(x * x + y * y + z * z);
        };

        /**
         * Alias for {@link vec3.length}
         * @function
         */
        vec3.len = vec3.length;

        /**
         * Calculates the squared length of a vec3
         *
         * @param {vec3} a vector to calculate squared length of
         * @returns {Number} squared length of a
         */
        vec3.squaredLength = function (a) {
            var x = a[0],
                y = a[1],
                z = a[2];
            return x * x + y * y + z * z;
        };

        /**
         * Alias for {@link vec3.squaredLength}
         * @function
         */
        vec3.sqrLen = vec3.squaredLength;

        /**
         * Negates the components of a vec3
         *
         * @param {vec3} out the receiving vector
         * @param {vec3} a vector to negate
         * @returns {vec3} out
         */
        vec3.negate = function (out, a) {
            out[0] = -a[0];
            out[1] = -a[1];
            out[2] = -a[2];
            return out;
        };

        /**
         * Normalize a vec3
         *
         * @param {vec3} out the receiving vector
         * @param {vec3} a vector to normalize
         * @returns {vec3} out
         */
        vec3.normalize = function (out, a) {
            var x = a[0],
                y = a[1],
                z = a[2];
            var len = x * x + y * y + z * z;
            if (len > 0) {
                //TODO: evaluate use of glm_invsqrt here?
                len = 1 / Math.sqrt(len);
                out[0] = a[0] * len;
                out[1] = a[1] * len;
                out[2] = a[2] * len;
            }
            return out;
        };

        /**
         * Calculates the dot product of two vec3's
         *
         * @param {vec3} a the first operand
         * @param {vec3} b the second operand
         * @returns {Number} dot product of a and b
         */
        vec3.dot = function (a, b) {
            return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
        };

        /**
         * Computes the cross product of two vec3's
         *
         * @param {vec3} out the receiving vector
         * @param {vec3} a the first operand
         * @param {vec3} b the second operand
         * @returns {vec3} out
         */
        vec3.cross = function (out, a, b) {
            var ax = a[0], ay = a[1], az = a[2],
                bx = b[0], by = b[1], bz = b[2];

            out[0] = ay * bz - az * by;
            out[1] = az * bx - ax * bz;
            out[2] = ax * by - ay * bx;
            return out;
        };

        /**
         * Performs a linear interpolation between two vec3's
         *
         * @param {vec3} out the receiving vector
         * @param {vec3} a the first operand
         * @param {vec3} b the second operand
         * @param {Number} t interpolation amount between the two inputs
         * @returns {vec3} out
         */
        vec3.lerp = function (out, a, b, t) {
            var ax = a[0],
                ay = a[1],
                az = a[2];
            out[0] = ax + t * (b[0] - ax);
            out[1] = ay + t * (b[1] - ay);
            out[2] = az + t * (b[2] - az);
            return out;
        };

        /**
         * Generates a random vector with the given scale
         *
         * @param {vec3} out the receiving vector
         * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
         * @returns {vec3} out
         */
        vec3.random = function (out, scale) {
            scale = scale || 1.0;

            var r = GLMAT_RANDOM() * 2.0 * Math.PI;
            var z = (GLMAT_RANDOM() * 2.0) - 1.0;
            var zScale = Math.sqrt(1.0 - z * z) * scale;

            out[0] = Math.cos(r) * zScale;
            out[1] = Math.sin(r) * zScale;
            out[2] = z * scale;
            return out;
        };

        /**
         * Transforms the vec3 with a mat4.
         * 4th vector component is implicitly '1'
         *
         * @param {vec3} out the receiving vector
         * @param {vec3} a the vector to transform
         * @param {mat4} m matrix to transform with
         * @returns {vec3} out
         */
        vec3.transformMat4 = function (out, a, m) {
            var x = a[0], y = a[1], z = a[2];
            out[0] = m[0] * x + m[4] * y + m[8] * z + m[12];
            out[1] = m[1] * x + m[5] * y + m[9] * z + m[13];
            out[2] = m[2] * x + m[6] * y + m[10] * z + m[14];
            return out;
        };

        /**
         * Transforms the vec3 with a mat3.
         *
         * @param {vec3} out the receiving vector
         * @param {vec3} a the vector to transform
         * @param {mat4} m the 3x3 matrix to transform with
         * @returns {vec3} out
         */
        vec3.transformMat3 = function (out, a, m) {
            var x = a[0], y = a[1], z = a[2];
            out[0] = x * m[0] + y * m[3] + z * m[6];
            out[1] = x * m[1] + y * m[4] + z * m[7];
            out[2] = x * m[2] + y * m[5] + z * m[8];
            return out;
        };

        /**
         * Transforms the vec3 with a quat
         *
         * @param {vec3} out the receiving vector
         * @param {vec3} a the vector to transform
         * @param {quat} q quaternion to transform with
         * @returns {vec3} out
         */
        vec3.transformQuat = function (out, a, q) {
            // benchmarks: http://jsperf.com/quaternion-transform-vec3-implementations

            var x = a[0], y = a[1], z = a[2],
                qx = q[0], qy = q[1], qz = q[2], qw = q[3],

            // calculate quat * vec
                ix = qw * x + qy * z - qz * y,
                iy = qw * y + qz * x - qx * z,
                iz = qw * z + qx * y - qy * x,
                iw = -qx * x - qy * y - qz * z;

            // calculate result * inverse quat
            out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
            out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
            out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
            return out;
        };

        /*
         * Rotate a 3D vector around the x-axis
         * @param {vec3} out The receiving vec3
         * @param {vec3} a The vec3 point to rotate
         * @param {vec3} b The origin of the rotation
         * @param {Number} c The angle of rotation
         * @returns {vec3} out
         */
        vec3.rotateX = function (out, a, b, c) {
            var p = [], r = [];
            //Translate point to the origin
            p[0] = a[0] - b[0];
            p[1] = a[1] - b[1];
            p[2] = a[2] - b[2];

            //perform rotation
            r[0] = p[0];
            r[1] = p[1] * Math.cos(c) - p[2] * Math.sin(c);
            r[2] = p[1] * Math.sin(c) + p[2] * Math.cos(c);

            //translate to correct position
            out[0] = r[0] + b[0];
            out[1] = r[1] + b[1];
            out[2] = r[2] + b[2];

            return out;
        };

        /*
         * Rotate a 3D vector around the y-axis
         * @param {vec3} out The receiving vec3
         * @param {vec3} a The vec3 point to rotate
         * @param {vec3} b The origin of the rotation
         * @param {Number} c The angle of rotation
         * @returns {vec3} out
         */
        vec3.rotateY = function (out, a, b, c) {
            var p = [], r = [];
            //Translate point to the origin
            p[0] = a[0] - b[0];
            p[1] = a[1] - b[1];
            p[2] = a[2] - b[2];

            //perform rotation
            r[0] = p[2] * Math.sin(c) + p[0] * Math.cos(c);
            r[1] = p[1];
            r[2] = p[2] * Math.cos(c) - p[0] * Math.sin(c);

            //translate to correct position
            out[0] = r[0] + b[0];
            out[1] = r[1] + b[1];
            out[2] = r[2] + b[2];

            return out;
        };

        /*
         * Rotate a 3D vector around the z-axis
         * @param {vec3} out The receiving vec3
         * @param {vec3} a The vec3 point to rotate
         * @param {vec3} b The origin of the rotation
         * @param {Number} c The angle of rotation
         * @returns {vec3} out
         */
        vec3.rotateZ = function (out, a, b, c) {
            var p = [], r = [];
            //Translate point to the origin
            p[0] = a[0] - b[0];
            p[1] = a[1] - b[1];
            p[2] = a[2] - b[2];

            //perform rotation
            r[0] = p[0] * Math.cos(c) - p[1] * Math.sin(c);
            r[1] = p[0] * Math.sin(c) + p[1] * Math.cos(c);
            r[2] = p[2];

            //translate to correct position
            out[0] = r[0] + b[0];
            out[1] = r[1] + b[1];
            out[2] = r[2] + b[2];

            return out;
        };

        /**
         * Perform some operation over an array of vec3s.
         *
         * @param {Array} a the array of vectors to iterate over
         * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
         * @param {Number} offset Number of elements to skip at the beginning of the array
         * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
         * @param {Function} fn Function to call for each vector in the array
         * @param {Object} [arg] additional argument to pass to fn
         * @returns {Array} a
         * @function
         */
        vec3.forEach = (function () {
            var vec = vec3.create();

            return function (a, stride, offset, count, fn, arg) {
                var i, l;
                if (!stride) {
                    stride = 3;
                }

                if (!offset) {
                    offset = 0;
                }

                if (count) {
                    l = Math.min((count * stride) + offset, a.length);
                } else {
                    l = a.length;
                }

                for (i = offset; i < l; i += stride) {
                    vec[0] = a[i];
                    vec[1] = a[i + 1];
                    vec[2] = a[i + 2];
                    fn(vec, vec, arg);
                    a[i] = vec[0];
                    a[i + 1] = vec[1];
                    a[i + 2] = vec[2];
                }

                return a;
            };
        })();

        /**
         * Returns a string representation of a vector
         *
         * @param {vec3} vec vector to represent as a string
         * @returns {String} string representation of the vector
         */
        vec3.str = function (a) {
            return 'vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
        };

        if (typeof(exports) !== 'undefined') {
            exports.vec3 = vec3;
        }
        ;
        /* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

         Redistribution and use in source and binary forms, with or without modification,
         are permitted provided that the following conditions are met:

         * Redistributions of source code must retain the above copyright notice, this
         list of conditions and the following disclaimer.
         * Redistributions in binary form must reproduce the above copyright notice,
         this list of conditions and the following disclaimer in the documentation 
         and/or other materials provided with the distribution.

         THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
         ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
         WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
         DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
         ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
         (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
         LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
         ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
         (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
         SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

        /**
         * @class 4 Dimensional Vector
         * @name vec4
         */

        var vec4 = {};

        /**
         * Creates a new, empty vec4
         *
         * @returns {vec4} a new 4D vector
         */
        vec4.create = function () {
            var out = new GLMAT_ARRAY_TYPE(4);
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            return out;
        };

        /**
         * Creates a new vec4 initialized with values from an existing vector
         *
         * @param {vec4} a vector to clone
         * @returns {vec4} a new 4D vector
         */
        vec4.clone = function (a) {
            var out = new GLMAT_ARRAY_TYPE(4);
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            return out;
        };

        /**
         * Creates a new vec4 initialized with the given values
         *
         * @param {Number} x X component
         * @param {Number} y Y component
         * @param {Number} z Z component
         * @param {Number} w W component
         * @returns {vec4} a new 4D vector
         */
        vec4.fromValues = function (x, y, z, w) {
            var out = new GLMAT_ARRAY_TYPE(4);
            out[0] = x;
            out[1] = y;
            out[2] = z;
            out[3] = w;
            return out;
        };

        /**
         * Copy the values from one vec4 to another
         *
         * @param {vec4} out the receiving vector
         * @param {vec4} a the source vector
         * @returns {vec4} out
         */
        vec4.copy = function (out, a) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            return out;
        };

        /**
         * Set the components of a vec4 to the given values
         *
         * @param {vec4} out the receiving vector
         * @param {Number} x X component
         * @param {Number} y Y component
         * @param {Number} z Z component
         * @param {Number} w W component
         * @returns {vec4} out
         */
        vec4.set = function (out, x, y, z, w) {
            out[0] = x;
            out[1] = y;
            out[2] = z;
            out[3] = w;
            return out;
        };

        /**
         * Adds two vec4's
         *
         * @param {vec4} out the receiving vector
         * @param {vec4} a the first operand
         * @param {vec4} b the second operand
         * @returns {vec4} out
         */
        vec4.add = function (out, a, b) {
            out[0] = a[0] + b[0];
            out[1] = a[1] + b[1];
            out[2] = a[2] + b[2];
            out[3] = a[3] + b[3];
            return out;
        };

        /**
         * Subtracts vector b from vector a
         *
         * @param {vec4} out the receiving vector
         * @param {vec4} a the first operand
         * @param {vec4} b the second operand
         * @returns {vec4} out
         */
        vec4.subtract = function (out, a, b) {
            out[0] = a[0] - b[0];
            out[1] = a[1] - b[1];
            out[2] = a[2] - b[2];
            out[3] = a[3] - b[3];
            return out;
        };

        /**
         * Alias for {@link vec4.subtract}
         * @function
         */
        vec4.sub = vec4.subtract;

        /**
         * Multiplies two vec4's
         *
         * @param {vec4} out the receiving vector
         * @param {vec4} a the first operand
         * @param {vec4} b the second operand
         * @returns {vec4} out
         */
        vec4.multiply = function (out, a, b) {
            out[0] = a[0] * b[0];
            out[1] = a[1] * b[1];
            out[2] = a[2] * b[2];
            out[3] = a[3] * b[3];
            return out;
        };

        /**
         * Alias for {@link vec4.multiply}
         * @function
         */
        vec4.mul = vec4.multiply;

        /**
         * Divides two vec4's
         *
         * @param {vec4} out the receiving vector
         * @param {vec4} a the first operand
         * @param {vec4} b the second operand
         * @returns {vec4} out
         */
        vec4.divide = function (out, a, b) {
            out[0] = a[0] / b[0];
            out[1] = a[1] / b[1];
            out[2] = a[2] / b[2];
            out[3] = a[3] / b[3];
            return out;
        };

        /**
         * Alias for {@link vec4.divide}
         * @function
         */
        vec4.div = vec4.divide;

        /**
         * Returns the minimum of two vec4's
         *
         * @param {vec4} out the receiving vector
         * @param {vec4} a the first operand
         * @param {vec4} b the second operand
         * @returns {vec4} out
         */
        vec4.min = function (out, a, b) {
            out[0] = Math.min(a[0], b[0]);
            out[1] = Math.min(a[1], b[1]);
            out[2] = Math.min(a[2], b[2]);
            out[3] = Math.min(a[3], b[3]);
            return out;
        };

        /**
         * Returns the maximum of two vec4's
         *
         * @param {vec4} out the receiving vector
         * @param {vec4} a the first operand
         * @param {vec4} b the second operand
         * @returns {vec4} out
         */
        vec4.max = function (out, a, b) {
            out[0] = Math.max(a[0], b[0]);
            out[1] = Math.max(a[1], b[1]);
            out[2] = Math.max(a[2], b[2]);
            out[3] = Math.max(a[3], b[3]);
            return out;
        };

        /**
         * Scales a vec4 by a scalar number
         *
         * @param {vec4} out the receiving vector
         * @param {vec4} a the vector to scale
         * @param {Number} b amount to scale the vector by
         * @returns {vec4} out
         */
        vec4.scale = function (out, a, b) {
            out[0] = a[0] * b;
            out[1] = a[1] * b;
            out[2] = a[2] * b;
            out[3] = a[3] * b;
            return out;
        };

        /**
         * Adds two vec4's after scaling the second operand by a scalar value
         *
         * @param {vec4} out the receiving vector
         * @param {vec4} a the first operand
         * @param {vec4} b the second operand
         * @param {Number} scale the amount to scale b by before adding
         * @returns {vec4} out
         */
        vec4.scaleAndAdd = function (out, a, b, scale) {
            out[0] = a[0] + (b[0] * scale);
            out[1] = a[1] + (b[1] * scale);
            out[2] = a[2] + (b[2] * scale);
            out[3] = a[3] + (b[3] * scale);
            return out;
        };

        /**
         * Calculates the euclidian distance between two vec4's
         *
         * @param {vec4} a the first operand
         * @param {vec4} b the second operand
         * @returns {Number} distance between a and b
         */
        vec4.distance = function (a, b) {
            var x = b[0] - a[0],
                y = b[1] - a[1],
                z = b[2] - a[2],
                w = b[3] - a[3];
            return Math.sqrt(x * x + y * y + z * z + w * w);
        };

        /**
         * Alias for {@link vec4.distance}
         * @function
         */
        vec4.dist = vec4.distance;

        /**
         * Calculates the squared euclidian distance between two vec4's
         *
         * @param {vec4} a the first operand
         * @param {vec4} b the second operand
         * @returns {Number} squared distance between a and b
         */
        vec4.squaredDistance = function (a, b) {
            var x = b[0] - a[0],
                y = b[1] - a[1],
                z = b[2] - a[2],
                w = b[3] - a[3];
            return x * x + y * y + z * z + w * w;
        };

        /**
         * Alias for {@link vec4.squaredDistance}
         * @function
         */
        vec4.sqrDist = vec4.squaredDistance;

        /**
         * Calculates the length of a vec4
         *
         * @param {vec4} a vector to calculate length of
         * @returns {Number} length of a
         */
        vec4.length = function (a) {
            var x = a[0],
                y = a[1],
                z = a[2],
                w = a[3];
            return Math.sqrt(x * x + y * y + z * z + w * w);
        };

        /**
         * Alias for {@link vec4.length}
         * @function
         */
        vec4.len = vec4.length;

        /**
         * Calculates the squared length of a vec4
         *
         * @param {vec4} a vector to calculate squared length of
         * @returns {Number} squared length of a
         */
        vec4.squaredLength = function (a) {
            var x = a[0],
                y = a[1],
                z = a[2],
                w = a[3];
            return x * x + y * y + z * z + w * w;
        };

        /**
         * Alias for {@link vec4.squaredLength}
         * @function
         */
        vec4.sqrLen = vec4.squaredLength;

        /**
         * Negates the components of a vec4
         *
         * @param {vec4} out the receiving vector
         * @param {vec4} a vector to negate
         * @returns {vec4} out
         */
        vec4.negate = function (out, a) {
            out[0] = -a[0];
            out[1] = -a[1];
            out[2] = -a[2];
            out[3] = -a[3];
            return out;
        };

        /**
         * Normalize a vec4
         *
         * @param {vec4} out the receiving vector
         * @param {vec4} a vector to normalize
         * @returns {vec4} out
         */
        vec4.normalize = function (out, a) {
            var x = a[0],
                y = a[1],
                z = a[2],
                w = a[3];
            var len = x * x + y * y + z * z + w * w;
            if (len > 0) {
                len = 1 / Math.sqrt(len);
                out[0] = a[0] * len;
                out[1] = a[1] * len;
                out[2] = a[2] * len;
                out[3] = a[3] * len;
            }
            return out;
        };

        /**
         * Calculates the dot product of two vec4's
         *
         * @param {vec4} a the first operand
         * @param {vec4} b the second operand
         * @returns {Number} dot product of a and b
         */
        vec4.dot = function (a, b) {
            return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
        };

        /**
         * Performs a linear interpolation between two vec4's
         *
         * @param {vec4} out the receiving vector
         * @param {vec4} a the first operand
         * @param {vec4} b the second operand
         * @param {Number} t interpolation amount between the two inputs
         * @returns {vec4} out
         */
        vec4.lerp = function (out, a, b, t) {
            var ax = a[0],
                ay = a[1],
                az = a[2],
                aw = a[3];
            out[0] = ax + t * (b[0] - ax);
            out[1] = ay + t * (b[1] - ay);
            out[2] = az + t * (b[2] - az);
            out[3] = aw + t * (b[3] - aw);
            return out;
        };

        /**
         * Generates a random vector with the given scale
         *
         * @param {vec4} out the receiving vector
         * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
         * @returns {vec4} out
         */
        vec4.random = function (out, scale) {
            scale = scale || 1.0;

            //TODO: This is a pretty awful way of doing this. Find something better.
            out[0] = GLMAT_RANDOM();
            out[1] = GLMAT_RANDOM();
            out[2] = GLMAT_RANDOM();
            out[3] = GLMAT_RANDOM();
            vec4.normalize(out, out);
            vec4.scale(out, out, scale);
            return out;
        };

        /**
         * Transforms the vec4 with a mat4.
         *
         * @param {vec4} out the receiving vector
         * @param {vec4} a the vector to transform
         * @param {mat4} m matrix to transform with
         * @returns {vec4} out
         */
        vec4.transformMat4 = function (out, a, m) {
            var x = a[0], y = a[1], z = a[2], w = a[3];
            out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
            out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
            out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
            out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
            return out;
        };

        /**
         * Transforms the vec4 with a quat
         *
         * @param {vec4} out the receiving vector
         * @param {vec4} a the vector to transform
         * @param {quat} q quaternion to transform with
         * @returns {vec4} out
         */
        vec4.transformQuat = function (out, a, q) {
            var x = a[0], y = a[1], z = a[2],
                qx = q[0], qy = q[1], qz = q[2], qw = q[3],

            // calculate quat * vec
                ix = qw * x + qy * z - qz * y,
                iy = qw * y + qz * x - qx * z,
                iz = qw * z + qx * y - qy * x,
                iw = -qx * x - qy * y - qz * z;

            // calculate result * inverse quat
            out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
            out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
            out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
            return out;
        };

        /**
         * Perform some operation over an array of vec4s.
         *
         * @param {Array} a the array of vectors to iterate over
         * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
         * @param {Number} offset Number of elements to skip at the beginning of the array
         * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
         * @param {Function} fn Function to call for each vector in the array
         * @param {Object} [arg] additional argument to pass to fn
         * @returns {Array} a
         * @function
         */
        vec4.forEach = (function () {
            var vec = vec4.create();

            return function (a, stride, offset, count, fn, arg) {
                var i, l;
                if (!stride) {
                    stride = 4;
                }

                if (!offset) {
                    offset = 0;
                }

                if (count) {
                    l = Math.min((count * stride) + offset, a.length);
                } else {
                    l = a.length;
                }

                for (i = offset; i < l; i += stride) {
                    vec[0] = a[i];
                    vec[1] = a[i + 1];
                    vec[2] = a[i + 2];
                    vec[3] = a[i + 3];
                    fn(vec, vec, arg);
                    a[i] = vec[0];
                    a[i + 1] = vec[1];
                    a[i + 2] = vec[2];
                    a[i + 3] = vec[3];
                }

                return a;
            };
        })();

        /**
         * Returns a string representation of a vector
         *
         * @param {vec4} vec vector to represent as a string
         * @returns {String} string representation of the vector
         */
        vec4.str = function (a) {
            return 'vec4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
        };

        if (typeof(exports) !== 'undefined') {
            exports.vec4 = vec4;
        }
        ;
        /* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

         Redistribution and use in source and binary forms, with or without modification,
         are permitted provided that the following conditions are met:

         * Redistributions of source code must retain the above copyright notice, this
         list of conditions and the following disclaimer.
         * Redistributions in binary form must reproduce the above copyright notice,
         this list of conditions and the following disclaimer in the documentation 
         and/or other materials provided with the distribution.

         THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
         ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
         WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
         DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
         ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
         (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
         LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
         ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
         (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
         SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

        /**
         * @class 2x2 Matrix
         * @name mat2
         */

        var mat2 = {};

        /**
         * Creates a new identity mat2
         *
         * @returns {mat2} a new 2x2 matrix
         */
        mat2.create = function () {
            var out = new GLMAT_ARRAY_TYPE(4);
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            return out;
        };

        /**
         * Creates a new mat2 initialized with values from an existing matrix
         *
         * @param {mat2} a matrix to clone
         * @returns {mat2} a new 2x2 matrix
         */
        mat2.clone = function (a) {
            var out = new GLMAT_ARRAY_TYPE(4);
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            return out;
        };

        /**
         * Copy the values from one mat2 to another
         *
         * @param {mat2} out the receiving matrix
         * @param {mat2} a the source matrix
         * @returns {mat2} out
         */
        mat2.copy = function (out, a) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            return out;
        };

        /**
         * Set a mat2 to the identity matrix
         *
         * @param {mat2} out the receiving matrix
         * @returns {mat2} out
         */
        mat2.identity = function (out) {
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            return out;
        };

        /**
         * Transpose the values of a mat2
         *
         * @param {mat2} out the receiving matrix
         * @param {mat2} a the source matrix
         * @returns {mat2} out
         */
        mat2.transpose = function (out, a) {
            // If we are transposing ourselves we can skip a few steps but have to cache some values
            if (out === a) {
                var a1 = a[1];
                out[1] = a[2];
                out[2] = a1;
            } else {
                out[0] = a[0];
                out[1] = a[2];
                out[2] = a[1];
                out[3] = a[3];
            }

            return out;
        };

        /**
         * Inverts a mat2
         *
         * @param {mat2} out the receiving matrix
         * @param {mat2} a the source matrix
         * @returns {mat2} out
         */
        mat2.invert = function (out, a) {
            var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],

            // Calculate the determinant
                det = a0 * a3 - a2 * a1;

            if (!det) {
                return null;
            }
            det = 1.0 / det;

            out[0] = a3 * det;
            out[1] = -a1 * det;
            out[2] = -a2 * det;
            out[3] = a0 * det;

            return out;
        };

        /**
         * Calculates the adjugate of a mat2
         *
         * @param {mat2} out the receiving matrix
         * @param {mat2} a the source matrix
         * @returns {mat2} out
         */
        mat2.adjoint = function (out, a) {
            // Caching this value is nessecary if out == a
            var a0 = a[0];
            out[0] = a[3];
            out[1] = -a[1];
            out[2] = -a[2];
            out[3] = a0;

            return out;
        };

        /**
         * Calculates the determinant of a mat2
         *
         * @param {mat2} a the source matrix
         * @returns {Number} determinant of a
         */
        mat2.determinant = function (a) {
            return a[0] * a[3] - a[2] * a[1];
        };

        /**
         * Multiplies two mat2's
         *
         * @param {mat2} out the receiving matrix
         * @param {mat2} a the first operand
         * @param {mat2} b the second operand
         * @returns {mat2} out
         */
        mat2.multiply = function (out, a, b) {
            var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
            var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
            out[0] = a0 * b0 + a2 * b1;
            out[1] = a1 * b0 + a3 * b1;
            out[2] = a0 * b2 + a2 * b3;
            out[3] = a1 * b2 + a3 * b3;
            return out;
        };

        /**
         * Alias for {@link mat2.multiply}
         * @function
         */
        mat2.mul = mat2.multiply;

        /**
         * Rotates a mat2 by the given angle
         *
         * @param {mat2} out the receiving matrix
         * @param {mat2} a the matrix to rotate
         * @param {Number} rad the angle to rotate the matrix by
         * @returns {mat2} out
         */
        mat2.rotate = function (out, a, rad) {
            var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
                s = Math.sin(rad),
                c = Math.cos(rad);
            out[0] = a0 * c + a2 * s;
            out[1] = a1 * c + a3 * s;
            out[2] = a0 * -s + a2 * c;
            out[3] = a1 * -s + a3 * c;
            return out;
        };

        /**
         * Scales the mat2 by the dimensions in the given vec2
         *
         * @param {mat2} out the receiving matrix
         * @param {mat2} a the matrix to rotate
         * @param {vec2} v the vec2 to scale the matrix by
         * @returns {mat2} out
         **/
        mat2.scale = function (out, a, v) {
            var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
                v0 = v[0], v1 = v[1];
            out[0] = a0 * v0;
            out[1] = a1 * v0;
            out[2] = a2 * v1;
            out[3] = a3 * v1;
            return out;
        };

        /**
         * Returns a string representation of a mat2
         *
         * @param {mat2} mat matrix to represent as a string
         * @returns {String} string representation of the matrix
         */
        mat2.str = function (a) {
            return 'mat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
        };

        /**
         * Returns Frobenius norm of a mat2
         *
         * @param {mat2} a the matrix to calculate Frobenius norm of
         * @returns {Number} Frobenius norm
         */
        mat2.frob = function (a) {
            return (Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2)))
        };

        /**
         * Returns L, D and U matrices (Lower triangular, Diagonal and Upper triangular) by factorizing the input matrix
         * @param {mat2} L the lower triangular matrix
         * @param {mat2} D the diagonal matrix
         * @param {mat2} U the upper triangular matrix
         * @param {mat2} a the input matrix to factorize
         */

        mat2.LDU = function (L, D, U, a) {
            L[2] = a[2] / a[0];
            U[0] = a[0];
            U[1] = a[1];
            U[3] = a[3] - L[2] * U[1];
            return [L, D, U];
        };

        if (typeof(exports) !== 'undefined') {
            exports.mat2 = mat2;
        }
        ;
        /* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

         Redistribution and use in source and binary forms, with or without modification,
         are permitted provided that the following conditions are met:

         * Redistributions of source code must retain the above copyright notice, this
         list of conditions and the following disclaimer.
         * Redistributions in binary form must reproduce the above copyright notice,
         this list of conditions and the following disclaimer in the documentation 
         and/or other materials provided with the distribution.

         THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
         ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
         WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
         DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
         ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
         (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
         LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
         ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
         (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
         SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

        /**
         * @class 2x3 Matrix
         * @name mat2d
         *
         * @description
         * A mat2d contains six elements defined as:
         * <pre>
         * [a, c, tx,
         *  b, d, ty]
         * </pre>
         * This is a short form for the 3x3 matrix:
         * <pre>
         * [a, c, tx,
         *  b, d, ty,
         *  0, 0, 1]
         * </pre>
         * The last row is ignored so the array is shorter and operations are faster.
         */

        var mat2d = {};

        /**
         * Creates a new identity mat2d
         *
         * @returns {mat2d} a new 2x3 matrix
         */
        mat2d.create = function () {
            var out = new GLMAT_ARRAY_TYPE(6);
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            out[4] = 0;
            out[5] = 0;
            return out;
        };

        /**
         * Creates a new mat2d initialized with values from an existing matrix
         *
         * @param {mat2d} a matrix to clone
         * @returns {mat2d} a new 2x3 matrix
         */
        mat2d.clone = function (a) {
            var out = new GLMAT_ARRAY_TYPE(6);
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            out[4] = a[4];
            out[5] = a[5];
            return out;
        };

        /**
         * Copy the values from one mat2d to another
         *
         * @param {mat2d} out the receiving matrix
         * @param {mat2d} a the source matrix
         * @returns {mat2d} out
         */
        mat2d.copy = function (out, a) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            out[4] = a[4];
            out[5] = a[5];
            return out;
        };

        /**
         * Set a mat2d to the identity matrix
         *
         * @param {mat2d} out the receiving matrix
         * @returns {mat2d} out
         */
        mat2d.identity = function (out) {
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            out[4] = 0;
            out[5] = 0;
            return out;
        };

        /**
         * Inverts a mat2d
         *
         * @param {mat2d} out the receiving matrix
         * @param {mat2d} a the source matrix
         * @returns {mat2d} out
         */
        mat2d.invert = function (out, a) {
            var aa = a[0], ab = a[1], ac = a[2], ad = a[3],
                atx = a[4], aty = a[5];

            var det = aa * ad - ab * ac;
            if (!det) {
                return null;
            }
            det = 1.0 / det;

            out[0] = ad * det;
            out[1] = -ab * det;
            out[2] = -ac * det;
            out[3] = aa * det;
            out[4] = (ac * aty - ad * atx) * det;
            out[5] = (ab * atx - aa * aty) * det;
            return out;
        };

        /**
         * Calculates the determinant of a mat2d
         *
         * @param {mat2d} a the source matrix
         * @returns {Number} determinant of a
         */
        mat2d.determinant = function (a) {
            return a[0] * a[3] - a[1] * a[2];
        };

        /**
         * Multiplies two mat2d's
         *
         * @param {mat2d} out the receiving matrix
         * @param {mat2d} a the first operand
         * @param {mat2d} b the second operand
         * @returns {mat2d} out
         */
        mat2d.multiply = function (out, a, b) {
            var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
                b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
            out[0] = a0 * b0 + a2 * b1;
            out[1] = a1 * b0 + a3 * b1;
            out[2] = a0 * b2 + a2 * b3;
            out[3] = a1 * b2 + a3 * b3;
            out[4] = a0 * b4 + a2 * b5 + a4;
            out[5] = a1 * b4 + a3 * b5 + a5;
            return out;
        };

        /**
         * Alias for {@link mat2d.multiply}
         * @function
         */
        mat2d.mul = mat2d.multiply;


        /**
         * Rotates a mat2d by the given angle
         *
         * @param {mat2d} out the receiving matrix
         * @param {mat2d} a the matrix to rotate
         * @param {Number} rad the angle to rotate the matrix by
         * @returns {mat2d} out
         */
        mat2d.rotate = function (out, a, rad) {
            var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
                s = Math.sin(rad),
                c = Math.cos(rad);
            out[0] = a0 * c + a2 * s;
            out[1] = a1 * c + a3 * s;
            out[2] = a0 * -s + a2 * c;
            out[3] = a1 * -s + a3 * c;
            out[4] = a4;
            out[5] = a5;
            return out;
        };

        /**
         * Scales the mat2d by the dimensions in the given vec2
         *
         * @param {mat2d} out the receiving matrix
         * @param {mat2d} a the matrix to translate
         * @param {vec2} v the vec2 to scale the matrix by
         * @returns {mat2d} out
         **/
        mat2d.scale = function (out, a, v) {
            var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
                v0 = v[0], v1 = v[1];
            out[0] = a0 * v0;
            out[1] = a1 * v0;
            out[2] = a2 * v1;
            out[3] = a3 * v1;
            out[4] = a4;
            out[5] = a5;
            return out;
        };

        /**
         * Translates the mat2d by the dimensions in the given vec2
         *
         * @param {mat2d} out the receiving matrix
         * @param {mat2d} a the matrix to translate
         * @param {vec2} v the vec2 to translate the matrix by
         * @returns {mat2d} out
         **/
        mat2d.translate = function (out, a, v) {
            var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
                v0 = v[0], v1 = v[1];
            out[0] = a0;
            out[1] = a1;
            out[2] = a2;
            out[3] = a3;
            out[4] = a0 * v0 + a2 * v1 + a4;
            out[5] = a1 * v0 + a3 * v1 + a5;
            return out;
        };

        /**
         * Returns a string representation of a mat2d
         *
         * @param {mat2d} a matrix to represent as a string
         * @returns {String} string representation of the matrix
         */
        mat2d.str = function (a) {
            return 'mat2d(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' +
                a[3] + ', ' + a[4] + ', ' + a[5] + ')';
        };

        /**
         * Returns Frobenius norm of a mat2d
         *
         * @param {mat2d} a the matrix to calculate Frobenius norm of
         * @returns {Number} Frobenius norm
         */
        mat2d.frob = function (a) {
            return (Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + 1))
        };

        if (typeof(exports) !== 'undefined') {
            exports.mat2d = mat2d;
        }
        ;
        /* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

         Redistribution and use in source and binary forms, with or without modification,
         are permitted provided that the following conditions are met:

         * Redistributions of source code must retain the above copyright notice, this
         list of conditions and the following disclaimer.
         * Redistributions in binary form must reproduce the above copyright notice,
         this list of conditions and the following disclaimer in the documentation 
         and/or other materials provided with the distribution.

         THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
         ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
         WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
         DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
         ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
         (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
         LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
         ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
         (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
         SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

        /**
         * @class 3x3 Matrix
         * @name mat3
         */

        var mat3 = {};

        /**
         * Creates a new identity mat3
         *
         * @returns {mat3} a new 3x3 matrix
         */
        mat3.create = function () {
            var out = new GLMAT_ARRAY_TYPE(9);
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 1;
            out[5] = 0;
            out[6] = 0;
            out[7] = 0;
            out[8] = 1;
            return out;
        };

        /**
         * Copies the upper-left 3x3 values into the given mat3.
         *
         * @param {mat3} out the receiving 3x3 matrix
         * @param {mat4} a   the source 4x4 matrix
         * @returns {mat3} out
         */
        mat3.fromMat4 = function (out, a) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[4];
            out[4] = a[5];
            out[5] = a[6];
            out[6] = a[8];
            out[7] = a[9];
            out[8] = a[10];
            return out;
        };

        /**
         * Creates a new mat3 initialized with values from an existing matrix
         *
         * @param {mat3} a matrix to clone
         * @returns {mat3} a new 3x3 matrix
         */
        mat3.clone = function (a) {
            var out = new GLMAT_ARRAY_TYPE(9);
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            out[4] = a[4];
            out[5] = a[5];
            out[6] = a[6];
            out[7] = a[7];
            out[8] = a[8];
            return out;
        };

        /**
         * Copy the values from one mat3 to another
         *
         * @param {mat3} out the receiving matrix
         * @param {mat3} a the source matrix
         * @returns {mat3} out
         */
        mat3.copy = function (out, a) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            out[4] = a[4];
            out[5] = a[5];
            out[6] = a[6];
            out[7] = a[7];
            out[8] = a[8];
            return out;
        };

        /**
         * Set a mat3 to the identity matrix
         *
         * @param {mat3} out the receiving matrix
         * @returns {mat3} out
         */
        mat3.identity = function (out) {
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 1;
            out[5] = 0;
            out[6] = 0;
            out[7] = 0;
            out[8] = 1;
            return out;
        };

        /**
         * Transpose the values of a mat3
         *
         * @param {mat3} out the receiving matrix
         * @param {mat3} a the source matrix
         * @returns {mat3} out
         */
        mat3.transpose = function (out, a) {
            // If we are transposing ourselves we can skip a few steps but have to cache some values
            if (out === a) {
                var a01 = a[1], a02 = a[2], a12 = a[5];
                out[1] = a[3];
                out[2] = a[6];
                out[3] = a01;
                out[5] = a[7];
                out[6] = a02;
                out[7] = a12;
            } else {
                out[0] = a[0];
                out[1] = a[3];
                out[2] = a[6];
                out[3] = a[1];
                out[4] = a[4];
                out[5] = a[7];
                out[6] = a[2];
                out[7] = a[5];
                out[8] = a[8];
            }

            return out;
        };

        /**
         * Inverts a mat3
         *
         * @param {mat3} out the receiving matrix
         * @param {mat3} a the source matrix
         * @returns {mat3} out
         */
        mat3.invert = function (out, a) {
            var a00 = a[0], a01 = a[1], a02 = a[2],
                a10 = a[3], a11 = a[4], a12 = a[5],
                a20 = a[6], a21 = a[7], a22 = a[8],

                b01 = a22 * a11 - a12 * a21,
                b11 = -a22 * a10 + a12 * a20,
                b21 = a21 * a10 - a11 * a20,

            // Calculate the determinant
                det = a00 * b01 + a01 * b11 + a02 * b21;

            if (!det) {
                return null;
            }
            det = 1.0 / det;

            out[0] = b01 * det;
            out[1] = (-a22 * a01 + a02 * a21) * det;
            out[2] = (a12 * a01 - a02 * a11) * det;
            out[3] = b11 * det;
            out[4] = (a22 * a00 - a02 * a20) * det;
            out[5] = (-a12 * a00 + a02 * a10) * det;
            out[6] = b21 * det;
            out[7] = (-a21 * a00 + a01 * a20) * det;
            out[8] = (a11 * a00 - a01 * a10) * det;
            return out;
        };

        /**
         * Calculates the adjugate of a mat3
         *
         * @param {mat3} out the receiving matrix
         * @param {mat3} a the source matrix
         * @returns {mat3} out
         */
        mat3.adjoint = function (out, a) {
            var a00 = a[0], a01 = a[1], a02 = a[2],
                a10 = a[3], a11 = a[4], a12 = a[5],
                a20 = a[6], a21 = a[7], a22 = a[8];

            out[0] = (a11 * a22 - a12 * a21);
            out[1] = (a02 * a21 - a01 * a22);
            out[2] = (a01 * a12 - a02 * a11);
            out[3] = (a12 * a20 - a10 * a22);
            out[4] = (a00 * a22 - a02 * a20);
            out[5] = (a02 * a10 - a00 * a12);
            out[6] = (a10 * a21 - a11 * a20);
            out[7] = (a01 * a20 - a00 * a21);
            out[8] = (a00 * a11 - a01 * a10);
            return out;
        };

        /**
         * Calculates the determinant of a mat3
         *
         * @param {mat3} a the source matrix
         * @returns {Number} determinant of a
         */
        mat3.determinant = function (a) {
            var a00 = a[0], a01 = a[1], a02 = a[2],
                a10 = a[3], a11 = a[4], a12 = a[5],
                a20 = a[6], a21 = a[7], a22 = a[8];

            return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
        };

        /**
         * Multiplies two mat3's
         *
         * @param {mat3} out the receiving matrix
         * @param {mat3} a the first operand
         * @param {mat3} b the second operand
         * @returns {mat3} out
         */
        mat3.multiply = function (out, a, b) {
            var a00 = a[0], a01 = a[1], a02 = a[2],
                a10 = a[3], a11 = a[4], a12 = a[5],
                a20 = a[6], a21 = a[7], a22 = a[8],

                b00 = b[0], b01 = b[1], b02 = b[2],
                b10 = b[3], b11 = b[4], b12 = b[5],
                b20 = b[6], b21 = b[7], b22 = b[8];

            out[0] = b00 * a00 + b01 * a10 + b02 * a20;
            out[1] = b00 * a01 + b01 * a11 + b02 * a21;
            out[2] = b00 * a02 + b01 * a12 + b02 * a22;

            out[3] = b10 * a00 + b11 * a10 + b12 * a20;
            out[4] = b10 * a01 + b11 * a11 + b12 * a21;
            out[5] = b10 * a02 + b11 * a12 + b12 * a22;

            out[6] = b20 * a00 + b21 * a10 + b22 * a20;
            out[7] = b20 * a01 + b21 * a11 + b22 * a21;
            out[8] = b20 * a02 + b21 * a12 + b22 * a22;
            return out;
        };

        /**
         * Alias for {@link mat3.multiply}
         * @function
         */
        mat3.mul = mat3.multiply;

        /**
         * Translate a mat3 by the given vector
         *
         * @param {mat3} out the receiving matrix
         * @param {mat3} a the matrix to translate
         * @param {vec2} v vector to translate by
         * @returns {mat3} out
         */
        mat3.translate = function (out, a, v) {
            var a00 = a[0], a01 = a[1], a02 = a[2],
                a10 = a[3], a11 = a[4], a12 = a[5],
                a20 = a[6], a21 = a[7], a22 = a[8],
                x = v[0], y = v[1];

            out[0] = a00;
            out[1] = a01;
            out[2] = a02;

            out[3] = a10;
            out[4] = a11;
            out[5] = a12;

            out[6] = x * a00 + y * a10 + a20;
            out[7] = x * a01 + y * a11 + a21;
            out[8] = x * a02 + y * a12 + a22;
            return out;
        };

        /**
         * Rotates a mat3 by the given angle
         *
         * @param {mat3} out the receiving matrix
         * @param {mat3} a the matrix to rotate
         * @param {Number} rad the angle to rotate the matrix by
         * @returns {mat3} out
         */
        mat3.rotate = function (out, a, rad) {
            var a00 = a[0], a01 = a[1], a02 = a[2],
                a10 = a[3], a11 = a[4], a12 = a[5],
                a20 = a[6], a21 = a[7], a22 = a[8],

                s = Math.sin(rad),
                c = Math.cos(rad);

            out[0] = c * a00 + s * a10;
            out[1] = c * a01 + s * a11;
            out[2] = c * a02 + s * a12;

            out[3] = c * a10 - s * a00;
            out[4] = c * a11 - s * a01;
            out[5] = c * a12 - s * a02;

            out[6] = a20;
            out[7] = a21;
            out[8] = a22;
            return out;
        };

        /**
         * Scales the mat3 by the dimensions in the given vec2
         *
         * @param {mat3} out the receiving matrix
         * @param {mat3} a the matrix to rotate
         * @param {vec2} v the vec2 to scale the matrix by
         * @returns {mat3} out
         **/
        mat3.scale = function (out, a, v) {
            var x = v[0], y = v[1];

            out[0] = x * a[0];
            out[1] = x * a[1];
            out[2] = x * a[2];

            out[3] = y * a[3];
            out[4] = y * a[4];
            out[5] = y * a[5];

            out[6] = a[6];
            out[7] = a[7];
            out[8] = a[8];
            return out;
        };

        /**
         * Copies the values from a mat2d into a mat3
         *
         * @param {mat3} out the receiving matrix
         * @param {mat2d} a the matrix to copy
         * @returns {mat3} out
         **/
        mat3.fromMat2d = function (out, a) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = 0;

            out[3] = a[2];
            out[4] = a[3];
            out[5] = 0;

            out[6] = a[4];
            out[7] = a[5];
            out[8] = 1;
            return out;
        };

        /**
         * Calculates a 3x3 matrix from the given quaternion
         *
         * @param {mat3} out mat3 receiving operation result
         * @param {quat} q Quaternion to create matrix from
         *
         * @returns {mat3} out
         */
        mat3.fromQuat = function (out, q) {
            var x = q[0], y = q[1], z = q[2], w = q[3],
                x2 = x + x,
                y2 = y + y,
                z2 = z + z,

                xx = x * x2,
                yx = y * x2,
                yy = y * y2,
                zx = z * x2,
                zy = z * y2,
                zz = z * z2,
                wx = w * x2,
                wy = w * y2,
                wz = w * z2;

            out[0] = 1 - yy - zz;
            out[3] = yx - wz;
            out[6] = zx + wy;

            out[1] = yx + wz;
            out[4] = 1 - xx - zz;
            out[7] = zy - wx;

            out[2] = zx - wy;
            out[5] = zy + wx;
            out[8] = 1 - xx - yy;

            return out;
        };

        /**
         * Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
         *
         * @param {mat3} out mat3 receiving operation result
         * @param {mat4} a Mat4 to derive the normal matrix from
         *
         * @returns {mat3} out
         */
        mat3.normalFromMat4 = function (out, a) {
            var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
                a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
                a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
                a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

                b00 = a00 * a11 - a01 * a10,
                b01 = a00 * a12 - a02 * a10,
                b02 = a00 * a13 - a03 * a10,
                b03 = a01 * a12 - a02 * a11,
                b04 = a01 * a13 - a03 * a11,
                b05 = a02 * a13 - a03 * a12,
                b06 = a20 * a31 - a21 * a30,
                b07 = a20 * a32 - a22 * a30,
                b08 = a20 * a33 - a23 * a30,
                b09 = a21 * a32 - a22 * a31,
                b10 = a21 * a33 - a23 * a31,
                b11 = a22 * a33 - a23 * a32,

            // Calculate the determinant
                det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

            if (!det) {
                return null;
            }
            det = 1.0 / det;

            out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
            out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
            out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

            out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
            out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
            out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

            out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
            out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
            out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

            return out;
        };

        /**
         * Returns a string representation of a mat3
         *
         * @param {mat3} mat matrix to represent as a string
         * @returns {String} string representation of the matrix
         */
        mat3.str = function (a) {
            return 'mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' +
                a[3] + ', ' + a[4] + ', ' + a[5] + ', ' +
                a[6] + ', ' + a[7] + ', ' + a[8] + ')';
        };

        /**
         * Returns Frobenius norm of a mat3
         *
         * @param {mat3} a the matrix to calculate Frobenius norm of
         * @returns {Number} Frobenius norm
         */
        mat3.frob = function (a) {
            return (Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2)))
        };


        if (typeof(exports) !== 'undefined') {
            exports.mat3 = mat3;
        }
        ;
        /* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

         Redistribution and use in source and binary forms, with or without modification,
         are permitted provided that the following conditions are met:

         * Redistributions of source code must retain the above copyright notice, this
         list of conditions and the following disclaimer.
         * Redistributions in binary form must reproduce the above copyright notice,
         this list of conditions and the following disclaimer in the documentation 
         and/or other materials provided with the distribution.

         THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
         ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
         WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
         DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
         ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
         (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
         LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
         ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
         (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
         SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

        /**
         * @class 4x4 Matrix
         * @name mat4
         */

        var mat4 = {};

        /**
         * Creates a new identity mat4
         *
         * @returns {mat4} a new 4x4 matrix
         */
        mat4.create = function () {
            var out = new GLMAT_ARRAY_TYPE(16);
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = 1;
            out[6] = 0;
            out[7] = 0;
            out[8] = 0;
            out[9] = 0;
            out[10] = 1;
            out[11] = 0;
            out[12] = 0;
            out[13] = 0;
            out[14] = 0;
            out[15] = 1;
            return out;
        };

        /**
         * Creates a new mat4 initialized with values from an existing matrix
         *
         * @param {mat4} a matrix to clone
         * @returns {mat4} a new 4x4 matrix
         */
        mat4.clone = function (a) {
            var out = new GLMAT_ARRAY_TYPE(16);
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            out[4] = a[4];
            out[5] = a[5];
            out[6] = a[6];
            out[7] = a[7];
            out[8] = a[8];
            out[9] = a[9];
            out[10] = a[10];
            out[11] = a[11];
            out[12] = a[12];
            out[13] = a[13];
            out[14] = a[14];
            out[15] = a[15];
            return out;
        };

        /**
         * Copy the values from one mat4 to another
         *
         * @param {mat4} out the receiving matrix
         * @param {mat4} a the source matrix
         * @returns {mat4} out
         */
        mat4.copy = function (out, a) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            out[4] = a[4];
            out[5] = a[5];
            out[6] = a[6];
            out[7] = a[7];
            out[8] = a[8];
            out[9] = a[9];
            out[10] = a[10];
            out[11] = a[11];
            out[12] = a[12];
            out[13] = a[13];
            out[14] = a[14];
            out[15] = a[15];
            return out;
        };

        /**
         * Set a mat4 to the identity matrix
         *
         * @param {mat4} out the receiving matrix
         * @returns {mat4} out
         */
        mat4.identity = function (out) {
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = 1;
            out[6] = 0;
            out[7] = 0;
            out[8] = 0;
            out[9] = 0;
            out[10] = 1;
            out[11] = 0;
            out[12] = 0;
            out[13] = 0;
            out[14] = 0;
            out[15] = 1;
            return out;
        };

        /**
         * Transpose the values of a mat4
         *
         * @param {mat4} out the receiving matrix
         * @param {mat4} a the source matrix
         * @returns {mat4} out
         */
        mat4.transpose = function (out, a) {
            // If we are transposing ourselves we can skip a few steps but have to cache some values
            if (out === a) {
                var a01 = a[1], a02 = a[2], a03 = a[3],
                    a12 = a[6], a13 = a[7],
                    a23 = a[11];

                out[1] = a[4];
                out[2] = a[8];
                out[3] = a[12];
                out[4] = a01;
                out[6] = a[9];
                out[7] = a[13];
                out[8] = a02;
                out[9] = a12;
                out[11] = a[14];
                out[12] = a03;
                out[13] = a13;
                out[14] = a23;
            } else {
                out[0] = a[0];
                out[1] = a[4];
                out[2] = a[8];
                out[3] = a[12];
                out[4] = a[1];
                out[5] = a[5];
                out[6] = a[9];
                out[7] = a[13];
                out[8] = a[2];
                out[9] = a[6];
                out[10] = a[10];
                out[11] = a[14];
                out[12] = a[3];
                out[13] = a[7];
                out[14] = a[11];
                out[15] = a[15];
            }

            return out;
        };

        /**
         * Inverts a mat4
         *
         * @param {mat4} out the receiving matrix
         * @param {mat4} a the source matrix
         * @returns {mat4} out
         */
        mat4.invert = function (out, a) {
            var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
                a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
                a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
                a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

                b00 = a00 * a11 - a01 * a10,
                b01 = a00 * a12 - a02 * a10,
                b02 = a00 * a13 - a03 * a10,
                b03 = a01 * a12 - a02 * a11,
                b04 = a01 * a13 - a03 * a11,
                b05 = a02 * a13 - a03 * a12,
                b06 = a20 * a31 - a21 * a30,
                b07 = a20 * a32 - a22 * a30,
                b08 = a20 * a33 - a23 * a30,
                b09 = a21 * a32 - a22 * a31,
                b10 = a21 * a33 - a23 * a31,
                b11 = a22 * a33 - a23 * a32,

            // Calculate the determinant
                det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

            if (!det) {
                return null;
            }
            det = 1.0 / det;

            out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
            out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
            out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
            out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
            out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
            out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
            out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
            out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
            out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
            out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
            out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
            out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
            out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
            out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
            out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
            out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

            return out;
        };

        /**
         * Calculates the adjugate of a mat4
         *
         * @param {mat4} out the receiving matrix
         * @param {mat4} a the source matrix
         * @returns {mat4} out
         */
        mat4.adjoint = function (out, a) {
            var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
                a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
                a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
                a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

            out[0] = (a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22));
            out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
            out[2] = (a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12));
            out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
            out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
            out[5] = (a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22));
            out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
            out[7] = (a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12));
            out[8] = (a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21));
            out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
            out[10] = (a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11));
            out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
            out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
            out[13] = (a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21));
            out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
            out[15] = (a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11));
            return out;
        };

        /**
         * Calculates the determinant of a mat4
         *
         * @param {mat4} a the source matrix
         * @returns {Number} determinant of a
         */
        mat4.determinant = function (a) {
            var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
                a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
                a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
                a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

                b00 = a00 * a11 - a01 * a10,
                b01 = a00 * a12 - a02 * a10,
                b02 = a00 * a13 - a03 * a10,
                b03 = a01 * a12 - a02 * a11,
                b04 = a01 * a13 - a03 * a11,
                b05 = a02 * a13 - a03 * a12,
                b06 = a20 * a31 - a21 * a30,
                b07 = a20 * a32 - a22 * a30,
                b08 = a20 * a33 - a23 * a30,
                b09 = a21 * a32 - a22 * a31,
                b10 = a21 * a33 - a23 * a31,
                b11 = a22 * a33 - a23 * a32;

            // Calculate the determinant
            return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
        };

        /**
         * Multiplies two mat4's
         *
         * @param {mat4} out the receiving matrix
         * @param {mat4} a the first operand
         * @param {mat4} b the second operand
         * @returns {mat4} out
         */
        mat4.multiply = function (out, a, b) {
            var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
                a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
                a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
                a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

            // Cache only the current line of the second matrix
            var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
            out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

            b0 = b[4];
            b1 = b[5];
            b2 = b[6];
            b3 = b[7];
            out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

            b0 = b[8];
            b1 = b[9];
            b2 = b[10];
            b3 = b[11];
            out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

            b0 = b[12];
            b1 = b[13];
            b2 = b[14];
            b3 = b[15];
            out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
            return out;
        };

        /**
         * Alias for {@link mat4.multiply}
         * @function
         */
        mat4.mul = mat4.multiply;

        /**
         * Translate a mat4 by the given vector
         *
         * @param {mat4} out the receiving matrix
         * @param {mat4} a the matrix to translate
         * @param {vec3} v vector to translate by
         * @returns {mat4} out
         */
        mat4.translate = function (out, a, v) {
            var x = v[0], y = v[1], z = v[2],
                a00, a01, a02, a03,
                a10, a11, a12, a13,
                a20, a21, a22, a23;

            if (a === out) {
                out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
                out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
                out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
                out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
            } else {
                a00 = a[0];
                a01 = a[1];
                a02 = a[2];
                a03 = a[3];
                a10 = a[4];
                a11 = a[5];
                a12 = a[6];
                a13 = a[7];
                a20 = a[8];
                a21 = a[9];
                a22 = a[10];
                a23 = a[11];

                out[0] = a00;
                out[1] = a01;
                out[2] = a02;
                out[3] = a03;
                out[4] = a10;
                out[5] = a11;
                out[6] = a12;
                out[7] = a13;
                out[8] = a20;
                out[9] = a21;
                out[10] = a22;
                out[11] = a23;

                out[12] = a00 * x + a10 * y + a20 * z + a[12];
                out[13] = a01 * x + a11 * y + a21 * z + a[13];
                out[14] = a02 * x + a12 * y + a22 * z + a[14];
                out[15] = a03 * x + a13 * y + a23 * z + a[15];
            }

            return out;
        };

        /**
         * Scales the mat4 by the dimensions in the given vec3
         *
         * @param {mat4} out the receiving matrix
         * @param {mat4} a the matrix to scale
         * @param {vec3} v the vec3 to scale the matrix by
         * @returns {mat4} out
         **/
        mat4.scale = function (out, a, v) {
            var x = v[0], y = v[1], z = v[2];

            out[0] = a[0] * x;
            out[1] = a[1] * x;
            out[2] = a[2] * x;
            out[3] = a[3] * x;
            out[4] = a[4] * y;
            out[5] = a[5] * y;
            out[6] = a[6] * y;
            out[7] = a[7] * y;
            out[8] = a[8] * z;
            out[9] = a[9] * z;
            out[10] = a[10] * z;
            out[11] = a[11] * z;
            out[12] = a[12];
            out[13] = a[13];
            out[14] = a[14];
            out[15] = a[15];
            return out;
        };

        /**
         * Rotates a mat4 by the given angle
         *
         * @param {mat4} out the receiving matrix
         * @param {mat4} a the matrix to rotate
         * @param {Number} rad the angle to rotate the matrix by
         * @param {vec3} axis the axis to rotate around
         * @returns {mat4} out
         */
        mat4.rotate = function (out, a, rad, axis) {
            var x = axis[0], y = axis[1], z = axis[2],
                len = Math.sqrt(x * x + y * y + z * z),
                s, c, t,
                a00, a01, a02, a03,
                a10, a11, a12, a13,
                a20, a21, a22, a23,
                b00, b01, b02,
                b10, b11, b12,
                b20, b21, b22;

            if (Math.abs(len) < GLMAT_EPSILON) {
                return null;
            }

            len = 1 / len;
            x *= len;
            y *= len;
            z *= len;

            s = Math.sin(rad);
            c = Math.cos(rad);
            t = 1 - c;

            a00 = a[0];
            a01 = a[1];
            a02 = a[2];
            a03 = a[3];
            a10 = a[4];
            a11 = a[5];
            a12 = a[6];
            a13 = a[7];
            a20 = a[8];
            a21 = a[9];
            a22 = a[10];
            a23 = a[11];

            // Construct the elements of the rotation matrix
            b00 = x * x * t + c;
            b01 = y * x * t + z * s;
            b02 = z * x * t - y * s;
            b10 = x * y * t - z * s;
            b11 = y * y * t + c;
            b12 = z * y * t + x * s;
            b20 = x * z * t + y * s;
            b21 = y * z * t - x * s;
            b22 = z * z * t + c;

            // Perform rotation-specific matrix multiplication
            out[0] = a00 * b00 + a10 * b01 + a20 * b02;
            out[1] = a01 * b00 + a11 * b01 + a21 * b02;
            out[2] = a02 * b00 + a12 * b01 + a22 * b02;
            out[3] = a03 * b00 + a13 * b01 + a23 * b02;
            out[4] = a00 * b10 + a10 * b11 + a20 * b12;
            out[5] = a01 * b10 + a11 * b11 + a21 * b12;
            out[6] = a02 * b10 + a12 * b11 + a22 * b12;
            out[7] = a03 * b10 + a13 * b11 + a23 * b12;
            out[8] = a00 * b20 + a10 * b21 + a20 * b22;
            out[9] = a01 * b20 + a11 * b21 + a21 * b22;
            out[10] = a02 * b20 + a12 * b21 + a22 * b22;
            out[11] = a03 * b20 + a13 * b21 + a23 * b22;

            if (a !== out) { // If the source and destination differ, copy the unchanged last row
                out[12] = a[12];
                out[13] = a[13];
                out[14] = a[14];
                out[15] = a[15];
            }
            return out;
        };

        /**
         * Rotates a matrix by the given angle around the X axis
         *
         * @param {mat4} out the receiving matrix
         * @param {mat4} a the matrix to rotate
         * @param {Number} rad the angle to rotate the matrix by
         * @returns {mat4} out
         */
        mat4.rotateX = function (out, a, rad) {
            var s = Math.sin(rad),
                c = Math.cos(rad),
                a10 = a[4],
                a11 = a[5],
                a12 = a[6],
                a13 = a[7],
                a20 = a[8],
                a21 = a[9],
                a22 = a[10],
                a23 = a[11];

            if (a !== out) { // If the source and destination differ, copy the unchanged rows
                out[0] = a[0];
                out[1] = a[1];
                out[2] = a[2];
                out[3] = a[3];
                out[12] = a[12];
                out[13] = a[13];
                out[14] = a[14];
                out[15] = a[15];
            }

            // Perform axis-specific matrix multiplication
            out[4] = a10 * c + a20 * s;
            out[5] = a11 * c + a21 * s;
            out[6] = a12 * c + a22 * s;
            out[7] = a13 * c + a23 * s;
            out[8] = a20 * c - a10 * s;
            out[9] = a21 * c - a11 * s;
            out[10] = a22 * c - a12 * s;
            out[11] = a23 * c - a13 * s;
            return out;
        };

        /**
         * Rotates a matrix by the given angle around the Y axis
         *
         * @param {mat4} out the receiving matrix
         * @param {mat4} a the matrix to rotate
         * @param {Number} rad the angle to rotate the matrix by
         * @returns {mat4} out
         */
        mat4.rotateY = function (out, a, rad) {
            var s = Math.sin(rad),
                c = Math.cos(rad),
                a00 = a[0],
                a01 = a[1],
                a02 = a[2],
                a03 = a[3],
                a20 = a[8],
                a21 = a[9],
                a22 = a[10],
                a23 = a[11];

            if (a !== out) { // If the source and destination differ, copy the unchanged rows
                out[4] = a[4];
                out[5] = a[5];
                out[6] = a[6];
                out[7] = a[7];
                out[12] = a[12];
                out[13] = a[13];
                out[14] = a[14];
                out[15] = a[15];
            }

            // Perform axis-specific matrix multiplication
            out[0] = a00 * c - a20 * s;
            out[1] = a01 * c - a21 * s;
            out[2] = a02 * c - a22 * s;
            out[3] = a03 * c - a23 * s;
            out[8] = a00 * s + a20 * c;
            out[9] = a01 * s + a21 * c;
            out[10] = a02 * s + a22 * c;
            out[11] = a03 * s + a23 * c;
            return out;
        };

        /**
         * Rotates a matrix by the given angle around the Z axis
         *
         * @param {mat4} out the receiving matrix
         * @param {mat4} a the matrix to rotate
         * @param {Number} rad the angle to rotate the matrix by
         * @returns {mat4} out
         */
        mat4.rotateZ = function (out, a, rad) {
            var s = Math.sin(rad),
                c = Math.cos(rad),
                a00 = a[0],
                a01 = a[1],
                a02 = a[2],
                a03 = a[3],
                a10 = a[4],
                a11 = a[5],
                a12 = a[6],
                a13 = a[7];

            if (a !== out) { // If the source and destination differ, copy the unchanged last row
                out[8] = a[8];
                out[9] = a[9];
                out[10] = a[10];
                out[11] = a[11];
                out[12] = a[12];
                out[13] = a[13];
                out[14] = a[14];
                out[15] = a[15];
            }

            // Perform axis-specific matrix multiplication
            out[0] = a00 * c + a10 * s;
            out[1] = a01 * c + a11 * s;
            out[2] = a02 * c + a12 * s;
            out[3] = a03 * c + a13 * s;
            out[4] = a10 * c - a00 * s;
            out[5] = a11 * c - a01 * s;
            out[6] = a12 * c - a02 * s;
            out[7] = a13 * c - a03 * s;
            return out;
        };

        /**
         * Creates a matrix from a quaternion rotation and vector translation
         * This is equivalent to (but much faster than):
         *
         *     mat4.identity(dest);
         *     mat4.translate(dest, vec);
         *     var quatMat = mat4.create();
         *     quat4.toMat4(quat, quatMat);
         *     mat4.multiply(dest, quatMat);
         *
         * @param {mat4} out mat4 receiving operation result
         * @param {quat4} q Rotation quaternion
         * @param {vec3} v Translation vector
         * @returns {mat4} out
         */
        mat4.fromRotationTranslation = function (out, q, v) {
            // Quaternion math
            var x = q[0], y = q[1], z = q[2], w = q[3],
                x2 = x + x,
                y2 = y + y,
                z2 = z + z,

                xx = x * x2,
                xy = x * y2,
                xz = x * z2,
                yy = y * y2,
                yz = y * z2,
                zz = z * z2,
                wx = w * x2,
                wy = w * y2,
                wz = w * z2;

            out[0] = 1 - (yy + zz);
            out[1] = xy + wz;
            out[2] = xz - wy;
            out[3] = 0;
            out[4] = xy - wz;
            out[5] = 1 - (xx + zz);
            out[6] = yz + wx;
            out[7] = 0;
            out[8] = xz + wy;
            out[9] = yz - wx;
            out[10] = 1 - (xx + yy);
            out[11] = 0;
            out[12] = v[0];
            out[13] = v[1];
            out[14] = v[2];
            out[15] = 1;

            return out;
        };

        mat4.fromQuat = function (out, q) {
            var x = q[0], y = q[1], z = q[2], w = q[3],
                x2 = x + x,
                y2 = y + y,
                z2 = z + z,

                xx = x * x2,
                yx = y * x2,
                yy = y * y2,
                zx = z * x2,
                zy = z * y2,
                zz = z * z2,
                wx = w * x2,
                wy = w * y2,
                wz = w * z2;

            out[0] = 1 - yy - zz;
            out[1] = yx + wz;
            out[2] = zx - wy;
            out[3] = 0;

            out[4] = yx - wz;
            out[5] = 1 - xx - zz;
            out[6] = zy + wx;
            out[7] = 0;

            out[8] = zx + wy;
            out[9] = zy - wx;
            out[10] = 1 - xx - yy;
            out[11] = 0;

            out[12] = 0;
            out[13] = 0;
            out[14] = 0;
            out[15] = 1;

            return out;
        };

        /**
         * Generates a frustum matrix with the given bounds
         *
         * @param {mat4} out mat4 frustum matrix will be written into
         * @param {Number} left Left bound of the frustum
         * @param {Number} right Right bound of the frustum
         * @param {Number} bottom Bottom bound of the frustum
         * @param {Number} top Top bound of the frustum
         * @param {Number} near Near bound of the frustum
         * @param {Number} far Far bound of the frustum
         * @returns {mat4} out
         */
        mat4.frustum = function (out, left, right, bottom, top, near, far) {
            var rl = 1 / (right - left),
                tb = 1 / (top - bottom),
                nf = 1 / (near - far);
            out[0] = (near * 2) * rl;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = (near * 2) * tb;
            out[6] = 0;
            out[7] = 0;
            out[8] = (right + left) * rl;
            out[9] = (top + bottom) * tb;
            out[10] = (far + near) * nf;
            out[11] = -1;
            out[12] = 0;
            out[13] = 0;
            out[14] = (far * near * 2) * nf;
            out[15] = 0;
            return out;
        };

        /**
         * Generates a perspective projection matrix with the given bounds
         *
         * @param {mat4} out mat4 frustum matrix will be written into
         * @param {number} fovy Vertical field of view in radians
         * @param {number} aspect Aspect ratio. typically viewport width/height
         * @param {number} near Near bound of the frustum
         * @param {number} far Far bound of the frustum
         * @returns {mat4} out
         */
        mat4.perspective = function (out, fovy, aspect, near, far) {
            var f = 1.0 / Math.tan(fovy / 2),
                nf = 1 / (near - far);
            out[0] = f / aspect;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = f;
            out[6] = 0;
            out[7] = 0;
            out[8] = 0;
            out[9] = 0;
            out[10] = (far + near) * nf;
            out[11] = -1;
            out[12] = 0;
            out[13] = 0;
            out[14] = (2 * far * near) * nf;
            out[15] = 0;
            return out;
        };

        /**
         * Generates a orthogonal projection matrix with the given bounds
         *
         * @param {mat4} out mat4 frustum matrix will be written into
         * @param {number} left Left bound of the frustum
         * @param {number} right Right bound of the frustum
         * @param {number} bottom Bottom bound of the frustum
         * @param {number} top Top bound of the frustum
         * @param {number} near Near bound of the frustum
         * @param {number} far Far bound of the frustum
         * @returns {mat4} out
         */
        mat4.ortho = function (out, left, right, bottom, top, near, far) {
            var lr = 1 / (left - right),
                bt = 1 / (bottom - top),
                nf = 1 / (near - far);
            out[0] = -2 * lr;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = -2 * bt;
            out[6] = 0;
            out[7] = 0;
            out[8] = 0;
            out[9] = 0;
            out[10] = 2 * nf;
            out[11] = 0;
            out[12] = (left + right) * lr;
            out[13] = (top + bottom) * bt;
            out[14] = (far + near) * nf;
            out[15] = 1;
            return out;
        };

        /**
         * Generates a look-at matrix with the given eye position, focal point, and up axis
         *
         * @param {mat4} out mat4 frustum matrix will be written into
         * @param {vec3} eye Position of the viewer
         * @param {vec3} center Point the viewer is looking at
         * @param {vec3} up vec3 pointing up
         * @returns {mat4} out
         */
        mat4.lookAt = function (out, eye, center, up) {
            var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
                eyex = eye[0],
                eyey = eye[1],
                eyez = eye[2],
                upx = up[0],
                upy = up[1],
                upz = up[2],
                centerx = center[0],
                centery = center[1],
                centerz = center[2];

            if (Math.abs(eyex - centerx) < GLMAT_EPSILON &&
                Math.abs(eyey - centery) < GLMAT_EPSILON &&
                Math.abs(eyez - centerz) < GLMAT_EPSILON) {
                return mat4.identity(out);
            }

            z0 = eyex - centerx;
            z1 = eyey - centery;
            z2 = eyez - centerz;

            len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
            z0 *= len;
            z1 *= len;
            z2 *= len;

            x0 = upy * z2 - upz * z1;
            x1 = upz * z0 - upx * z2;
            x2 = upx * z1 - upy * z0;
            len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
            if (!len) {
                x0 = 0;
                x1 = 0;
                x2 = 0;
            } else {
                len = 1 / len;
                x0 *= len;
                x1 *= len;
                x2 *= len;
            }

            y0 = z1 * x2 - z2 * x1;
            y1 = z2 * x0 - z0 * x2;
            y2 = z0 * x1 - z1 * x0;

            len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
            if (!len) {
                y0 = 0;
                y1 = 0;
                y2 = 0;
            } else {
                len = 1 / len;
                y0 *= len;
                y1 *= len;
                y2 *= len;
            }

            out[0] = x0;
            out[1] = y0;
            out[2] = z0;
            out[3] = 0;
            out[4] = x1;
            out[5] = y1;
            out[6] = z1;
            out[7] = 0;
            out[8] = x2;
            out[9] = y2;
            out[10] = z2;
            out[11] = 0;
            out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
            out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
            out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
            out[15] = 1;

            return out;
        };

        /**
         * Returns a string representation of a mat4
         *
         * @param {mat4} mat matrix to represent as a string
         * @returns {String} string representation of the matrix
         */
        mat4.str = function (a) {
            return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' +
                a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' +
                a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' +
                a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
        };

        /**
         * Returns Frobenius norm of a mat4
         *
         * @param {mat4} a the matrix to calculate Frobenius norm of
         * @returns {Number} Frobenius norm
         */
        mat4.frob = function (a) {
            return (Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2) + Math.pow(a[9], 2) + Math.pow(a[10], 2) + Math.pow(a[11], 2) + Math.pow(a[12], 2) + Math.pow(a[13], 2) + Math.pow(a[14], 2) + Math.pow(a[15], 2)))
        };


        if (typeof(exports) !== 'undefined') {
            exports.mat4 = mat4;
        }
        ;
        /* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

         Redistribution and use in source and binary forms, with or without modification,
         are permitted provided that the following conditions are met:

         * Redistributions of source code must retain the above copyright notice, this
         list of conditions and the following disclaimer.
         * Redistributions in binary form must reproduce the above copyright notice,
         this list of conditions and the following disclaimer in the documentation 
         and/or other materials provided with the distribution.

         THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
         ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
         WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
         DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
         ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
         (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
         LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
         ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
         (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
         SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

        /**
         * @class Quaternion
         * @name quat
         */

        var quat = {};

        /**
         * Creates a new identity quat
         *
         * @returns {quat} a new quaternion
         */
        quat.create = function () {
            var out = new GLMAT_ARRAY_TYPE(4);
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            return out;
        };

        /**
         * Sets a quaternion to represent the shortest rotation from one
         * vector to another.
         *
         * Both vectors are assumed to be unit length.
         *
         * @param {quat} out the receiving quaternion.
         * @param {vec3} a the initial vector
         * @param {vec3} b the destination vector
         * @returns {quat} out
         */
        quat.rotationTo = (function () {
            var tmpvec3 = vec3.create();
            var xUnitVec3 = vec3.fromValues(1, 0, 0);
            var yUnitVec3 = vec3.fromValues(0, 1, 0);

            return function (out, a, b) {
                var dot = vec3.dot(a, b);
                if (dot < -0.999999) {
                    vec3.cross(tmpvec3, xUnitVec3, a);
                    if (vec3.length(tmpvec3) < 0.000001)
                        vec3.cross(tmpvec3, yUnitVec3, a);
                    vec3.normalize(tmpvec3, tmpvec3);
                    quat.setAxisAngle(out, tmpvec3, Math.PI);
                    return out;
                } else if (dot > 0.999999) {
                    out[0] = 0;
                    out[1] = 0;
                    out[2] = 0;
                    out[3] = 1;
                    return out;
                } else {
                    vec3.cross(tmpvec3, a, b);
                    out[0] = tmpvec3[0];
                    out[1] = tmpvec3[1];
                    out[2] = tmpvec3[2];
                    out[3] = 1 + dot;
                    return quat.normalize(out, out);
                }
            };
        })();

        /**
         * Sets the specified quaternion with values corresponding to the given
         * axes. Each axis is a vec3 and is expected to be unit length and
         * perpendicular to all other specified axes.
         *
         * @param {vec3} view  the vector representing the viewing direction
         * @param {vec3} right the vector representing the local "right" direction
         * @param {vec3} up    the vector representing the local "up" direction
         * @returns {quat} out
         */
        quat.setAxes = (function () {
            var matr = mat3.create();

            return function (out, view, right, up) {
                matr[0] = right[0];
                matr[3] = right[1];
                matr[6] = right[2];

                matr[1] = up[0];
                matr[4] = up[1];
                matr[7] = up[2];

                matr[2] = -view[0];
                matr[5] = -view[1];
                matr[8] = -view[2];

                return quat.normalize(out, quat.fromMat3(out, matr));
            };
        })();

        /**
         * Creates a new quat initialized with values from an existing quaternion
         *
         * @param {quat} a quaternion to clone
         * @returns {quat} a new quaternion
         * @function
         */
        quat.clone = vec4.clone;

        /**
         * Creates a new quat initialized with the given values
         *
         * @param {Number} x X component
         * @param {Number} y Y component
         * @param {Number} z Z component
         * @param {Number} w W component
         * @returns {quat} a new quaternion
         * @function
         */
        quat.fromValues = vec4.fromValues;

        /**
         * Copy the values from one quat to another
         *
         * @param {quat} out the receiving quaternion
         * @param {quat} a the source quaternion
         * @returns {quat} out
         * @function
         */
        quat.copy = vec4.copy;

        /**
         * Set the components of a quat to the given values
         *
         * @param {quat} out the receiving quaternion
         * @param {Number} x X component
         * @param {Number} y Y component
         * @param {Number} z Z component
         * @param {Number} w W component
         * @returns {quat} out
         * @function
         */
        quat.set = vec4.set;

        /**
         * Set a quat to the identity quaternion
         *
         * @param {quat} out the receiving quaternion
         * @returns {quat} out
         */
        quat.identity = function (out) {
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            return out;
        };

        /**
         * Sets a quat from the given angle and rotation axis,
         * then returns it.
         *
         * @param {quat} out the receiving quaternion
         * @param {vec3} axis the axis around which to rotate
         * @param {Number} rad the angle in radians
         * @returns {quat} out
         **/
        quat.setAxisAngle = function (out, axis, rad) {
            rad = rad * 0.5;
            var s = Math.sin(rad);
            out[0] = s * axis[0];
            out[1] = s * axis[1];
            out[2] = s * axis[2];
            out[3] = Math.cos(rad);
            return out;
        };

        /**
         * Adds two quat's
         *
         * @param {quat} out the receiving quaternion
         * @param {quat} a the first operand
         * @param {quat} b the second operand
         * @returns {quat} out
         * @function
         */
        quat.add = vec4.add;

        /**
         * Multiplies two quat's
         *
         * @param {quat} out the receiving quaternion
         * @param {quat} a the first operand
         * @param {quat} b the second operand
         * @returns {quat} out
         */
        quat.multiply = function (out, a, b) {
            var ax = a[0], ay = a[1], az = a[2], aw = a[3],
                bx = b[0], by = b[1], bz = b[2], bw = b[3];

            out[0] = ax * bw + aw * bx + ay * bz - az * by;
            out[1] = ay * bw + aw * by + az * bx - ax * bz;
            out[2] = az * bw + aw * bz + ax * by - ay * bx;
            out[3] = aw * bw - ax * bx - ay * by - az * bz;
            return out;
        };

        /**
         * Alias for {@link quat.multiply}
         * @function
         */
        quat.mul = quat.multiply;

        /**
         * Scales a quat by a scalar number
         *
         * @param {quat} out the receiving vector
         * @param {quat} a the vector to scale
         * @param {Number} b amount to scale the vector by
         * @returns {quat} out
         * @function
         */
        quat.scale = vec4.scale;

        /**
         * Rotates a quaternion by the given angle about the X axis
         *
         * @param {quat} out quat receiving operation result
         * @param {quat} a quat to rotate
         * @param {number} rad angle (in radians) to rotate
         * @returns {quat} out
         */
        quat.rotateX = function (out, a, rad) {
            rad *= 0.5;

            var ax = a[0], ay = a[1], az = a[2], aw = a[3],
                bx = Math.sin(rad), bw = Math.cos(rad);

            out[0] = ax * bw + aw * bx;
            out[1] = ay * bw + az * bx;
            out[2] = az * bw - ay * bx;
            out[3] = aw * bw - ax * bx;
            return out;
        };

        /**
         * Rotates a quaternion by the given angle about the Y axis
         *
         * @param {quat} out quat receiving operation result
         * @param {quat} a quat to rotate
         * @param {number} rad angle (in radians) to rotate
         * @returns {quat} out
         */
        quat.rotateY = function (out, a, rad) {
            rad *= 0.5;

            var ax = a[0], ay = a[1], az = a[2], aw = a[3],
                by = Math.sin(rad), bw = Math.cos(rad);

            out[0] = ax * bw - az * by;
            out[1] = ay * bw + aw * by;
            out[2] = az * bw + ax * by;
            out[3] = aw * bw - ay * by;
            return out;
        };

        /**
         * Rotates a quaternion by the given angle about the Z axis
         *
         * @param {quat} out quat receiving operation result
         * @param {quat} a quat to rotate
         * @param {number} rad angle (in radians) to rotate
         * @returns {quat} out
         */
        quat.rotateZ = function (out, a, rad) {
            rad *= 0.5;

            var ax = a[0], ay = a[1], az = a[2], aw = a[3],
                bz = Math.sin(rad), bw = Math.cos(rad);

            out[0] = ax * bw + ay * bz;
            out[1] = ay * bw - ax * bz;
            out[2] = az * bw + aw * bz;
            out[3] = aw * bw - az * bz;
            return out;
        };

        /**
         * Calculates the W component of a quat from the X, Y, and Z components.
         * Assumes that quaternion is 1 unit in length.
         * Any existing W component will be ignored.
         *
         * @param {quat} out the receiving quaternion
         * @param {quat} a quat to calculate W component of
         * @returns {quat} out
         */
        quat.calculateW = function (out, a) {
            var x = a[0], y = a[1], z = a[2];

            out[0] = x;
            out[1] = y;
            out[2] = z;
            out[3] = -Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
            return out;
        };

        /**
         * Calculates the dot product of two quat's
         *
         * @param {quat} a the first operand
         * @param {quat} b the second operand
         * @returns {Number} dot product of a and b
         * @function
         */
        quat.dot = vec4.dot;

        /**
         * Performs a linear interpolation between two quat's
         *
         * @param {quat} out the receiving quaternion
         * @param {quat} a the first operand
         * @param {quat} b the second operand
         * @param {Number} t interpolation amount between the two inputs
         * @returns {quat} out
         * @function
         */
        quat.lerp = vec4.lerp;

        /**
         * Performs a spherical linear interpolation between two quat
         *
         * @param {quat} out the receiving quaternion
         * @param {quat} a the first operand
         * @param {quat} b the second operand
         * @param {Number} t interpolation amount between the two inputs
         * @returns {quat} out
         */
        quat.slerp = function (out, a, b, t) {
            // benchmarks:
            //    http://jsperf.com/quaternion-slerp-implementations

            var ax = a[0], ay = a[1], az = a[2], aw = a[3],
                bx = b[0], by = b[1], bz = b[2], bw = b[3];

            var omega, cosom, sinom, scale0, scale1;

            // calc cosine
            cosom = ax * bx + ay * by + az * bz + aw * bw;
            // adjust signs (if necessary)
            if (cosom < 0.0) {
                cosom = -cosom;
                bx = -bx;
                by = -by;
                bz = -bz;
                bw = -bw;
            }
            // calculate coefficients
            if ((1.0 - cosom) > 0.000001) {
                // standard case (slerp)
                omega = Math.acos(cosom);
                sinom = Math.sin(omega);
                scale0 = Math.sin((1.0 - t) * omega) / sinom;
                scale1 = Math.sin(t * omega) / sinom;
            } else {
                // "from" and "to" quaternions are very close 
                //  ... so we can do a linear interpolation
                scale0 = 1.0 - t;
                scale1 = t;
            }
            // calculate final values
            out[0] = scale0 * ax + scale1 * bx;
            out[1] = scale0 * ay + scale1 * by;
            out[2] = scale0 * az + scale1 * bz;
            out[3] = scale0 * aw + scale1 * bw;

            return out;
        };

        /**
         * Calculates the inverse of a quat
         *
         * @param {quat} out the receiving quaternion
         * @param {quat} a quat to calculate inverse of
         * @returns {quat} out
         */
        quat.invert = function (out, a) {
            var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
                dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3,
                invDot = dot ? 1.0 / dot : 0;

            // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

            out[0] = -a0 * invDot;
            out[1] = -a1 * invDot;
            out[2] = -a2 * invDot;
            out[3] = a3 * invDot;
            return out;
        };

        /**
         * Calculates the conjugate of a quat
         * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
         *
         * @param {quat} out the receiving quaternion
         * @param {quat} a quat to calculate conjugate of
         * @returns {quat} out
         */
        quat.conjugate = function (out, a) {
            out[0] = -a[0];
            out[1] = -a[1];
            out[2] = -a[2];
            out[3] = a[3];
            return out;
        };

        /**
         * Calculates the length of a quat
         *
         * @param {quat} a vector to calculate length of
         * @returns {Number} length of a
         * @function
         */
        quat.length = vec4.length;

        /**
         * Alias for {@link quat.length}
         * @function
         */
        quat.len = quat.length;

        /**
         * Calculates the squared length of a quat
         *
         * @param {quat} a vector to calculate squared length of
         * @returns {Number} squared length of a
         * @function
         */
        quat.squaredLength = vec4.squaredLength;

        /**
         * Alias for {@link quat.squaredLength}
         * @function
         */
        quat.sqrLen = quat.squaredLength;

        /**
         * Normalize a quat
         *
         * @param {quat} out the receiving quaternion
         * @param {quat} a quaternion to normalize
         * @returns {quat} out
         * @function
         */
        quat.normalize = vec4.normalize;

        /**
         * Creates a quaternion from the given 3x3 rotation matrix.
         *
         * NOTE: The resultant quaternion is not normalized, so you should be sure
         * to renormalize the quaternion yourself where necessary.
         *
         * @param {quat} out the receiving quaternion
         * @param {mat3} m rotation matrix
         * @returns {quat} out
         * @function
         */
        quat.fromMat3 = function (out, m) {
            // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
            // article "Quaternion Calculus and Fast Animation".
            var fTrace = m[0] + m[4] + m[8];
            var fRoot;

            if (fTrace > 0.0) {
                // |w| > 1/2, may as well choose w > 1/2
                fRoot = Math.sqrt(fTrace + 1.0);  // 2w
                out[3] = 0.5 * fRoot;
                fRoot = 0.5 / fRoot;  // 1/(4w)
                out[0] = (m[7] - m[5]) * fRoot;
                out[1] = (m[2] - m[6]) * fRoot;
                out[2] = (m[3] - m[1]) * fRoot;
            } else {
                // |w| <= 1/2
                var i = 0;
                if (m[4] > m[0])
                    i = 1;
                if (m[8] > m[i * 3 + i])
                    i = 2;
                var j = (i + 1) % 3;
                var k = (i + 2) % 3;

                fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
                out[i] = 0.5 * fRoot;
                fRoot = 0.5 / fRoot;
                out[3] = (m[k * 3 + j] - m[j * 3 + k]) * fRoot;
                out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
                out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
            }

            return out;
        };

        /**
         * Returns a string representation of a quatenion
         *
         * @param {quat} vec vector to represent as a string
         * @returns {String} string representation of the vector
         */
        quat.str = function (a) {
            return 'quat(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
        };

        if (typeof(exports) !== 'undefined') {
            exports.quat = quat;
        }
        ;


    })(shim.exports);
})(this);
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
 * Creates a Landmark object and associates it with a Camera.
 * 
 * 
 * @class Stores the camera state so it can be retrieved later 
 * @constructor this is the constructor doc
 * @param {Camera} camera
 * @author Diego Cantor
 * @see Camera
  */

nucleo.Landmark = function Landmark(name, camera) {
	
	if(!( camera instanceof nucleo.Camera)) {
		alert('Landmark needs a Camera as argument');
		return null;
	}
	
	this.name             = name;
	
	var c = camera;
    
    this._matrix          = mat4.clone(c._matrix);
    this._right           = vec3.clone(c._right);
    this._up              = vec3.clone(c._up);
    this._forward         = vec3.clone(c._forward);   
    this._position        = vec3.clone(c._position);
    this._focalPoint      = vec3.clone(c._focalPoint);
    this._distanceVector  = vec3.clone(c._distanceVector);
    
    this._azimuth       = c._azimuth;
    this._elevation     = c._elevation;
    this._roll          = c._roll;
    this._relAzimuth    = c._relAzimuth;
    this._relElevation  = c._relElevation;
    this._relRoll       = c._relRoll;
    this._dollyingStep  = c._dollyngStep; //dollying step
    this._distance      = c._distance;

};


/**
 * Updates the camera with the state stored in Landmark.
 */
nucleo.Landmark.prototype.retrieve = function(camera) {
    
	var c = camera;
	

    
    c._matrix          = mat4.copy(c._matrix,this._matrix);
    c._right           = vec3.copy(c._right,this._right);
    c._up              = vec3.copy(c._up,this._up);
    c._forward         = vec3.copy(c._forward,this._forward);   
    c._position        = vec3.copy(c._position,this._position);
    c._focalPoint      = vec3.copy(c._focalPoint,this._focalPoint);
    c._distanceVector  = vec3.copy(c._distanceVector, this._distanceVector);
    
    c._azimuth       = this._azimuth;
    c._elevation     = this._elevation;
    c._roll          = this._roll;
    c._relAzimuth    = this._relAzimuth;
    c._relElevation  = this._relElevation;
    c._relRoll       = this._relRoll;
    c._dollyingStep  = this._dollyngStep; //dollying step
    c._distance      = this._distance;
    
    c.refresh();
};
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
 *
 * A Camera object simplifies WebGL programming by providing a simple object interface to the lower level
 * matrix manipulations that are required to view a 3D scene.
 *
 * <p>A Camera is always associated to one <code>View</code> object. However, one View object can host multiple
 * cameras (through its <code>CameraManager</code>)</p>
 *
 * @class Determines which region of the scene will be visible to the user.
 * @constructor Creates a Camera.
 * @param {View} p_view
 * @param {Object} p_type the type of camera
 * @author Diego Cantor
 */
nucleo.Camera = function Camera(p_view, p_type) {

    this.UID = nucleo.util.generateUID(); //unique identification key
    this.view = p_view;

    this._matrix         = mat4.create();
    this._right          = vec3.fromValues(1, 0, 0);
    this._up             = vec3.fromValues(0, 1, 0);
    this._forward        = vec3.fromValues(0, 0, 1);
    this._position       = vec3.fromValues(0, 0, 1);
    this._focalPoint     = vec3.fromValues(0, 0, 0);
    this._distanceVector = vec3.fromValues(0, 0, 0);

    this._azimuth      = 0;
    this._elevation    = 0;
    this._roll         = 0;
    this._relAzimuth   = 0;
    this._relElevation = 0;
    this._relRoll      = 0;
    this._dollyingStep = 0;
    this._distance     = 1;
    this._rotate_world = false; //invert the horizontal coordinate system HCS

    this._fov  = nucleo.define.Camera.FRUSTUM.FOV;
    this._near = nucleo.define.Camera.FRUSTUM.NEAR;
    this._far  = nucleo.define.Camera.FRUSTUM.FAR;

    this._aspect      = undefined;
    this._perspective = mat4.create();
    this.updatePerspective();  //set the default perspective matrix

    this._following    = undefined;
    this._trackingMode = nucleo.define.Camera.TRACKING.DEFAULT;

    this.landmarks         = [];
    this._lmarkAnimationID = undefined; //useful to interrupt landmark animations


    if (p_type != undefined) {
        this.setType(p_type, undefined);
    } else {
        this.setType(nucleo.Camera.TYPE.EXPLORING, undefined);
    }


};

/*
 * Constants
 */
nucleo.Camera.TYPE     = nucleo.define.Camera.TYPE;
nucleo.Camera.TRACKING = nucleo.define.Camera.TRACKING;
nucleo.Camera.FRUSTUM  = nucleo.define.Camera.FRUSTUM;
nucleo.Camera.AXIS     = nucleo.define.Camera.AXIS;


/**
 * If flag is true, it reverses the azimuth and elevation angles.
 * Subsequent calls to rotate, setAzimuth, setElevation,
 * changeAzimuth or changeElevation will cause the inverted effect.
 * setRoll or changeRoll is not affected by this method.
 *
 * This inversion is useful when one wants to simulate that the world
 * is moving, instead of the camera.
 *
 * By default the camera angles are not reversed.
 * @param{Boolean} flag the boolean flag to reverse the angles.
 */
nucleo.Camera.prototype.setWorldRotation = function (flag) {
    this._rotate_world = flag;
    this._getAngles();
    return this;
};

/**
 * Establishes the type of camera
 * @param {Object} p_type the type of camera
 * @param {define.Camera.TRACKING} p_tracking_mode if the camera is of tracking type, the tracking mode can be set as
 * an optional parameter here.
 * @see Camera.TYPE,
 * @see Camera.TRACKING
 */
nucleo.Camera.prototype.setType = function (p_type, p_tracking_mode) {

    var t = nucleo.Camera.TYPE;

    if (p_type != t.ORBITING && p_type != t.TRACKING && p_type != t.EXPLORING) {
        console.warn('Camera.setType WARNING type [' + p_type + '] unknown. Setting camera to EXPLORING type.');
        this.type = t.EXPLORING;
        this.setWorldRotation(true);
    }
    else {

        this.type = p_type;
        if (this.type == t.EXPLORING) {
            this.setWorldRotation(true);
        }
        else {
            this.setWorldRotation(false);
        }
        this._getAngles();
    }

    if (this.type == nucleo.Camera.TYPE.TRACKING && p_tracking_mode != undefined) {
        this.setTrackingMode(p_tracking_mode);
    }

    return this;


};

/**
 * Sets the tracking type of this camera when it follows an actor
 * <p>To set the tracking type of the camera <code>myCamera</code> you should make sure that your camera is of tracking type with:
 *  <code>myCamera.setType(Camera.TYPE.TRACKING)</code>.
 *  For instance:
 * </p>
 *  <pre class='prettyprint'>
 *  var actor = view.scene.getActor('cone'); //from the current scene
 *  var camera = view.getCurrentCamera();
 *  camera.setType(nucleo.Camera.TYPE.TRACKING);
 *  camera.setTrackingMode(nucleo.Camera.TRACKING.ROTATIONAL);
 *  camera.follow(actor);
 * </pre>
 * <p> a shorter way would be:</p>
 * <pre class='prettyprint'>
 *  var actor = view.scene.getActor('cone'); //from the current scene
 *  var camera = view.getCurrentCamera();
 *  camera.setType(nucleo.Camera.TYPE.TRACKING);
 *  camera.follow(actor, nucleo.Camera.TRACKING.ROTATIONAL);
 * </pre>
 * @see nucleo.Camera#follow,
 * @see nucleo.Camera.TRACKING
 *
 *
 */
nucleo.Camera.prototype.setTrackingMode = function (mode) {
    if (this.type != nucleo.Camera.TYPE.TRACKING) {
        alert("Impossible to set a tracking mode if the camera is not of tracking type");
        throw("Impossible to set a tracking mode if the camera is not of tracking type");
    }
    if (mode == undefined) return;
    this._trackingMode = mode;
};

/**
 * Follows a given actor. If this operation is called on an ORBITING camera,
 * the camera mode will change to be a TRACKING camera.
 *
 * @param {Actor, String} actor actor to track (It can be the actor name or the actor instance)
 * @param {String} trackingType one of the possible values of <code>Camera.TRACKING</code>
 * @see {Camera#setType}
 */
nucleo.Camera.prototype.follow = function (actor, trackingType) {

    var instance;

    this.setType(nucleo.Camera.TYPE.TRACKING, trackingType);

    if (actor instanceof nucleo.Actor) {
        instance = actor;
    }
    else if (typeof(actor) == 'string') {
        instance = this.view.scene.getActorByName(actor);
    }

    if (instance == undefined) {
        console.error('Camera.follow ERROR: The actor ' + actor + ' does not exist');
    }
    else {
        this._following = instance;
        instance.addTrackingCamera(this);
    }

    return this;
};

/**
 * Stops following an actor
 */
nucleo.Camera.prototype.unfollow = function () {
    this._following.removeTrackingCamera(this);
    this._following = undefined;
    return this;
};

/**
 * Updates the camera according to the current tracking mode. This method is a callback used by the
 * Actor class to notify the camera of any actor transformations. This is applicable of course only when
 * this camera is following the actor passed as parameter here
 * @param {Actor} actor the actor being followed by this camera
 */
nucleo.Camera.prototype.updateWithActor = function (actor) {
    if (this._following != actor) return; //fail safe

    var Camera = nucleo.Camera;

    switch (this._trackingMode) {
        case Camera.TRACKING.DEFAULT:
            break;
        case Camera.TRACKING.ROTATIONAL:
        case Camera.TRACKING.CINEMATIC:
            this.setFocalPoint(actor._position);
            break;
        case Camera.TRACKING.TRANSLATIONAL:
            this.translate(actor._translation);
            this.setFocalPoint(actor._position);
            break;
    }
};
/**
 *<p>Sets the camera position in the scene
 * This method has three parameters x,y,z which represent the coordinates for
 * the camera's position.
 * </p>
 * <p>
 * This method takes into account the current focal point. The camera will look at the
 * focal point after this operation. If you want to move the camera position and the focal point
 * simultaneously, then use <code>Camera.translate</code>.
 * </p>
 *
 * @param {Number, Array} x the x-coordinate. x can also be an Array [a,b,c] in this case the y and z parameters are discarded.
 * @param {Number} y the y-coordinate
 * @param {Number} z the z-coordinate
 * @see{Camera#translate}
 */
nucleo.Camera.prototype.setPosition     = function (x, y, z) {
    this._setPosition(x, y, z);
    this.setFocalPoint(this._focalPoint);
    return this;
};

/**
 * Looks at a given point in space (sets the focal point of this camera).
 *
 * Note: If the camera is doing cinematic tracking, the up vector will be affected.
 * @param {Number, Array, vec3} x it can be the x coordinate, a 3-dimensional Array or a vec3 (glMatrix)
 * @param {Number} y if x is a number, then this parameter corresponds to the y-coordinate
 * @param {Number} z if x is a number, then this parameter corresponds to the z-coordinate
 */
nucleo.Camera.prototype.setFocalPoint = function (x, y, z) {

    var up = vec3.fromValues(0, 1, 0);
    //var up = vec3.create(this._up);
    this._focalPoint = nucleo.util.createVec3(x, y, z);

    if (this._trackingMode == nucleo.Camera.TRACKING.CINEMATIC) {
        var d  = vec3.subtract(vec3.create(), this._focalPoint, this._position);
        var x  = d[0], y = d[1], z = d[2], r = vec3.length(d);
        var el = Math.asin(y / r) * nucleo.define.RAD_2_DEG;
        var az = 90 + Math.atan2(z, x) * nucleo.define.RAD_2_DEG;
        var m  = mat4.create();
        mat4.rotateY(m, m, az * nucleo.define.DEG_2_RAD);
        mat4.rotateX(m, m, el * nucleo.define.DEG_2_RAD);
        up     = vec3.transformMat4(vec3.create(), [0, 1, 0], m);
    }

    mat4.invert(this._matrix, mat4.lookAt(mat4.create(), this._position, this._focalPoint, up));

    this._getAxes();
    this._getDistance();
    this._getAngles();
    return this;
};

/**
 * Position the camera to a given distance from the current focal point
 * @param {Number} d the distance
 * @TODO: REVIEW COMMENTED CODE
 */
nucleo.Camera.prototype.setDistance = function (d) {

    if (this._distance == d || d < 0) {
        return;
    }

    this._distance = d;

    // Distance should be greater than .0002
    if (this._distance < 0.0002) {
        this._distance = 0.0002;
        console.warn("Camera.setDistance WARN: Distance is set to minimum (0.0002)");
    }

    this._dollyingStep = this._distance / 100;

    var pos = vec3.create();

    d     = this._distance;
    var n = this._forward;
    var f = this._focalPoint;

    pos[0] = d * n[0] + f[0];
    pos[1] = d * n[1] + f[1];
    pos[2] = d * n[2] + f[2];

    this._setPosition(pos);
    return this;
};

/**
 * Changes the initial azimuth of the camera
 * @param {Number} el the azimuth increment in degrees
 */
nucleo.Camera.prototype.changeAzimuth = function (az) {
    this.setAzimuth(this._azimuth + az);
    return this;
};

/**
 * Changes the initial elevation of the camera
 * @param {Number} el the elevation increment in degrees
 */
nucleo.Camera.prototype.changeElevation = function (el) {
    this.setElevation(this._elevation + el);
    return this;
};


/**
 * Changes the initial roll of the camera
 * @param {Number} rl the roll increment in degrees
 */
nucleo.Camera.prototype.changeRoll = function (rl) {
    this.setRoll(this._roll + rl);
    return this;
};
/**
 * Sets the initial azimuth of the camera
 * @param {Number} el the azimuth in degrees
 */
nucleo.Camera.prototype.setAzimuth = function (az) {

    this._azimuth = this._getAngle(az);
    this._computeMatrix();

    this._getAxes();
    if (this.type == nucleo.Camera.TYPE.ORBITING || this.type == nucleo.Camera.TYPE.EXPLORING) {
        this._getPosition();
    }
    else if (this.type == nucleo.Camera.TYPE.TRACKING) {
        this._getFocalPoint();
    }
    return this;
};

nucleo.Camera.prototype.getAzimuth = function(){
    return this._azimuth;
}

/**
 * Sets the initial elevation of the camera
 * @param {Number} el the elevation in degrees
 */
nucleo.Camera.prototype.setElevation = function (el) {

    this._elevation = this._getAngle(el);
    this._computeMatrix();

    this._getAxes();
    if (this.type == nucleo.Camera.TYPE.ORBITING || this.type == nucleo.Camera.TYPE.EXPLORING) {
        this._getPosition();
    }
    else if (this.type == nucleo.Camera.TYPE.TRACKING) {
        this._getFocalPoint();
    }
    return this;
};

/**
 * Sets the initial roll of the camera
 * Rotates the camera around its view (forward) axis
 * @param {Number} angle the roll angle
 */
nucleo.Camera.prototype.setRoll = function (angle) {

    var Camera = nucleo.Camera;

    this._roll = this._getAngle(angle);
    this._computeMatrix();

    this._getAxes();
    if (this.type == Camera.TYPE.ORBITING || this.type == Camera.TYPE.EXPLORING) {
        this._getPosition();
    }
    else if (this.type == Camera.TYPE.TRACKING) {
        this._getFocalPoint();
    }
    return this;
};

/**
 * Changes the azimuth and elevation with respect to the current camera axes
 * @param {Number} azimuth the relative azimuth
 * @param {Number} elevation the relative elevation
 * @param {Number} roll the relative roll
 */
nucleo.Camera.prototype.rotate = function (azimuth, elevation, roll) {

    var Camera = nucleo.Camera;

    if (this.type == Camera.TYPE.EXPLORING) {

        azimuth   = this._getAngle(azimuth);
        elevation = this._getAngle(elevation);
        roll      = this._getAngle(roll);

        var rotX = quat.setAxisAngle(quat.create(), [1, 0, 0], -elevation * nucleo.define.DEG_2_RAD);
        var rotY = quat.setAxisAngle(quat.create(), [0, 1, 0], -azimuth * nucleo.define.DEG_2_RAD);

        if (this._rotate_world) {
            rotX = quat.setAxisAngle(quat.create(), [1, 0, 0], elevation * nucleo.define.DEG_2_RAD);
            rotY = quat.setAxisAngle(quat.create(), [0, 1, 0], azimuth * nucleo.define.DEG_2_RAD);
        }

        var rotZ = quat.setAxisAngle(quat.create(), [0, 0, 1], roll * nucleo.define.DEG_2_RAD);
        var rotQ = quat.multiply(quat.create(), rotY, rotX);

        rotQ          = quat.multiply(quat.create(), rotQ, rotZ);
        var rotMatrix = mat4.fromQuat(mat4.create(), rotQ);
        mat4.translate(this._matrix, this._matrix, [0, 0, -this._distance]);
        mat4.multiply(this._matrix, this._matrix, rotMatrix);
        mat4.translate(this._matrix, this._matrix, [0, 0, this._distance]);
    }
    else {
        if (Math.abs(this._elevation + elevation) > 90) return; //don't allow
        this._relElevation = this._getAngle(elevation);
        this._relAzimuth   = this._getAngle(azimuth);
        this._relRoll      = this._getAngle(roll);
        this._elevation += this._relElevation;
        this._azimuth += this._relAzimuth;
        this._roll += this._relRoll;

        this._computeMatrix();
    }


    this._getAxes();
    if (this.type == Camera.TYPE.ORBITING || this.type == Camera.TYPE.EXPLORING) {
        this._getPosition();
    }
    else if (this.type == Camera.TYPE.TRACKING) {
        this._getFocalPoint();
    }

    this._update();
    return this;
};


/**
 * Performs the dollying operation in the direction indicated by the camera normal axis.
 * The dollying mechanism offered by a camera makes sure that the camera moves fast
 * towards the object when the distance is large and slow when it is very close to the object.
 * For that effect, every time that the new position  (after dollying) is calculated, the field dstep is computed.
 *
 * @param {Number} value the dollying value
 *
 */
nucleo.Camera.prototype.dolly = function (value) {

    var Camera = nucleo.Camera;

    var n    = this._forward;
    var pos  = vec3.clone(this._position);
    var step = value * this._dollyingStep;
    pos[0] += step * n[0];
    pos[1] += step * n[1];
    pos[2] += step * n[2];

    this._setPosition(pos);
    if (this.type == Camera.TYPE.ORBITING || this.type == Camera.TYPE.EXPLORING) {
        this._getDistance();
    }
    else if (this.type == Camera.TYPE.TRACKING) {
        //move the focal point and keep the distance
        vec3.add(this._focalPoint, pos, this._distanceVector);
    }
    return this;
};

/**
 * Translates the camera side-to-side and up-and-down
 * @param {Number} dx the horizontal displacement
 * @param {Number} dy the vertical displacement
 */
nucleo.Camera.prototype.pan = function (tx, ty) {

    var coords = nucleo.util.createVec3(tx, ty, 0);
    var pos    = vec3.clone(this._position);

    vec3.add(pos, pos, vec3.scale(vec3.create(), this._right, coords[0]));
    vec3.add(pos, pos, vec3.scale(vec3.create(), this._up, coords[1]));

    this._setPosition(pos);

    return this;
};

/**
 * Translates the camera by a given vector
 *
 * @param {Number, Array, vec3} x it can be the x coordinate, a 3-dimensional Array or a vec3 (glMatrix)
 * @param {Number} y if x is a number, then this parameter corresponds to the y-coordinate
 * @param {Number} z if x is a number, then this parameter corresponds to the z-coordinate
 */
nucleo.Camera.prototype.translate = function (x, y, z) {

    var coords = nucleo.util.createVec3(x, y, z);
    var pos    = vec3.clone(this._position);

    vec3.add(pos, pos, coords);
    this._setPosition(pos);
    return this;
};


/**
 * This method updates the 3D scene
 * This is the call stack:
 * Camera.refresh -> View.refresh -> Renderer.render
 */
nucleo.Camera.prototype.refresh = function () {
    this.view.refresh();
    return this;
};


/**
 *  Looks at a given actor without displacing the camera
 *  @param {String, Actor} actor The name of the actor or the actor object this camera will look at.
 */
nucleo.Camera.prototype.lookAt = function (actor) {

    if (actor instanceof nucleo.Actor) {
        this.setFocalPoint(actor._position);
    }

    else if (typeof(actor) == 'string') {
        var actor = this.view.scene.getActorByName(actor);
        if (actor == undefined) {
            throw 'Camera.lookAt ERROR: The actor ' + actorName + ' does not exist'
        }
        else {
            this.setFocalPoint(actor._position);
        }
    }
    return this;
};


/**
 *  Performs a close up of an actor.
 *  @param {String, Actor}  actor The name of the actor or the actor object this camera will look at.
 *  @see <a href="http://en.wikipedia.org/wiki/Close-up">Close-up (Wikipedia)</a>
 */
nucleo.Camera.prototype.closeUp = function (actor) {
    if (actor instanceof nucleo.Actor) {
        this._shot(actor._bb);
    }
    else if (typeof(actor) == 'string') {
        var actor = this.view.scene.getActorByName(actor);
        if (actor == undefined) {
            throw 'Camera.lookAt ERROR: The actor ' + actorName + ' does not exist'
        }
        else {
            this._shot(actor._bb);
        }
    }
    return this;
};

/**
 * The camera moves to a position where all the actors in the scene are viewed. The actors
 * are seen in full within their surrounding environment.
 *
 * A long shot uses the global bounding box of the view's scene
 * @see <a href="http://en.wikipedia.org/wiki/Long_shot">Long Shot (Wikipedia)</a>
 */
nucleo.Camera.prototype.longShot = function () {
    this.view.scene.computeBoundingBox(); //perfect example of BY DEMAND UPDATING OF BB
    this._shot(this.view.scene.bb);
    return this;
};

/**
 * Changes the field of view of the  camera
 *
 * @param{Number} fov the field of view in degrees [0-360]
 * @see <a href="http://en.wikipedia.org/wiki/Angle_of_view">Angle of view</a>
 */
nucleo.Camera.prototype.setFieldOfView = function (fov) {
    this._fov = fov;
    return this;
};

/**
 * Creates a new landmark without moving the camera. It basically defines
 * 'future' landmarks.
 * @param {String} name the landmark given name
 * @param {Array, vec3} position the position of this landmark
 * @param {Array, vec3} focalPoint the desired focalPoint for the camera at the landmark
 * @see Landmark
 */
nucleo.Camera.prototype.createLandmark = function (name, position, focalPoint, roll) {

    var c = new Camera(this.view, this.type);
    c.setPosition(position);
    c.setFocalPoint(focalPoint);
    if (roll != undefined) {
        c.setRoll(roll);
    }
    var l = new Landmark(name, c);
    this.landmarks.push(l);
    return this;
};

/**
 * Saves the current camera state in a landmark
 * @param {String} name the landmark name
 * @see Landmark
 */
nucleo.Camera.prototype.setLandmark = function (name) {
    var l = new Landmark(name, this);
    this.landmarks.push(l);
    return this;
};


/**
 * Retrieves the landmark by name from the known landmarks
 * @param {String} name the landmark name
 * @param {Number} length (optional) the duration of the animation
 * @param {Number} fps (optional) the number of frames per second (estmate)
 * two landmarks.
 * @see Landmark
 */
nucleo.Camera.prototype.gotoLandmark        = function (name, length, fps) {

    var lmark = undefined;
    var i     = this.landmarks.length;
    while (i--) {
        if (this.landmarks[i].name == name) {
            lmark = this.landmarks[i];
            break;
        }
    }

    if (lmark == undefined) {
        console.warn('Camera.goTo: landmark with name: ' + name + ', was not found');
        return;
    }

    if (length == undefined || length == 0) {
        lmark.retrieve(this);
        return;
    }

    if (this._lmarkAnimationID != undefined) {
        window.clearTimeout(this._lmarkAnimationID);
    }

    var self      = this;
    var dest_pos  = lmark._position;
    var dest_fp   = lmark._focalPoint;
    var dest_roll = lmark._roll;

    if (length == undefined) {
        length = 1000;
    }
    if (fps == undefined) {
        fps == 20;
    }

    var interactor = this.view.interactor;
    interactor.disconnectFromView(); //do not process events during animation

    function animate(length, resolution) {
        var steps = (length / 100) * (resolution / 10),
            speed = length / steps,
            count = 0,
            start = new Date().getTime();

        function iteration() {

            var inter_fp   = vec3.create();
            var inter_pos  = vec3.create();
            var inter_roll = 0;
            if (count++ != steps) {
                percent  = count / steps;
                percent2 = (1 - Math.cos(percent * Math.PI)) / 2; //cosine interpolation is smoother
                inter_fp   = vec3.lerp(inter_fp, self._focalPoint, dest_fp, percent2);
                inter_pos  = vec3.lerp(inter_pos, self._position, dest_pos, percent2);
                inter_roll = self._roll * (1 - percent2) + dest_roll * (percent2);

                self.setFocalPoint(inter_fp);
                self.setPosition(inter_pos);
                self.setRoll(inter_roll);
                self.refresh();

                var dist = vec3.dist(inter_fp, dest_fp) + vec3.dist(inter_pos, dest_pos);
                if (dist > 0.01) {
                    var diff               = (new Date().getTime() - start) - (count * speed);
                    self._lmarkAnimationID = window.setTimeout(iteration, (speed - diff));
                }
                else {
                    self.setFocalPoint(dest_fp);
                    self.setPosition(dest_pos);
                    self.setRoll(dest_roll);
                    self.refresh();
                    interactor.connectView(this.view); //reconnect interactor
                }
                return;
            }
        };

        //first time invocation
        self._lmarkAnimationID = window.setTimeout(iteration, speed);
    }

    animate(length, fps);
    return this;

};
/**
 * The animation map has one entry per gotoLandmark step
 * steps = [ ['landmark_1',duration_1, fps_1],
 *           ['landmark_2',duration_2, fps_2],
 *           ...
 *           ['landmark_N,duration_N,fps_N]];
 * }
 */
nucleo.Camera.prototype.doLandmarkAnimation = function (steps) {

    var _steps = steps.slice(0); //copy so we can destroy it
    var camera = this;

    function processStep() {
        if (_steps.length == 0) {
            return;
        }

        if (camera._stop_lmark_animation) {
            camera._stop_lmark_animation = false;
            nucleo.util.console('Landmark Animation Stopped', true);
            return;
        }

        step = _steps.splice(0, 1)[0];

        lmark    = step[0];
        duration = step[1];
        fps      = step[2];
        camera.gotoLandmark(lmark, duration, fps);
        window.setTimeout(processStep, duration);
    }

    processStep();
    return this;
};


/**
 * If there is a landmark based animation in progress it will stop it.
 */
nucleo.Camera.prototype.stopLandmarkAnimation = function () {
    this._stop_lmark_animation = true;
};

/**
 * Returns a list of known landmarks
 */
nucleo.Camera.prototype.getLandmarks = function () {
    var lmarks = [];
    var i      = this.landmarks.length;
    while (i--) {
        lmarks.push(this.landmarks[i].name);
    }
    return lmarks;
};

/**
 * This method sets the camera to a distance such that the area covered by the bounding box (parameter)
 * is viewed.
 * @param {BoundingBox} bb the bounding box
 */
nucleo.Camera.prototype._shot = function (bb) {

    this.setElevation(0);
    this.setAzimuth(0);
    this.setRoll(0);

    var maxDim = Math.max(bb[3] - bb[0], bb[4] - bb[1]);

    cc = [0, 0, 0];

    cc[0] = (bb[3] + bb[0]) / 2;
    cc[1] = (bb[4] + bb[1]) / 2;
    cc[2] = (bb[5] + bb[2]) / 2;

    cc[0] = Math.round(cc[0] * 1000) / 1000;
    cc[1] = Math.round(cc[1] * 1000) / 1000;
    cc[2] = Math.round(cc[2] * 1000) / 1000;

    if (maxDim != 0) {
        var d = 1.5 * maxDim / (Math.tan(this._fov * Math.PI / 180));
        this.setPosition([cc[0], cc[1], cc[2] + d]);
    }

    this.setFocalPoint(cc);
    this.refresh();
};


/**
 * <p>Forces the aspect ratio of the camera to a certain value.</p>
 * <p>To go back to the default aspect ratio that relies on the dimensions
 * of the view associated to this camera use:
 *
 * <code>setAspectRatio(undefined)</code>
 *
 * </p>
 * @param {Number} p_aspect the new aspect ratio
 */
nucleo.Camera.prototype.setAspectRatio = function (p_aspect) {
    this._aspect = p_aspect;
}

/**
 * Sets the perspective of the camera. Defines the viewing frustum and its shape
 * @param {Number} p_near the distance from the camera to the near plane
 * @param {Number} p_far the distance from the camera to the far plane
 * @param {Number} p_angle the vertical field of view in degrees
 * @param {Number} p_aspect the desired aspect ratio (optional). If not defined the camera
 * automatically selects the current width/height radio of the respective view.
 */
nucleo.Camera.prototype.setPerspective = function (p_near, p_far, p_angle, p_aspect) {
    var view = this.view;

    this._fov    = p_angle;
    this._near   = p_near;
    this._far    = p_far;
    this._aspect = p_aspect;
    var rads     = nucleo.util.deg2rad(p_angle);

    if (this._aspect == undefined) {
        mat4.perspective(this._perspective, rads, view.width / view.height, this._near, this._far);
    }
    else {
        mat4.perspective(this._perspective, rads, this._aspect, this._near, this._far);
    }
};

/**
 * Updates the current perspective matrix when one of the internal perspective variables
 * [near,far,fov] has changed, or when the view has changed its dimensions [width, height]
 *
 */
nucleo.Camera.prototype.updatePerspective = function () {
    var view = this.view;
    var rads = nucleo.util.deg2rad(this._fov);
    if (this._aspect == undefined) {
        mat4.perspective(this._perspective, rads, view.width / view.height, this._near, this._far);
    }
    else {
        mat4.perspective(this._perspective, rads, this._aspect, this._near, this._far);
    }
};

/**
 * Prints a summary of the camera variables on the browser's console
 */
nucleo.Camera.prototype.status = function () {
    console.info('------------- Camera Status -------------');
    console.info('       type: ' + this.type);
    console.info('      right: ' + nucleo.util.format(this._right, 2));
    console.info('         up: ' + nucleo.util.format(this._up, 2));
    console.info('    forward: ' + nucleo.util.format(this._forward, 2));
    console.info('   position: ' + nucleo.util.format(this._position, 2));
    console.info('focal point: ' + nucleo.util.format(this._focalPoint, 2));

    console.info('    azimuth: ' + nucleo.util.format(this._azimuth, 2));
    console.info('  elevation: ' + nucleo.util.format(this._elevation, 2));
    console.info('       roll: ' + nucleo.util.format(this._roll, 2));
    console.info('   distance: ' + nucleo.util.format(this._distance, 2));
    console.info('   d vector: ' + nucleo.util.format(this._distanceVector, 2));
};


/**
 * Inverts the camera mattrix to obtain the correspondent Model-View Transform
 * @returns {mat4} m the Model-View Transform
 */
nucleo.Camera.prototype.getViewTransform = function () {
    return mat4.invert(mat4.create(), this._matrix);
};

/**
 * Sets the camera matrix
 * @param {mat4} matrix the new camera matrix
 */
nucleo.Camera.prototype.setMatrix = function (matrix) {
    this._matrix = matrix;
    this._update();
};

/**
 * Sets the  camera matrix
 * @private
 */
nucleo.Camera.prototype._computeMatrix = function () {

    var rotX,
        rotY,
        rotZ = quat.setAxisAngle(quat.create(), [0, 0, 1], this._roll * nucleo.define.DEG_2_RAD);

    mat4.identity(this._matrix);
    if (this.type == nucleo.Camera.TYPE.TRACKING) {
        rotX = quat.setAxisAngle(quat.create(), [1, 0, 0], this._elevation * nucleo.define.DEG_2_RAD);
        rotY = quat.setAxisAngle(quat.create(), [0, 1, 0], this._azimuth * nucleo.define.DEG_2_RAD);
    }
    else {
        //only consider HCS for EXPLORING and ORBITING cameras
        if (this._rotate_world) {
            rotX = quat.setAxisAngle(quat.create(), [1, 0, 0], this._elevation * nucleo.define.DEG_2_RAD);
            rotY = quat.setAxisAngle(quat.create(), [0, 1, 0], this._azimuth * nucleo.define.DEG_2_RAD);
        }
        else {
            rotX = quat.setAxisAngle(quat.create(), [1, 0, 0], -this._elevation * nucleo.define.DEG_2_RAD);
            rotY = quat.setAxisAngle(quat.create(), [0, 1, 0], -this._azimuth * nucleo.define.DEG_2_RAD);
        }
    }


    var rotQ      = quat.multiply(quat.create(), rotY, rotX);
    rotQ          = quat.multiply(quat.create(), rotQ, rotZ);
    var rotMatrix = mat4.fromQuat(mat4.create(), rotQ);

    if (this.type == nucleo.Camera.TYPE.ORBITING || this.type == nucleo.Camera.TYPE.EXPLORING) {
        mat4.translate(this._matrix, this._matrix, this._focalPoint);
        mat4.multiply(this._matrix, this._matrix, rotMatrix);
        mat4.translate(this._matrix, this._matrix, [0, 0, this._distance]);
    }
    else if (this.type == nucleo.Camera.TYPE.TRACKING) {
        mat4.translate(this._matrix, this._matrix, this._position);
        mat4.multiply(this._matrix, this._matrix, rotMatrix);
    }
};


/**
 * Sets the camera position in the camera matrix
 * @private
 */
nucleo.Camera.prototype._setPosition = function (x, y, z) {
    this._position = nucleo.util.createVec3(x, y, z);
    var m          = this._matrix;
    m[12]          = this._position[0];
    m[13]          = this._position[1];
    m[14]          = this._position[2];
    m[15]          = 1;
};

/**
 * Recalculates axes based on the current matrix
 * @private
 */
nucleo.Camera.prototype._getAxes = function () {
    var m = this._matrix;
    vec3.copy(this._right, vec4.transformMat4(vec4.create(), [1, 0, 0, 0], m));
    vec3.copy(this._up, vec4.transformMat4(vec4.create(), [0, 1, 0, 0], m));
    vec3.copy(this._forward, vec4.transformMat4(vec4.create(), [0, 0, 1, 0], m));
    vec3.normalize(this._right, this._right);
    vec3.normalize(this._up, this._up);
    vec3.normalize(this._forward, this._forward);
};

/**
 * Recalculates the position based on the current matrix
 * Called only when camera is of ORBITING type
 * @private
 */
nucleo.Camera.prototype._getPosition = function () {
    var m = this._matrix;
    vec3.copy(this._position, vec4.transformMat4(vec4.create(), [0, 0, 0, 1], m));
    this._getDistance();
};

/**
 * Called only when camera is of TRACKING type
 * @private
 */
nucleo.Camera.prototype._getFocalPoint = function () {

    vec3.transformMat3(this._distanceVector, [0, 0, -this._distance], mat3.fromMat4(mat3.create(), this._matrix));
    vec3.add(this._focalPoint, this._position, this._distanceVector);
    this._getDistance();
};

/**
 * Recalculates the distance variables based on the current state
 * @private
 */
nucleo.Camera.prototype._getDistance = function () {
    this._distanceVector = vec3.subtract(vec3.create(), this._focalPoint, this._position);
    this._distance       = vec3.length(this._distanceVector);
    this._dollyingStep   = this._distance / 100;
};

/**
 * Recalculates euler angles based on the current state
 * @private
 */
nucleo.Camera.prototype._getAngles = function () {


    //Recalculates angles  
    var x = this._distanceVector[0], y = this._distanceVector[1], z = this._distanceVector[2];
    var r = vec3.length(this._distanceVector);

    //FAST FAIL: If there is no distance we cannot compute angles
    if (r == 0) {
        this._elevation = 0;
        this._azimuth   = 0;
        return;
    }

    if (this.type == nucleo.Camera.TYPE.TRACKING) {
        this._elevation = Math.asin(y / r) * nucleo.define.RAD_2_DEG;
        this._azimuth   = Math.atan2(-x, -z) * nucleo.define.RAD_2_DEG;
    }
    else {
        if (this._rotate_world) {
            this._elevation = Math.asin(y / r) * nucleo.define.RAD_2_DEG;
            this._azimuth   = Math.atan2(-x, -z) * nucleo.define.RAD_2_DEG;
        }
        else {
            this._elevation = -1 * Math.asin(y / r) * nucleo.define.RAD_2_DEG;
            this._azimuth   = -1 * Math.atan2(-x, -z) * nucleo.define.RAD_2_DEG;

        }
    }

};


/**
 * Recalculates the camera state from the camera matrix
 * @private
 */
nucleo.Camera.prototype._update = function () {
    this._getAxes();
    this._getPosition();
    this._getDistance();
    this._getAngles();
};

/**
 * @private
 */
nucleo.Camera.prototype._calculateAngles = function () {
    var rotM = mat4.toMat3(this._matrix);
    var Q    = mat3.toQuat4(rotM);
    var x    = Q[0], y = Q[1], z = Q[2], w = Q[3];

    var roll  = Math.atan2(2 * (w * x + y * z), 1 - 2 * (x * x + y * y)) * nucleo.define.RAD_2_DEG;
    var pitch = Math.asin(2 * (w * y - z * y)) * nucleo.define.RAD_2_DEG;
    var yaw   = Math.atan2(2 * (w * z + x * y), 1 - 2 * (y * y + z * z)) * nucleo.define.RAD_2_DEG;

    console.info(' roll :' + nucleo.util.format(roll, 2));
    console.info('pitch :' + nucleo.util.format(pitch, 2));
    console.info('  yaw :' + nucleo.util.format(yaw, 2));
};

/**
 * Returns an angle between 0 and 360 degrees
 * @private
 */
nucleo.Camera.prototype._getAngle = function (angle) {

    if (angle == undefined) {
        return 0;
    }
    else if (angle > 360 || angle < -360) {
        return angle % 360;
    }
    else return angle;
};
 
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
 * @class The camera manager is responsible for controlling the cameras associated with a view 
 * @constructor
 * @param {View} vw the view
 * @see Camera
 * @see View
 */
nucleo.CameraManager = function CameraManager(vw){
	this.view = vw;
	this.cameras = [];
	this.active = this.create(nucleo.Camera.TYPE.EXPLORING); //exploring is the default type
}

/**
 * Resets the camera manager and creates one camera
 * @param {Camera.TYPE} type the type of amera
 */
nucleo.CameraManager.prototype.reset = function(type){
	this.cameras = [];
	this.interactors = [];
	this.active = this.create(type);
};


/**
 * Creates a camera
 * @param {Camera.TYPE} type the type of camera to create
 */
nucleo.CameraManager.prototype.create = function(type){
	var camera = new nucleo.Camera(this.view, type);
	this.cameras.push(camera);
	return camera;
};

/**
 * Removes a camera from the camera manager. Please notice that this operation
 * will cause reindexing. So, if the camera manager has cameras 0, 1, 2  and camera 1
 * is removed then camera 2 will be now camera 1 so the index is maintained.
 * 
  * @param {Number} idx the index of the camera to be removed
 */
nucleo.CameraManager.prototype.remove = function(idx){
    if (this.cameras.length == 1){
        throw ('CameraManager.remove ERROR: the camera manager must not eliminate the last camera standing. Operation cancelled');
    }
    else{
        this.cameras.splice(idx,1);
    }
};

/**
 * Returns the camera with index idx
 * @param {Number} idx the index of the camera to return
 */
nucleo.CameraManager.prototype.get = function(idx){
	this._checkBoundary(idx);
	return this.cameras[idx];
};


/**
 * Changes the active camera to the camera with index idx
 * @param {Number} idx the index of the camera to make active
 */
nucleo.CameraManager.prototype.switchTo = function(idx){
    var view = this.view;
	this._checkBoundary(idx);
	this.active = this.cameras[idx];
    
    if (view.interactor != undefined) {
        view.interactor.connectCamera(this.active);
    }
    else{
        throw ('CameraManager.switchTo ERROR: switching to camera ['+idx+'] while the view '+view.name+' does not have an interactor set');
    }

	return this.active;
};

/**
 * Utilitary method that check if the index idx is between 0 and the size of the camera array
 * @param {Number} idx the index to check.
 * @private
 */
nucleo.CameraManager.prototype._checkBoundary = function(idx){
    if (idx <0 || idx >= this.cameras.length){
        throw('The camera '+idx+' does not exist');
    }
};/*-------------------------------------------------------------------------
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
 * @class Determines the application behaviour originated by mouse and keyboard events. 
 * @constructor
 * Interprets mouse and keyboard events and translate them to camera actions
 * @augments ViewInteractor
 */
nucleo.TrackerInteractor = function TrackerInteractor(){
    nucleo.ViewInteractor.call(this);
	this.MOTION_FACTOR = 10.0;
	this.task = nucleo.ViewInteractor.TASK.NONE;
	this._x            = 0;
	this._y            = 0;
	this._lastX        = 0;
	this._lastY        = 0;
	this._lastClickedX = 0;
	this._lastClickedY = 0;
	this._ctrl_key     = false;
	this._alt_key      = false;
	this._shift_key    = false;
	this._key          = 0;
	this._button       = -1;
	this._dragging     = false;
	this._dragndrop    = false;
	this._is_mac       = nucleo.util.isMac();
	
	this.addKeyAction('F', function(view,cam){view.fullscreen(true);});
	this.addKeyAction('X', function(view,cam){view.fullscreen(false);});
	
};


nucleo.TrackerInteractor.prototype = new nucleo.ViewInteractor();
nucleo.TrackerInteractor.prototype.constructor = nucleo.TrackerInteractor;

/**
 * Returns the type of this interactor as a string 
 */
nucleo.TrackerInteractor.prototype.getType = function(){
    return "TrackerInteractor";
};

/**
 * Invoked when the user presses a key
 */
nucleo.TrackerInteractor.prototype.onKeyDown = function(ev){

    this._key             = ev.keyCode;
    this._alt_key         = ev.altKey;
    this._shift_key       = ev.shiftKey;
    
    var camera = this.camera;
    
    
    if (!this._alt_key && !this._shift_key){
        switch(this._key){
              case 38:camera.changeElevation(10);  break;
              case 40:camera.changeElevation(-10); break;
              case 37:camera.changeAzimuth(-10);   break;
              case 39:camera.changeAzimuth(10);    break;
              default: this.fireKeyAction(this._key);
        }
    }
    //PANNING
    else if(this._shift_key && this._key!=17) {
        var px = 0;
        var py = 0;
        switch(this._key){
            case 38:py = 10; break;
            case 40:py = -10;break;
            case 37:px = -10;break;
            case 39:px = 10; break;
            default: this.fireKeyAction(this._key);
        }
        if(px != 0 || py !=0){
            this.pan(px,py);
        }
    }
    this.camera.refresh();
};

/**
 * Invoked when the user releases a key
 */
nucleo.TrackerInteractor.prototype.onKeyUp = function(ev){
    if (ev.keyCode == 17){
        this._ctrl_key = false;
    }
};

/**
 * Invoked when the user releases the mouse
 */
nucleo.TrackerInteractor.prototype.onMouseUp = function(ev){
	task = nucleo.ViewInteractor.TASK.NONE;
	this._dragging = false;
};

/**
 * Invoked when the user presses a mouse button
 */
nucleo.TrackerInteractor.prototype.onMouseDown = function(ev){
	this._x             = ev.clientX;
	this._y             = ev.clientY;
	this._lastClickedX  = this._x;
	this._lastClickedY  = this._y;
	this._button        = ev.button;
	this._dragging      = true;
};

/**
 * Invoked when the user moves the mouse
 */
nucleo.TrackerInteractor.prototype.onMouseMove = function(ev){

	this._lastX         = this._x;
	this._lastY         = this._y;
	this._x             = ev.clientX;
    this._y             = ev.clientY;

	if (!this._dragging) return;
    if (this._button !=0) return;  
	
	this._ctrl_key 	= ev.ctrlKey;
	
	if (this._is_mac && ev.metaKey){
	    this._ctrl_key = true;
	}
	
	this._alt_key       = ev.altKey;
	this._shift_key 	= ev.shiftKey;
	
	var rx = this._x - this._lastX;
	var ry = this._y - this._lastY;
		 
    if (this._ctrl_key && !this._shift_key){ 
		this.dolly(ry);
	}
	else if (this._shift_key && !this._ctrl_key){
		this.pan(rx,ry);
	}
	else if (this._ctrl_key && this._shift_key){
	    this.roll(ry);
	}
	else {

        this.rotate(rx,ry);
    }
	
	this.camera.refresh();
};


/**
 *  Invoked when the user drags a file over the view
 */
nucleo.TrackerInteractor.prototype.onDragOver = function(event){
    event.stopPropagation();
    event.preventDefault();
    
        
    if (this.view._dragndrop){
        if (!this._dragndrop){
            this.bgcolor = this.view.backgroundColor.slice(0);
            this._dragndrop = true;
        }
        event.dataTransfer.dropEffect = 'copy';
        this.view.setBackgroundColor(0,0.514,0.678); //vox color
    }
};

/**
 * Invoked when the user drags away from the view
 */
nucleo.TrackerInteractor.prototype.onDragLeave = function(event){
    event.stopPropagation();
    event.preventDefault();

    if (this.view._dragndrop){
        event.dataTransfer.dropEffect = 'copy';
        this.view.setBackgroundColor(this.bgcolor);
        this._dragndrop = false;
    }
    
};

/**
 * Processes the file that has been droped on the view
 * 
 * @TODO: this method only works for VTK ascii files. Review other formats 
 */
nucleo.TrackerInteractor.prototype.onDrop = function(event){
    event.stopPropagation();
    event.preventDefault();
    if (!this.view._dragndrop) return; //the view is configured to not accept dnd
    this._dragndrop = false;
    this.view.setBackgroundColor(this.bgcolor);
    
    var files = event.dataTransfer.files;
    var reader = new VTKReader(this.view.scene);
    if (reader.isSupported()){
        reader.readFile(files[0]);
    }
    else {
        throw 'TrackerInteractor.drop: File API is not supported on this browser';
    }
};

/**
 * By default, this method invokes a long shot operation on the current 
 * camera to visualize all the objects in the scene
 * @param {Object} event
 */
nucleo.TrackerInteractor.prototype.onDoubleClick = function(event){
    this.camera.longShot();
};


/**
 * Internal method used by this tracker to perform dollying
 * @param {Number} value the number of dollying steps
 */
nucleo.TrackerInteractor.prototype.dolly = function(value){
	
	this.task = nucleo.ViewInteractor.TASK.DOLLY;
    this.camera.dolly(value);
};

/**
 * Internal method used by this tracker to perform rolling
 * @param {Number} value the rolling angle
 */
nucleo.TrackerInteractor.prototype.roll = function(value){
    
    this.task = nucleo.ViewInteractor.TASK.ROLL;
    
    var canvas = this.camera.view.canvas;
    
    var dy = -20.0 / canvas.width;
    
    var rotY = value * dy * this.MOTION_FACTOR;
    
    this.camera.rotate(0,0,rotY);
};



/**    this._dragndrop = false;
 * Internal method used by this tracker to rotate the camera.
 * @param {Number} dx the rotation on the X axis (elevation)
 * @param {Number} dy the rotation on the Y axis (azimuth)
 */
nucleo.TrackerInteractor.prototype.rotate = function(rx, ry){
	
	this.task = nucleo.ViewInteractor.TASK.ROTATE;
	
	var canvas = this.camera.view.canvas;
	var dx = -20.0 / canvas.height;
	var dy = -20.0 / canvas.width;
	var motionFactorX = this.MOTION_FACTOR;
	var motionFactorY = this.MOTION_FACTOR;
	if (rx*rx > 2 * ry *ry){
	    motionFactorY *= 0.5;
	}
	else if (ry*ry > 2* rx*rx){
	    motionFactorX *= 0.5;
	}
	
	var rotX = rx * dx * motionFactorX;
	var rotY = ry * dy * motionFactorY;
	
	this.camera.rotate(rotX, rotY);
};

/**
 * Internal method used by this tracker to perform panning 
 * @param {Object} dx
 * @param {Object} dy
 */
nucleo.TrackerInteractor.prototype.pan = function(dx,dy){

	this.task = nucleo.ViewInteractor.TASK.PAN;
	
	var camera = this.camera;
	var canvas = camera.view.canvas;
	var scene = camera.view.scene;    this._dragndrop = false;
	var dimMax = Math.max(canvas.width, canvas.height);
	var deltaX = 1 / dimMax;
	var deltaY = 1 / dimMax;
	var max = scene.bb.max();
    var ndx = dx * deltaX * this.MOTION_FACTOR * max / 2;
	var ndy = -dy * deltaY * this.MOTION_FACTOR * max / 2;

	camera.pan(ndx,ndy);
};/*-------------------------------------------------------------------------
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
 * @class 
 * Interactor that implements a picking mechanism. 
 * @constructor   
 * 
 * @param {Object} view the view this interactor will observe
 * @param {Object} camera the camera this interactor will master
 * 
 * @author Diego Cantor
 * 
 * @since 0.89.1  initial release
 * @version 0.90.2 picking lists
 */
nucleo.PickerInteractor = function PickerInteractor(){
	nucleo.TrackerInteractor.call(this);
	this.timerID = -1;
	this.list = [];
	this.rate = 50;
	
	this._actors = [];
	this._picking_list = [];
	this._picking_mode = false;
	
	this._cellpicking = false;
	
};

nucleo.PickerInteractor.prototype = new nucleo.TrackerInteractor();
nucleo.PickerInteractor.prototype.constructor = nucleo.PickerInteractor;


nucleo.PickerInteractor.prototype.setCellPicking = function(flag){
    this._cellpicking = flag;
};

nucleo.PickerInteractor.prototype.getType = function(){
    return "PickerInteractor";
};

nucleo.PickerInteractor.prototype._getCoords = function(ev){
    var x, y, top = 0, left = 0, obj = this.view.canvas;
    var rect = obj.getBoundingClientRect();
    x = ev.clientX - rect.left;
    y = this.view.canvas.height - (ev.clientY - rect.top);
    return [x,y];
};

nucleo.PickerInteractor.prototype._getActorAt = function(x,y){
    
    var actor, results, color;
    
    var scene = this.view.scene;
    
    color  = this.view.renderer.readOffscreenPixel(x, y);
    if (color[0] == 0 && color[1] == 0 && color[2] == 0 && color[3] ==0){
        return null;
    }
    
    results = nucleo.Picker.instance.query(color);
    if (results == null) return null;
    
    actor  = scene.getActorByCellUID(results.uid);
    if (actor == null) { 
        actor = scene.getActorByUID(results.uid);
    }
    if (actor != null && actor.isPickable()){
        return actor;
    }
    return null;
};

/**
 * Reacts to the onmouse event on the canvas 
 * @param {Object} ev mouse event
 */
nucleo.PickerInteractor.prototype.onMouseDown = function(ev){
    
    nucleo.TrackerInteractor.prototype.onMouseDown.call(this, ev);
    ev.preventDefault();
    this.view.canvas.style.cursor = 'crosshair';
    
    
    coords = this._getCoords(ev);
    
    
    var actor = this._getActorAt(coords[0], coords[1]);
    if (actor == null){
        this._endPicking();
        return;
    }
    
    var idx = this._picking_list.indexOf(actor.UID);
    if ( idx == -1){
        if (actor._pick_callback != undefined){
            actor._pick_callback(actor, actor.UID);
        }
        this._picking_list.push(actor.UID);
        this._actors.push(actor);
    }
    else{
        this._picking_list.splice(idx,1);
        this._actors.splice(idx,1);
        if (actor._unpick_callback){
            actor._unpick_callback(actor, actor.UID);
        }
    }
};


/**
 *  Reacts to the onmouse up event on the canvas
 * @param {Object} ev
 */
nucleo.PickerInteractor.prototype.onMouseUp   = function(ev){
    nucleo.TrackerInteractor.prototype.onMouseUp.call(this, ev);
    
    if (!ev.shiftKey){
        this.view.canvas.style.cursor = 'default';
        this._endPicking();
    }
};

/**
 * Reacts to the onmouse move event on the canvas  
 * @param {Object} ev
 */
nucleo.PickerInteractor.prototype.onMouseMove = function(ev){
    ev.preventDefault();
    nucleo.TrackerInteractor.prototype.onMouseMove.call(this, ev);
};


nucleo.PickerInteractor.prototype.setCallback = function(callback){
    this.callback = callback; 
};

nucleo.PickerInteractor.prototype._endPicking = function(){
    if (this.callback){
        this.callback(this._actors);
    }
    var i = this._actors.length;
    while (i--){
        if (this._actors[i]._unpick_callback){
            this._actors[i]._unpick_callback(this._actors[i], this._actors[i].UID);
        }
    }
    this._actors = [];
    this._picking_list = [];
};
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
 * @class 
 * Interactor that implements a picking mechanism. Implemented in 0.89.1
 * @constructor   
 * @param {Object} view the view this interactor will observe
 * @param {Object} camera the camera this interactor will master
 * @author Diego Cantor
 */
nucleo.CellPickerInteractor = function CellPickerInteractor(){
    nucleo.TrackerInteractor.call(this);
    this.timerID = -1;
    this.list = [];
    this.rate = 5;

};

nucleo.CellPickerInteractor.prototype = new nucleo.TrackerInteractor();
nucleo.CellPickerInteractor.prototype.constructor = nucleo.CellPickerInteractor;


nucleo.CellPickerInteractor.prototype.getType = function(){
    return "CellPickerInteractor";
};

nucleo.CellPickerInteractor.prototype.get2DCoords = function(ev){
    var x, y, top = 0, left = 0, obj = this.view.canvas;
    var rect = obj.getBoundingClientRect();
    x = ev.clientX - rect.left;
    y = this.view.canvas.height - (ev.clientY - rect.top);
    return [x,y];
};


/**
 *  Reacts to the onmouse up event on the canvas
 * @param {Object} ev
 */
nucleo.CellPickerInteractor.prototype.onMouseUp   = function(ev){
    nucleo.TrackerInteractor.prototype.onMouseUp.call(this,ev);
    this.view.canvas.style.cursor = 'default';
    if (this.timerID != -1){
        clearInterval(this.timerID);
    }
};

/**
 * Reacts to the onmouse event on the canvas 
 * @param {Object} ev mouse event
 */
nucleo.CellPickerInteractor.prototype.onMouseDown = function(ev){
    nucleo.TrackerInteractor.prototype.onMouseDown.call(this,ev);
    ev.preventDefault();
    this.view.canvas.style.cursor = 'crosshair';
    this.list.push(this.get2DCoords(ev));
    this._doWork();   
    
    
    if (this.timerID != -1){
        clearInterval(this.timerID);
    }
    this.timerID = setInterval((function(self) {return function() {self._doWork();}})(this),this.rate); 
};

/**
 * Reacts to the onmouse move event on the canvas  
 * @param {Object} ev
 */
nucleo.CellPickerInteractor.prototype.onMouseMove = function(ev){
    ev.preventDefault();
    if (this._dragging){
        this.list.push(this.get2DCoords(ev));
    }
};

nucleo.CellPickerInteractor.prototype._doWork = function(){
  var i        = this.list.length;
  var renderer = this.view.renderer;
  var scene    = this.view.scene;  
  while(i--){
        var coords = this.list.pop();
        var color  = renderer.readOffscreenPixel(coords[0], coords[1]);

        if (color[0] == 0 && color[1] == 0 && color[2] == 0 && color[3] ==0){
            continue;
        }
        
        var results = nucleo.Picker.instance.query(color);
        
        if (results == null) continue;
        
        var actor  = scene.getActorByCellUID(results.uid);
        
        if (actor == null) { //try object UID
            actor = scene.getActorByUID(results.uid);
        }
        
        if (actor != null && actor.isPickable() && actor._pick_callback != undefined){
            actor._pick_callback(actor, results.uid);
        }
  }
};

nucleo.CellPickerInteractor.prototype.onKeyDown       = function(ev){};
nucleo.CellPickerInteractor.prototype.onKeyUp         = function(ev){};
nucleo.CellPickerInteractor.prototype.onDragOver      = function(ev){ };
nucleo.CellPickerInteractor.prototype.onDragLeave     = function(ev){};
nucleo.CellPickerInteractor.prototype.onDrop          = function(ev){};
nucleo.CellPickerInteractor.prototype.onDoubleClick   = function(ev){};/*-------------------------------------------------------------------------
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
 * This is a class that interfaces between the current camera and the rendering engine.
 * It contains the matrices used by the current camera and that will be used for 
 * performing rendering calculations.
 * 
 * This class also keeps track of the push-pop operations on the model-view matrix stack.
 * This is required to combine local and global transformations.
 * 
 * @class Encapsulates the matrices required to perform 3D rendering
 * @constructor
 * @author Diego Cantor
 * @param {View} p_view the view that this object will refer to.
 */
nucleo.Transforms = function Transforms(p_view){
	
	this._stack = [];
	this.view = p_view;
	
	this.model_view               = mat4.create();   // The Model-View matrix
	this.projection               = mat4.create();   // The projection matrix
	this.camera                   = mat4.create();   // The camera matrix
	this.normal                   = mat4.create();   // The normal matrix
	this.projection_model_view    = mat4.create();
};

/**
 * Calculates the current model-view transform.
 * This reference is updated whenever the active camera changes.
 */
nucleo.Transforms.prototype.calculateModelView = function(){
    //Copy is required so we can do push pop operations
	this.model_view = mat4.copy(this.model_view,this.view.cameraman.active.getViewTransform());
    
};

/**
 *Calculates the current camera matrix from the current model-view matrix 
 */
nucleo.Transforms.prototype.calculateCamera = function(){
    this.camera = mat4.inverse(this.camera, this.model_view);
};

/**
 * Calculates the normal matrix corresponding to the current Model-View matrix
 */
nucleo.Transforms.prototype.calculateNormal = function(){
	this.normal = mat4.clone(this.model_view);
    this.normal = mat4.invert(mat4.create(), this.normal);
    this.normal = mat4.transpose(this.normal, this.normal);
};

/**
 * Calculates the projection matrix given the current camera.
 * The projection may be orthographic or perspective
 */
nucleo.Transforms.prototype.calculateProjection = function(){
    var c = this.view.cameraman.active;
    c.updatePerspective();
    this.projection = c._perspective;  //for now
};

/**
 * Calculates the projection-model-view matrix 
 */
nucleo.Transforms.prototype.calculateProjectionModelView = function(){
    mat4.multiply(this.projection_model_view, this.projection, this.model_view);
};

/**
 * Calculate the transforms for the current view.renderer
 * 
 */
nucleo.Transforms.prototype.update = function(){
    this.calculateModelView();
    this.calculateProjection();
    this.calculateNormal();
    this.calculateProjectionModelView();
};

/**
 * Saves the current Model-View matrix in the stack. This
 * operation is called by Actor.updateMatrixStack
 * @see Actor#updateMatrixStack
 */

nucleo.Transforms.prototype.push = function(){
	var memento =  mat4.create();
	mat4.copy(memento, this.model_view);
	this._stack.push(memento);
};

/**
 * Retrieves the last Model-View transformation in the matrix stack.
 * This operation is called by Actor.updateMatrixStack
 */
nucleo.Transforms.prototype.pop = function(){
	if(this._stack.length == 0) return;
	
	this.model_view  =  this._stack.pop();
	
	this.calculatePerspective();
	this.calculateNormal();
	this.calculateProjectionModelView();
};/*-------------------------------------------------------------------------
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
 * @class Represents the ESSL source code of each program
 */
nucleo.Program = function Program(){
    this.ID = undefined;
    this.ATTRIBUTES = [];
    this.UNIFORMS = [];
    this.VERTEX_SHADER = "";
    this.FRAGMENT_SHADER = "";
    this.DEFAULTS = {};
};

/**
 * @param{prg} the instance to copy
 */
nucleo.Program.prototype.copy = function(prg){
    this.ID                 = prg.ID;
    this.ATTRIBUTES         = prg.ATTRIBUTES;
    this.UNIFORMS           = prg.UNIFORMS;
    this.VERTEX_SHADER      = prg.VERTEX_SHADER;
    this.FRAGMENT_SHADER    = prg.FRAGMENT_SHADER;
    this.DEFAULTS           = prg.DEFAULTS;
};

/**
 * Obtain the list of attributes and uniforms from the code
 */
nucleo.Program.prototype.introspect = function(){
    
    this.ATTRIBUTES = [];
    this.UNIFORMS = [];
    
    var code = this.VERTEX_SHADER.concat(this.FRAGMENT_SHADER);
    code = code.replace(/(\r\n|\n\r|\n)/gm,"");
    
    var uniforms   = code.match(/(uniform)\s*\w*\s*\w*/g);
    var attributes = code.match(/(attribute)\s*\w*\s*\w*/g);    
    
    if (uniforms.length == 0){
        throw new nucleoProgramException("The code for the program "+this.ID+" does not contain any valid uniforms");
    }
    
    if (attributes.length == 0){
        throw new nucleoProgramException("The code for the program "+this.ID+" does not contain any valid attributes");
    }
    
    for(var i=0, N = uniforms.length; i < N; i +=1){
        this.UNIFORMS.push(uniforms[i].substr(uniforms[i].lastIndexOf(" ")+1, uniforms[i].length));
    }
    
    for(var i=0, N = attributes.length; i < N; i +=1){
        this.ATTRIBUTES.push(attributes[i].substr(attributes[i].lastIndexOf(" ")+1, attributes[i].length));
    }
    
};
/**
 * Creates a program object from the ESSL scripts embedded in the DOM
 * @param {Object} id
 * @param {Object} vertexShaderId
 * @param {Object} fragmentShaderId
 */
nucleo.Program.createFromDOM = function(id, vertexShaderId,fragmentShaderId){

    var prg = new Program();
    
    prg.ID = id;
    var vsElement   = document.getElementById(vertexShaderId);
    var fsElement = document.getElementById(fragmentShaderId);
    
    if (vsElement == null || fsElement == null){
        throw new nucleoProgramException("shaders don't exist");
    }
    
    prg.VERTEX_SHADER = vsElement.innerHTML;
    prg.FRAGMENT_SHADER = fsElement.innerHTML;
    
    prg.introspect();
    
    return prg;
    
};

/**
 * Creates a new program from the JSON definition passed as parameter
 * @param {Object} json
 */
nucleo.Program.createFromJSON = function(json){
  
    var prg = new nucleo.Program();
     if (json.ID){
       prg.ID = json.ID;
     } //otherwise use the one defined in the constructor
      
     prg.VERTEX_SHADER   = json.VERTEX_SHADER;
     prg.FRAGMENT_SHADER = json.FRAGMENT_SHADER;
     prg.DEFAULTS        = json.DEFAULTS;
     prg.introspect();
     
     return prg;
  
};

/**
 * Creates a new program using the URLs... work in progress...
 * @param {Object} id
 * @param {Object} vertexShaderURL
 * @param {Object} fragmentShaderURL
 */
nucleo.Program.createFromTextURL = function(id, vertexShaderURL, fragmentShaderURL){
  //TODO: check $ajax with no async  
  //  $.ajax(vs_url, {async: false, dataType: "text"}).done(function(data){m_VertexShaderSource = data;});
  //$.ajax(fs_url, {async: false, dataType: "text"}).done(function(data){m_FragmentShaderSource = data;});
};



/**
 * 
 * @param {Object} message
 */
function nucleoProgramException(message){
    this.message = "nucleoProgramException:" + message;
};
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
 * @class
 * @private
 */


nucleo.LambertProgram = function LambertProgram(){
    
    this.copy(nucleo.Program.createFromJSON({
    
        ID : 'lambert',
        VERTEX_SHADER : [
        "attribute vec3 aVertexPosition;",
        "attribute vec3 aVertexNormal;",
        "attribute vec3 aVertexColor;",
        "attribute vec2 aVertexTextureCoords;",
        "uniform float uPointSize;",
        "uniform mat4 mModelView;",
        "uniform mat4 mPerspective;",
        "uniform mat4 mNormal;",
        "uniform vec3 uLightDirection;",
        "uniform vec4 uLightAmbient;",  
        "uniform vec4 uLightDiffuse;",
        "uniform vec4 uMaterialDiffuse;",
        "uniform bool uUseShading;",
        "uniform bool uUseVertexColors;",
        "uniform bool uUseLightTranslation;",
        "uniform bool uUseTextures;",
        "varying vec4 vFinalColor;",
        "varying vec2 vTextureCoords;",
        
        "void main(void) {",
        "   gl_Position = mPerspective * mModelView * vec4(aVertexPosition, 1.0);",
        "   gl_PointSize = uPointSize;",
        "   if (uUseVertexColors) {",
        "       vFinalColor = vec4(aVertexColor,uMaterialDiffuse.a);",
        "   }",
        "   else {",
        "       vFinalColor = uMaterialDiffuse;",
        "   }",
        "   if (uUseShading){",
        "       vec3 N = normalize(vec3(mNormal * vec4(aVertexNormal, 1.0)));",
        "       vec3 L = normalize(uLightDirection);",
        "       if (uUseLightTranslation){ L = vec3(mNormal * vec4(L,1.0));}",
        "       float lambertTerm = max(dot(N,-L),0.4);",
        "       vec4 Ia = uLightAmbient;",
        "       vec4 Id = vFinalColor * uLightDiffuse * lambertTerm;",
        "       vFinalColor = Ia + Id;",
        "       vFinalColor.a = uMaterialDiffuse.a;",
        "   }" ,
        "   if (uUseTextures){" ,
        "       vTextureCoords = aVertexTextureCoords;",
        "   }",
        "}"].join('\n'),
        
        FRAGMENT_SHADER : [
        "#ifdef GL_ES",
        "precision highp float;",
        "#endif",
    
        "varying vec4      vFinalColor;",
        "varying vec2      vTextureCoords;",
        "uniform bool      uUseTextures;",
        "uniform sampler2D uSampler;",
    
        "void main(void)  {",
        "   if (uUseTextures){",
        "       gl_FragColor = texture2D(uSampler, vTextureCoords);",
        "   }",
        "   else{",
        "       gl_FragColor = vFinalColor;",
        "   }",
        "}"].join('\n'),
        
        DEFAULTS : {
            "uLightDirection"   : [0.0,0.0,-1.0],
            "uLightAmbient"     : [0.0,0.0,0.0,1.0],
            "uLightDiffuse"     : [1.0,1.0,1.0,1.0],
            "uMaterialDiffuse"  : [0.9,0.9,0.9,1.0],
            "uPointSize"        : 1.0,
            "uUseLightTranslation" : false
        }
    }));
  
};

nucleo.LambertProgram.prototype = new nucleo.Program();
nucleo.LambertProgram.prototype.constructor = nucleo.LambertProgram;
nucleo.ESSL.LAMBERT_PROGRAM = new nucleo.LambertProgram();
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
 * @class
 * @private
 */

nucleo.PhongProgram = function PhongProgram(){
    
    this.copy(nucleo.Program.createFromJSON({

        ID : 'phong',

        VERTEX_SHADER: [
        "attribute vec3 aVertexPosition;",
        "attribute vec3 aVertexNormal;",
        "attribute vec3 aVertexColor;",
        "attribute vec2 aVertexTextureCoords;",
        "uniform float uPointSize;",
        "uniform mat4 mModelView;",
        "uniform mat4 mPerspective;",
        "uniform mat4 mModelViewPerspective;",
        "uniform mat4 mNormal;",
        "uniform bool uUseVertexColors;",
        "varying vec3 vNormal;",
        "varying vec3 vEyeVec;",
        "varying vec4 vFinalColor;",
        "varying vec2 vTextureCoords;",
        "uniform bool uUseTextures;",
        
        "void main(void) {",
        "  gl_Position = mPerspective * mModelView * vec4(aVertexPosition, 1.0);",
        "  gl_PointSize = uPointSize;",
        "   if(uUseVertexColors) {",
        "       vFinalColor = vec4(aVertexColor,1.0);",
        "       return;",  
        "   }",
        "   vec4 vertex = mModelView * vec4(aVertexPosition, 1.0);",
        "   vNormal = vec3(mNormal * vec4(aVertexNormal, 1.0));",
        "   vEyeVec = -vec3(vertex.xyz);",
        "   if (uUseTextures){" ,
        "       vTextureCoords = aVertexTextureCoords;",
        "   }",
        "}"].join('\n'),
    
        FRAGMENT_SHADER : [
        "#ifdef GL_ES",
        "precision highp float;",
        "#endif",
        
        "uniform bool uUseShading;",
        "uniform bool uUseVertexColors;",
        "uniform float uShininess;      ",
        "uniform vec3 uLightDirection;  ",
        
        "uniform vec4 uLightAmbient;    ",
        "uniform vec4 uLightDiffuse;    ",
        "uniform vec4 uLightSpecular;   ",
        
        "uniform vec4 uMaterialAmbient; ",
        "uniform vec4 uMaterialDiffuse; ",
        "uniform vec4 uMaterialSpecular;",
        
        "varying vec3 vNormal;",
        "varying vec3 vEyeVec;",
        "varying vec4 vFinalColor;",
        
        "varying vec2      vTextureCoords;",
        "uniform bool      uUseTextures;",
        "uniform sampler2D uSampler;",
        
        "void main(void)",
        "{",
         "  vec4 finalColor = vec4(0.0);",
         "  vec3 L = normalize(uLightDirection);",
         "  vec3 N = normalize(vNormal);",
         "  float lambertTerm = dot(N,-L);",
         "  vec4 Ia = uLightAmbient * uMaterialAmbient;",
         "  vec4 Id = vec4(0.0,0.0,0.0,1.0);",
         "  vec4 Is = vec4(0.0,0.0,0.0,1.0);",
         "  vec4 varMaterialDiffuse = uMaterialDiffuse;",
         "  if(uUseVertexColors) {",
         "        varMaterialDiffuse = vFinalColor;",
         "   }",
         "  if(uUseShading){  ",
         "      if(lambertTerm > 0.0)",
         "      {",
         "          Id = uLightDiffuse * varMaterialDiffuse * lambertTerm;",
         "          vec3 E = normalize(vEyeVec);",
         "          vec3 R = reflect(L, N);",
         "          float specular = pow( max(dot(R, E), 0.0), uShininess);",
         "          Is = uLightSpecular * uMaterialSpecular * specular;",
         "      }",
         "      finalColor = Ia + Id + Is;",
         "      finalColor.a = uMaterialDiffuse.a;",
         "  } ",
         "  else {",
         "      finalColor = varMaterialDiffuse; ", 
         "  }",
         "   if (uUseTextures){",
         "       finalColor =  texture2D(uSampler, vec2(vTextureCoords.s, vTextureCoords.t));",
         "   }",
         "   gl_FragColor = finalColor;",
         "}"].join('\n'),
    
        DEFAULTS : {
            "uShininess"        : 230.0,
            "uLightDirection"   : [0.0, -1.0, -1.0],
            "uLightAmbient"     : [0.03,0.03,0.03,1.0],
            "uLightDiffuse"     : [1.0,1.0,1.0,1.0], 
            "uLightSpecular"    : [1.0,1.0,1.0,1.0],
            "uMaterialAmbient"  : [1.0,1.0,1.0,1.0],
            "uMaterialDiffuse"  : [0.8,0.8,0.8,1.0],
            "uMaterialSpecular" : [1.0,1.0,1.0,1.0]
        }
    }));
   
};
nucleo.PhongProgram.prototype = new nucleo.Program();
nucleo.PhongProgram.prototype.constructor = nucleo.PhongProgram;
nucleo.ESSL.PHONG_PROGRAM  = new nucleo.PhongProgram();
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
 * @private
 * @class
 */



nucleo.BakeProgram = function BakeProgram(){
    
    this.copy(nucleo.Program.createFromJSON({
    
        ID : 'bake',
    
        VERTEX_SHADER : [
        "attribute vec3 aVertexPosition;",
        "attribute vec3 aVertexNormal;",
        "attribute vec3 aVertexColor;",
        "attribute vec3 aPosition;",
        "attribute vec3 aScale;",
        "attribute float aShading;",
        
        "uniform mat4 mModelView;",
        "uniform mat4 mPerspective;",
        "uniform mat4 mNormal;",
        "uniform mat4 mModelViewPerspective;",
    
        "uniform vec3 uLightDirection;",
        "uniform vec4 uLightAmbient;",  
        "uniform vec4 uLightDiffuse;",
        "uniform bool uUseLightTranslation;",
        "varying vec4 vFinalColor;",
        
        "void main(void) {",
        "   vec3 position = (aVertexPosition * aScale) + aPosition;",
        "   gl_Position = mModelViewPerspective * vec4(position, 1.0);",
        "   vFinalColor = vec4(aVertexColor,1.0);",
        
        "   if (aShading == 1.0){",
        "      vec3 N = vec3(mNormal * vec4(aVertexNormal, 1.0));",
        "      vec3 L = normalize(uLightDirection);",
        "      if (uUseLightTranslation) { L = vec3(mNormal * vec4(L,1.0));}",
        "      float lambertTerm = max(dot(N,-L),0.4);",
        "      vec4 Ia = uLightAmbient;",
        "      vec4 Id = vFinalColor * uLightDiffuse * lambertTerm;",
        "      vFinalColor = Ia + Id;",
        "      vFinalColor.a = 1.0;",
        "   }",
        "}"].join('\n'),
        
        FRAGMENT_SHADER : [
        "#ifdef GL_ES",
        "precision highp float;",
        "#endif",
    
        "varying vec4  vFinalColor;",
    
        "void main(void)  {",
        "       gl_FragColor = vFinalColor;",
        "}"].join('\n'),
        
        DEFAULTS : {
            "uLightDirection"   : [0.0,0.0,-1.0],
            "uLightAmbient"     : [0.0,0.0,0.0,1.0],
            "uLightDiffuse"     : [1.0,1.0,1.0,1.0],
            "uUseLightTranslation" : false
        }
    }));
 
};

nucleo.BakeProgram.prototype = new nucleo.Program();
nucleo.BakeProgram.prototype.constructor = nucleo.BakeProgram;
nucleo.ESSL.BAKE_PROGRAM = new nucleo.BakeProgram();/*-------------------------------------------------------------------------
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
 * @class
 * @private
 */



nucleo.DashProgram = function DashProgram(){
    
    this.copy(nucleo.Program.createFromJSON({

        ID : 'dash',

        VERTEX_SHADER: [
        "attribute vec3 aVertexPosition;",
        "attribute vec3 aVertexNormal;",
        "attribute vec3 aVertexColor;",
        "attribute vec2 aVertexTextureCoords;",
        "attribute mat4 aActorMatrix;",
        "uniform float uPointSize;",
        "uniform bool uUseTextures;",
        "uniform mat4 mModelView;",
        "uniform mat4 mPerspective;",
        "uniform mat4 mModelViewPerspective;",
        "uniform mat4 mNormal;",
        "varying vec3 vNormal;",
        "varying vec3 vEyeVec;",
        "varying vec4 vFinalColor;",
        "varying vec2 vTextureCoords;",
        
        
        "void main(void) {",
        "  mat4 matrix = aActorMatrix; ",
        "  gl_Position =  mPerspective * mModelView * matrix * vec4(aVertexPosition, 1.0);",
        "  gl_PointSize = uPointSize;",
        "  vFinalColor = vec4(aVertexColor,1.0);",
        "  vec4 vertex = mModelView * vec4(aVertexPosition, 1.0);",
        "  vNormal = vec3(mNormal * vec4(aVertexNormal, 1.0));",
        "  vEyeVec = -vec3(vertex.xyz);",
        "  if (uUseTextures){" ,
        "       vTextureCoords = aVertexTextureCoords;",
        "   }",
        "}"].join('\n'),
    
        FRAGMENT_SHADER : [
        "#ifdef GL_ES",
        "precision highp float;",
        "#endif",
        
        "uniform bool uUseShading;",
        "uniform float uShininess;      ",
        "uniform vec3 uLightDirection;  ",
        
        "uniform vec4 uLightAmbient;    ",
        "uniform vec4 uLightDiffuse;    ",
        "uniform vec4 uLightSpecular;   ",
        
        "uniform vec4 uMaterialAmbient; ",
        "uniform vec4 uMaterialDiffuse; ",
        "uniform vec4 uMaterialSpecular;",
        
        "varying vec3 vNormal;",
        "varying vec3 vEyeVec;",
        "varying vec4 vFinalColor;",
        
        "varying vec2      vTextureCoords;",
        "uniform bool      uUseTextures;",
        "uniform sampler2D uSampler;",
        
        "void main(void)",
        "{",
         "  vec4 finalColor = vec4(0.0);",
         "  vec3 L = normalize(uLightDirection);",
         "  vec3 N = normalize(vNormal);",
         "  float lambertTerm = dot(N,-L);",
         "  vec4 Ia = uLightAmbient * uMaterialAmbient;",
         "  vec4 Id = vec4(0.0,0.0,0.0,1.0);",
         "  vec4 Is = vec4(0.0,0.0,0.0,1.0);",
         "  vec4 varMaterialDiffuse = vFinalColor;",
         
         "  if(uUseShading){  ",
         "      if(lambertTerm > 0.0)",
         "      {",
         "          Id = uLightDiffuse * varMaterialDiffuse * lambertTerm;",
         "          vec3 E = normalize(vEyeVec);",
         "          vec3 R = reflect(L, N);",
         "          float specular = pow( max(dot(R, E), 0.0), uShininess);",
         "          Is = uLightSpecular * uMaterialSpecular * specular;",
         "      }",
         "      finalColor = Ia + Id + Is;",
         "      finalColor.a = uMaterialDiffuse.a;",
         "  } ",
         "  else {",
         "      finalColor = varMaterialDiffuse; ", 
         "  }",
         "   if (uUseTextures){",
         "       finalColor =  texture2D(uSampler, vec2(vTextureCoords.s, vTextureCoords.t));",
         "   }",
         "   gl_FragColor = finalColor;",
         "}"].join('\n'),
    
        DEFAULTS : {
            "uUseTextures"      : false,
            "uShininess"        : 230.0,
            "uLightDirection"   : [0.0, -1.0, -1.0],
            "uLightAmbient"     : [0.03,0.03,0.03,1.0],
            "uLightDiffuse"     : [1.0,1.0,1.0,1.0], 
            "uLightSpecular"    : [1.0,1.0,1.0,1.0],
            "uMaterialAmbient"  : [1.0,1.0,1.0,1.0],
            "uMaterialDiffuse"  : [0.8,0.8,0.8,1.0],
            "uMaterialSpecular" : [1.0,1.0,1.0,1.0]
        }
    }));
   
};

nucleo.DashProgram.prototype = new nucleo.Program();
nucleo.DashProgram.prototype.constructor = nucleo.DashProgram;
nucleo.ESSL.DASH_PROGRAM = new nucleo.DashProgram();
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
 * <p>Presents a simple interface to communicate with a ESSL (GLSL) program
 * This class is responsible for creating, compiling and linking any ESSL program.
 * It also has methods to query and set uniforms and attributes belonging to the program
 * that is being currently executed in the GPU</P>
 * 
 * <p>a ProgramManager maintains a database of the programs that have been linked to the GPU.
 * This way, program switching is easier as it is not necessary to go through the 
 * compilation and linking process every time
 * 
 * <p>
 * The program manager simplifies working with ESSL programs. It provides
 * get/set operations for attributes and uniforms and handles internally the location variables
 * of these elements which are required to operate with them in the GPU. In other words
 * it hides gl.getAttribLocation and gl.getUniformLocation calls.
 * </p>
 * <p>
 * The program manager catches uniforms and only updates the GPU if needed.  
 * </p>
 * <p>The program manager is available through the <code>pm</code> attribute  of Engine
 * </p>
 * @class
 * @constructor
 */
nucleo.ProgramManager = function ProgramManager (gl) {
    
    this._gl                     = gl;
    this._registered_programs    = {};
    this._programs        = {};
    
    
    this._uniform_map            = {};
    this._uniform_types          = {};
    
    
    this._current_program_object   =  null;
    this._current_program_ID       = undefined;
    this._curr_uniform_loc_map     = {};
    this._curr_uniform_cache       = {};
    this._curr_attribute_loc_map       = {};
    this._enabled_attribute_list   = [];
    this._defaults                 = [];
 
    this._one_time_warning         = false;
    this._program_enforced         = false;
    
};

/**
 * Verifies whether a program is loaded in the database or not
 * @param {String} ID program id
 * @returns true if the program is registered, false otherwise
 */
nucleo.ProgramManager.prototype._isProgramRegistered = function(ID){
    return (this._registered_programs[ID] != undefined);
};

/**
 * Register a program in the database
 * @param {JSON} the program to register
 */
nucleo.ProgramManager.prototype._registerProgram = function(program){
	/*@TODO: this method receives a JSON Object we could instead
	 * receive a text file and parse it into JSON. This would make
	 * the writing of shaders much easier.
	 */
	nucleo.util.console('Registering program '+ program.ID);
    this._registered_programs[program.ID] = program;
};

/**
 * Verifies if a program is loaded
 * @param {String} ID the program id
 * @returns true if the program is loaded, false otherwise
 */
nucleo.ProgramManager.prototype._isProgramCreated = function(ID){
    return (this._programs[ID] != undefined);
};

/**
 * Loads a program
 * @param {String} ID the id of the program to load
 */
nucleo.ProgramManager.prototype._createProgramObject = function(ID){
    
    if (this._isProgramCreated(ID)){
        return;
    }
    
    var code = this._registered_programs[ID];
    
    if (code == undefined){
        var message = 'ProgramManager.loadProgram ERROR: '+
        ' The program '+ID+' must be registered first!';
        console.error(message);
        return;
    }
    
    var gl   = this._gl;
    var prg  = gl.createProgram();
    var essl = nucleo.ESSL;
    
    if (code.VERTEX_SHADER){
        var vs = this._createShader(essl.VERTEX_SHADER,code.VERTEX_SHADER);
        gl.attachShader(prg, vs);
    }
    
    if (code.FRAGMENT_SHADER){
        var fs = this._createShader(essl.FRAGMENT_SHADER,code.FRAGMENT_SHADER);
        gl.attachShader(prg, fs);
    }
    
    //fix for version 0.89.2 Making sure that the vertex array is ALWAYS the attribute with location 0
    gl.bindAttribLocation(prg, 0 , essl.VERTEX_ATTRIBUTE);
    
    gl.linkProgram(prg);
     
    if (!gl.getProgramParameter(prg, gl.LINK_STATUS)) {
        
        alert(ID+":\n\n "+gl.getProgramInfoLog(prg));
        throw("Error linking program "+ID+":\n\n "+gl.getProgramInfoLog(prg));
    }
    
    this._programs[ID] = prg;
  
};


/**
 * Uses a program from the database.
 * If you are not sure if the program you want to use is in the database then call Renderer.setProgram instead
 * @param {String} ID the program id
 * @see Renderer#setProgram
 */
nucleo.ProgramManager.prototype.useProgram = function(ID){

    var gl = this._gl;
    var prg = this._programs[ID];
    
    if (prg != undefined && prg != null){
        
        if (prg == this._current_program_object) return; //don't change if current
        
        //gl.linkProgram(esslProgram);
        gl.useProgram (prg);
        
        this._current_program_object = prg;
        this._current_program_ID = ID;
        this._parseUniforms();
        this._one_time_warning  = false;
    }
    else{
        alert("Program: the program " + ID + " has NOT been loaded");
    }
};

nucleo.ProgramManager.prototype.releaseProgram = function(){
     this._enforce = false;
};

/**
 * Tries to add a new program definition to this renderer
 * @param {Program} p_program an instance of a Program object or one of its descendants
 */
nucleo.ProgramManager.prototype.setProgram = function(p_program, p_force_it){
    
    var instance = undefined;
    //Create a new instance
    if (typeof p_program == 'function'){
        instance  = new p_program();
    }
    //Use this instance
    else if (typeof p_program == 'object'){
        instance = p_program;
    }
    else{
        console.error('ProgramManager.setProgram ERROR: '+p_program+' is not an engine');
        return;
    }
    
    
    if (this._enforce && instance.ID != this._current_program_id){
        var message = 'ProgramManager.setProgram WARN: '+
        'Unable to set the program '+instance.ID+'.\n'+
        'The current program ['+instance.ID+ '] is being enforced\n'+
        'Please use releaseProgram first.';
        console.warn(message);
        return;
    }
    
    this._program_enforced = (p_force_it != undefined && p_force_it == true);
    //register
    if (!this._isProgramRegistered(instance.ID)){ this._registerProgram(instance);        }
    
    //create
    if (!this._isProgramCreated(instance.ID)) { this._createProgramObject(instance.ID); }
    
    //use
    this.useProgram(instance.ID);
    this.clearCache();  //@TODO: what happens when we switch programs back and forth?
    this.loadDefaults();
    
};

nucleo.ProgramManager.prototype.clearCache = function(){
    this._curr_uniform_cache = {};
    this._curr_uniform_loc_map ={};
    this._curr_attribute_loc_map = {};
};


    
/**
 * Loads the uniform defaults for the current program
 */
nucleo.ProgramManager.prototype.loadDefaults = function(){
    var code = this._registered_programs[this._current_program_ID];
   
    if ('DEFAULTS' in code){
    
        var defaults = code.DEFAULTS;
        
        
        for(var u in defaults){
            this.setUniform(u,defaults[u]);
        }
    }
    //overriding defaults
    var defaults = this._defaults[this._current_program_ID];
    if (defaults != undefined){
  
        for (var u in defaults){
            this.setUniform(u,defaults[u]);
        }
    }
   
};

/**
 * Overrides defaults by hand 
 */
nucleo.ProgramManager.prototype.setDefault = function(programID, uniformName, value){
    
    if (this._defaults[programID] == undefined){
        this._defaults[programID] = {};
    }
  
    this._defaults[programID][uniformName] = value;
    
    //Overriding behaviour
    if (programID == this._current_program_ID){
        this.setUniform(uniformName, value);
    }
};


/**
 * Overrides defaults by hand 
 */
nucleo.ProgramManager.prototype.getDefault = function(programID, uniformName){
    
    if (this._defaults[programID] == undefined){
        return undefined;
    }
  
    return this._defaults[programID][uniformName];
};

/**
 * Sets all the uniforms defined by the object obj
 * @param {Object} p_dictionary an object containing uniform names and values. Every property of this object
 * will be considered a uniform
 */
nucleo.ProgramManager.prototype.setUniforms = function(p_dictionary){
	for(key in p_dictionary){
		this.setUniform(key,p_dictionary[key]);
	}
};

/**
 * Sets a uniform. Caches the uniform location.
 * 
 * Uses polymorphism to make the programmers life happier
 * @param {String} p_uniform_id name
 * @param {Object} p_value the uniform value 
 */
nucleo.ProgramManager.prototype.setUniform = function(p_uniform_id, p_value, hint){
    var gl                  = this._gl;
    var prg          		= this._current_program_object;
    var uniform_list  		= this._uniform_map[this._current_program_ID];
    var uniform_loc_map	    = this._curr_uniform_loc_map;
    var uniform_cache 		= this._curr_uniform_cache;
    var uniform_types       = this._uniform_types[this._current_program_ID];
    var loc                 = undefined;
    var reset               = false;
    
    if (uniform_list.indexOf(p_uniform_id) == -1){
        console.warn('ProgramManager.setUniform: the uniform '+p_uniform_id+' is not defined for the program '+this._current_program_ID);
        return;
    }
    
    loc = uniform_loc_map[p_uniform_id];
    
    if (loc == undefined){  
        loc = gl.getUniformLocation(prg,p_uniform_id);  
        uniform_loc_map[p_uniform_id] = loc;     
    }
    
    var cached_value = uniform_cache[p_uniform_id];
    var type = uniform_types[p_uniform_id];
    
    if (cached_value == undefined){
        reset = true;
    }
    else{ 
       switch(type){ 
            case 'sampler2D':
            case 'float':
            case 'int':
            case 'bool': reset = (cached_value !== p_value); break;
            case 'mat4':
                    reset  = (
                        (p_value[0] !== cached_value[0]) ||
                        (p_value[1] !== cached_value[1]) ||
                        (p_value[2] !== cached_value[2]) ||
                        (p_value[3] !== cached_value[3]) ||
                        (p_value[4] !== cached_value[4]) ||
                        (p_value[5] !== cached_value[5]) ||
                        (p_value[6] !== cached_value[6]) ||
                        (p_value[7] !== cached_value[7]) ||
                        (p_value[8] !== cached_value[8]) ||
                        (p_value[9] !== cached_value[9]) ||
                        (p_value[10] !== cached_value[10]) ||
                        (p_value[11] !== cached_value[11]) ||
                        (p_value[12] !== cached_value[12]) ||
                        (p_value[13] !== cached_value[13]) ||
                        (p_value[14] !== cached_value[14]) ||
                        (p_value[15] !== cached_value[15])); break;
            case 'vec3':
                    reset = (
                        (p_value[0] !== cached_value[0]) ||
                        (p_value[1] !== cached_value[1]) ||
                        (p_value[2] !== cached_value[2])); break;
            case 'vec4':
                    reset = (
                        (p_value[0] !== cached_value[0]) ||
                    (p_value[1] !== cached_value[1]) ||
                    (p_value[2] !== cached_value[2]) ||
                    (p_value[3] !== cached_value[3])); break;
            default:
                reset = true;
        }
    }
   
    if (reset){
        switch(type){ 
            case 'float':
            case 'int':
            case 'bool': uniform_cache[p_uniform_id] = p_value; break;
            case 'mat4': uniform_cache[p_uniform_id] = mat4.clone(p_value); break;
            case 'mat3': uniform_cache[p_uniform_id] = mat3.clone(p_value); break;
            case 'vec4': uniform_cache[p_uniform_id] = vec4.clone(p_value); break;
            case 'vec3': uniform_cache[p_uniform_id] = vec3.clone(p_value); break;
            case 'vec2': uniform_cache[p_uniform_id] = vec2.clone(p_value); break;
            case 'sampler2D': uniform_cache[p_uniform_id] = p_value; break;
            default: alert('error: type unknown cannot update uniform cache');
        }
        this._setPolymorphicUniform(p_uniform_id, loc, p_value, hint);
    }

};

/**
 * Returns a uniform value from the cache maintained by ProgramManager
 * @param {String} the uniform id
 */
nucleo.ProgramManager.prototype.getUniform = function(uniformID){
    //TODO: Think about this
    //if(!(name in this._uniform_map)){
      //  alert('Program: the uniform ' + name + ' has not been set');
        //return null;
   //}
    return this._curr_uniform_cache[uniformID];
};

/**
 * This method tells the WebGL context how to access the information contained in the
 * WebGL buffer associated with the attribute
 * @param {String} name name of the attribute
 * 
 */
nucleo.ProgramManager.prototype.setAttributePointer = function(name, numElements, type, norm,stride,offset){
    var a = this._getAttributeLocation(name);
    this._gl.vertexAttribPointer(a,numElements, type, norm, stride, offset);
};

/**
 * Enables a vertex attribute array
 * @param {String} name the name of the attribute array to enable
 */
nucleo.ProgramManager.prototype.enableAttribute = function(name){
    
   if (this._enabled_attribute_list.indexOf(name) != -1) return; //Speeds up
     
   var a = this._getAttributeLocation(name);
   this._gl.enableVertexAttribArray(a);
   this._enabled_attribute_list.push(name);
};

/**
 * Disables a vertex attribute array
 * @param {String} name the name of the attribute array to disable
 * 
 */
nucleo.ProgramManager.prototype.disableAttribute = function(name){
    if (name == undefined) return; //@TODO: WARNING?
    var idx = this._enabled_attribute_list.indexOf(name);
    if ( idx>=0){
        var loc = this._getAttributeLocation(name);
        this._gl.disableVertexAttribArray(loc);
        this._enabled_attribute_list.splice(idx,1);
    }
};

/**
 * Creates a WebGL shader
 * 
 * @private This method is private.
 */
nucleo.ProgramManager.prototype._createShader = function(type,code){
    var gl      = this._gl;
    var shader = null;
    
    if (type == nucleo.ESSL.VERTEX_SHADER){
        shader = gl.createShader(gl.VERTEX_SHADER);
    }
    else if (type == nucleo.ESSL.FRAGMENT_SHADER){
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    }
    
    if (code == undefined || code == null){
        alert('Error getting the code for shader of type ' + type);
    }
    
    gl.shaderSource(shader, code);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(type+":\n\n "+gl.getShaderInfoLog(shader));
        throw("Error compiling shader "+type+":\n\n "+gl.getShaderInfoLog(shader));
    }
    
    return shader;
};
    

/**
 * Parses uniforms
 * This method is private
 * @private
 * 
 */
nucleo.ProgramManager.prototype._parseUniforms = function(id){
    
    vs = this._registered_programs[this._current_program_ID].VERTEX_SHADER;
    fs = this._registered_programs[this._current_program_ID].FRAGMENT_SHADER;
    /*@TODO: look for a way to retrieve uNames directly from the parsing of the shaders
    this should simplify the structure of the JSON file representing the program*/
    uNames = this._registered_programs[this._current_program_ID].UNIFORMS;
    
    uTypes = {};
    
    
    for (var i=0;i< uNames.length; i++){
        var uniformID = uNames[i];
        var rex = new RegExp('uniform\\s+\\w+\\s'+uniformID,'g');
        
        if (vs.search(rex) != -1){
            uTypes[uniformID] = vs.substring(vs.search(rex),vs.length).substring(0,vs.indexOf(';')).split(' ')[1];
        }
        
        else if(fs.search(rex) != 1){
            uTypes[uniformID] = fs.substring(fs.search(rex),fs.length).substring(0,fs.indexOf(';')).split(' ')[1];
        }
        
        else{
            alert('Program: In the program '+this._current_program_ID+' the uniform '+uniformID+' is listed but not used');
        }
    }
    
    
    this._uniform_map[this._current_program_ID] = uNames;
    this._uniform_types[this._current_program_ID] = uTypes; 
};

/**
 * Obtains an attribute location
 * This method is private
 * @param {String} name
 * @private
 */
nucleo.ProgramManager.prototype._getAttributeLocation = function(name){
    
    var loc = this._curr_attribute_loc_map[name];
    if (loc != undefined) return loc;
     
    loc = this._gl.getAttribLocation(this._current_program_object,name);
    if (loc == -1){
        console.error('ProgramManager._getAttributeLocation ERROR: the attribute '+name+''+
        'could not be located');
        loc = undefined;
    }
    else{
        this._curr_attribute_loc_map[name] = loc;
     }
    return loc;
};

/**
 * This is one of the jewels of Nucleo. Based on the information contained in the
 * program database, it will do the appropriate gl call to set the uniform
 * This method is private. Use setUniform instead.
 * @see ProgramManager#setUniform
 * @private 
 */
nucleo.ProgramManager.prototype._setPolymorphicUniform = function(uniformID, locationID,value,hint){

	//In the extend of what it is reasonable,
	//We cross check GLSL type information with actual javascript variable types 
	//to make the right calls
	//hint allows better casting of int and float values. If not specified default is float
    
    var gl = this._gl;
    var glslType = this._uniform_types[this._current_program_ID][uniformID];
    
    if (glslType == 'bool'){
    	//if (typeof value != 'boolean') { 
    	//	nucleo.util.console('Program: the uniform '+uniformID+' is defined as bool in GLSL. However the JS variable is not');
    	//}/
        gl.uniform1i(locationID,value);
        return;
    }
    
    else if (glslType == 'float'){
    	gl.uniform1f(locationID,value);
    	return;
    }
    
    else if (glslType == 'int' || glslType == 'sampler2D'){
        gl.uniform1i(locationID,value);
        return;
    }
    
    else if (glslType == 'mat4'){    
        gl.uniformMatrix4fv(locationID,false,value);
        return;
    }
    
    
    else if (value instanceof Array || value instanceof Float32Array){ //vec2, vec3, vec4
        
        /*
         * @TODO If we receive a uniform of length 3 but the type is length 4 complete with 1.0 This is a hack that needs to be revisited...
         */
         
        if (value.length == 3 && glslType == 'vec4'){
             value[3] = 1.0;
             if (!this._one_time_warning){
                 alert('The uniform '+uniformID+' has only 3 components but Nucleo needs 4. This is a one time warning');
                 this._one_time_warning = true;
             }
        }
        
        if (hint  == 'int'){
            switch(value.length){
                case 1: { gl.uniform1iv(locationID,value); break; };
                case 2: { gl.uniform2iv(locationID,value); break; };
                case 3: { gl.uniform3iv(locationID,value); break; };
                case 4: { gl.uniform4iv(locationID,value); break; };
                default: alert('ERROR');
            }
       }
       else{
            switch(value.length){
                case 1 : { gl.uniform1fv(locationID,value); break; }
                case 2 : { gl.uniform2fv(locationID,value); break; }
                case 3 : { gl.uniform3fv(locationID,value); break; }
                case 4 : { gl.uniform4fv(locationID,value); break; }
                default: alert('ERROR');
            }
       }
    }
    
    else {
    	alert('Program: ERROR. The uniform  '+uniformID+ ' could not be mapped');
    }
};
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


nucleo.RenderTarget = function RenderTarget(engine){
   
    this.canvas         = engine._view.canvas;
    this.texture        = null;
    this.framebuffer    = null;
    this.renderbuffer   = null;
    this.gl             = engine.gl;
    this.configure(); 
};


nucleo.RenderTarget.prototype.configure = function(){
    var width = this.canvas.width;
    var height = this.canvas.height;
    var gl = this.gl;
    
    //1. Init Picking Texture
    this.texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    
    //2. Init Render Buffer
    this.renderbuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderbuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);
    
    
    //3. Init Frame Buffer
    this.framebuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.renderbuffer);
    

    //4. Clean up
    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
};

nucleo.RenderTarget.prototype.update = function(){
    
    var gl = this.gl;
    var width = this.canvas.width;
    var height = this.canvas.height;
   
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    
    //2. Init Render Buffer
    gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderbuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);
};

/**
 * 
 * @param{Number} x
 * @param{Number} y
 */
nucleo.RenderTarget.prototype.readPixel = function(x,y){
    
    var gl = this.gl;
    var readout = new Uint8Array(1 * 1 * 4);
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
    gl.readPixels(x,y,1,1,gl.RGBA,gl.UNSIGNED_BYTE,readout);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    return readout;
}
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
 * Models are totally independent of views and of the rendering process
 * @class Represents a geometric object. A model is represented by an actor in a scene.
 * @constructor
 * @param {String} name the name for this model
 * @param {Object} JSON_OBJECT the JSON Object that defines this model (Optional)
 * @see Model#load
 * @author Diego Cantor
 */
nucleo.Model = function Model(name, JSON_OBJECT) {
    this.UID        = nucleo.util.generateUID();
    this.name       = name;
    this.indices    = [];
    this.vertices   = [];
    this.scalars    = undefined;
    this.diffuse    = undefined;
    this.ambient    = undefined;
    this.specular   = undefined;
    this.shininness = undefined;
    this.normals    = undefined;
    this.wireframe  = undefined;
    this.bb         = [0, 0, 0, 0, 0, 0];
    this.centre     = [0, 0, 0, 0, 0, 0];
    this.mode       = nucleo.Actor.MODE.SOLID;
    this.image      = undefined;
    this.uri        = undefined;
    this.colors     = undefined;
    this.type       = nucleo.Model.TYPE.SIMPLE;
    this.renderable = undefined;

    if (JSON_OBJECT != undefined) {
        this.load(this.name, JSON_OBJECT);
    }

    this.setType(this.type);
};

/*
 * Constants
 */
nucleo.Model.LOADING_MODE    = nucleo.define.Model.LOADING_MODE;
nucleo.Model.MAX_NUM_INDICES = nucleo.define.Model.MAX_NUM_INDICES;
nucleo.Model.TYPE            = nucleo.define.Model.TYPE;

/**
 * Indices to draw the bounding box. The vertices in this case will correspond
 * to the actor bounding box calculation
 * @static
 */
nucleo.Model.BB_INDICES = [0, 1, 1, 2, 2, 3, 3, 0, 0, 4, 4, 5, 5, 6, 6, 7, 7, 4, 1, 5, 2, 6, 3, 7];

/**
 * Sets the type of model. A renderable object is created and associated
 * with this model in case the type is MESH or BIG_DATA
 *
 * @param {define.Model.TYPE} type the type of model
 */
nucleo.Model.prototype.setType = function (type) {

    if (this.indices.max() < nucleo.Model.MAX_NUM_INDICES &&
        type == nucleo.Model.TYPE.BIG_DATA) {
        throw('The model is not big enough to be of BIG_DATA type. Max index found: ' + this.indices.max());
    }

    this.type = type;
};

/**
 * Populates this model with the JSON_OBJECT (JSON object)
 * @param {String} nm the name given to this model
 * @param {Object} JSON_OBJECT the JSON object that describes the model
 */
nucleo.Model.prototype.load = function (nm, JSON_OBJECT) {
    if (nm == undefined) {
        throw 'Model.load ERROR: the object must have a name';
    }
    this.name = nm.replace(/\.[^/.]+$/, "");
    if (JSON_OBJECT.name != null) { //if the name is defined in the JSON object, then use it
        this.name = JSON_OBJECT.name;
    }

    //Load all properties
    for (i in JSON_OBJECT) {
        this[i] = JSON_OBJECT[i];
    }

    this.update();

};

/**
 * Update model state when the model has changed (changes in vertices or indices)
 */
nucleo.Model.prototype.update = function () {
    //Now minimal checks
    if (this.vertices == undefined) {
        alert('The model ' + this.name + ' does not have vertices. Impossible to render!');
    }


    if (this.normals == undefined
        && this.indices != undefined
        && this.mode != nucleo.Actor.MODE.LINES) //@TODO: explain that mode is representation mode. (change name?)
    {
        this.computeNormals();
    }


    if (this.wireframe == undefined) {
        this.computeWireframeIndices();
    }

    if (this.mode == undefined) {
        this.mode = nucleo.Actor.MODE.SOLID;
    }

    if (this.texture != undefined) {
        this.mode = nucleo.Actor.MODE.TEXTURED;
    }

    this.computeBoundingBox();


    if (this.type == nucleo.Model.TYPE.SIMPLE && this.indices.max() > nucleo.Model.MAX_NUM_INDICES) {
        this.setType(nucleo.Model.TYPE.BIG_DATA);
        console.info('the model ' + this.name + ' type is BIG_DATA');
    }

};

/**
 * Calculates the normals for this model in case that the JSON object does not include them
 *
 *
 */
nucleo.Model.prototype.computeNormals = function () {
    //face normal calculation
    var vs  = this.vertices,
        ind = this.indices,
        x   = 0,
        y   = 1,
        z   = 2;

    var ns = [];
    for (var i = 0; i < vs.length; i = i + 3) { //for each index, initialize normal x, normal y, normal z
        ns[i + x] = 0.0;
        ns[i + y] = 0.0;
        ns[i + z] = 0.0;
    }

    for (var i = 0; i < ind.length; i = i + 3) { //we work on triads of vertex to calculate normals so i = i+3 (i = indices index)
        var v1     = [];
        var v2     = [];
        var normal = [];
        //p2 - p1
        v1[x] = vs[3 * ind[i + 2] + x] - vs[3 * ind[i + 1] + x];
        v1[y] = vs[3 * ind[i + 2] + y] - vs[3 * ind[i + 1] + y];
        v1[z] = vs[3 * ind[i + 2] + z] - vs[3 * ind[i + 1] + z];
        //p0 - p1
        v2[x] = vs[3 * ind[i] + x] - vs[3 * ind[i + 1] + x];
        v2[y] = vs[3 * ind[i] + y] - vs[3 * ind[i + 1] + y];
        v2[z] = vs[3 * ind[i] + z] - vs[3 * ind[i + 1] + z];
        //cross product
        normal[x] = v1[y] * v2[z] - v1[z] * v2[y];
        normal[y] = v1[z] * v2[x] - v1[x] * v2[z];
        normal[z] = v1[x] * v2[y] - v1[y] * v2[x];

        for (var j = 0; j < 3; j++) { //update the normals of the triangle
            ns[3 * ind[i + j] + x] = ns[3 * ind[i + j] + x] + normal[x];
            ns[3 * ind[i + j] + y] = ns[3 * ind[i + j] + y] + normal[y];
            ns[3 * ind[i + j] + z] = ns[3 * ind[i + j] + z] + normal[z];
        }
    }

    //normalize the result
    for (var i = 0; i < vs.length; i = i + 3) { //the increment here is because each vertex occurs with an offset of 3 in the array (due to x, y, z contiguous values)

        var nn = [];
        nn[x]  = ns[i + x];
        nn[y]  = ns[i + y];
        nn[z]  = ns[i + z];

        var len = Math.sqrt((nn[x] * nn[x]) + (nn[y] * nn[y]) + (nn[z] * nn[z]));
        if (len == 0) len = 1.0;

        nn[x] = nn[x] / len;
        nn[y] = nn[y] / len;
        nn[z] = nn[z] / len;

        ns[i + x] = nn[x];
        ns[i + y] = nn[y];
        ns[i + z] = nn[z];
    }
    this.normals = ns;
};

/**
 * Flips the normals
 */
nucleo.Model.prototype.flipNormals = function () {
    var ns = this.normals;

    if (ns == undefined) return; //no normals

    for (var i = 0; i < ns.length; i += 1) {
        ns[i] = -ns[i];
    }
};

/**
 * Generate the wireframe indices using the model indices
 */
nucleo.Model.prototype.computeWireframeIndices = function () {
    var ind = this.indices;
    var wfi = [];
    var j   = 0;
    for (var i = 0; i < ind.length; i = i + 3) {
        wfi[j]     = ind[i];
        wfi[j + 1] = ind[i + 1];
        wfi[j + 2] = ind[i + 1];
        wfi[j + 3] = ind[i + 2];
        wfi[j + 4] = ind[i + 2];
        wfi[j + 5] = ind[i];
        j          = j + 6;
    }
    this.wireframe = wfi;
};


/**
 * Calculate the bounding box of this model and its centre
 *
 */
nucleo.Model.prototype.computeBoundingBox = function () {

    //This is the case with the scene toys
    if (this.vertices.length == 0) {
        this.bb     = [0, 0, 0, 0, 0, 0];
        this.centre = [0, 0, 0, 0, 0, 0];
        return;
    }

    var vs  = this.vertices;
    var bbm = [vs[0], vs[1], vs[2], vs[0], vs[1], vs[2]];

    var i = vs.length;
    for (i = 0, N = vs.length; i < N; i = i + 3) {
        bbm[0] = Math.min(bbm[0], vs[i]);
        bbm[1] = Math.min(bbm[1], vs[i + 1]);
        bbm[2] = Math.min(bbm[2], vs[i + 2]);
        bbm[3] = Math.max(bbm[3], vs[i]);
        bbm[4] = Math.max(bbm[4], vs[i + 1]);
        bbm[5] = Math.max(bbm[5], vs[i + 2]);
    }


    var c = [0, 0, 0];
    //computes the centre
    c[0] = (bbm[3] + bbm[0]) / 2;
    c[1] = (bbm[4] + bbm[1]) / 2;
    c[2] = (bbm[5] + bbm[2]) / 2;


    this.bb     = bbm;
    this.centre = c;
};

/**
 *Returns the bounding box vertices. This method is used by the rendering engine
 */
nucleo.Model.prototype.getBoundingBoxVertices = function () {
    var b = this.bb;
    return [
        b[0], b[1], b[2],
        b[0], b[4], b[2],
        b[3], b[4], b[2],
        b[3], b[1], b[2],
        b[0], b[1], b[5],
        b[0], b[4], b[5],
        b[3], b[4], b[5],
        b[3], b[1], b[5]
    ];
};

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
 * A cell is the minimum surface that can be selected on a mesh
 * @class Provides cell definitions
 * @constructor
 * @author Diego Cantor
 */
nucleo.Cell = function Cell(mesh, index, vertices, color){
    
    this.UID = nucleo.util.generateUID();
    this.mesh  = mesh;
    this.index = index;
    this.vertices = vertices;
    this.color = color==undefined?[0.8,0.8,0.8]:color; //@TODO: this is a hack
    this.normal = [0,0,0]; 
    this.position = [0,0,0];
    this._calculatePosition();
    this._calculateNormal();
    this._pickingColor  = nucleo.Picker.instance.getColorFor(this);
};

nucleo.Cell.prototype._calculatePosition = function(){
    this.position[0] = (this.vertices[0][0] + this.vertices[1][0] + this.vertices[2][0])/3;
    this.position[1] = (this.vertices[0][1] + this.vertices[1][1] + this.vertices[2][1])/3;
    this.position[2] = (this.vertices[0][2] + this.vertices[1][2] + this.vertices[2][2])/3;
};
    
    
/**
 * Calculates the cell normal
 * @private
 */
nucleo.Cell.prototype._calculateNormal = function(){
    var p1 = vec3.subtract(vec3.create(),this.vertices[1], this.vertices[0]);
    var p2 = vec3.subtract(vec3.create(),this.vertices[2], this.vertices[0]);
    this.normal =  vec3.normalize(this.normal, vec3.cross(this.normal,p1,p2));
};

/**
 * Returns an unidimensional array with the vertex information
 * [[a,b,c],[d,e,f],[g,h,i]] --> [a,b,c,d,e,f,g,h,i]
 */
nucleo.Cell.prototype.getFlattenVertices = function(){
    var v = this.vertices;
    return [v[0][0],v[0][1],v[0][2],v[1][0],v[1][1],v[1][2],v[2][0],v[2][1],v[2][2]];
};


/**
 * Updates the cell color. 
 * @param {Object} r
 * @param {Object} g
 * @param {Object} b
 */
nucleo.Cell.prototype.setColor = function(r,g,b){
    this.color = nucleo.util.createArr3(r,g,b);
    
    this.mesh._updateCellColor(this.index);
    
}
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
 * In a mesh, the geometry is structured in units called cells (triangles).
 * This class provides operations on individual cells.
 * 
 * @class Provides cell by cell operations on models
 * @constructor 
 * @param {Actor} prior the model for this mesh
 * @author Diego Cantor
 */
nucleo.Mesh = function Mesh(actor){
    
    if (actor == undefined){
        throw('Mesh: the model passed as parameter cannot be undefined');
    }
    
    this.name = actor.name +'-mesh';
    this.cells = [];
    this.color = [0.8,0.8,0.8]; 
    this.actor = actor;
    this.model = undefined;   //internal representation of the mesh
    this._createMesh(actor);
};



/**
 * Sets the mesh color
 */
nucleo.Mesh.prototype.setColor = function(color){
    this.color = color;
    this._setModelColor(this.color);
};

/**
 * Receives an array with vertex colors (one color per vertex) 
 * interpolates these colors and assign cell colors
 */
nucleo.Mesh.prototype.scalarsToCellColors = function(scalars, lut){
    
};

/**
 * Update the mesh colors based on the current cell colors
 */
nucleo.Mesh.prototype.updateColor = function(){
    var model = this.model;
    
    model.colors = [];
    model.pickingColors = [];
    //@TODO review if this can be replaced with a reverse while
    for(var i=0, count = this.cells.length; i<count; i +=1){
           
            for (var j = 0; j<3;j+=1){
                model.colors.push.apply(model.colors,this.cells[i].color);
                model.pickingColors.push.apply(model.pickingColors, this.cells[i]._pickingColor);
            }
    }
    
    this.actor.updateRenderable();
};



 
/**
 * Determines if this mesh contains the cell indicated by the parameter cellUID
 * @param {String} cellUID the unique identifier of a cell
 */
nucleo.Mesh.prototype.hasCell = function(cellUID){
  var i = this.cells.length;
  while(i--){
      if (this.cells[i].UID == cellUID){
          return true;
      }
  } 
  return false; 
};  

/**
 * Determines if this mesh contains the cell indicated by the parameter cellUID
 * @param {String} cellUID the unique identifier of a cell
 */
nucleo.Mesh.prototype.getCell = function(cellUID){
    var i = this.cells.length;
    while(i--){
      if (this.cells[i].UID == cellUID){
          return this.cells[i];
      }
  } 
  return null; 
};

    
     

nucleo.Mesh.prototype.removeCell = function(cellUID){
  var idx = -1;
  var i = this.cells.length;
  while(i--){
      if (this.cells[i].UID == cellUID){
          idx = i;
          break;
      }
  }
  if (idx !=-1) {
        this.cells.splice(idx,1);
        //TODO: is this efficient?
        this._createModel();
   }
   
};  

/**
 * This is just an experimental method. Determines what cells are facing the camera. 
 * May be this can be used for anything? I don't know! 
 * Maybe to see through a surface??
 *
 * @param {Object} camera
 * @param {Object} angle
 */
nucleo.Mesh.prototype.intersect = function(camera, angle){
    
    var ray = camera._forward;
    
    selection = [];

    /*for(var i=0;i<this.normals.length; i+=1){
        var dp = Math.acos(vec3.dot(ray, this.normals[i])) * nucleo.define.RAD_2_DEG;
        if (Math.abs(dp) <= angle){
            selection = selection.concat(this.indices[i]);
        }  
    }*/
    return selection;
};

/**
 * Identifies the cells existing in the 
 * @private
 */
nucleo.Mesh.prototype._createMesh = function(actor){
    var prior = actor.model;
    var ver = prior.vertices;
    var ind = prior.indices;
    
    var self = this;
    this.cells = [];
    
    function createMeshTask(){
        var start = new Date().getTime();
        
        var cellIndex = 0;
        
        //@TODO: assign colors if they exist. Should we give the option to change luts here?
        // probably not. Every time the actor changes its LUT the mesh should react and update its colors  

        var meshColor = [self.color[0], self.color[1], self.color[2]];
        
        //1. CREATE CELLS
        for(var i=0, L = ind.length; i<L; i+=3){ 
            idx  = ind[i];
            var triangle = [],x,y,z,idx;

            x = ver[idx*3];
            y = ver[idx*3 + 1];
            z = ver[idx*3 + 2];   
            triangle.push([x,y,z]);

            idx = ind[i+1];
            x = ver[idx*3];
            y = ver[idx*3 + 1];
            z = ver[idx*3 + 2];   
            triangle.push([x,y,z]);

            idx = ind[i+2];            
            x = ver[idx*3];
            y = ver[idx*3 + 1];
            z = ver[idx*3 + 2];   
            triangle.push([x,y,z]);

            
            self.cells.push(new Cell(self, cellIndex, triangle, meshColor));
            cellIndex += 1;
        }
        
        
        self._createModel();
        
        var elapsed = new Date().getTime() - start;
        console.info('Mesh ['+ self.name +'] generated in '+elapsed+ ' ms');
        
    };
    
    //because this operation is time consuming it is deferred here.
    //this causes that the mesh is not available for rendering until this operation finishes.
   setTimeout(function(){createMeshTask()},0);
};


/**
 * Based on the mesh information it creates an internal model of the mesh.
 * @private
 * 
 */
nucleo.Mesh.prototype._createModel = function(){
    
    var model = new Model(this.name+'-model');
    
    model.colors = [];
    model.pickingColors = [];
    
    for(var i=0, count = this.cells.length; i<count; i +=1){
            model.indices.push.apply(model.indices,[i*3, i*3+1, i*3+2]);
            model.vertices.push.apply(model.vertices,this.cells[i].getFlattenVertices());
            
            for (var j = 0; j<3;j+=1){
                model.colors.push.apply(model.colors,this.cells[i].color);
                model.pickingColors.push.apply(model.pickingColors, this.cells[i]._pickingColor);
            }
    }
    
    model.computeNormals();
    model.setType(define.Model.TYPE.MESH);
    
    this.model = model;
    this.actor.updateRenderable(Renderable.TASK.CREATE);
    
};

/**
 * @param {vec3} color the new color
 * @private
 */
nucleo.Mesh.prototype._setModelColor = function(color){
    
    if (this.model == undefined) return;
    
    var model = this.model;
    model.colors = [];
    
    for(var i=0, count = this.cells.length; i<count; i +=1){
            this.cells[i].color = [color[0], color[1], color[2]];
            for (var j = 0; j<3;j+=1){
                model.colors.push.apply(model.colors,this.cells[i].color);
            }
    }
    
    this.actor.updateRenderable(Renderable.TASK.CREATE);
};

/**
 * @private
 * @param {Object} cell the cell to be updated
 */
nucleo.Mesh.prototype._updateCellColor = function(index){
    
    var color = this.cells[index].color;
    
    for(var i = index*9, N = index*9+9; i<N; i+=3){
        this.model.colors[i] = color[0];
        this.model.colors[i+1] = color[1];
        this.model.colors[i+2] = color[2];
    }
    
    this.actor.updateRenderable(Renderable.TASK.UPDATE_COLORS);
    
};
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
 * <p>
 * An actor is a representation of a model in Nucleo. Actors can cache model properties
 * and modified them. This is useful when there are several actors based in the same model
 * but each one of them needs to have a different version of any given model property (i.e. color)
 * </p>
 * <p>
 * To propagate one change for all the actors based in the same model, the setProperty method
 * should be invoked by setting the third parameter (scope) like this:
 * </p>
 *
 * <pre class="prettyprint">
 * var actor = view.scene.getActorByName('example');
 * actor.setProperty('color',[1.0,0.0,0.0], nucleo.define.MODEL)
 * </pre>
 *
 * <p>If the change should be local (for just that actor)  then you should write:</p>
 *
 * <pre class="prettyprint">
 * var actor = view.scene.getActorByName('example');
 * actor.setProperty('color',[1.0,0.0,0.0], nucleo.define.ACTOR)
 * </pre>
 *
 * <p> Or simply </p>
 *
 * <pre class="prettyprint">
 * var actor = view.scene.getActorByName('example');
 * actor.setProperty('color',[1.0,0.0,0.0])
 * </pre>
 * @constructor
 * @class Actors represent models (assets) in a Scene
 *
 */
nucleo.Actor = function (model) {

    this._bb = [0, 0, 0, 0, 0, 0];
    this._position = vec3.fromValues(0, 0, 0);
    this._translation = vec3.fromValues(0, 0, 0);
    this._centre = vec3.fromValues(0, 0, 0);
    this._scale = vec3.fromValues(1, 1, 1);
    this._rotation = vec3.fromValues(0, 0, 0);
    this._matrix = mat4.create();

    this._matrix_world = mat4.create();
    this._matrix_normal = mat4.create();
    this._matrix_pmv = mat4.create();

    this._dirty = false;

    this._picking = nucleo.Actor.PICKING.DISABLED;
    this._pickCallback = undefined;
    this._unpickCallback = undefined;
    this._pickingColor = undefined; //used when the picking is nucleo.define.Actor.PICKING.OBJECT


    this._trackingCameras = [];

    this.UID = nucleo.util.generateUID();
    this.scene = undefined;
    this.clones = 0;

    this.mode = nucleo.Actor.MODE.SOLID;
    this.cull = nucleo.Actor.CULL.NONE;
    this.visible = true;

    this.mesh = undefined;


    this.renderable = undefined;

    this._bb_disabled = false; //to accelerate animations if we dont care about bb.

    if (model) {
        this.model = model;
        this.name = model.name;
        this.mode = model.mode;
        this._bb = model.bb.slice(0);
        this._centre = vec3.clone(model.centre);

        if (model.type == nucleo.Model.TYPE.BIG_DATA) {
            this.renderable = new Renderable(this);
        }

        var material = new nucleo.Material();
        this.setMaterial(material.getFrom(model));
    }
    else {
        this.model = undefined;
        this.material = undefined;
    }


    var e = nucleo.EVENTS;
    nucleo.Notifier.instance.publish(
        [
            e.ACTOR_MOVED,
            e.ACTOR_SCALED,
            e.ACTOR_ROTATED,
            e.ACTOR_CHANGED_COLOR,
            e.ACTOR_CHANGED_SHADING,
        ], this);
};

/**
 * @static
 * @type {nucleo.define.Actor.MODE|*}
 */
nucleo.Actor.MODE = nucleo.define.Actor.MODE;

/**
 * @static
 * @type {nucleo.define.Actor.CULL|*}
 */
nucleo.Actor.CULL = nucleo.define.Actor.CULL;

/**
 * @static
 * @type {nucleo.define.Actor.PICKING|*}
 */
nucleo.Actor.PICKING = nucleo.define.Actor.PICKING;



/**
 *Sets the scene the actor belongs to. Used to notifiy the scene
 * about changes in actor properties
 */
nucleo.Actor.prototype.setScene = function (scene) {
    this.scene = scene;
};


/**
 * Sets the position of this actor.
 *
 *
 * @param {Number, Array, vec3} x it can be the x coordinate, a 3-dimensional Array or a vec3 (glMatrix)
 * @param {Number} y if x is a number, then this parameter corresponds to the y-coordinate
 * @param {Number} z if x is a number, then this parameter corresponds to the z-coordinate
 */
nucleo.Actor.prototype.setPosition = function (x, y, z) {
    var np = nucleo.util.createVec3(x, y, z);
    vec3.subtract(this._translation, np, this._position);
    this._position = np;

    var m = this._matrix;
    m[12] = this._position[0];
    m[13] = this._position[1];
    m[14] = this._position[2];
    m[15] = 1;
    if (!this._bb_disabled) {
        this._computeBoundingBox();
    }

    this._notifyTrackingCameras();
    nucleo.Notifier.instance.fire(nucleo.EVENTS.ACTOR_MOVED, this);

    return this;
};


/**
 * Translates the actor by a given vector
 *
 * @param {Number, Array, vec3} x it can be the x coordinate, a 3-dimensional Array or a vec3 (glMatrix)
 * @param {Number} y if x is a number, then this parameter corresponds to the y-coordinate
 * @param {Number} z if x is a number, then this parameter corresponds to the z-coordinate
 */
nucleo.Actor.prototype.translate = function (x, y, z) {
    this._translation = nucleo.util.createVec3(x, y, z);

    var m = this._matrix;
    mat4.translate(m, m, this._translation);
    this._position = vec3.fromValues(m[12], m[13], m[14]);

    if (!this._bb_disabled) {
        this._computeBoundingBox();
    }
    this._notifyTrackingCameras();
    nucleo.Notifier.instance.fire(nucleo.EVENTS.ACTOR_MOVED, this);

    return this;
};


/**
 * Rotates the actor on the X axis
 *
 * @param {Number} angle the angle
 */
nucleo.Actor.prototype.rotateX = function (angle) {
    var m = this._matrix;
    var a = nucleo.util.deg2rad(nucleo.util.getAngle(angle));
    mat4.rotateX(m, m, a);
    if (!this._bb_disabled) {
        this._computeBoundingBox();
    }
    nucleo.Notifier.instance.fire(nucleo.EVENTS.ACTOR_ROTATED, this);

    return this;
};

/**
 * Rotates the actor on the Y axis
 *
 * @param {Number} angle the angle
 */
nucleo.Actor.prototype.rotateY = function (angle) {
    var m = this._matrix;
    var a = nucleo.util.deg2rad(nucleo.util.getAngle(angle));
    mat4.rotateY(m, m, a);
    if (!this._bb_disabled) {
        this._computeBoundingBox();
    }
    nucleo.Notifier.instance.fire(nucleo.EVENTS.ACTOR_ROTATED, this);

    return this;
};


/**
 * Rotates the actor on the Z axis
 *
 * @param {Number} angle the angle
 */
nucleo.Actor.prototype.rotateZ = function (angle) {
    var m = this._matrix;
    var a = nucleo.util.deg2rad(nucleo.util.getAngle(angle));
    mat4.rotateZ(m, m, a);
    if (!this._bb_disabled) {
        this._computeBoundingBox();
    }
    nucleo.Notifier.instance.fire(nucleo.EVENTS.ACTOR_ROTATED, this);

    return this;
};

/**
 * Scales this actor.
 * @param {Number, Array, vec3} s the scaling factor. The scaling factor is applied in all axes.
 *
 */
nucleo.Actor.prototype.setScale = function (s, a, b) {
    if (s == 0 && a == undefined && b == undefined) return;


    if (typeof(s) == "number" && a == undefined && b == undefined) {
        this._scale = nucleo.util.createVec3(s, s, s);
    }
    else {
        this._scale = nucleo.util.createVec3(s, a, b);
    }

    var m = this._matrix;
    mat4.scale(m, m, this._scale);
    if (!this._bb_disabled) {
        this._computeBoundingBox();
    }
    nucleo.Notifier.instance.fire(nucleo.EVENTS.ACTOR_SCALED, this);

    return this;
};

/**
 * Adds a tracking camera
 *
 * @param{Camera} camera the tracking camera
 */
nucleo.Actor.prototype.addTrackingCamera = function (camera) {
    if (camera instanceof nucleo.Camera && camera.type != nucleo.Camera.TYPE.TRACKING) {
        throw "Actor._addTrackingCamera ERROR: the selected camera is not set to tracking"
    }
    else if (camera instanceof nucleo.Camera) {
        this._trackingCameras.push(camera);
    }
    else {
        throw "Actor._addTrackingCamera ERROR: the object passed as a parameter is not a Camera"
    }
};

/**
 * Removes a tracking camera
 * @param{Camera} camera the tracknig camera
 */
nucleo.Actor.prototype.removeTrackingCamera = function (camera) {
    var idx = this._trackingCameras.indexOf(camera);
    this._trackingCameras.splice(idx, 1);
};

/**
 * Notifies all the tracking cameras of the actor translation
 * @param {Object} camera
 */
nucleo.Actor.prototype._notifyTrackingCameras = function () {
    for (var i = 0, N = this._trackingCameras.length; i < N; i += 1) {
        this._trackingCameras[i].updateWithActor(this);
    }
};

/**
 * Computes the current bounding box for this actor.
 * This method is called on demand by the scene or any other object.
 * The bounding box is NOT automatically recalculated when
 * moving or scaling an actor for performance reasons.
 *
 */
nucleo.Actor.prototype._computeBoundingBox = function () {

    var vs = this.model.vertices;
    var vsT = [];
    var T = this._matrix;

    for (var i = 0; i < vs.length; i = i + 3) {
        var x = nucleo.util.createVec3(vs[i], vs[i + 1], vs[i + 2]);
        vec3.transformMat4(x, x, T);
        vsT.push(x[0], x[1], x[2]);
    }

    var bbA = [vsT[0], vsT[1], vsT[2], vsT[0], vsT[1], vsT[2]];

    for (var i = 0; i < vsT.length; i = i + 3) {
        bbA[0] = Math.min(bbA[0], vsT[i]);
        bbA[1] = Math.min(bbA[1], vsT[i + 1]);
        bbA[2] = Math.min(bbA[2], vsT[i + 2]);
        bbA[3] = Math.max(bbA[3], vsT[i]);
        bbA[4] = Math.max(bbA[4], vsT[i + 1]);
        bbA[5] = Math.max(bbA[5], vsT[i + 2]);
    }


    this._bb = bbA;
};

/**
 * Returns an array with the bounding box vertices. Good for rendering the transformed
 * bounding box (after geometric transformations)
 * @returns {Array} a 8-element array with the vertices that constitute the actor bounding box
 */
nucleo.Actor.prototype.getBoundingBoxVertices = function () {
    var b = this._bb;
    return [
        b[0], b[1], b[2],
        b[0], b[4], b[2],
        b[3], b[4], b[2],
        b[3], b[1], b[2],
        b[0], b[1], b[5],
        b[0], b[4], b[5],
        b[3], b[4], b[5],
        b[3], b[1], b[5]
    ];
};


/**
 * Returns the bounding box for this actor. The actor's bounding box observes any geometric
 * transformation suffered by the actor. Therefore it is ideal to do collision detection.
 *
 * The format of the returned bounding box is [x-min, y-min, z-min, x-ax, y-max, z-max]
 * @returns {Array} the current bounding box.
 */
nucleo.Actor.prototype.getBoundingBox = function () {
    return this._bb.slice[0];
}


/**
 * Returns the height for the current actor.
 * @returns {Number} the current height
 */
nucleo.Actor.prototype.getHeight = function () {
    var bb = this._bb
    return bb[4] - bb[1]
};


/**
 * @param {Material} p_material the new material
 */
nucleo.Actor.prototype.setMaterial = function (p_material) {

    this.material = p_material;

    if (this.material.texture) {
        this._new_texture = true;
    }
};


/**
 * Sets the actor color. This color can be different from the original model color
 * @param {Number, Array, vec3} r it can be the red component, a 3-dimensional Array or a vec3 (glMatrix)
 * @param {Number} g if r is a number, then this parameter corresponds to the green component
 * @param {Number} b if r is a number, then this parameter corresponds to the blue component
 */
nucleo.Actor.prototype.setColor = function (r, g, b) {
    this.material.diffuse = nucleo.util.createVec3(r, g, b);
    if (this.mesh) {
        this.mesh.setColor(this.material.diffuse);
    }
    nucleo.Notifier.instance.fire(nucleo.EVENTS.ACTOR_CHANGED_COLOR, this);

    return this;
};


/**
 * Sets the opacity of this actor.
 * @param {Number} o a float value between 0 and 1.
 */
nucleo.Actor.prototype.setOpacity = function (o) {
    if (o >= 0 && o <= 1) {
        this.material.opacity = o;
    }
    else throw 'The opacity value is not valid';

    return this;
};


/**
 * Sets the shininess of this actor
 * @param {Number} s a value for the shininess
 */
nucleo.Actor.prototype.setShininess = function (s) {
    this.material.shininess = s;

    return this;
};

/**
 * Associates a new texture with this actor
 * @param {Texture|String} p_texture the texture to load
 */
nucleo.Actor.prototype.setTexture = function (p_texture) {
    var instance = undefined;
    if (typeof(p_texture) == 'string') {
        instance = new Texture(p_texture);
    }
    else {
        instance = p_texture;
    }
    this.material.texture = instance;
    this._new_texture = true;
    return this;
};

/**
 * If the property exists, then it updates it
 * @param {String} property name of the property
 * @param {Object} value  value to be set
 * @param {String} scope indicates if the change is made at the actor level or at the model level
 * valid values for scope are nucleo.def.model and nucleo.def.actor
 * @TODO: if the property is position or scale then call the respective methods from here
 */
nucleo.Actor.prototype.setProperty = function (property, value, scope) {


    if (scope == nucleo.def.actor || scope == undefined || scope == null) {

        switch (property) {
            case 'position':
                this.setPosition(value);
                break;
            case 'scale':
                this.setScale(value);
                break;
            case 'color':
                this.setColor(value);
                break;
            case 'shading':
                this.setShading(value);
                break;
            case 'texture':
                this.setTexture(value);
                break;
            case 'opacity':
                this.setOpacity(value);
                break;
            case 'shininess':
                this.setShininess(value);
                break;
            default:
                this[property] = value;
                break;
        }

        nucleo.util.console('Actor: The actor ' + this.name + ' has been updated. [' + property + ' = ' + value + ']');
    }
    else if (scope == nucleo.def.model) {
        this.model[property] = value;
        nucleo.util.console('Actor: The model ' + this.model.namname + ' has been updated. [' + property + ' = ' + value + ']');
    }
    else {
        throw('Actor.setProperty. Scope:' + scope + ' is not valid');
    }

    return this;

};

/**
 * Enables or disables the calculation of the shading. Any shader should take into account this
 * actor property to decide how to render it.
 *
 * @param {Boolean} flag can be true or false
 */
nucleo.Actor.prototype.setShading = function (flag) {
    this.material.shading = flag;
    nucleo.Notifier.instance.fire(nucleo.EVENTS.ACTOR_CHANGED_SHADING, this);
    return this;
};

/**
 * Returns an actor property if that property exists in the actor. Otherwise it will search
 * in the model. This method is used by the renderer. There are some cases where actors have local changes
 * that are not reflected in the model. In these cases the renderer should pick the actor property
 * over the model property
 * @param {String} property the property name
 * @returns {Object} the property or undefined if the property is not found
 */
nucleo.Actor.prototype.getProperty = function (property) {

    if (property == 'color') {
        return this.materia.diffuse; //there's no real 'color' property.
    }
    else if (this.hasOwnProperty(property)) {
        return this[property];
    }
    else if (this.material.hasOwnProperty(property)) {
        return this.material[property];
    }
    else if (this.model.hasOwnProperty(property)) {
        return this.model[property];
    }
    else {
        return undefined;
    }
};

/**
 * Estimates the current position as
 * the center of the current bounding box.
 * This method does not update the internal position of the actor
 * it only returns an estimate based on the location of its bounding box.
 * Is there really any use for this? I forgot..!
 *
 * @private
 */
nucleo.Actor.prototype.computePosition = function () {
    bb = this._bb;
    var cc = vec3.create();

    cc[0] = (bb[3] + bb[0]) / 2;
    cc[1] = (bb[4] + bb[1]) / 2;
    cc[2] = (bb[5] + bb[2]) / 2;

    cc[0] = Math.round(cc[0] * 1000) / 1000;
    cc[1] = Math.round(cc[1] * 1000) / 1000;
    cc[2] = Math.round(cc[2] * 1000) / 1000;

    return vec3.clone(cc);
};


/**
 * Sets the visualization mode for this actor.
 * @param {nucleo.Actor.MODE} mode mode needs to be one of the elements defined in nucleo.Actor.MODE
 *
 */
nucleo.Actor.prototype.setVisualizationMode = function (mode) {
    this.mode = mode;
    this._dirty = true;
    return this;
};

/**
 *Sets the culling mode for this actor.
 * @param {nucleo.Actor.CULL} face face needs to be one of the elements defined in nucleo.Actor.CULL
 *  @TODO: VALIDATE
 */
nucleo.Actor.prototype.cullFace = function (face) {
    this.cull = face;

    return this;
};


/**
 * Sets the lookup table for this actor.
 * This method will only succeed if the model that this actor represents has scalars
 * @param {String} lutID the lookup table id. See {@link nucleo.def.lut} for currently supported ids.
 * @param {Number} min lowest value for interpolation
 * @param {Number} max highest value for interpolation
 */
nucleo.Actor.prototype.setLookupTable = function (lutID, min, max) {

    if (this.model.scalars == undefined) return;

    var self = this;

    function scheduledSetLookupTable(scalars) {
        var lut = nucleo.LookupTableManager.instance.get(lutID);
        self.material.colors = lut.getColors(self.model.scalars, min, max);

        //if(this.mesh){
        //    this.mesh. //update mesh with vertex colors it may require access to the original index array
        // }

        if (self.model.type == define.Model.TYPE.BIG_DATA) {
            self.renderable.update();
        }
    }

    //Given that obtaining the colors can be a time consume op, it is deferred here.
    setTimeout(function () {
        scheduledSetLookupTable()
    }, 0);

    return this;
};

/**
 * Flips the normal for this actor. It delegates the task to the model
 * @TODO: Review. we could want the actor to have flipped normals but not to impose this on the model.
 */
nucleo.Actor.prototype.flipNormals = function () {
    this.model.flipNormals();

    return this;
};

/**
 * Sets the visibility of the actor
 * @param {boolean} flag true or false
 */
nucleo.Actor.prototype.setVisible = function (flag) {
    this.visible = flag;

    return this;
};

/**
 * Is visible?
 * @returns {boolean} true if the object is visible
 */
nucleo.Actor.prototype.isVisible = function () {
    return this.visible;
};

/**
 * Duplicates this actor.
 *
 * <p>The model property of the actor (Model) is shared with the new instance</p>
 *
 * <p>The actor level properties are copied by VALUE.</p>
 *
 * If a cloned actor modifies his internal model, any other actor that shares the model will be
 * affected. A cloned actor however can have different position, colors, etc. (actor level properties)
 *
 * The returned actor is not added to the scene automatically. It is up the
 * programmer to determine the scene the cloned actor needs to be added to if at all.
 *
 * The clone does not keep any information about the current position or rotation of the original
 * actor.
 *
 * @see Model
 * @returns {Actor} an actor
 */
nucleo.Actor.prototype.clone = function () {
    this.clones++;

    //create clone
    var clone = new Actor(this.model);
    clone.name += '-' + this.clones;

    //copy the material
    clone.material = this.material.clone();

    return clone;
};

/**
 *
 * @param {String} type one of the possible values for nucleo.define.Actor.PICKING
 * @param {Function} pick a function that is invoked when a picking event occurs. This parameter is
 * required if the type (first argument) is different from nucleo.define.Actor.PICKING.DISABLED
 * the callback receives an actor object to operate over it.
 * @param {Function} unpick a function that is invoked when an unpicking event occurs.
 */
nucleo.Actor.prototype.setPicking = function (type, pick, unpick) {
    this._picking = type;

    switch (type) {
        case define.Actor.PICKING.DISABLED:
            this._pick_callback = undefined;
            this._unpick_callback = undefined;
            this.mesh = undefined;
            this.renderable = undefined;
            this.setVisualizationMode(nucleo.Actor.MODE.SOLID);
            break;

        case define.Actor.PICKING.CELL:

            if (this.mesh == undefined) {
                this.mesh = new Mesh(this);
                this.mesh.setColor(this.material.diffuse);
                this.renderable = new Renderable(this);
                this.setVisualizationMode(nucleo.Actor.MODE.FLAT);
            }
            ;

            this._pick_callback = pick;
            this._unpick_callback = unpick;
            break;

        case define.Actor.PICKING.OBJECT:

            this._pickingColor = nucleo.Picker.instance.getColorFor(this);
            this._pick_callback = pick;
            this._unpick_callback = unpick;
            break;
    }

    if (this._picking != nucleo.define.Actor.PICKING.DISABLED) {

        var i = this.scene.views.length;
        while (i--) {
            //@TODO: do we want this for all the views?
            var r = this.scene.views[i].renderer;
            if (!r.isOffscreenEnabled()) {
                r.enableOffscreen();
            }
        }
    }
    //@TODO: Disable when there are no pickable actors in the scene.

    return this;
};

/**
 * Reports if the current actor is pickable or not
 *
 */
nucleo.Actor.prototype.isPickable = function () {
    return (this._picking != nucleo.define.Actor.PICKING.DISABLED);
};

/**
 * Returns the picking type
 */
nucleo.Actor.prototype.getPickingType = function () {
    return this._picking;
};

;

/**
 * Used by Mesh to update the renderable object after the mesh has changed
 *
 * @param {String} task type of update
 */
nucleo.Actor.prototype.updateRenderable = function (task) {
    this.renderable.update(task);
};

/**
 * This method needs to be invoked whenever the actor undergoes changes that
 * affect its rendering. These changes are:
 *
 * 1. morphing = the geometry has changed
 * 2. texturing = the actor has a new texture
 * 3.
 */
nucleo.Actor.prototype.reallocate = function () {

    // The engine will read and affect this property.
    this._dirty = true;
};
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
 * @constructor
 * @class 
 * Picking in voxelent is based on colors. The Picker class keeps track of the colors
 * in the scene that are used to identify objects and cells. The picker contains a map
 * that allows recognizing an object given a color.
 * @author Diego Cantor
 */
nucleo.Picker = function Picker(){
    this._objects = {};
    this._colors = {};
};

/**
 * @static 
 */
nucleo.Picker.RESOLUTION = 1/255; // 1 / (2^8-1) for unsigned byte according to WebGL reference

/**
 * @private
 */
nucleo.Picker.prototype._hex2rgb = function(p_hex_string){
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = p_hex_string.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
         parseInt(result[1], 16),
         parseInt(result[2], 16),
         parseInt(result[3], 16)
    ] : null;
};

/**
 * @private
 */
nucleo.Picker.prototype._rgb2hex = function(r,g,b){
    
    var c = nucleo.util.createArr3(r,g,b);
    return "#" + ((1 << 24) + (c[0] << 16) + (c[1]<< 8) + c[2]).toString(16).slice(1);
};

/**
 * Generates a color that has not been assigned to any object or cell in the scene
 */
nucleo.Picker.prototype._getColor = function(){
    
    function getN(){
        var x =  Math.floor(Math.random()*255);
        if (x == 0) 
            return getN();
        else
            return x;
    };
   return [getN(), getN(), getN()];
};
  
/**
 * 
 */
nucleo.Picker.prototype.color2decimal = function(color){
    r = color[0] * nucleo.Picker.RESOLUTION;
    g = color[1] * nucleo.Picker.RESOLUTION;
    b = color[2] * nucleo.Picker.RESOLUTION;
    return [r,g,b];
}  


/**
 * @param {Object} obj an object that can be either a Cell or a Actor
 */
nucleo.Picker.prototype.getColorFor = function(obj){
    
    var uid = obj.UID;
    
    if (uid == null || uid  == undefined){
        alert("Picker.getColor: invalid object");
        return;
    }
    
    var color,key; 
    
    if(!this._objects[uid]){
         
        do{
            color = this._getColor();
            key   = this._rgb2hex(color);
        } while(key in this._colors);

        this._objects[uid] =  color;
        this._colors[key] = uid;
    }
    color = this._objects[uid];
    return this.color2decimal(color);
};

/**
 * Checks if the color passed as a parameter correspond to any UID (object,cell) assigned in the picker
 * If so, it returns an object with the results
 * If not, it returns null indicating the query was unsuccessful.
 * @param {Array} p_color
 * 
 */
nucleo.Picker.prototype.query = function(p_color){
    
    var distance = 100;
    var closest_uid = undefined;
    var results = {}
    var color = p_color.slice(0,3); //only rgb -> 3 components
    
    var key = this._rgb2hex(color);
    
    if (this._colors[key]){
        results.uid = this._colors[key];
        results.color = color;
        return results;
    }
    return null;
};

/**
 * Defines a global picker 
 */
nucleo.Picker.instance = new nucleo.Picker();


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
 * Engine interface
 */
nucleo.Engine = function Engine(){
    
    this.gl           = undefined;
    this.pm           = undefined;
    this._view        = undefined;
    this._clear_color = undefined;
    this._transforms  = undefined;   //@TODO review

};

/*-------------------------------------------------------------------------*/
//Virtual Methods
/*-------------------------------------------------------------------------*/
nucleo.Engine.prototype.allocate           = function(scene){};
nucleo.Engine.prototype.render             = function(scene){};
nucleo.Engine.prototype.deallocate         = function(scene){};
nucleo.Engine.prototype.reallocate         = function(scene){};
nucleo.Engine.prototype.disableOffscreen   = function(){};
nucleo.Engine.prototype.enableOffscreen    = function(){};
nucleo.Engine.prototype.isOffscreenEnabled = function(){};
nucleo.Engine.prototype.readOffscreenPixel = function(x,y){};

/*-------------------------------------------------------------------------*/
// Engine Set Up
/*-------------------------------------------------------------------------*/
/**
 * Initializes the engine
 * @param {Object} p_renderer the renderer using this instance of the engine
 */
nucleo.Engine.prototype.init = function(p_renderer){
    
    this._getGL(p_renderer);
    this.pm           = new nucleo.ProgramManager(this.gl);
    this._view        = p_renderer.view;
    this._clear_color = this._view.backgroundColor;
    this._transforms  = new nucleo.Transforms(p_renderer.view);
    this.configure();
};

/**
 * Obtains the WebGL context
 */
nucleo.Engine.prototype._getGL = function(p_renderer){
    var ctx        = undefined;
    var canvas     = p_renderer.view.canvas;
    var names      = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
    
    this.gl        = undefined;
    
    for (var i = 0; i < names.length; ++i) {
        try {
            ctx = canvas.getContext(names[i]);
        } 
        catch(e) {}
        if (ctx) {
            break;
        }
    }
    if (ctx == null) {
        //@TODO: print a nicer jquery  alert
        alert("Sorry: WebGL is not available on this browser. Have you tried the newest version of Firefox, Chrome or Safari?"); 
        return undefined;
    }
    else {
        this.gl = ctx;
    }
};

/**
* Configures some gl variables
* 
* 
*/
nucleo.Engine.prototype.configure = function(){
    //@TODO: Review depth test and blending functions maybe these should be configurable
    var gl = this.gl;
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.depthFunc(gl.LESS);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
 
};

/*-------------------------------------------------------------------------*/
// Clearing the canvas methods
/*-------------------------------------------------------------------------*/
/**
 * Clears the canvas
 */
nucleo.Engine.prototype.clear = function(){
    var gl     = this.gl;
    var canvas = this._view.canvas;
    var width  = canvas.width;
    var height = canvas.height;
    var cc     = this._clear_color;
    
    gl.clearColor(cc[0], cc[1], cc[2], 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.viewport(0, 0, width, height); //@TODO: Think about dividing view ports for multi-view apps - March 19/2012
    
    this._transforms.calculateProjection();
};

/**
 * Sets the color used to clear the canvas
 * @param {Number, Array, vec3} r it can be the red component, a 3-dimensional Array or a vec3 (glMatrix)
 * @param {Number} g if r is a number, then this parameter corresponds to the green component
 * @param {Number} b if r is a number, then this parameter corresponds to the blue component
 * @see View#setBackgroundColor
 */
nucleo.Engine.prototype.clearColor = function(r,g,b){
    var cc = nucleo.util.createArr3(r,g,b);
    this._clear_color = cc;
    this.gl.clearColor(cc[0], cc[1], cc[2], 1.0);
};

/**
 * Sets the clear depth
 * @param {Number} d the new clear depth
 */
nucleo.Engine.prototype.clearDepth = function(d){
    this.gl.clearDepth(d);
};

/*-------------------------------------------------------------------------*/
// Working with Programs
/*-------------------------------------------------------------------------*/
nucleo.Engine.prototype.releaseProgram = function(){
   this.pm.releaseProgram();
};

nucleo.Engine.prototype.setProgram = function(p_program, p_force_it){
    this.pm.setProgram(p_program, p_force_it);
};
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
 * 
 * @param {Object} allocate
 * @param {Object} render
 * @param {Object} deallocate
 */
nucleo.ExternalEngine = function ExternalEngine(renderer, allocate, render, deallocate){
    nucleo.Engine.call(this);
    this.renderer = renderer;
    this.allocateCallback = allocate;
    this.renderCallback = render;
    this.deallocateCallback = deallocate;
};

nucleo.ExternalEngine.prototype = new nucleo.Engine();
nucleo.ExternalEngine.prototype.constructor = nucleo.ExternalEngine;


nucleo.ExternalEngine.prototype.allocate = function(scene){
    this.allocateCallback(this.renderer, scene);
};


nucleo.ExternalEngine.prototype.render = function(scene){
    this.renderCallback(this.renderer, scene);  
};

nucleo.ExternalEngine.prototype.deallocate = function(scene){
    this.deallocateCallback(this.renderer, scene);  
};
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
 * This is the default rendering engine. It contains all the low level GL code that makes
 * possible efficient rendering in Nucleo
 * 
 * @constructor creates a new engine
 * @class Implements the default rendering engine 
 * @author Diego Cantor
 * 
 */
nucleo.RenderEngine = function RenderEngine(){
    nucleo.Engine.call(this);
	this._gl_buffers  = {};
	this._gl_textures = {};
	this._offscreen = false;
    this._target    = undefined;
    this._onPickingBuffer  = false;
    this._debug_picking_flag = false; //used only for debugging purposes	
};

nucleo.RenderEngine.prototype = new nucleo.Engine();
nucleo.RenderEngine.prototype.constructor = nucleo.RenderEngine;

/**
 * Configures the engine 
 */
nucleo.RenderEngine.prototype.configure = function(){
    nucleo.Engine.prototype.configure.call(this);
    var gl = this.gl;
    gl.clearDepth(1.0);
    gl.disable(gl.CULL_FACE);
};

/**
 * Implements basic allocation of memory. Creates the WebGL buffers for the actor
 * @param {Scene} scene the scene to allocate memory for
  */
nucleo.RenderEngine.prototype.allocate = function(scene){
    var elements = scene._actors.concat(scene.toys.list);
    var i = elements.length;
    
    while(i--){
        this._allocateActor(elements[i]);
    }
};

/**
 * @param {Scene} scene the scene to deallocate memory from
 */
nucleo.RenderEngine.prototype.deallocate = function(scene){
    //DO NOTHING. THE DESCENDANTS WILL.
};

/**
 * Allocates the GL buffers required to render the respective geometry
 * @private
 * 
 */
nucleo.RenderEngine.prototype._allocateActor = function(actor){
    
    var gl      = this.gl;
    var model   = actor.model;
    var buffers = {};
    
    if (!(model.UID in this._gl_buffers) || actor._dirty){   
            this._reallocateActor(actor); 
            actor._dirty = false;
    }
};

	
/**
 * Reallocates the GL buffers to render the respective geometry
 * @private
 */
nucleo.RenderEngine.prototype._reallocateActor = function(actor){
   
    var gl      = this.gl;
    var model   = actor.model;
    var buffers = this._gl_buffers[model.UID] || {};
    var am = nucleo.Actor.MODE;
    
    
    //-----------------------------------------------------------------------
    // Allocate vertices
    //-----------------------------------------------------------------------
    if (buffers.vertex == undefined) { buffers.vertex = gl.createBuffer();}
    
    var vertices = undefined;
    switch(actor.mode){
        case am.BOUNDING_BOX: vertices = actor.getBoundingBoxVertices(); break;
        default: vertices = model.vertices;
    }
    
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertex);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    
    //-----------------------------------------------------------------------
    // Allocate normals
    //-----------------------------------------------------------------------
    if (model.normals){
        if (buffers.normal == undefined) {buffers.normal = gl.createBuffer();}
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normal);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(model.normals), gl.STATIC_DRAW);
    }
    
    //-----------------------------------------------------------------------
    //@TODO: we may have scalars instead of colors in the shaders
    //do we need two buffers here?
    //-----------------------------------------------------------------------
    if (model.scalars != undefined || model.colors != undefined){
        if (buffers.color == undefined) {buffers.color = gl.createBuffer(); }
        //we don't BIND values or use the buffers 
        //until the lut is loaded and available
    }
    
    //-----------------------------------------------------------------------
    // Allocate indices if they exist
    //-----------------------------------------------------------------------
    if (model.indices != undefined){    
        if (buffers.index == undefined) { buffers.index = gl.createBuffer(); } 
        
    
        var indices = undefined;
    
        switch(actor.mode){
        case am.SOLID:           indices = model.indices;                break;
        case am.WIREFRAME:       indices = model.wireframe;              break;
        case am.POINTS:          indices = model.indices;                break;
        case am.LINES:           indices = model.indices;                break;
        case am.BOUNDING_BOX:    indices = Model.BB_INDICES;          break;
        case am.BB_AND_SOLID:    indices = model.indices;                break;
        case am.WIRED_AND_SOLID: indices = model.indices;                break;
        case am.FLAT:            indices = model.indices;                break;
        case am.TEXTURED:        indices = model.indices;                break;
        default:
            throw('There was a problem while rendering the actor ['+actor.name+'].'+
            'The visualization mode: '+actor.mode+' is not valid.'); 
        }
        
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.index);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    }
    
    //-----------------------------------------------------------------------
    // Buffers to draw parts.
    //-----------------------------------------------------------------------
    if (actor.mode == am.FLAT || actor.model.type == nucleo.Model.TYPE.BIG_DATA){
        if (buffers.vertex_parts == undefined) { buffers.vertex_parts   = gl.createBuffer(); }
        if (buffers.normal_parts == undefined) { buffers.normal_parts   = gl.createBuffer(); }
        if (buffers.color_parts  == undefined) { buffers.color_parts    = gl.createBuffer(); }
        if (buffers.index_parts  == undefined) { buffers.index_parts    = gl.createBuffer(); }
    }
    else{
        if (buffers.vertex_parts != undefined) { gl.deleteBuffer(buffers.vertex_parts);  buffers.vertex_parts = null;  delete buffers.vertex_parts; }
        if (buffers.normal_parts != undefined) { gl.deleteBuffer(buffers.normal_parts);  buffers.normal_parts = null;  delete buffers.normal_parts;}
        if (buffers.color_parts  != undefined) { gl.deleteBuffer(buffers.color_parts);   buffers.color_parts = null;   delete buffers.color_parts;}
        if (buffers.index_parts  != undefined) { gl.deleteBuffer(buffers.index_parts);   buffers.index_parts = null;   delete buffers.index_parts;}
    }
    
    //-----------------------------------------------------------------------
    // Additional bbuffers for wired_and_solid and for bb_and_solid
    //-----------------------------------------------------------------------
    
    if (actor.mode == am.WIRED_AND_SOLID){
        
        buffers.index_ws = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.index_ws);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(model.wireframe), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }
    else{
        if (buffers.index_ws != undefined){
            gl.deleteBuffer(buffers.index_ws);
            buffers.index_ws = null;
            delete buffers.index_ws;
        }
    }
    
    if (actor.mode == am.BB_AND_SOLID){
        buffers.vertex_bs = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertex_bs);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(actor.getBoundingBoxVertices()), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        
        buffers.index_bs = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.index_bs);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(Model.BB_INDICES), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }
    else{
        if (buffers.vertex_bs != undefined){
            gl.deleteBuffer(buffers.vertex_bs);
            buffers.vertex_bs = null;
            delete buffers.vertex_bs;
        }
        
        if (buffers.index_bs != undefined){
            gl.deleteBuffer(buffers.index_bs);
            buffers.index_bs = null;
            delete buffers.index_bs;
        }
    }

    //-----------------------------------------------------------------------
    //When the texture loads, make sure we call actor._reallocate
    //-----------------------------------------------------------------------
    if (model.texcoords && actor.material.texture){
        buffers.texcoords = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.texcoords);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(model.texcoords), gl.STATIC_DRAW);
        
        this._gl_textures[actor.UID] = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this._gl_textures[actor.UID]);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, actor.material.texture.image);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.bindTexture(gl.TEXTURE_2D, null);
    }
    
    //-----------------------------------------------------------------------
    // Clean Up
    //-----------------------------------------------------------------------
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    
    //-----------------------------------------------------------------------
    // Save buffers
    //-----------------------------------------------------------------------
    this._gl_buffers[model.UID] = buffers;
};

/**
 * Binds the array buffer and enables the normal attribute.
 * The data is not passed again to the buffer. This only happens during
 * the reallocation of the actor
 * @private
 */
nucleo.RenderEngine.prototype._setNormals = function(actor){
    
    var model = actor.model;
    var gl = this.gl;
    var pm = this.pm;
    var buffers = this._gl_buffers[model.UID];
    var essl    = nucleo.ESSL;
    
    if(model.normals && actor.material.shading){
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normal);
        pm.enableAttribute(essl.NORMAL_ATTRIBUTE);
        pm.setAttributePointer(essl.NORMAL_ATTRIBUTE,3,gl.FLOAT, false, 0,0);
    }
}; 

/**
 * Binds the color buffer and passes the data to it. We need a more
 * efficient way to do this to avoid passing data on every rendering cycle.
 * Maybe hold from passing data and do it on reallocation once colors are available.
 * 
 * @private
 */
nucleo.RenderEngine.prototype._setColors = function(actor){
    
    var model = actor.model;
    var gl = this.gl;
    var pm = this.pm;
    var buffers = this._gl_buffers[model.UID];
    var essl    = nucleo.ESSL;
    
    if (actor.material.colors && actor.material.colors.length == actor.model.vertices.length){    
        pm.setUniform("uUseVertexColors", true);
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(actor.material.colors), gl.STATIC_DRAW);
        pm.enableAttribute(essl.COLOR_ATTRIBUTE);
        pm.setAttributePointer(essl.COLOR_ATTRIBUTE, 3, gl.FLOAT, false, 0, 0);
    }
};

/**
 * Sets up the vertex buffer for the renderable part
 * @private
 */
nucleo.RenderEngine.prototype._setRenderableVertices = function(actor,part){
    
    var gl = this.gl;
    var pm = this.pm;
    var buffers = this._gl_buffers[actor.model.UID];
    var essl    = nucleo.ESSL;
                
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertex_parts);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(part.vertices), gl.STATIC_DRAW);
    pm.setAttributePointer(essl.VERTEX_ATTRIBUTE, 3, gl.FLOAT, false, 0, 0); 
};

/**
 * Sets up the normal buffer for the renderable part
 * @private
 */
nucleo.RenderEngine.prototype._setRenderableNormals = function(actor,part){
    
  var gl = this.gl;
  var pm = this.pm;
  var buffers = this._gl_buffers[actor.model.UID];
  var essl    = nucleo.ESSL;
  
  if (part.normals != undefined && part.normals.length>0){
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normal_parts);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(part.normals), gl.STATIC_DRAW);
    pm.enableAttribute(essl.NORMAL_ATTRIBUTE);
    pm.setAttributePointer(essl.NORMAL_ATTRIBUTE,3,gl.FLOAT, false, 0,0);
  }
    
};

/**
 * Sets up the colors buffer for the renderable part
 * @private
 */
nucleo.RenderEngine.prototype._setRenderableColors = function(actor,part){
    
  var gl = this.gl;
  var pm = this.pm;
  var buffers = this._gl_buffers[actor.model.UID];
  var essl    = nucleo.ESSL;
  
  if (part.colors != undefined && part.colors.length>0){
      
        pm.setUniform("uUseVertexColors", true);
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color_parts);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(part.colors), gl.STATIC_DRAW);
        pm.enableAttribute(essl.COLOR_ATTRIBUTE);
        pm.setAttributePointer(essl.COLOR_ATTRIBUTE, 3, gl.FLOAT, false, 0, 0);
    }  
};
	

/**
 * Updates the model view and normal matrices that
 * will be used with each actor during rendering.
 * Called once per every render cycle.
 * @param {Scene} scene the scene to be rendered
 * @private
 */
nucleo.RenderEngine.prototype._updateActorTransforms = function(scene){
     var trx     = this._transforms;
     var elements = scene._actors.concat(scene.toys.list);
     var N = elements.length;
     var actor = undefined;
      
    trx.calculateModelView();
     
     for (var i=0;i<N;i+=1){
         actor = elements[i];
         if (actor.visible == false && scene.frameAnimation == undefined) continue;
         actor._matrix_world  = mat4.multiply(actor._matrix_world, trx.model_view, actor._matrix);
         actor._matrix_normal = mat4.copy(actor._matrix_normal, actor._matrix_world);
         actor._matrix_normal = mat4.invert(mat4.create(), actor._matrix_normal);
         actor._matrix_normal = mat4.transpose(actor._matrix_normal, actor._matrix_normal);
     }
 };
 
 /**
 * Renders the actors one by one
 * @param {Scene} scene the scene to render
 */
nucleo.RenderEngine.prototype.render = function(scene){
   
    var trx     = this._transforms,
    pm          = this.pm,
    gl          = this.gl,
    essl        = nucleo.ESSL;
    
    this._updateActorTransforms(scene);
    pm.setUniform(essl.PERSPECTIVE_MATRIX,  trx.projection);
 
    //@TODO: CHECK is this supposed to be here? >>//
    if (scene.frameAnimation != undefined){  scene.frameAnimation.update(); }
    
    this._renderPicking(scene._actors);
    
    var elements = scene._actors.concat(scene.toys.list);
    var i = elements.length;
    while(i--){
        this._renderActor(elements[i]);
    }
};

/**
 * Renders pickable actors in the offscreen buffer 
 * @private
 */
nucleo.RenderEngine.prototype._renderPicking = function(actors){
    
    if (this._target == undefined) return; //quick fail if the target has not been defined
    
    if (this._offscreen){
        
        var gl = this.gl;
        
        this._onPickingBuffer = true;
        
        gl.bindFramebuffer(gl.FRAMEBUFFER, this._target.framebuffer);
        gl.clearColor(0,0,0,1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        
        var i = actors.length;
        while(i--){
            if (actors[i].isPickable()){
                this._renderActor(actors[i]);
            }
        }
        
        this._onPickingBuffer = false;
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }
    
    if (this._debug_picking_flag){
        gl.clearColor(0,0,0,1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    };
};

/**
 * @private
 */
nucleo.RenderEngine.prototype._renderActor = function(actor){

    if (!actor.visible) return; //Quick and simple

    var model   = actor.model;
    var buffers = this._gl_buffers[model.UID];
    var texture = this._gl_textures[actor.UID]; 
    var gl      = this.gl;
    var pm      = this.pm;
    var essl    = nucleo.ESSL;
    var trx     = this._transforms;
    var diffuse = [actor.material.diffuse[0], 
                   actor.material.diffuse[1], 
                   actor.material.diffuse[2],
                   actor.material.opacity];
                   
    /**
     * If the renderer is not forcing his program, then give the actors
     * a chance to decide which program they want to use to be rendered
     */
    /*if (!this._enforce && actor.mode != nucleo.Actor.MODE.FLAT){
        if(actor.material.shininess > 0){
            this.setProgram(nucleo.go.essl.phong);
            pm.setUniform("uShininess", actor.material.shininess);
            pm.setUniform("uMaterialSpecular", actor.material.specular);
        }
        else{
            this.setProgram(nucleo.go.essl.lambert);
        }
    }*/
   
  
    
    if (actor.mode == nucleo.Actor.MODE.FLAT){
        this.setProgram(nucleo.go.essl.lambert);
    }
    else{
        //pm.setUniform("uShininess", actor.material.shininess);
        //pm.setUniform("uMaterialSpecular", actor.material.specular);
    }
   
    pm.disableAttribute(essl.TEXCOORD_ATTRIBUTE);
    pm.disableAttribute(essl.COLOR_ATTRIBUTE);
    pm.disableAttribute(essl.NORMAL_ATTRIBUTE);
    pm.disableAttribute(essl.PICKING_COLOR_ATTRIBUTE);
    pm.enableAttribute(essl.VERTEX_ATTRIBUTE);
    
    pm.setUniform("uUseVertexColors",       false);
    pm.setUniform("uUseTextures",           false);
    pm.setUniform("uUseShading",            actor.material.shading);
    pm.setUniform("uMaterialDiffuse",       diffuse);
    pm.setUniform(essl.MODEL_VIEW_MATRIX,   actor._matrix_world);
    pm.setUniform(essl.NORMAL_MATRIX,       actor._matrix_normal);
    
    
    this._handleCulling(actor);
    
    if(this._onPickingBuffer || this._debug_picking_flag){
        this._renderPickingBuffer(actor);
        return;
    }
    
    // SETTING UP THE VERTEX ATTRIBUTE    
   //if (actor.mode != nucleo.Actor.MODE.FLAT && actor.model.type != define.Model.TYPE.BIG_DATA){
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertex);
        pm.setAttributePointer(essl.VERTEX_ATTRIBUTE, 3, gl.FLOAT, false, 0, 0);
   // }
    
    var am = nucleo.Actor.MODE;
    
    switch(actor.mode){
        case am.SOLID:           this._renderSolid(actor);               break;
        case am.WIREFRAME:       this._renderWireframe(actor);           break;
        case am.POINTS:          this._renderPoints(actor);              break;
        case am.LINES:           this._renderLines(actor);               break;
        case am.BOUNDING_BOX:    this._renderBoundingBox(actor);         break;
        case am.BB_AND_SOLID:    this._renderBoundingBoxAndSolid(actor); break;
        case am.WIRED_AND_SOLID: this._renderWiredAndSolid(actor);       break;
        case am.FLAT:            this._renderFlat(actor);                break;
        case am.TEXTURED:        this._renderTextured(actor);            break;
        default:
            throw('There was a problem while rendering the actor ['+actor.name+']. The visualization mode: '+actor.mode+' is not valid.'); 
    }
    
    //Cleaning up
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
};


/**
 * Renders a solid actor
 * @private
 */
nucleo.RenderEngine.prototype._renderSolid = function(actor){
    
    var buffers = this._gl_buffers[actor.model.UID];
    var gl      = this.gl;
    var pm      = this.pm;
    var essl    = nucleo.ESSL;
    
    if (actor.model.type != nucleo.Model.TYPE.SIMPLE){
        
        if (actor.renderable  == undefined){
            alert('the actor does not have a renderable object');
            throw 'the actor does not have a renderable object';
        }
        
        parts = actor.renderable.parts;
        var i = parts.length;
        while(i--){
            var part = parts[i];
            this._setRenderableVertices(actor,part);
            this._setRenderableNormals(actor,part);
            this._setRenderableColors(actor,part);
            
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.index_parts);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(part.indices), gl.STATIC_DRAW);
            gl.drawElements(gl.TRIANGLES, part.indices.length, gl.UNSIGNED_SHORT,0);
        }
    }
    else{
    
        this._setNormals(actor);
        this._setColors(actor);    
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.index);
        gl.drawElements(gl.TRIANGLES, actor.model.indices.length, gl.UNSIGNED_SHORT,0);
    }
};

/**
 * Renders an actor as a wireframe using the wireframe indices
 */
nucleo.RenderEngine.prototype._renderWireframe = function(actor){
    

    var buffers = this._gl_buffers[actor.model.UID];
    var gl      = this.gl;
    var pm      = this.pm;
    var essl    = nucleo.ESSL;
    
    if (!actor.toy){
        this._setNormals(actor);
    }
    this._setColors(actor);
    
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.index);
    gl.drawElements(gl.LINES, actor.model.wireframe.length, gl.UNSIGNED_SHORT,0);
};

/**
 * Render an actor as points
 * @private
 */
nucleo.RenderEngine.prototype._renderPoints = function(actor){
    
    var model   = actor.model;
    var gl      = this.gl;
    var pm      = this.pm;
    
    pm.setUniform("uUseShading", false);
    pm.setUniform("uPointSize", 5); //TODO: fix hardcode
    this._setColors(actor);
    gl.drawArrays(gl.POINTS,0, model.vertices.length/3);
};

/**
 * Renders an actor using lines
 * @private
 */
nucleo.RenderEngine.prototype._renderLines = function(actor){
    
    var buffers = this._gl_buffers[actor.model.UID];
    var gl      = this.gl;
    var pm      = this.pm;
    var essl    = nucleo.ESSL;
    
    pm.setUniform("uUseShading", false);
    
    if (actor.model.type == nucleo.Model.TYPE.BIG_DATA){
        
        if (actor.renderable  == undefined){
            alert('the actor does not have a renderable object');
            throw 'the actor does not have a renderable object';
        }
        
        parts = actor.renderable.parts;
        var i = parts.length;
        
        for(var j=0; j<i;j++){
            var part = parts[j];
            this._setRenderableVertices(actor,part); //same vertex buffer for all parts?
            this._setRenderableColors(actor,part);
            
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.index_parts);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(part.indices), gl.STATIC_DRAW);
            gl.drawElements(gl.LINES, part.indices.length, gl.UNSIGNED_SHORT,0);
        }
    }
    else{
        this._setColors(actor);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.index);
        gl.drawElements(gl.LINES, actor.model.indices.length, gl.UNSIGNED_SHORT,0); 
    }
};

/**
 * Renders the bounding box of an actor
 * @private
 */
nucleo.RenderEngine.prototype._renderBoundingBox = function(actor){
    
    var buffers = this._gl_buffers[actor.model.UID];
    var gl      = this.gl;
    var pm      = this.pm;
    var essl    = nucleo.ESSL;
    
    pm.disableAttribute(essl.NORMAL_ATTRIBUTE);
    pm.setUniform("uUseShading", false);
    
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.index);
    gl.drawElements(gl.LINES, Model.BB_INDICES.length, gl.UNSIGNED_SHORT,0);
};

/**
 * @private
 */
nucleo.RenderEngine.prototype._renderBoundingBoxAndSolid = function(actor){    var model   = actor.model;
    
    var buffers = this._gl_buffers[model.UID];
    var gl      = this.gl;
    var pm      = this.pm;
    var essl    = nucleo.ESSL;
    var trx     = this._transforms;    
    //solid
    this._renderSolid(actor);
    
    //bounding box, don't move the bb as it has been updated with the actor transform already ;-)
    trx.calculateModelView();
    trx.calculateNormal(); 
    pm.setUniform(essl.MODEL_VIEW_MATRIX,  trx.model_view);
    pm.setUniform(essl.NORMAL_MATRIX, trx.normal);
    pm.disableAttribute(essl.NORMAL_ATTRIBUTE);
    pm.setUniform("uUseShading", false);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertex_bs);
    pm.setAttributePointer(essl.VERTEX_ATTRIBUTE, 3, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.index_bs);
    gl.drawElements(gl.LINES, Model.BB_INDICES.length, gl.UNSIGNED_SHORT,0);
};

/**
 * @private
 */
nucleo.RenderEngine.prototype._renderWiredAndSolid = function(actor){
   
    var model   = actor.model;
    var buffers = this._gl_buffers[model.UID];
    var gl      = this.gl;
    var pm      = this.pm;
    var essl    = nucleo.ESSL;

    this._renderSolid(actor);
    
    pm.setUniform("uUseShading",false);
    pm.setUniform("uMaterialDiffuse",[0.9,0.9,0.9,1.0]);
    pm.disableAttribute(essl.NORMAL_ATTRIBUTE);
    
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.index_ws);
    gl.drawElements(gl.LINES, model.wireframe.length, gl.UNSIGNED_SHORT,0); 
};

/**
 * This method will create a mesh for the actor if it does not exist one already
 * Instead of waiting for the mesh to be ready, it will render a wireframe
 * of the actor while it is ready.
 * 
 * @private
 */
nucleo.RenderEngine.prototype._renderFlat = function(actor){
    
    var model   = actor.model;
    var buffers = this._gl_buffers[model.UID];
    var texture = this._gl_textures[actor.UID]; 
    var gl      = this.gl;
    var pm      = this.pm;
    var essl    = nucleo.ESSL;
    
    if (actor.mesh == undefined){
        actor.mesh = new Mesh(actor);
        actor.renderable = new Renderable(actor);
        
    }
    
    if (actor.mesh.model == undefined) {
        //mesh not ready yet. Render actor wireframe in the mean time
        var model = actor.model;
        
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertex);
        pm.setAttributePointer(essl.VERTEX_ATTRIBUTE, 3, gl.FLOAT, false, 0, 0);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normal);
        pm.setAttributePointer(essl.NORMAL_ATTRIBUTE,3,gl.FLOAT, false, 0,0);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        
        pm.enableAttribute(essl.NORMAL_ATTRIBUTE);
 
        pm.setUniform("uUseShading",actor.material.shading);
        
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.index);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(model.wireframe), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        
        this._renderWireframe(actor);
        return;
    } 

    pm.setUniform("uUseShading",true);
    pm.enableAttribute(essl.NORMAL_ATTRIBUTE);
    
    var parts = actor.renderable.parts;
    var i = parts.length;
    
    while(i--){
        
        var part = parts[i];
      
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertex_parts);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(part.vertices), gl.STATIC_DRAW);
        pm.setAttributePointer(essl.VERTEX_ATTRIBUTE, 3, gl.FLOAT, false, 0, 0);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normal_parts);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(part.normals), gl.STATIC_DRAW);
        pm.setAttributePointer(essl.NORMAL_ATTRIBUTE,3,gl.FLOAT, false, 0,0);
        
        
       if (part.colors && part.colors.length > 0){ 
                pm.enableAttribute(essl.COLOR_ATTRIBUTE);
                pm.setUniform("uUseVertexColors", true);
               
                gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color_parts);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(part.colors), gl.STATIC_DRAW);
                pm.setAttributePointer(essl.COLOR_ATTRIBUTE, 3, gl.FLOAT, false, 0, 0);
        }
        
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.index_parts);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(part.indices), gl.STATIC_DRAW);
        gl.drawElements(gl.TRIANGLES, part.indices.length, gl.UNSIGNED_SHORT,0);
    }
     
};


/**
 * This method takes care of rendering the scene in the background buffer. Only the 
 * actors that are pickable reach this method (see _handlePicking) so the isPickable 
 * validation (actor.isPickable) is not necessary here.
 * 
 * This method makes sure the correct version of the object is rendered in the background
 * buffer
 * 
 * if the object picking method is OBJECT then the same object is rendered but using
 * the picking color (actor._pickingColor) as the diffuse material uniform. 
 *
 * Otherwise, when the object picking mode is CELL, then the mesh model is rendered. 
 * The mesh model colors every cell differently (drawback in performance)
 *    
 * @private
 */
nucleo.RenderEngine.prototype._renderPickingBuffer = function(actor){
    
    var model   = actor.model;
    var buffers = this._gl_buffers[model.UID];
    var gl      = this.gl;
    var pm      = this.pm;
    var essl    = nucleo.ESSL;
    
    if (actor._picking == nucleo.Actor.PICKING.DISABLED) return;
     
    pm.setUniform("uUseShading",false);
    
      
    if (actor._picking == nucleo.Actor.PICKING.CELL){
        if (actor.mesh == undefined || actor.mesh.model == undefined){
            return; // we just fail safely. We will render it whenever the actor is ready ;-)
                    // the mesh is generated inside actor.setPicker (see actor.setPicker method)
        }
        
        if (buffers.picking_parts == undefined){
            buffers.picking_parts  = gl.createBuffer();
            buffers.picking_colors = gl.createBuffer();
            buffers.picking_index  = gl.createBuffer();
        }
        
        pm.setUniform("uUseVertexColors", true);
        pm.enableAttribute(essl.COLOR_ATTRIBUTE);
      
        var parts = actor.renderable.parts;
        var i = parts.length;
        while(i--){
            var part = parts[i];
            gl.bindBuffer(gl.ARRAY_BUFFER, buffers.picking_parts);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(part.vertices), gl.STATIC_DRAW);
            pm.setAttributePointer(essl.VERTEX_ATTRIBUTE, 3, gl.FLOAT, false, 0, 0);
 
            if (part.pickingColors && part.pickingColors.length == part.vertices.length){
                gl.bindBuffer(gl.ARRAY_BUFFER, buffers.picking_colors);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(part.pickingColors), gl.STATIC_DRAW);
                pm.setAttributePointer(essl.COLOR_ATTRIBUTE, 3, gl.FLOAT, false, 0, 0);
                
            }
            else{
                alert('The object '+part.name+' does not have picking colors assigned.');
                throw('The object '+part.name+' does not have picking colors assigned.');
            }
            
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.picking_index);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(part.indices), gl.STATIC_DRAW);
            gl.drawElements(gl.TRIANGLES, part.indices.length, gl.UNSIGNED_SHORT,0);
        }
    }
    else if (actor._picking == nucleo.Actor.PICKING.OBJECT){
        pm.setUniform("uMaterialDiffuse",actor._pickingColor.concat(1.0));
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertex);
        pm.setAttributePointer(essl.VERTEX_ATTRIBUTE, 3, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.index);
        gl.drawElements(gl.TRIANGLES, model.indices.length, gl.UNSIGNED_SHORT,0);
    }
    
    //Cleaning up
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
};

/**
 * @private
 */
nucleo.RenderEngine.prototype._renderTextured = function(actor){
    
    var model   = actor.model;
    var buffers = this._gl_buffers[model.UID];
    var texture = this._gl_textures[actor.UID]; 
    var gl      = this.gl;
    var pm     = this.pm;
    var essl    = nucleo.ESSL;
    
    if (!actor.material.texture.loaded){
        this._renderSolid(actor);
        return;
    }
    
    if (actor._new_texture){
        actor.reallocate();
        actor._new_texture = false;
        return;
    }
    
    
    if (model.texcoords){
        
        pm.setUniform("uUseTextures", true);
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.texcoords);
        pm.setAttributePointer(essl.TEXCOORD_ATTRIBUTE, 2, gl.FLOAT,false, 0,0);
        pm.enableAttribute(essl.TEXCOORD_ATTRIBUTE);
        
    }
    else{
        //@TODO: Be more specific
        throw('error');
    }
            
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, actor.material.texture.getMagFilter(gl));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, actor.material.texture.getMinFilter(gl));
    pm.setUniform("uSampler", 0);
    
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.index);
    gl.drawElements(gl.TRIANGLES, model.indices.length, gl.UNSIGNED_SHORT,0);
};

/**
 * @private
 */
nucleo.RenderEngine.prototype._handleCulling = function(actor){
    var gl = this.gl;
    
    gl.disable(gl.CULL_FACE);
    if (actor.cull != nucleo.Actor.CULL.NONE){
        gl.enable(gl.CULL_FACE);
        switch (actor.cull){
            case nucleo.Actor.CULL.BACK: gl.cullFace(gl.BACK); break;
            case nucleo.Actor.CULL.FRONT: gl.cullFace(gl.FRONT); break;
        }
    } 
    
           
}; 
    
/**
 * Sets up the offscreen rendering variant
 * @param {RenderTarget} target the render target
 */
nucleo.RenderEngine.prototype.enableOffscreen = function(){
    this._offscreen = true;
    this._target = new RenderTarget(this);
};

/**
 * Sets up the offscreen rendering variant
 * @param {RenderTarget} target the render target
 */
nucleo.RenderEngine.prototype.disableOffscreen = function(){
    this._offscreen = false;
    delete this._target;
    this._target = undefined;
};

/**
 * Returns true if the offscreen rendering does not have any target.
 * @returns {true\false}
 */
nucleo.RenderEngine.prototype.isOffscreenEnabled = function(){
    return (this._target != undefined);    
};

/**
 * 
 * @param {Object} x position to read in the offscreen buffer
 * @param {Object} y position to read in the offscreen buffer
 * 
 */
nucleo.RenderEngine.prototype.readOffscreenPixel = function(x,y){
    var typed = this._target.readPixel(x,y); 
    
    //conversion from Uint8Array to regular Array
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays
    value = Array.apply( [], typed );
    value.constructor === Array;
   
   return  value;
};

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
 * @constructor
 * @class
 * Implements a basic rendering strategy that works with the following programs:
 * 
 * nucleo.ESSL.bake
 * TODO: Does not deal with model scalars well...
 * 
 */
nucleo.BakeEngine = function BakeEngine(renderer){

    this.renderer = renderer;
    
    var gl = renderer.gl;
    
    this._calls     = {}
    
    this._gl_buffers  = {
        index       : gl.createBuffer(),
        baked       : gl.createBuffer(),
        position    : gl.createBuffer(),
        scale       : gl.createBuffer(),
        shading     : gl.createBuffer()
    };  
    
    this._data        = {
        index       : [],
        baked       : [],
        position    : [],
        scale       : [],
        shading     : []
        
    }; 
     
    this._allocated   = []; //if an actor is here, do not allocate
    
    this._offsets     = {
       position :{},
       scale    :{},
       shading  :{},
       baked    :{} 
    }; 
    
    
    this.glsl = nucleo.util.extend(
        nucleo.ESSL,{
        POSITION: "aPosition",
        SCALE:    "aScale",
        SHADING:  "aShading"
    });

};


/**
 * Creates an array of a defined size populated with the indicated value
 * @private
 */
nucleo.BakeEngine.prototype._populate = function(value, size){
    var a = [];
    
    for (var i = 0; i < size; i+=1){
        if (value instanceof Array || value instanceof Float32Array){
            for (var j = 0; j < value.length; j+=1){
                a.push(value[j]);
            }
        }
        else{
            a.push(value);
        }
    }
    return a;
};


/**
 * Computes the number of required calls to render one scene
 * @private
 */
nucleo.BakeEngine.prototype._computeRequiredCalls = function(scene){

    var elements    = scene._actors; //.concat(scene.toys.list);
    var NUM         = elements.length;
    var accum = 0;
    var count = 1;
    
    for(var i = 0; i < NUM; i+=1){
        accum += elements[i].model.indices.length;
        if (accum > 65000){ //66560?
            accum = 0;
            count ++;
        }
    }
    return count;
};


/**
 * Receives one actor and returns the GL buffers
 * @private
 */
nucleo.BakeEngine.prototype._allocateActor = function(actor){
    
    if (this._allocated.indexOf(actor.UID) != -1) return; //this actor has been allocated
    var data            = this._data;
    var offsets         = this._offsets;
    var gl              = this.renderer.gl;
    var model           = actor.model;
    var NUM_VERTICES    = model.vertices.length;
    
        
    var color = [], normal = [];
    
    //Taking care of colors
    if (actor.material.diffuse) {
        color = this._populate(actor.material.diffuse, NUM_VERTICES/3);
    }
    else{
        color = this._populate([0.7,0.7,0.7], NUM_VERTICES/3);
    }
    
    //Taking care of normals
    if (model.normals){
        normal = model.normals;
    }
    else{
        normal = this._populate(0, NUM_VERTICES);
    }
    
    offsets.baked[actor.UID]    =data.baked.length;
    
    for (var i=0;i<NUM_VERTICES; i+=3){
        
        data.baked.push(model.vertices[i]);
        data.baked.push(model.vertices[i+1]);
        data.baked.push(model.vertices[i+2]);
        
        data.baked.push(normal[i]);
        data.baked.push(normal[i+1]);
        data.baked.push(normal[i+2]);
        
        data.baked.push(color[i]);
        data.baked.push(color[i+1]);
        data.baked.push(color[i+2]);
    }
    
    offsets.position[actor.UID] = data.position.length;
    offsets.scale[actor.UID]    = data.scale.length;
    offsets.shading[actor.UID]  = data.shading.length;
    
    data.position = data.position.concat(this._populate(actor._position, NUM_VERTICES/3));
    data.scale    = data.scale.concat(this._populate(actor._scale, NUM_VERTICES/3));
    data.shading = data.shading.concat(this._populate(actor.material.opacity, NUM_VERTICES/3));
    

    var ind = model.indices.slice(0);
    if (data.index.length > 0){
        var max = data.index.max()+1;
        var NUM_INDICES = model.indices.length;
        for (var i=0; i<NUM_INDICES; i+=1){
            ind[i] += max;
        }
        data.index = data.index.concat(ind);
    }
    else{
        data.index = ind;
    }
    
    this._allocated.push(actor.UID);
};

/**
 * @private
 */
nucleo.BakeEngine.prototype._updateActorPosition = function(actor){
    
    var data = this._data;
    var offset = this._offsets.position[actor.UID];
    
    if (offset == undefined) return;
    
    var LEN = actor.model.vertices.length + offset;
    for(var i =offset;i<LEN;i+=3){
        data.position[i]   = actor._position[0];
        data.position[i+1] = actor._position[1];
        data.position[i+2] = actor._position[2];
    }
};

/**
 * @private
 */
nucleo.BakeEngine.prototype._updateActorScale = function(actor){
    var data = this._data;
    var offset = this._offsets.scale[actor.UID];
    
    if (offset == undefined) return;
    
    var LEN = actor.model.vertices.length + offset;
    for(var i =offset;i<LEN;i+=3){
        data.scale[i]   = actor._scale[0];
        data.scale[i+1] = actor._scale[1];
        data.scale[i+2] = actor._scale[2];
    }
};


/**
 * @private
 */
nucleo.BakeEngine.prototype._updateActorColor = function(actor){
    var data = this._data;
    var offset = this._offsets.baked[actor.UID];
    
    if (offset == undefined) return;
    
    var LEN = (actor.model.vertices.length*3) + offset;
    for(var i =offset;i<LEN;i+=9){
        data.baked[i+6] = actor.material.diffuse[0];
        data.baked[i+7] = actor.material.diffuse[1];
        data.baked[i+8] = actor.material.diffuse[2];
    }
};

/**
 * @private
 */
nucleo.BakeEngine.prototype._updateActorShading = function(actor){
    var data = this._data;
    var offset = this._offsets.shading[actor.UID];
    
    if (offset == undefined) return;
    
    var LEN = (actor.model.vertices.length/3) + offset;
    var val = 0.0;
    
    if (actor.material.opacity){
        val = 1.0;
    }
    
    for(var i =offset;i<LEN;i+=1){
       data.shading[i]   = val;
    }
};


/**
 * @param {Scene} scene the scene to deallocate memory from
 */
nucleo.BakeEngine.prototype.deallocate = function(scene){

};


/**
 * Implements basic allocation of memory. Creates the WebGL buffers for the actor
 * @param {Scene} scene the scene to allocate memory for
 * @returns an object that contains the allocated WebGL buffers
 */
nucleo.BakeEngine.prototype.allocate = function(scene){
    
    if (this._computeRequiredCalls(scene) > 1) {
        throw 'Not renderable yet. Working on it. The number of indices exceeds the 65K limit';
    }
    
    var elements    = scene._actors; //.concat(scene.toys.list);
    var NUM         = elements.length;
    var r           = this.renderer;
    var buffers     = this._gl_buffers;
    var data        = this._data;

    var pm         = r.pm;
    var gl          = r.gl;
    var essl        = this.glsl;
    var mode        = gl.STATIC_DRAW;
    
    
    
    for(var i = 0; i < NUM; i+=1){
        this._allocateActor(elements[i]);
    }
    
    pm.enableAttribute(essl.VERTEX_ATTRIBUTE);
    pm.enableAttribute(essl.NORMAL_ATTRIBUTE);
    pm.enableAttribute(essl.COLOR_ATTRIBUTE);
    
    pm.enableAttribute(essl.POSITION);
    pm.enableAttribute(essl.SCALE);
    pm.enableAttribute(essl.SHADING);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.baked);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data.baked), mode);
    pm.setAttributePointer(essl.VERTEX_ATTRIBUTE, 3, gl.FLOAT, false, 36, 0);
    pm.setAttributePointer(essl.NORMAL_ATTRIBUTE, 3, gl.FLOAT, false, 36, 12);
    pm.setAttributePointer(essl.COLOR_ATTRIBUTE, 3, gl.FLOAT, false, 36, 24);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data.position), mode);
    pm.setAttributePointer(essl.POSITION, 3, gl.FLOAT, false,12,0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.scale);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data.scale), mode);
    pm.setAttributePointer(essl.SCALE, 3, gl.FLOAT, false,12,0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.shading);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data.shading), mode);
    pm.setAttributePointer(essl.SHADING, 1, gl.FLOAT, false,4,0);
    

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.index);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data.index), mode);
};




/**
 * Renders the actors one by one
 * @param {Scene} scene the scene to render
 */
nucleo.BakeEngine.prototype.render = function(scene){

    //Updates the perspective matrix and passes it to the program
    var r       = this.renderer;
    var trx     = r.transforms
    var pm     = r.pm;
    var gl      = r.gl;
    var essl    = nucleo.ESSL;
    var data    = this._data;
    
    trx.update();

    pm.setUniform(essl.PERSPECTIVE_MATRIX, trx.pMatrix);
    pm.setUniform(essl.MODEL_VIEW_MATRIX,  trx.mvMatrix);
    pm.setUniform(essl.NORMAL_MATRIX,      trx.nMatrix);
    pm.setUniform(essl.MVP_MATRIX,         trx.mvpMatrix);
    
    for(var i = 0, N = scene._actors.length; i<N; i+=1){
        var actor = scene._actors[i];
        this._updateActorPosition(actor);   
        this._updateActorScale(actor);     
        this._updateActorShading(actor);  
        this._updateActorColor(actor);     
    }
    
    
    gl.drawElements(gl.TRIANGLES, data.index.length, gl.UNSIGNED_SHORT,0);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
};
     
  
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
 *  Each view has a Scene object associated to it. The actors added to the scene are those that the renderer's view will render.
 *  Actors can be added/removed from the scene at any time.
 *  The scene also determines the lookup table that is used by the actors in it.
 *  A scene can have one or more views associated to it.
 *
 *  @class
 *  @constructor
 *  @author Diego Cantor
 */
nucleo.Scene = function Scene() {

    this.UID            = nucleo.util.generateUID();
    this.views          = [];
    this._actors        = [];
    this._groups        = [];
    this.toys           = new nucleo.SceneToys(this);
    this.loadingMode    = nucleo.Model.LOADING_MODE.LIVE;
    this.normalsFlipped = false;
    this.lutID          = null;
    this.timerID        = null;
    this.scalarMIN      = Number.MAX_VALUE;
    this.scalarMAX      = Number.MIN_VALUE;
    this.bb             = [0, 0, 0, 0, 0, 0];
    this.centre         = [0, 0, 0];
    this.frameAnimation = null;

    var ntf = nucleo.Notifier.instance;
    var e   = nucleo.EVENTS;

    ntf.publish([e.SCENE_NEW, e.SCENE_UPDATED], this);
    ntf.subscribe([e.MODELS_LOADED, e.DEFAULT_LUT_LOADED], this);
    ntf.fire(e.SCENE_NEW, this);
};

/**
 * Handles events sent by Notifier
 * @param {String} event This event should be defined in nucleo.EVENTS
 * @param {Object} the source that sent the event. Useful for callbacks
 */
nucleo.Scene.prototype.handleEvent = function (event, src) {

    if (event == nucleo.EVENTS.MODELS_LOADED) {
        this.updateScalarRange();
        if (this.lutID != null) {
            this.setLookupTable(this.lutID);
        }
    }
    else if (event == nucleo.EVENTS.DEFAULT_LUT_LOADED) {
        this.lutID = 'default';
        this.setLookupTable(this.lutID);
    }

};


/**
 * Sets the loading mode for this scene
 * @param mode one of the valid loading modes
 * @see {Model.loadingMode}
 */
nucleo.Scene.prototype.setLoadingMode = function (mode) {

    var m = nucleo.define.Model.LOADING_MODE;

    if (mode === undefined || mode === null ||
        (mode !== m.LIVE && mode !== m.LATER && mode !== m.DETACHED)) {
        throw ('the mode ' + mode + 'is not a valid loading mode');
    }
    this.loadingMode = mode;
};


/**
 * Calculates the global bounding box and the centre for the scene.
 * @private
 */
nucleo.Scene.prototype._updateBoundingBoxWith = function (actor) {

    //actor.computeBoundingBox();

    var b = actor._bb;

    nucleo.util.console('Scene: updating metrics with (' + b[0] + ',' + b[1] + ',' + b[2] + ') - (' + b[3] + ',' + b[4] + ',' + b[5] + ')');
    if (this._actors.length == 1) {
        //Quicky!  
        this.bb = this._actors[0]._bb.slice(0);
        this.toys.update();
        return;
    }


    var bb = this.bb;
    var cc = this.centre;

    bb[0] = Math.min(bb[0], b[0]);
    bb[1] = Math.min(bb[1], b[1]);
    bb[2] = Math.min(bb[2], b[2]);
    bb[3] = Math.max(bb[3], b[3]);
    bb[4] = Math.max(bb[4], b[4]);
    bb[5] = Math.max(bb[5], b[5]);

    cc[0] = (bb[3] + bb[0]) / 2;
    cc[1] = (bb[4] + bb[1]) / 2;
    cc[2] = (bb[5] + bb[2]) / 2;

    cc[0] = Math.round(cc[0] * 1000) / 1000;
    cc[1] = Math.round(cc[1] * 1000) / 1000;
    cc[2] = Math.round(cc[2] * 1000) / 1000;

    this.toys.update();

};

/**
 * Calculates the global bounding box and the center of the scene.
 * Updates the Scene's axis and bounding box toys.
 */
nucleo.Scene.prototype.computeBoundingBox = function () {

    if (this._actors.length > 0) {
        this.bb = this._actors[0]._bb.slice(0);
    }
    else {
        this.bb = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
    }

    this.centre = [0.0, 0.0, 0.0];

    var i = this._actors.length;
    while (i--) {
        this._updateBoundingBoxWith(this._actors[i]);
    }
};



/**
 * Adds one actor.
 * @param actor the actor to be added to the scene
 */
nucleo.Scene.prototype.addActor = function (actor) {

    actor.setScene(this);

    if (this.normalsFlipped) {
        actor.flipNormals(true);
    }

    if (this.lutID != null) {
        actor.setLookupTable(this.lutID, this.scalarMIN, this.scalarMAX);
    }

    this._actors.push(actor);
    this._updateBoundingBoxWith(actor);

    nucleo.util.console('Scene: Actor for model ' + actor.model.name + ' added');

    nucleo.Notifier.instance.fire(nucleo.EVENTS.SCENE_UPDATED, this);
};

/**
 * Recreates the WebGL buffers when an actor has changed its geometry
 * @param actor the actor to be updated
 */
nucleo.Scene.prototype.updateActor = function (actor) {
    if (!this.hasActor(actor)) return;

    actor.dirty = true;
    var i       = this.views.length;
    while (i--) {
        this.views[i].renderer.reallocate();
    }
    actor.dirty = false;
};

/**
 * Removes one actor
 * @param actor the actor to be removed from the scene
 */
nucleo.Scene.prototype.removeActor = function (actor) {
    var idx    = this._actors.indexOf(actor);
    var _actor = this._actors.splice(idx, 1);
    _actor     = null;
    this.computeBoundingBox();
};

/**
 * Verifies if the actor passed as a parameter belongs to this scene
 * @param {Actor, String} actor the actor object or the actor name to verify
 */
nucleo.Scene.prototype.hasActor = function (actor) {
    if (actor instanceof nucleo.Actor) {
        return (this._actors.indexOf(actor) != -1)
    }
    else if (typeof(actor) == 'string') {
        var aux = this.getActorByName(actor);
        return (aux != undefined);
    }
    else return false;
};


/**
 * Sets a property for all the actors in the scene
 * @param {String} property the name of the actor property
 * @param {Object} value the value of the property
 */
nucleo.Scene.prototype.setPropertyForAll = function (property, value) {
    var i = this._actors.length;
    while (i--) {
        this._actors[i].setProperty(property, value);
    }
};


/**
 *Sets a property for a list of actors.
 * @param {Array} list list of actors (String or Actor)
 * @param {String} property the name of the actor property
 * @param {Object} value the value of the property

 */
nucleo.Scene.prototype.setPropertyFor    = function (list, property, value) {
    var i = list.length;
    while (i--) {
        if (this.hasActor(list[i])) {
            var actor = undefined;
            if (typeof(list[i]) == 'string') {
                actor = this.getActorByName(list[i]);
            }
            else if (list[i] instanceof nucleo.Actor) {
                list[i].setProperty(property, value);
            }
            else {
                throw 'Scene.setPropertyFor: ERROR, the list of actors is invalid';
            }
        }
    }
};
/**
 * Updates the Scene's scalarMAX and scalarMIN properties.
 */
nucleo.Scene.prototype.updateScalarRange = function () {
    var i = this._actors.length;
    while (i--) {
        var actor = this._actors[i];
        if (actor.model.scalars && actor.model.scalars.max() > this.scalarMAX) this.scalarMAX = actor.model.scalars.max();
        if (actor.model.scalars && actor.model.scalars.min() < this.scalarMIN) this.scalarMIN = actor.model.scalars.min();
    }
};

/**
 * Sets a new lookup table by passing the lookup table id
 * @param lutID the lookup table id
 */
nucleo.Scene.prototype.setLookupTable = function (lutID) {
    this.lutID = lutID;
    var i      = this._actors.length;
    while (i--) {
        this._actors[i].setLookupTable(lutID, this.scalarMIN, this.scalarMAX);
    }
};

/*
 * Removes all the actors from the Scene and resets the actor list
 * It will also set nucleo.c.actor to null
 */
nucleo.Scene.prototype.reset = function () {
    var i = this._actors.length;
    while (i--) {
        this._actors[i] = null;
    }
    this._actors   = [];
    nucleo.c.actor = null;
    this.computeBoundingBox();
};

/**
 * Retrieves an actor object by name
 * @param name the name of the actor to retrieve
 */
nucleo.Scene.prototype.getActorByName = function (name) {
    name  = name.replace(/\.[^/.]+$/, "");
    var i = this._actors.length;
    while (i--) {
        if (this._actors[i].name == name) {
            return this._actors[i];
        }
    }
    return null;
};


/**
 * Retrieves an actor object by Unique Identifier (UID)
 * @param UID the actor's UID
 */
nucleo.Scene.prototype.getActorByUID = function (UID) {
    var i = this._actors.length;
    while (i--) {
        if (this._actors[i].UID == UID) {
            return this._actors[i];
        }
    }
    return null;
};

/**
 * Retrieves an actor by Name or UID
 */
nucleo.Scene.prototype.getActor = function (actorNameOrUID) {
    var actor = this.getActorByName(actorNameOrUID);

    if (actor == null) {
        actor = this.getActorByUID(actorNameOrUID);
    }
    return actor;
};


/**
 * <p>Returns a list of actors based on the condition passed as parameter.</p>
 * <p>The condition is a function with the following signature:</p>
 * <p><code> condition(Actor): returns boolean</code></p>
 * <p>If the condition evaluates true then that actor is included in the results</p>
 *
 * @param {function} condition the condition to evaluate in the actor list it receives an actor as a parameter
 * @returns {Array} list of actors
 */
nucleo.Scene.prototype.getActorsThat = function (condition) {
    var idx = [];
    var i   = this._actors.length;
    while (i--) {
        if (condition(this._actors[i])) {
            idx.push(i);
        }
    }
    var results = [];
    var j       = idx.length;
    while (j--) {
        results.push(this._actors[idx[j]]);
    }
    return results;
};

/**
 * Changes the opacity for one or all actors in the scene
 * @param o opacity value [0..1]
 * @param name the name of the actor whose opacity will be changed.
 *             If this parameter is missing, the opacity of all actors will be changed.
 */
nucleo.Scene.prototype.setOpacity = function (o, name) {
    if (name == null) {
        var i = this._actors.length;
        while (i--) {
            this._actors[i].setOpacity(o);
        }
    }
    else {
        var actor = this.getActorByName(name);
        actor.setOpacity(o);
    }

};

/**
 * Flips the normals for all the actors in the scene. This will
 * have an immediate effect in the side of the object that it is being lit.
 */
nucleo.Scene.prototype.flipNormals = function () {
    var i = this._actors.length;
    while (i--) {
        this._actors[i].flipNormals();
    }
};


/**
 * Changes the visualization mode for all the objects in the scene
 * @param mode the visualization mode. It can be... TODO
 */
nucleo.Scene.prototype.setVisualizationMode = function (mode) {
    if (mode == null || mode == undefined) return;
    var i = this._actors.length;
    while (i--) {
        this._actors[i].setVisualizationMode(mode);
    }
};


/**
 * Sets the animation for this scene
 * @param {FrameAnimation} animation the animation to set on this scene
 * @see FrameAnimation
 */
nucleo.Scene.prototype.setAnimation   = function (animation) {
    if (animation instanceof nucleo.FrameAnimation) {
        this.frameAnimation       = animation;
        this.frameAnimation.scene = this;
        var i                     = this.views.length;
        while (i--) {
            this.views[i].renderer.setMode(nucleo.Renderer.MODE.ANIMFRAME);
        }

        nucleo.util.console('Scene: animation added');
    }
};
/**
 * Removes the animation if there is one associated to this scene
 * @see FrameAnimation
 * @TODO: Review what happens to the actors. Should we remove them too?
 */
nucleo.Scene.prototype.clearAnimation = function () {
    if (this.frameAnimation) {
        this.frameAnimation.scene = null;
        this.frameAnimation       = null;
    }
};

/**
 * Returns a list with the actor names
 * @returns {Array} a list with the actor names
 */
nucleo.Scene.prototype.getActorNames = function () {
    var list = [];
    var i    = this._actors.length;
    while (i--) {
        list.push(this._actors[i].name);
    }
    return list;
};

/**
 * Return a list with the actors that are currently pickable
 */
nucleo.Scene.prototype.getPickableActors = function () {

    function condition(actor) {
        return actor.isPickable();
    }

    return this.getActorsThat(condition);
};

/**
 * Given a cell uid the scene identifies the actor it belongs to. If an actor is not found
 * this method returns null
 * @param {String} cellUID
 * @returns {Actor|null}
 *
 */
nucleo.Scene.prototype.getActorByCellUID = function (UID) {
    var list = [];
    var i    = this._actors.length;
    while (i--) {
        var actor = this._actors[i];
        if (actor.mesh != undefined && actor.mesh.hasCell(UID)) {
            return actor;
        }
    }
    return null;
};


/**
 * Creates an actor group
 * @param {Object} name name of the actor group
 * @param {Object} list list of actors to add to the actor group. Elements in the list can be
 * actor classes, actors UID, actor names or any combination of these.
 * @see {ActorGroup}
 */
nucleo.Scene.prototype.createActorGroup = function (name, list) {
    var actorGroup = undefined;
    if (this.getActorGroup(name) != undefined) {
        alert('Scene.createActorGroup: an actor group with the name ' + name + ' already exists');
        throw('Scene.createActorGroup: an actor group with the name ' + name + ' already exists');
    }

    try {
        actorGroup = new ActorGroup(this, name, list);
        this._groups.push(actorGroup);
    }
    catch (ex) {
        if (ex instanceof vxlActorGroupException) {
            alert(ex.messages);
        }
    }
    finally {
        return actorGroup;
    }
};

/**
 *Retrieves an actor group by name
 * @param {Object} name
 */
nucleo.Scene.prototype.getActorGroup = function (name) {
    var i = this._groups.length;
    while (i--) {
        if (this._groups[i].name == name) {
            return this._groups[i];
        }
    }
    return undefined;
};
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
 * @class Manages the axis, the bounding box and the floor
 * These are auxiliary objects or 'toys'
 */
nucleo.SceneToys = function SceneToys(scn){
    
    this.scene = scn;
    this.list   = [];

	this.axis 				= new nucleo.Axis();
	this.boundingbox 		= new nucleo.BoundingBox();
	this.floor  			= new nucleo.Floor();
	
	this.list.push(this.axis);
    this.list.push(this.boundingbox);
    this.list.push(this.floor);
};

/**
 * Updates the toys according to information from the scene
 * 
 */
nucleo.SceneToys.prototype.update = function(){
    this.axis.setCentre(this.scene.centre);
    this.boundingbox.setBoundingBox(this.scene.bb);
};

/**
 * @class Contains a mapping between scalars and a color palette
 * @constructor
 */
nucleo.LookupTable = function LookupTable(){
	this.ID = null;
	this.map = null;
	this.max = Number.MIN_VALUE;
	this.min = Number.MAX_VALUE;
}

/**
 * Creates a lookup table
 * @param {String} ID the unique identifier of this lookup table in the system
 * @param {JSON} the JSON object that contains the lookup table entries. This JSON should follow Nucleo's syntax
 */
nucleo.LookupTable.prototype.load = function(ID,payload){
	this.ID = ID;
	this.map = payload;
	for (var key in this.map) {
		var n = Number(key);
		if (n < this.min) {this.min = n;}
		else if (n >= this.max) {this.max = n;}
    }
}

/**
 * Performs the lookup table value scaling to find the appropriate index according to the
 * number of entries and the extension of the scalar map determined by <code>min</code> and <code>max</code>
 */
nucleo.LookupTable.prototype._scale = function(value, min,max){
    return  value * this.max / max;
}


/**
 * Gets the correspondent color. To obtain the right entry, the scale method should be called first.
 */
nucleo.LookupTable.prototype.getColor = function(val, min, max){
    var value = this._scale(val, min,max);
	
	var l = this;
	var key = Math.round(value);
	
	if (key >= l.min && key <= l.max){
	    var c = [l.map[key][0],l.map[key][1],l.map[key][2]];
		return c;
	}
	
	else if (key <l.min) { //truncate to min value
			return  [l.map[l.min][0],l.map[l.min][1],l.map[l.min][2]];
	}
	
	else if (key>l.max){ //truncate to max value
		return  [l.map[l.max][0],l.map[l.max][1],l.map[l.max][2]];
	}
	
	else{
		alert('assertion error in getColor routine');
		return  [l.map[l.min][0],l.map[l.min][1],l.map[l.min][2]];
	}
		
}

/**
*
*	@param s array with scalar data
*	@param max range
*	@param min range
*	@returns unpacked colors translated through this lookup table 
*/
nucleo.LookupTable.prototype.getColors = function(s,min,max){
	var c = [];
	
	for(var i=0;i<s.length;i++){
		var cc = this.getColor(s[i], min, max);
		c.push(cc[0]);
		c.push(cc[1]);
		c.push(cc[2]);
	
	}
	
	return c;
}
/**
 * Manages the lookup table files. The constructor will try to load all
 * the lookup tables defined in nucleo.def.luts at once.
 * 
 * @class Manages the lookup tables
 * @constructor
 */
nucleo.LookupTableManager = function LookupTableManager(){
	this._hashmap = {};
	this._location = "";
	nucleo.Notifier.instance.publish(nucleo.EVENTS.DEFAULT_LUT_LOADED,this);
};

/**
 * Relative path to the webpage where lookup tables can be located.
 * @param {String} loc
 */
nucleo.LookupTableManager.prototype.setLocation = function(loc){
	this._location = loc;
};

/**
 * Load a lookup table file
 * @param {String} name the filename of the lookup table to load
 */
nucleo.LookupTableManager.prototype.load = function(name){
    if (this.isLoaded(name)) return;

	var manager    = this;
	var uri        =  this._location+'/'+name+'.lut';
	var nocacheuri = uri +'?nocache=' + (new Date()).getTime();

		
    var successHandler = function(manager,name){
        return function(payload, textStatus){
            manager._handle(name,payload);
        };
   };
   
   var errorHandler = function(uri){
       return function(request, status, error){
           if(error.code = 1012){
               alert('The file '+uri+' could not be accessed. \n\n'+
               'Please make sure that the path is correct and that you have the right pemissions');
           }
           else{
               alert ('There was a problem loading the file '+uri+'. HTTP error code:'+request.status);
           }       
        };
    };
	
    var request  = $.ajax({
        url         : nocacheuri,
        type        :"GET",
        dataType    : "json",
        mimeType    : "text/plain",
        success     : successHandler(manager,name),
        error       : errorHandler(uri)
    }); 
};

/**
 * Once the lookup table file is retrieved, this method adds it to the lookup table manager
 */
nucleo.LookupTableManager.prototype._handle = function (ID, payload) {
	var lut = new nucleo.LookupTable();
	lut.load(ID,payload);
	this._hashmap[ID] = lut;
	
	if (lut.ID == nucleo.def.lut.main){
		nucleo.Notifier.instance.fire(nucleo.EVENTS.DEFAULT_LUT_LOADED, this);
	}
};
/**
 * Check if a lookup table has been loaded by this lookup table manager
 * @param {String} ID the id of the table to check
 */
nucleo.LookupTableManager.prototype.isLoaded = function(ID){
	return this._hashmap[ID] != undefined;
};

/**
 * Retrieves a lookup table
 * @param {String} ID id of the lookup table to retrieve
 */
nucleo.LookupTableManager.prototype.get = function(ID){
	return this._hashmap[ID];
};

/**
 * Returns a list with the names of all of the lookup tables that have been loaded.
 * @returns {Array} an array with the names of the lookup tables that have been loaded
 */
nucleo.LookupTableManager.prototype.getAllLoaded = function(){
    var tables = [];
    for(lut in this._hashmap){
        tables.push(this._hashmap[lut].ID);
    }
    return tables;
};

/**
 * Checks if all the lookup tables have been loaded
 */
nucleo.LookupTableManager.prototype.allLoaded = function(){
    var size = 0;
    //@TODO is there a better way to estimate size?
	for(var lut in this._hashmap){
        size++;
    }
	return (nucleo.define.LookupTable.list.length == size);
};

/**
 * Loads all the lookup tables defined in nucleo.def.luts
 */
nucleo.LookupTableManager.prototype.loadAll = function(){
	for(var i=0;i<nucleo.define.LookupTable.list.length;i++){
		this.load(nucleo.define.LookupTable.list[i]);
	}
};

/**
 * Creates the global lookup table manager and load all the lookup tables at once
 */
nucleo.LookupTableManager.instance = new nucleo.LookupTableManager();
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
 * @class Cuboid that encloses the visible extent of a Scene
 * @constructor
 * @extends Actor
 */
nucleo.BoundingBox = function BoundingBox() {

    var _model = new nucleo.Model();
    _model.load('bounding box', nucleo.define.Model.BoundingBox)

	nucleo.Actor.call(this, _model);

    this.bb 		= this.setBoundingBox([-1,-1,-1,1,1,1]);
    this.mode 		= nucleo.Actor.MODE.WIREFRAME;
    this.visible 	= false;
    this.toy    	= true;
};

//BoundingBox IS an Actor
nucleo.BoundingBox.prototype = new nucleo.Actor();
nucleo.BoundingBox.prototype.constructor = nucleo.BoundingBox;

/**
* Sets the bounding box
* @param {Array} b the bounding box. The format of this param should be [x1,y1,z1,x2,y2,z2]
* where x1,y1,z1 correspond to the minimum bounding coordinates and x2,y2,z2 correspond to the
* maximum bounding coordinates
*/
nucleo.BoundingBox.prototype.setBoundingBox = function(b){
	this.bb = [
		b[0], b[1], b[2],
		b[0], b[4], b[2],
		b[3], b[4], b[2],
		b[3], b[1], b[2],
		b[0], b[1], b[5],
		b[0], b[4], b[5],
		b[3], b[4], b[5],
		b[3], b[1], b[5] 
		];
        
    this.model.vertices = this.bb;
    this.reallocate();
};



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
 * @class Visible three-dimensional system of coordinates 
 * @constructor
 * @author Diego Cantor
 */
nucleo.Axis = function Axis() {

    var _model = new nucleo.Model();
    _model.load('axis', nucleo.define.Model.Axis)

    nucleo.Actor.call(this,_model);

    this.centre 	= [0,0,0];
	this.mode 		= nucleo.Actor.MODE.WIREFRAME;
	this.visible 	= false;
	this.toy     	= true;
};

nucleo.Axis.prototype 				= new nucleo.Actor();
nucleo.Axis.prototype.constructor 	= nucleo.Axis;
/**
* Sets the centre of the axis actor in the scene
*/
nucleo.Axis.prototype.setCentre = function (ctr){
    var x = ctr[0];
	var y = ctr[1];
	var z = ctr[2];
	
	this.centre[0] = x;
	this.centre[1] = y;
	this.centre[2] = z;
    
    var ver = this.model.vertices;
	
	ver[0] = x-1;
	ver[1] = y;
	ver[2] = z;
	
	ver[3] = x+1;
	ver[4] = y;
	ver[5] = z;
	
	ver[6] = x;
	ver[7] = y-2;
	ver[8] = z;
	
	ver[9] = x;
	ver[10] = y+2;
	ver[11] = z;
	
	ver[12] = x;
	ver[13] = y;
	ver[14] = z-1;
	
	ver[15] = x;
	ver[16] = y;
	ver[17] = z+1;
};/*-------------------------------------------------------------------------
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
 * @class Visible grid that sets the floor reference and its extension
 * @constructor
 * @extends Actor
 */
nucleo.Floor = function Floor(){

    var _model = new nucleo.Model()
    _model.load('floor',nucleo.define.Model.Floor)

    nucleo.Actor.call(this, _model);

    this.mode 		= nucleo.Actor.MODE.WIREFRAME;
    this.visible 	= false;
    this.toy    	= true;
};

nucleo.Floor.prototype = new nucleo.Actor();
nucleo.Floor.prototype.constructor = nucleo.Floor;


/**
 * Creates the grid
 * @TODO: review impossible combinations
 */
nucleo.Floor.prototype.setGrid =function(dimension, spacing){

	var dim = dimension;
    var lines = 2*dim/spacing;
    var inc = 2*dim/lines;
    var v = [];
    var i = [];

    for(var l=0;l<=lines;l++){
        v[6*l] = -dim; 
        v[6*l+1] = 0;
        v[6*l+2] = -dim+(l*inc);
        
        v[6*l+3] = dim;
        v[6*l+4] = 0;
        v[6*l+5] = -dim+(l*inc);
        
        v[6*(lines+1)+6*l] = -dim+(l*inc); 
        v[6*(lines+1)+6*l+1] = 0;
        v[6*(lines+1)+6*l+2] = -dim;
        
        v[6*(lines+1)+6*l+3] = -dim+(l*inc);
        v[6*(lines+1)+6*l+4] = 0;
        v[6*(lines+1)+6*l+5] = dim;
        
        i[2*l] = 2*l;
        i[2*l+1] = 2*l+1;
        i[2*(lines+1)+2*l] = 2*(lines+1)+2*l;
        i[2*(lines+1)+2*l+1] = 2*(lines+1)+2*l+1;        
    }
    this.model.vertices = v.slice(0);
    this.model.wireframe = i.slice(0);
    this.visible = true;
    this.reallocate();
};




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

    if (mode !== undefined && mode !== null) {
        this.scene.setLoadingMode(mode);
    }

    nucleo.ModelManager.instance.loadList(files, this.scene);
};




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
 * Reads a VTK file and creates the respective JSON(s) file(s).
 * @class Reads VTK files (ASCII)  and creates JSON objects that can be used as models
 * @constructor
 */
nucleo.VTKReader = function VTKReader(scene) {
    this.scene = scene; //the scene that will be updated
    nucleo.Notifier.instance.publish(nucleo.EVENTS.READER_DONE, this);
};

/**
 * Verifies if the HTML5 API is available.
 */
nucleo.VTKReader.prototype.isSupported = function () {
    return (window.File && window.FileReader && window.FileList && window.Blob);
};


/**
 * @param {File} file an HTML5 File object
 */
nucleo.VTKReader.prototype.readFile = function (file) {
    var vtkReader = this;
    var filename  = file.name;

    if (filename.length - 4 !== filename.indexOf('.vtk')) {
        throw 'VTKReader.read: the file ' + file + ' is not a VTK file';
    }

    modelname   = filename.replace(/\.[^/.]+$/, "");
    var freader = new FileReader();

    freader.onload = function (event) {
        document.body.style.cursor = 'default';
        var contents               = event.target.result.trim();
        var lines                  = contents.split(/\r\n|\r|\n/);
        vtkReader._parse(modelname, lines);
        nucleo.Notifier.instance.fire(nucleo.EVENTS.READER_DONE, vtkReader);
    };

    document.body.style.cursor = 'wait';
    freader.readAsText(file);
};


/**
 * If the VTK file exists in memory as a String (text) then we can
 * use this method to parse it.
 *
 * @param {String} name the name of the object
 * @param {String} text the retrieved object contents
 */
nucleo.VTKReader.prototype.readText = function (name, text) {
    document.body.style.cursor = 'wait';
    var lines                  = text.split(/\r\n|\r|\n/);
    this._parse(name, lines);
    nucleo.Notifier.instance.fire(nucleo.EVENTS.READER_DONE, this);
    document.body.style.cursor = 'default';
};

/**
 * Reads the file line by line and populates the respective arrays
 */
nucleo.VTKReader.prototype._parse = function (name, lines) {

    var ARRAY_SIZE = 65536 * 3;
    var outputfile = '';
    var numBlocks  = 0;
    var location   = 'NOWHERE';
    var linenumber = 0;


    var vertices = [];
    var indices  = [];
    var normals  = [];
    var scalars  = [];
    var colors   = [];
    var mode     = "SOLID";

    var tags = {
        NOWHERE            : 0,
        POINTS             : 1,
        LINES              : 2,
        POLYGONS           : 3,
        POINT_DATA         : 4,
        NORMALS            : 5,
        CELL_DATA          : 6,
        TEXTURE_COORDINATES: 7,
        SCALARS            : 8,
        LOOKUP_TABLE       : 9,
        COLOR_SCALARS      : 10
    };

    this.json = {name: name};


    function createLineIndices(line) {
        var count = line.length - 1;
        if (count != line[0]) {
            throw 'Assertion Error. Inconsistent line';
        }
        var values = line.splice(1, count);
        for (var i = 0; i < count - 1; i += 1) {
            indices.push(parseInt(values[i]));
            indices.push(parseInt(values[i + 1]));
        }
    }

    for (var linenumber = 0; linenumber < lines.length; linenumber++) {

        try {
            if (lines[linenumber].indexOf('POINTS') == 0) {
                console.log(lines[linenumber]);
                location = tags.POINTS;
                continue;
            }
            else if (lines[linenumber].indexOf('LINES') == 0) {
                console.log(lines[linenumber]);
                location = tags.LINES;
                mode     = "LINES";
                continue;
            }
            else if (lines[linenumber].indexOf('TRIANGLE_STRIPS') == 0) {
                console.log(lines[linenumber]);
                alert('vxlVTKParser ERROR: \n' + 'Triangle Strips Not Supported. Please triangulate first');
                throw('Triangle Strips Not Supported. Please triangulate first');
            }
            else if (lines[linenumber].indexOf('POLYGONS') == 0) {
                console.log(lines[linenumber]);
                location = tags.POLYGONS;
                continue;
            }
            else if (lines[linenumber].indexOf('POINT_DATA') == 0) {
                location = tags.POINT_DATA;
                continue;
            }
            else if (lines[linenumber].indexOf('NORMALS') == 0) {
                console.log(lines[linenumber]);
                location = tags.NORMALS;
                continue;
            }
            else if (lines[linenumber].indexOf('CELL_DATA') == 0) {
                console.log(lines[linenumber]);
                location = tags.CELL_DATA;
                continue;
            }
            else if (lines[linenumber].indexOf('TEXTURE_COORDINATES') == 0) {
                console.log(lines[linenumber]);
                location = tags.TEXTURE_COORDINATES;
                continue;
            }
            else if (lines[linenumber].indexOf('SCALARS') == 0) {
                console.log(lines[linenumber]);
                location = tags.SCALARS;
                continue;
            }
            else if (lines[linenumber].indexOf('LOOKUP_TABLE') == 0) {
                console.log(lines[linenumber]);
                location = tags.LOOKUP_TABLE;
                continue;
            }
            else if (lines[linenumber].indexOf('COLOR_SCALARS') == 0) {
                console.log(lines[linenumber]);
                location = tags.COLOR_SCALARS;
                continue;
            }

            // -------------------
            else if (location == tags.POINTS) {
                var v = lines[linenumber].trim().split(' ');
                if (v == "") continue;
                for (var i = 0; i < v.length; i++) {
                    vertices.push(parseFloat(v[i]));
                }
            }
            else if (location == tags.LINES) {
                var elements = lines[linenumber].trim().split(' ');
                if (elements == "") continue;
                createLineIndices(elements);
            }
            else if (location == tags.POLYGONS) //they have to be triangles
            {
                var tt = lines[linenumber].trim().split(' ');
                if (tt == "") continue;
                if (tt.length > 0 && tt[0] != '3') {
                    throw "Error: please make sure your vtk file contains triangles instead of polygons (triangulate first)";
                }
                for (var i = 1; i < tt.length; i++) {
                    indices.push(parseInt(tt[i]));
                }
            }
            else if (location == tags.LOOKUP_TABLE) {
                if (lines[linenumber].indexOf('LOOKUP_TABLE') == 0)
                    continue;
                else {
                    var pd = lines[linenumber].trim().split(' ');
                    if (pd == "") continue;
                    for (var i = 0; i < pd.length; i++) {
                        scalars.push(parseFloat(pd[i]));
                    }
                }
            }
            else if (location == tags.COLOR_SCALARS) {
                var n = lines[linenumber].trim().split(' ');
                if (n == "") continue;
                for (var i = 0; i < n.length; i++) {
                    colors.push(parseFloat(n[i]));
                }
            }
            else if (location == tags.NORMALS) {
                var n = lines[linenumber].trim().split(' ');
                if (n == "") continue;
                for (var i = 0; i < n.length; i++) {
                    normals.push(parseFloat(n[i]));
                }
            }
        }
        catch (err) {
            console.log('Error while processing line ' + linenumber.toString());
            throw err;
        }
    }


    this.json.vertices = vertices;
    this.json.mode     = mode;
    if (indices.length > 0)   this.json.indices = indices;
    if (normals.length > 0)   this.json.normals = normals;
    if (colors.length > 0)   this.json.colors = colors;
    if (scalars.length > 0)   this.json.scalars = scalars;

};


nucleo.VTKReader.prototype.getModel = function () {
    var model = new Model(this.json.name, this.json);
    this.json = null;
    delete this.json;
    return model;
};

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
 * Creates Model objects and assigns them to a Scene.
 *
 * ModelManager provides methods for loading remote and local models.
 *
 *
 * @class Controls the loading and network transfer of models into memory
 * @constructor
 * @author Diego Cantor
 */
nucleo.ModelManager = function ModelManager() {
    this.toLoad  = [];
    this.models  = [];
    this.readers = {};

    var e = nucleo.EVENTS;

    nucleo.Notifier.instance.publish([
        e.MODELS_LOADING,
        e.MODEL_NEW,
        e.MODELS_LOADED
    ], this);

    nucleo.Notifier.instance.subscribe(e.READER_DONE, this);

    this.registerReader('vtk', nucleo.VTKReader);
};

/**
 * Handles Nucleo events to which this model manager is subscribed to
 * @param {String} p_event the p_event that was fired
 * @param {Object} p_source the object that fired the p_event
 */
nucleo.ModelManager.prototype.handleEvent = function (p_event, p_source) {
    var reader = p_source;
    var model  = reader.getModel();
    this.add(model, reader.scene);
};


nucleo.ModelManager.prototype.registerReader = function (p_extension, p_reader) {
    this.readers[p_extension] = new p_reader();
}


/**
 * Uses an Ajax mechanism to load models from a Web Server.
 * @param {String} p_uri The path to the file that will be loaded.
 * @param {Scene} p_scene The p_scene that will create an actor for this model. This parameter is optional.
 */
nucleo.ModelManager.prototype.load = function (p_uri, p_scene) {

    var successHandler, errorHandler, dtype, mime, nocacheuri, manager = this,
        file_name                                                      = p_uri.replace(/^.*[\\\/]/, ''),
        model_name                                                     = file_name.split('.')[0],
        extension                                                      = file_name.split('.')[1];

    if (manager.isModelLoaded(model_name)) {
        return;
    }

    if (extension === 'vtk') {
        dtype = 'text';
        mime  = 'text/plain';
    }
    else if (extension === 'json') {
        dtype = 'json';
        mime  = 'application/json';
    }
    else {
        throw ('ModelManager.load ERROR: Unknown filetype [' + extension + ']');
    }

    nocacheuri = encodeURI(p_uri + '?nocache=' + (new Date()).getTime());

    nucleo.util.console('ModelManager.load: Requesting ' + p_uri + '...');

    nucleo.Notifier.instance.fire(nucleo.EVENTS.MODELS_LOADING, this);


    successHandler = function (manager, model_name, scene) { //polymorphism
        switch (extension) {
            case 'json':
                return function (json) { //this is the function invoked as callback, with access to context variables
                    json.uri  = file_name;
                    json.path = nucleo.util.getPath(p_uri);
                    json.name = model_name;
                    manager._createActorInScene(json, scene);
                };
                break;

            case 'vtk':
                return function (data) { //this is the function invoked as callback, with access to context variables
                    var reader = new nucleo.VTKReader(scene);
                    reader.readText(model_name, data);
                };
        }
    };

    errorHandler = function (uri) {
        return function (request, status, error) { //this is the function invoked on error

            if (status = 1012) {
                alert('The file ' + uri + ' could not be accessed. \n\n' +
                'Please make sure that the path is correct and that you have the right pemissions');
            }
            else {
                alert('There was a problem loading the file ' + uri + '. HTTP error code:' + status + ' ' + error);
            }
        };
    };

    nucleo.ajax(
        {
            url     : nocacheuri,
            type    : "GET",
            dataType: dtype,
            mimeType: mime,
            success : successHandler(manager, model_name, p_scene),
            error   : errorHandler(p_uri)
        }
    );
};


/**
 * Loads a p_list of models and assigns them to a p_scene
 * @param {Array} p_list p_list of files to load
 * @param {Scene} p_scene p_scene to callback when the models are loaded
 */
nucleo.ModelManager.prototype.loadList = function (p_list, p_scene) {

    this.toLoad = p_list.slice(0);

    nucleo.util.console('ModelManager.loadList: models to load ->' + this.toLoad.length);

    for (var i = 0; i < this.toLoad.length; i++) {
        this.load(this.toLoad[i], p_scene);
    }
};

/**
 * Add JSON objects OR models to a scene, creating the corresponding actors. This method is invoked
 * after models are received from the server.
 *
 * @param {Object} p_object the JSON object that contains the definition of the model or
 * an instance of Model. The object must have a 'name' property.
 *
 * @param {Scene} p_scene the scene to be called back when the model is created
 */
nucleo.ModelManager.prototype._createActorInScene = function (p_object, p_scene) {

    var self = this, model;

    if (p_object instanceof nucleo.Model) {
        model = p_object;
    }
    else {
        model = new nucleo.Model(p_object.name, p_object);
    }

    function scheduled_add() {

        model.loaded = true;
        self.models.push(model);
        self.toLoad.splice(name, 1); //removes it from the pending list if exists

        nucleo.util.console('ModelManager: model ' + model.name + ' created.');

        if (p_scene != undefined && p_scene instanceof nucleo.Scene) {

            nucleo.util.console('ModelManager: notifying the scene...');

            if (p_scene.loadingMode == nucleo.Model.LOADING_MODE.LIVE) {
                var actor = new nucleo.Actor(model);
                p_scene.addActor(actor);
            }

            else if (p_scene.loadingMode == nucleo.Model.LOADING_MODE.LATER) {
                if (self.allLoaded()) {
                    var i = models.length;
                    while (i--) {
                        this.createActor(models[i]);
                    }
                }
            }
        }

        else if (p_scene.loadingMode == nucleo.Model.LOADING_MODE.DETACHED) {
            //do nothing
        }
    }

    if (self.allLoaded()) {
        nucleo.Notifier.instance.fire(nucleo.EVENTS.MODELS_LOADED, self);
    }
    else {
        nucleo.Notifier.instance.fire(nucleo.EVENTS.MODEL_NEW, self);
    }

    setTimeout(function () { scheduled_add(); }, 0);
};

/**
 * It will delete all of the loaded models
 */
nucleo.ModelManager.prototype.reset = function () {
    this.firstLoadedModel = false;
    for (var i = 0; i < this.models.length; i++) {
        this.models[i] = null;
    }

    this.models = [];
    this.toLoad = [];
};

/**
 * Checks if a model has been loaded yet
 * @param {String} p_name the p_name of the model to check
 */
nucleo.ModelManager.prototype.isModelLoaded = function (p_name) {
    for (var i = 0; i < this.models.length; i++) {
        if (this.models[i].name == p_name) return true;
    }
    return false;
};

/**
 * Returns true if all the models in the list passed to the method loadList have been loaded.
 */
nucleo.ModelManager.prototype.allLoaded = function () {
    return (this.toLoad.length == 0);
};


/**
 * Returns the model if it has been loaded by this model manager, null otherwise.
 * @param {String} p_name the p_name of the model to retrieve
 */
nucleo.ModelManager.prototype.getModelByName = function (p_name) {
    for (var i = 0, max = this.models.length; i < max; i += 1) {
        if (this.models[i].name == p_name) return this.models[i];
    }
    return null;
};

/**
 * Defines the global Model Manager
 */
nucleo.ModelManager.instance = new nucleo.ModelManager();/*-------------------------------------------------------------------------
 This file is part of Nucleo.js

 Nucleo is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation version 3.

 Nucleo is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with Nucleo.js.  If not, see <http://www.gnu.org/licenses/>.
 ---------------------------------------------------------------------------*/
/*
 * Idea: to use a lightweight pattern. A pool of vxlModels that are reused.
 * Every frame the information is copied to the buffers, instead of saving as many gl vbos as models
 */
/**
 * Provides frame-to-frame animation
 *
 * @class Manages a frame-to-frame animation
 * @constructor
 * @param map  JSON object where each property name is one frame and each property value
 * is a list of actors
 * var map = {"frame1":["actor1","actor2"], "frame2":["actor3","actor4"]}
 *
 */
nucleo.FrameAnimation = function FrameAnimation(map) {
    this.scene = null;

    this.actorByFrameMap = [];
    this.activeFrame     = 1;
    this.mark            = 1;
    this._running        = false;
    this.frameCount      = 0;
    this.renderRate      = 500;

    this._startDate = undefined;
    this._time      = 0;

    this._setup(map);

};

/**
 * The actor will appear in the indicated frame of this animation
 * @param {Number} frame the frame
 * @param {String} actorName the name of the actor. It must exist.
 */
nucleo.FrameAnimation.prototype.addActorToFrame = function (frame, actorName) {
    if (typeof(this.actorByFrameMap[frame]) == 'undefined') {
        this.actorByFrameMap[frame] = new Array();
    }
    if (this.actorByFrameMap[frame].indexOf(actorName) == -1) {
        this.actorByFrameMap[frame].push(actorName);
    }
    if (frame > this.frameCount) this.frameCount = frame;
};

/**
 * Map is a JSON object where each property name is one frame and each property value
 * is a list of actors
 *
 * var map = {"frame1":["actor1","actor2"], "frame2":["actor3","actor4"]}
 * @private
 */
nucleo.FrameAnimation.prototype._setup = function (map) {
    this.activeFrame = 1;

    for (var f in map) {
        var actorList = map[f];
        var frame     = parseInt(f.substr(5, f.length));
        for (var i = 0, max = actorList.length; i < max; i += 1) {
            this.addActorToFrame(frame, actorList[i]);
        }
    }
    nucleo.util.console('FrameAnimation: Setup finished.');
};

/**
 * Starts the animation loop
 * @param {Number} rate the framerate for the animation (optional)
 */
nucleo.FrameAnimation.prototype.start = function (rate) {
    if (this.scene == null) throw 'FrameAnimation: the animation is not associated with any scene. Please use scene.setFrameAnimation method';

    this._startDate = new Date().getTime();
    this._time      = 0;
    this._running   = true;

    if (rate != undefined && rate >= 0) {
        this.renderRate = rate;
    }

    this._timeUp();
};


/**
 * Implements a self-adjusting timer
 * @see http://www.sitepoint.com/creating-accurate-timers-in-javascript/
 * @private
 */
nucleo.FrameAnimation.prototype._timeUp = function () {
    if (!this._running) return;

    this.nextFrame();

    if (this._time == this.renderRate * 100) {  //for long running animations
        this._time      = 0;
        this._startDate = new Date().getTime();
    }

    this._time += this.renderRate;

    var diff = (new Date().getTime() - this._startDate) - this._time;

    if (diff > this.renderRate) diff = 0; //ignore it

    setTimeout((function (self) {
        return function () {
            self._timeUp();
        };
    })(this), this.renderRate - diff);

};

/**
 * Stops the animation loop
 */
nucleo.FrameAnimation.prototype.stop = function () {
    this._running = false;
};

/**
 * Sets the frame rate
 * @param rate
 */
nucleo.FrameAnimation.prototype.setFrameRate = function (rate) {
    if (rate <= 0) return;
    this.stop();
    this.renderRate = rate;
    this.start();
};


/**
 * Selects the actors that will be visible in the current frame
 */
nucleo.FrameAnimation.prototype.update = function () {

    if (this.scene == null) throw 'FrameAnimation: the animation is not associated with any scene. Please use scene.setFrameAnimation method';


    //hide previous actors
    var previousActors = this.getPreviousFrames(1);
    var NUM            = previousActors.length;
    for (var i = 0; i < NUM; i++) {
        var actor = this.scene.getActorByName(previousActors[i]);
        if (actor != null) {
            actor.setVisible(false);
        }
    }

    //then we decide which ones are visible
    var currentActors = this.actorByFrameMap[this.activeFrame];
    NUM               = currentActors.length;
    for (i = 0; i < NUM; i++) {
        actor = this.scene.getActorByName(currentActors[i]);
        if (actor != null) {
            actor.setVisible(true);
        }
    }
};

/**
 * Verifies if the frame number passed as parameter is in the range of the current animation
 * @param frame_number {Number} a frame number
 * @returns true if the number passed as parameter is a valid frame number, false otherwise
 */
nucleo.FrameAnimation.prototype.isValidFrame = function (frame_number) {
    return (frame_number >= 1 && frame_number <= this.frameCount);
};

/**
 * Moves the animation to the next valid frame. If the activeFrame is the last frame in the animation, then
 * the animation is reset to the first frame.
 */
nucleo.FrameAnimation.prototype.nextFrame = function () {
    if (this.activeFrame < this.frameCount) {
        this.activeFrame++;
    }
    else {
        this.activeFrame = 1;
    }
};

/**
 * Gets the next n_frames valid frames. Works as a circular buffer.
 */
nucleo.FrameAnimation.prototype.getNextFrames = function (n_frames) {
    var list = [];
    var c    = this.activeFrame;
    if (n_frames > this.frameCount) n_frames = this.frameCount;
    for (var i = 1; i <= n_frames; i++) {
        var next = c + i;
        if (this.isValidFrame(next)) {
            list.push(next);
        }
        else {
            list.push(next - this.frameCount);
        }
    }
    nucleo.util.console('Animation: next frames: ' + list);
    return list;
};

/**
 * Gets the previous n frames. Works as a circular buffer.
 */
nucleo.FrameAnimation.prototype.getPreviousFrames = function (n_frames) {
    var list = [];
    var c    = this.activeFrame;
    if (n_frames > this.frameCount) n_frames = this.frameCount;
    for (var i = 1; i <= n_frames; i++) {
        var previous = c - i;
        if (this.isValidFrame(previous)) {
            list.push(previous);
        }
        else {
            list.push(this.frameCount + previous);
        }
    }
    nucleo.util.console('Animation: previous frames: ' + list);
    return list;
};

/**
 * Sets f as the active frame
 * @param frame_number the frame to set as active
 */
nucleo.FrameAnimation.prototype.setFrame = function (frame_number) {
    if (frame_number >= 1 && frame_number <= this.frameCount) {
        this.activeFrame = frame_number;
        this.render();
    }
};

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
 * <p>
 * A Texture is a representation of a raster image in Nucleo. Textures can be loaded providing a
 * URI
 * </p>
 * <p> 
 * To set the magnification and minification filters for a texture please refer to the constants
 * defined in <code>nucleo.def.texture.filter</code>. A Texture object uses the <code>min</code> and
 * <code>mag</code> properties to set these filters. For example: </p>
 * 
 * <pre class="prettyprint">
 * var texture = new Texture('iphone_screen.png');
 * texture.min = nucleo.def.texture.filter.LINEAR;
 * texture.mag = nucleo.def.texture.filter.NEAREST;
 * </pre>
 * 
 * <p>The maginfication and minification filters by default are:
 * nucleo.def.texture.filter.LINEAR and nucleo.def.texture.filter.LINEAR_MIPMAP_LINEAR respectively
 * </p>
 * 
 * <p>Under normal circumstances you will not need to create a Texture. An actor representing a model with texture
 * information in it will create a Texture automatically. In this case you can access the available Texture object from the actor like this:</p>
 *  
 * <pre class="prettyprint">
 * var actor = view.scene.getActorByName('iphone_screen.json');
 * actor.texture.min = [set the filter here using the constants defined in nucleo.def.texture.filter]
 * actor.texture.mag = [set the filter here using the constants defined in nucleo.def.texture.filter]
 * </pre>
 * 
 * <p>If you want to replace the texture object with a new raster image, you can write something like this:</p>
 * 
 * <pre class="prettyprint">
 * var actor = view.scene.getActorByName('iphone_screen.json');
 * var wallpaper = new Texture('new_wallpaper.png');
 * actor.setTexture(wallpaper);
 * </pre>
 * @class A Texture is a representation of a raster image in Nucleo.
 * @constructor
 * @param {String} uri texture location
 * @author Diego Cantor
 */
nucleo.Texture = function Texture(uri){
    var self = this;

    this.image = new Image();
    this.image.onload = function(){
        self._onLoad();
    };
    
    this.image.onError = function(){
        self._onError();
    };
    
    this.uri = uri;
    if (this.uri != undefined){
        this.load(this.uri);
    }
    
    this.mag = nucleo.Texture.FILTER.LINEAR;
    this.min = nucleo.Texture.FILTER.LINEAR_MIPMAP_LINEAR;
    this.loaded = false;     
};

/*
* Constants
*/
nucleo.Texture.FILTER = nucleo.define.Texture.FILTER;

/**
 * Sets the magnification filter. 
 * @param {String} magfilter one of the options in nucleo.Texture.FILTER
 * @see {nucleo.Texture.FILTER}
 */
nucleo.Texture.prototype.setMagFilter = function(magfilter){
    this.mag = magfilter;
};

/**
 * Sets the minification filter. 
 * @param {String} minfilter one of the options in nucleo.Texture.FILTER
 * @see {nucleo.Texture.FILTER}
 */
nucleo.Texture.prototype.setMinFilter = function(minfilter){
    this.min = minfilter;  
};

/**
 * Loads an image and it associates it to this texture object
 * @param {Object} uri the location of the image to load into this texture object
 */
nucleo.Texture.prototype.load = function(uri){
   this.image.src = uri;
};

/**
 * @private
 */
nucleo.Texture.prototype._onError = function(){
    console.info('Texture: the texture '+this.uri+' could not be found.');
    this.loaded = false;
};

/**
 * @private
 */
nucleo.Texture.prototype._onLoad = function(){
    this.loaded = true;
};

/**
 * Returns the appropriate gl constant that identifies the current magnification
 * filter applied to this texture
 * @param {Object} gl the gl context
 */
nucleo.Texture.prototype.getMagFilter = function(gl){
    
  var tf = nucleo.def.texture.filter;
  switch(this.mag){
      case tf.LINEAR: return gl.LINEAR; break;
      case tf.NEAREST: return gl.NEAREST; break;
      default: return gl.NEAREST; 
  }
};

/**
 * Returns the appropriate gl constant that identifies the current minification filter
 * applied to this texture
 * @param {Object} gl the gl context 
 */
nucleo.Texture.prototype.getMinFilter = function(gl){
    var tf = nucleo.Texture.FILTER;
    switch(this.min){
      case tf.LINEAR: return gl.LINEAR; break;
      case tf.NEAREST: return gl.NEAREST; break;
      case tf.LINEAR_MIPMAP_LINEAR : return gl.LINEAR_MIPMAP_LINEAR; break;
      case tf.LINEAR_MIPMAP_NEAREST: return gl.LINEAR_MIPMAP_NEAREST; break;
      case tf.NEAREST_MIPMAP_LINEAR: return gl.NEAREST_MIPMAP_LINEAR; break;
      case tf.NEAREST_MIPMAP_NEAREST: return gl.NEAREST_MIPMAP_NEAREST; break;
      default: return gl.NEAREST; 
  }
};

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


nucleo.Material = function Material(model){
    this.ambient   = nucleo.Material.AMBIENT;
    this.diffuse   = nucleo.Material.DIFFUSE;
    this.specular  = nucleo.Material.SPECULAR;
    this.shininess = nucleo.Material.SHININESS;
    this.opacity   = nucleo.Material.OPACITY;
    this.shading   = nucleo.Material.SHADING;
    this.texture   = undefined;
    this.colors    = undefined;

    if (model){
        this.getFrom(model);
    } 
};

/*
* Constants
*/
nucleo.Material.AMBIENT   = nucleo.define.Material.AMBIENT;
nucleo.Material.DIFFUSE   = nucleo.define.Material.DIFFUSE;
nucleo.Material.SPECULAR  = nucleo.define.Material.SPECULAR;
nucleo.Material.SHININESS = nucleo.define.Material.SHININESS;
nucleo.Material.OPACITY   = nucleo.define.Material.OPACITY;
nucleo.Material.SHADING   = nucleo.define.Material.SHADING;


/**
 * 
 * @param {Object} model the model from where the material properties are read
 */
nucleo.Material.prototype.getFrom = function(model){
 
    
    if (model.ambient != undefined)
    {
        this.ambient = model.ambient.slice(0);
    }
    
    if (model.diffuse != undefined){
        this.diffuse = model.diffuse.slice(0);
    }
    
    if (model.specular != undefined){
        this.specular = model.specular.slice(0);
    }
    
    if (model.color != undefined){
        this.diffuse = model.color.slice(0);
    }
    
    if (model.shininess != undefined){
        this.shininess = model.shininess;
    }
    
    if (model.opacity != undefined){
        this.opacity = model.opacity;
    }
    
    if (model.shading != undefined){
        this.shading = model.shading;
    }
    
    if (model.texture != undefined){
        this.texture = new Texture(model.path + model.texture);
    }
    
    if (model.colors != undefined){
        this.colors = model.colors;
    }
    
    return this;
    
};

/**
 *  Clones this material
 *  @see Actor#clone
 */
nucleo.Material.prototype.clone = function(){
    var copy = new Material();
    var self = this;
     
    for (var prop in self){
        if (self.hasOwnProperty(prop)) {
            if (self[prop] instanceof Array){
                copy[prop] = self[prop].slice(0);
            }
            else {
               copy[prop] = self[prop];               
            }
        }
    }
    return copy;
};



/**
 * @class A Renderable is an intermediary object between an actor and the rendering strategy that allows rendering
 * very complex models.
 * 
 * Think of this scenario. You have a model that has more than 65K number of vertices.
 * Yes, it is going to happen eventually.
 * 
 * In WebGL you can't do more than 65K indices per draw call. This is because the type of the WebGL index array is unsigned short. 
 * So, a model with more than 65K indices could not be rendered at once.
 * 
 * In previous Nucleo versions (<0.89.3) it was required that a complex model was broken down in several
 * JSON files. This was a way to make sure that each 'part' did not get so big as to be unable to render it.
 * This is, each part had an index array of at most 16k elements.
 * 
 * For example, the VTK to JSON importer (vtk2json) handles this situation and produces parts with index arrays of length = 65K.
 * 
 * However, since version 0.89.2, it is possible to create flat shading models and also to do cell based 
 * picking. This requires generating models where triangles are not shared (so we can do flat shading).
 * Now, if triangles are not shared, then most likely, very complex models are going to surpass the 65K 
 * limit for their index array. 
 * 
 * The renderable object encapsulates a complex model and delivers parts that abide by the 65K index rule.
 * 
 * The renderables are requested internally by RenderEngine whenever a model of BIG_OBJECT or  MESH types
 * need to be rendered.
 * 
 * 
 * 
 * @constructor A Renderable is an intermediary object between an actor and the rendering engine that allows rendering
 * very complex models.
 * 
 * @param{Actor} model the actor to be decomposed into renderable parts
  *  
 * @author Diego Cantor
 */

nucleo.Renderable = function Renderable(actor){
    
    
    if (actor == undefined){
        throw('Renderable: the actor can not be undefined');
    }
   
    
    this.actor = actor;
    this.parts = [];    
    this.update(nucleo.Renderable.TASK.CREATE);
};





/**
 *  Updates the renderable based on changes in the underlying model. After updating, the 
 *  renderable parts will contain any changes to the geometry, colors or other model attributes
 *  @param {Boolean} reslice if true, it will recreate the parts. Otherwise will use the current parts
 */
nucleo.Renderable.prototype.update = function(task){
    
    if (task == undefined){
        throw ("Renderable.update: Please specify a task");
    }

  
    var model  = this._getModel();
    
    if (model == undefined) return; //no model to process
    
    switch(model.type){
        case nucleo.Model.TYPE.MESH:     this._processMesh(model,task); break;
        case nucleo.Model.TYPE.BIG_DATA: this._processBigData(model,task); break;
    }
   
};

/**
 * Queries the actor for a model to process
 * @private
 */
nucleo.Renderable.prototype._getModel = function(){
    var actor = this.actor;
    if (actor.mesh && actor.mesh.model){
        return actor.mesh.model;
    }
    else if (actor.model.type == nucleo.Model.TYPE.BIG_DATA){
        return actor.model;
    }
    else return undefined;
};

/**
 * This methods creates renderable parts from a mesh. The implementation is straight forward
 * given that a mesh does not share triangles. This is what we need to do flat shading and therefore
 * to perform cell color based picking.
 * 
 * 
 */
nucleo.Renderable.prototype._processMesh = function(model,task){
    
  

    var size = Model.MAX_NUM_INDICES;
    var N = Math.floor(model.indices.length / size), R = model.indices.length % size;
    
    if (task == Renderable.TASK.CREATE){
        
        this.parts = [];
        
        for (var i=0; i<=N; i +=1){
            
            var part = new Model(model.name+'-renderable-part-'+i);
            var startIndex = i*size;
            var endIndex = startIndex + size;
            var start = i * size * 3;
            var end   = start + size *3;
            
            if (i == N) {
                startIndex = N*size;
                endIndex = startIndex + R;
                start = N * size * 3;
                end   = start + R *3;
                
                if (R==0){
                    break;
                }
            }
            
            part.indices = this._reindex(model.indices.slice(startIndex,endIndex));
            part.vertices = model.vertices.slice(start, end);
            
            
            if (model.normals && model.normals.length >0){ part.normals  = model.normals.slice(start, end);  }
            if (model.colors  && model.colors.length >0) { part.colors = model.colors.slice(start, end);     }
            
            if (model.pickingColors){
                part.pickingColors = model.pickingColors.slice(start, end);
            }
            
            part.update();
      
            this.parts.push(part);
        }
    }
    
    
    
    else if (task == Renderable.TASK.UPDATE_COLORS){
        for (var i=0; i<=N; i +=1){
            
            var part = this.parts[i];
            var start = i * size * 3;
            var end   = start + size *3;
            
            if (i == N) {

                start = N * size * 3;
                end   = start + R *3;
                
                if (R==0){
                    break;
                }
            }
          
            if (model.colors  && model.colors.length >0) { part.colors = model.colors.slice(start, end);  }

        }
    }
     
};

/**
 * Return indices starting from 0
 * @param {Object} indices
 */
nucleo.Renderable.prototype._reindex = function(indices){
    var min = indices.min();
    var i = indices.length;
    while(i--){
        indices[i] = indices[i] - min;
    }
    return indices;
};


/***
 * 
 * 
 * The idea here is to read parts of size 65K from the model index array. 
 * Then obtain vertex, normal, and color arrays for each index in the part (using _getVertexData).
 * 
 * As each part is populated, the respective index array is generated accordingly.
 * 
 */
nucleo.Renderable.prototype._processBigData = function(model,reslice){
    
    var global_index = model.indices,
    size         = Model.MAX_NUM_INDICES;
    
    if (model.mode == nucleo.Actor.MODE.LINES){
        size = size - 1; //adjusting to even number of indices for partitioning.
    }
   
    var L            = global_index.length,
    max_index    = global_index.max(),
    material     = this.actor.material,
    has_colors   = (material.colors && material.colors.length>0),
    has_normals  = (model.normals   && model.normals.length>0),
    has_scalars  = (model.scalars   && model.scalars.length>0),
    mode         = model.mode;
    
    data = {vertices:[], indices:[],mode:mode};
    if (has_colors)  { data.colors = [];  }
    if (has_normals) { data.normals = []; }
    if (has_scalars) { data.scalars = []; }
    
    var index_map = {},
        part_number = 1,
        new_index = 0,
        progress = 0;
    
    for (var i=0; i<L; i +=1){
        
        index = global_index[i];
        
        if  (index_map[index] == undefined){
    
            index_map[index] = new_index;
            vertex = this._getVertexData(index);
            data.vertices.push.apply(data.vertices, vertex.coords);
                
            if (has_normals){
                data.normals.push.apply(data.normals, vertex.normal);
            }
 
            if (has_colors){
                data.colors.push.apply(data.colors, vertex.color);
            }
 
            if (has_scalars){
                data.scalars.push(vertex.scalar);
            }
            new_index +=1;
        }
        data.indices.push(index_map[index]);
        
        if ((new_index == size+1) || (i == L-1)){
            
            var part = new Model(model.name+'-renderable-part-'+part_number,data);
            part.update();
            nucleo.util.console('Creating part '+part.name+' ['+part_number+']',true);
            this.parts.push(part);
            
            new_index    = 0;
            part_number += 1;
            part         = {vertices:[], indices:[],mode:mode};
            index_map    = {};
            
            data = {vertices:[], indices:[],mode:mode};
            if (has_colors)  { data.colors = [];  }
            if (has_normals) { data.normals = []; }
            if (has_scalars) { data.scalars = []; }
        } 
    }
        
};

/**
 * Useful to divide a big data model into renderable parts. The method _processBigData
 * will read information from the buffers indicated by the index in order to populate each
 * renderable part with the correct information 
 * 
 * @param {Object} index
 * @private
 */
nucleo.Renderable.prototype._getVertexData = function(index){
    
    var material   = this.actor.material;
    var model      = this.actor.model;
    var vertex = {};
    
    vertex.coords   = model.vertices.slice(index*3, index*3+3);
    
    if (model.normals)   {  vertex.normal  = model.normals.slice(index*3, index*3+3);  }
    if (material.colors) {  vertex.color   = material.colors.slice(index*3, index*3+3);}
    if (model.scalars)   {  vertex.scalar  = model.scalars[index];}
    
    return vertex;
    
    
};/*-------------------------------------------------------------------------
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
*  Sometimes it makes sense to associate actors in a scene to perform operations as a unit.
*  For instance you can have a bicycle composed by several actors and you want to change 
*  its color or its position on the scene. You could accomplish that calling the respective
*  methods for each one of the actors that make part of the bicycle or you can create an
*  actor group named bycicle and call just the setColor and translate operations on the actor group.
* 
*  @class
*  @constructor
*  @author Diego Cantor
*/
nucleo.ActorGroup = function ActorGroup(scene, name, list){
    this.scene = scene;
    this.name = name;
    this.list = [];
    this.addList(list);
};

/**
 *  Add a list of actors to the actor group
 * @param {Object} list a list of actors
 */
nucleo.ActorGroup.prototype.addList = function(list){
    var messages = [];
    
    for(var i=0, N = list.length; i <N; i+=1){
        var actor = list[i];
        if (actor instanceof nucleo.Actor && actor.scene == this.scene){
            this.list.push(actor);
        }
        else if (typeof(actor) == 'string'){
            var actorObject  = this.scene.getActor(actor);
            if (actorObject != null){
                this.list.push(actorObject);
            }
            else{
                messages.push("Could not find actor: "+actor);
            }
        }
        else{
            messages.push("The object "+actor+" is not of the expected type (Actor, string)");
        }
    }
    
    if (messages.length != 0){
        this.list = [];
        throw new vxlActorGroupException(messages);
    }
    
};

/**
* Adds one actor to the actor group
* @param {Actor} actor the actor to be added
*/
nucleo.ActorGroup.prototype.add = function(actor){
    var messages = [];

    if (actor instanceof nucleo.Actor && actor.scene == this.scene){
        this.list.push(actor);
    }
    else if (typeof(actor) == 'string'){
        var actorObject  = this.scene.getActor(actor);
        if (actorObject != null){
            this.list.push(actorObject);
        }
        else{
            messages.push("Could not find actor: "+actor);
        }
    }
    else{
        messages.push("The object "+actor+" is not of the expected type (Actor, string)");
    }
    
    if (messages.length != 0){
        this.list = [];
        throw new vxlActorGroupException(messages);
    }
};

/**
 * Returns true if the actor is associated to this actor group. False otherwise
 */
nucleo.ActorGroup.prototype.hasActor = function(actor){
    if (actor instanceof nucleo.Actor){
        return (this.list.indexOf(actor)!=-1)
    }
    else if (typeof(actor)=='string'){
        var actorObject = this.scene.getActor(actor);
        return (actorObject != null);
    }
    
    else return false;
};

nucleo.ActorGroup.prototype.remove = function(actor){
    var index = -1;
    if (actor instanceof nucleo.Actor){
        index = this.list.indexOf(actor);
        
    }
    else if (typeof(actor)=='string'){
        actorObject = this.scene.getActor(actor);
        index = this.list.indexOf(actorObject);
    }   
   
    if (index !=1){
        this.list.splice(index,1);
    }
    else{
        throw new vxlActorGroupException(['the actor '+actor+' was not found in the group '+this.name]);
    }
};

/**
 * Resets the contents of this actor group
 */
nucleo.ActorGroup.prototype.reset = function(list){
   this.list = [];
   if (list != undefined && list instanceof Array){
       this.addList(list);
   }  
};

/**
 * Returns the size of the actor group
 * @returns {Number} the lenght of the actor group
 */
nucleo.ActorGroup.prototype.size = function(){
    return this.list.length;
};

/**
 * Set a property for actors in the group. Please notice that by design actor groups only 
 * set actor level properties instead of model level properties.
 * 
 */
nucleo.ActorGroup.prototype.setProperty = function(property, value){
    for(var i=0, N = this.list.length; i<N; i+=1){
        this.list[i].setProperty(property,value,nucleo.def.actor);
    }
    
    return this;
};

/**
 * Invoke an operation on the actors belonging to this group
 * @param {function} operation from Actor.prototype
 * @param {list} parameters
 */
nucleo.ActorGroup.prototype._apply = function(operation, parameters){
   for(var i=0, N = this.list.length; i<N; i+=1){
        operation.apply(this.list[i], parameters);
    };
    
    return this;
};

/**
 * Flip normals
 */
nucleo.ActorGroup.prototype.flipNormals = function(){
    return this._apply(Actor.prototype.flipNormals);
};

/**
 * Rotation on the X axis
 * @param {float} angle angle in degrees
 */
nucleo.ActorGroup.prototype.rotateX = function(angle){
    return this._apply(Actor.prototype.rotateX, [angle]);
};

/**
 * Rotation on the Y axis
 * @param {float} angle angle in degrees
 */
nucleo.ActorGroup.prototype.rotateY = function(angle){
    return this._apply(Actor.prototype.rotateY, [angle]);
};

/**
 * Rotation on the Z axis
 * @param {float} angle angle in degrees
 */
nucleo.ActorGroup.prototype.rotateZ = function(angle){
    return this._apply(Actor.prototype.rotateZ, [angle]);
};

/**
 * Translation by a given vector
 */
nucleo.ActorGroup.prototype.translate = function(x,y,z){
    return this._apply(Actor.prototype.translate, [x,y,z]);
};

/**
 * Sets the material diffuse color of the group
 * @param {list} color in rgb decimal format
 */
nucleo.ActorGroup.prototype.setColor = function(color){
    return this.setProperty('color',color);
};

/**
 * Sets the lookup table for this group
 */
nucleo.ActorGroup.prototype.setLookupTable = function(lutID, min, max){
    return this._apply(Actor.prototype.setLookupTable, [lutID, min,max]);
};

/**
 * Sets the opacity for this group
 */
nucleo.ActorGroup.prototype.setOpacity = function(opacity){
    return this.setProperty('opacity', opacity);
};

/**
 * Sets the picker for this group
 * @see {Actor#setPicker}
 */
nucleo.ActorGroup.prototype.setPicker = function(type, callback){
    return this._apply(Actor.prototype.setPicker,[type,callback]);
};

/**
 * Sets the position for this group
 * @see {Actor#setPosition}
 */
nucleo.ActorGroup.prototype.setPosition = function(x,y,z){
    return this._apply(Actor.prototype.setPosition,[x,y,z]);
};

/**
 * Sets the scale for this group
 * @see {Actor#setScale}
 */
nucleo.ActorGroup.prototype.setScale = function(x,y,z){
    return this._apply(Actor.prototype.setScale,[x,y,z]);
};

/**
 * Sets the shininess for this group
 * @see {Actor#setShininess}
 */
nucleo.ActorGroup.prototype.setShininess = function(shine){
    return this.setProperty('shininess', shine);
};

/**
 * Sets the visibility for this group
 * @see {Actor#setVisibility}
 */
nucleo.ActorGroup.prototype.setVisible = function(visible){
    return this.setProperty('visible', visible);
};


/**
 *  Sets the shading for this group
 * @see {Actor#setShading}
 */
nucleo.ActorGroup.prototype.setShading = function(shading){
    return this.setProperty('shading', shading);
};

/**
 * Sets the visualization mode for this group
 * @see {Actor#setVisualizationMode}
 */
nucleo.ActorGroup.prototype.setVisualizationMode = function(mode){
    return this._apply(Actor.prototype.setVisualizationMode, [mode]);
};




/**
 * Contains the explanation of why the actor group could not be created
 * @class
 * @author Diego Cantor
 */
function vxlActorGroupException(messages){
    this.messages = messages;
};
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
 * @private not ready yet...
 * @constructor
 * @class
 * Selects the actors that have a given visualization mode (nucleo.Actor.MODE)
 * This class helps the BakeEngine
 */
nucleo.Silo = function Silo(mode) {
    this._mode = mode;
    this._actors = [];
    this.data = {};
    this.cached = {};
    this.added = {};
    this.prepare();
};

/**
 * Populates a silo with the actors from the list that have the type defined for this silo
 */
nucleo.Silo.prototype.populate = function (list) {
    //this._actors = [];
    var N = list.length
    for (var i = 0; i < N; i += 1) {
        var actor = list[i];
        if (this.cached[actor.UID] == undefined && actor.mode == this._mode) {
            this._actors.push(actor);
            this.cached[actor.UID] = actor;
        }
    }
};

/**
 * @private
 */
nucleo.Silo.prototype.prepare = function () {

    var data = {
        mixin: [],  //vertices + normals +
                    // + vertex colors or zeros if not using vertex colors.

        index: [],  //indices

        matrix: [[], [], [], []]
    };
    this.data = data;
};

nucleo.Silo.prototype.process = function () {
    //this.prepare();
    var N = this._actors.length;
    for (var i = 0; i < N; i += 1) {
        var actor = this._actors[i];
        if (this.added[actor.UID] == undefined) {
            this.processActor(this._actors[i]);
            this.added[actor.UID] = actor;
        }
    }
};

nucleo.Silo.prototype.processActor = function (actor) {

    var model = actor.model;
    var material = actor.material;

    var mixin = this.data.mixin;
    var index = this.data.index;
    var matrix = this.data.matrix;

    var num_vertices = model.vertices.length;
    var num_indices = model.indices.length;

    //converting from Float32Array to regular js array to operate
    var actor_matrix = Array.prototype.slice.call(actor._matrix);


    // processing mixin
    if (material.colors != undefined) {
        /*for (var i=0;i<num_vertices; i+=3){
         mixin.push(model.vertices[i]);
         mixin.push(model.vertices[i+1]);
         mixin.push(model.vertices[i+2]);
         mixin.push(model.normals[i]);
         mixin.push(model.normals[i+1]);
         mixin.push(model.normals[i+2]);
         mixin.push(material.colors[i]);
         mixin.push(material.colors[i+1]);
         mixin.push(material.colors[i+2]);
         matrix[0] = matrix[0].concat(actor_matrix.slice(0,4)); //glMatrix IS column-major after all :-P
         matrix[1] = matrix[1].concat(actor_matrix.slice(4,8));
         matrix[2] = matrix[2].concat(actor_matrix.slice(8,12));
         matrix[3] = matrix[3].concat(actor_matrix.slice(12,16));
         }*/
    }
    else {
        for (var i = 0; i < num_vertices; i += 3) {

            mixin = mixin.concat([
                model.vertices[i],
                model.vertices[i + 1],
                model.vertices[i + 2],
                model.normals[i],
                model.normals[i + 1],
                model.normals[i + 2],
                material.diffuse[0],
                material.diffuse[1],
                material.diffuse[2]
            ]);

            matrix[0] = matrix[0].concat(actor_matrix.slice(0, 4));
            matrix[1] = matrix[1].concat(actor_matrix.slice(4, 8));
            matrix[2] = matrix[2].concat(actor_matrix.slice(8, 12));
            matrix[3] = matrix[3].concat(actor_matrix.slice(12, 16));
        }
    }

    //processing index
    var ind = model.indices.slice(0);
    if (index.length > 0) {
        var offset = index.max() + 1;
        for (var i = 0; i < num_indices; i += 1) {
            ind[i] += offset;
        }
        index = index.concat(ind);
    }
    else {
        index = ind;
    }

    this.data.mixin = mixin;
    this.data.index = index;
    this.data.matrix = matrix;

};

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
 * @private
 * creates a new DashEngine
 * This engine minimizes the number of drawArray and drawElements calls by
 * combining multiple actors in the same VBO.
 * 
 * DashEngine has replaced the old BakeEngine.
 * vxlDashEnginereduces the number of drawArray, drawElement WebGL calls
 * by grouping together similar actors, combining the respective arrays. This is a complex engine
 * and there is lot to do (for instance there is no support for big data or picking yet.)
 * The new class Silo simplifies the code of DashEngine. Silo*
 * grups actors that have the same visualization mode and delivers the javascript arrays and metadata
 * that will be passed as attributes and uniforms (respectively) to the ESSL program.
 * Pending in DashEngine
 * ----------------------------
 * 
 * SOLID, WIREFRAME, POINTS, LINES, BOUNDING_BOX, BB_AND_SOLID, WIRED_AND_SOLID, FLAT.
 * TEXTURED actors: this is a bit more complicated (combining textures, grouping actors by texture used?)
 * FLAT actors: related to picking too and to flat mesh representation.
 * Picking
 *  Multilight support (also pending in RenderEngine)
 * 
 * 
 * 
 * 
 * 
 * @param {Object} renderer
 */
nucleo.DashEngine = function DashEngine(renderer){
    nucleo.Engine.call(this);

    this.silos ={};
    this._createSilos();
    this._gl_buffers = {};
    this._createGLBuffers();

    this.essl = nucleo.util.extend(
        nucleo.define.ESSL,{
        ACTOR_MATRIX: "aActorMatrix"      
    });
};

nucleo.DashEngine.prototype = new nucleo.Engine();
nucleo.DashEngine.prototype.constructor = nucleo.DashEngine;


nucleo.DashEngine.prototype.configure = function(){
    nucleo.Engine.prototype.configure.call(this);
    var gl = this.gl;
    gl.clearDepth(1.0);
    gl.disable(gl.CULL_FACE);
};

/**
 * @private
 */
nucleo.DashEngine.prototype._createSilos = function(){
   for (key in nucleo.Actor.MODE){
        this.silos[key] = {};
        this.silos[key] = new Silo(key);
    }
};

/**
 * @private
 */
nucleo.DashEngine.prototype._createGLBuffers = function(){
    var gl = this.renderer.gl;
    for (key in nucleo.Actor.MODE){
        this._gl_buffers[key] = {};
        this._gl_buffers[key].mixin = gl.createBuffer();
        this._gl_buffers[key].index = gl.createBuffer();
        this._gl_buffers[key].matrix = gl.createBuffer();
    }
};

/**
 * Allocates the scene passed as parameter. This prepares the engine to do the render call
 * @param {Object} scene the scene to be rendered
 */
nucleo.DashEngine.prototype.allocate = function(scene){
    var actors = scene._actors;
    
    for (key in this.silos){
        this.silos[key].populate(actors);
        this.silos[key].process();
    }
    
};

/**
 * Performs the rendering. Unlike the default render
 * @param {Object} scene the scene to render
 */
nucleo.DashEngine.prototype.render = function(scene){
    var r       = this.renderer;
    var trx     = r.transforms
    var pm      = r.pm;
    var gl      = r.gl;
    var essl    = this.essl;
    
    //if there is nothing to render yet then quit
    if (scene._actors.length == 0) return;
    
    //set uniforms
    trx.update();
    pm.setUniform(essl.PERSPECTIVE_MATRIX, trx.pMatrix);
    pm.setUniform(essl.MODEL_VIEW_MATRIX,  trx.mvMatrix);
    pm.setUniform(essl.NORMAL_MATRIX,      trx.nMatrix);
    pm.setUniform(essl.MVP_MATRIX,         trx.mvpMatrix);
    
    
    //Renders the actors that have a SOLID visualization mode
    this._renderSolid();
    
};

/**
 * Performs any clean up task that the engine needs to do after rendering
 * @param {Object} scene the scene that was just rendered
 */
nucleo.DashEngine.prototype.deallocate = function(scene){
    
};

nucleo.DashEngine.prototype.enableMatrixAttribute = function(name){
    var r       = this.renderer;
    var gl  = r.gl;
    var prg = r.pm._essl;
    var m       = nucleo.Actor.MODE;
    var silo    = this.silos[m.SOLID];
    var data = silo.data;
    
    var loc  = gl.getAttribLocation(prg, name);
    
    //enable the attribute
    gl.enableVertexAttribArray(loc);
    gl.enableVertexAttribArray(loc + 1);
    gl.enableVertexAttribArray(loc + 2);
    gl.enableVertexAttribArray(loc + 3);
    //bind buffer 
    var matrix0_buffer = gl.createBuffer();
    var matrix1_buffer = gl.createBuffer();
    var matrix2_buffer = gl.createBuffer();
    var matrix3_buffer = gl.createBuffer();
    
    gl.bindBuffer(gl.ARRAY_BUFFER, matrix0_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data.matrix[0]), gl.STATIC_DRAW);
    gl.vertexAttribPointer(loc,4, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, matrix1_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data.matrix[1]), gl.STATIC_DRAW);
    gl.vertexAttribPointer(loc+1,4, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, matrix2_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data.matrix[2]), gl.STATIC_DRAW);
    gl.vertexAttribPointer(loc+2,4, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, matrix3_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data.matrix[3]), gl.STATIC_DRAW);
    gl.vertexAttribPointer(loc+3,4, gl.FLOAT, false, 0, 0);
    
    
    
}


nucleo.DashEngine.prototype._renderSolid = function(){
     var m       = nucleo.Actor.MODE;
     var silo    = this.silos[m.SOLID];
     var data    = silo.data;
     var r       = this.renderer;
     var trx     = r.transforms
     var pm      = r.pm;
     var gl      = r.gl;
     var essl    = this.essl;
     
     
     
     pm.setUniform("uUseShading",true);
     
     pm.enableAttribute(essl.VERTEX_ATTRIBUTE);
     pm.enableAttribute(essl.NORMAL_ATTRIBUTE);
     pm.enableAttribute(essl.COLOR_ATTRIBUTE);
     
     this.enableMatrixAttribute(essl.ACTOR_MATRIX);
     
     var dataVBO = this._gl_buffers[m.SOLID].mixin;
     gl.bindBuffer(gl.ARRAY_BUFFER, dataVBO);
     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data.mixin), gl.STATIC_DRAW);   
     pm.setAttributePointer(essl.VERTEX_ATTRIBUTE, 3, gl.FLOAT, false, 36, 0);
     pm.setAttributePointer(essl.NORMAL_ATTRIBUTE, 3, gl.FLOAT, false, 36, 12);
     pm.setAttributePointer(essl.COLOR_ATTRIBUTE, 3, gl.FLOAT, false, 36, 24);
     
     
     
     
     var indexVBO = this._gl_buffers[m.SOLID].index;
     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexVBO);
     gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data.index), gl.STATIC_DRAW);
     gl.drawElements(gl.TRIANGLES, data.index.length, gl.UNSIGNED_SHORT,0);
};




