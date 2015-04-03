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
