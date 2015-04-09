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

nucleo.DEBUG = true;