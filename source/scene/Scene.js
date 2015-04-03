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

    this.UID               = nucleo.util.generateUID();
    this.views             = [];
    this._actors           = [];
    this._groups           = [];
    this.toys              = new nucleo.SceneToys(this);
    this.loadingMode       = nucleo.Model.LOADING_MODE.LIVE;
    this.normalsFlipped    = false;
    this.lutID             = null;
    this.timerID           = null;
    this.scalarMIN         = Number.MAX_VALUE;
    this.scalarMAX         = Number.MIN_VALUE;
    this.bb                = [0, 0, 0, 0, 0, 0];
    this.centre            = [0, 0, 0];
    this.frameAnimation    = null;

    var ntf                = nucleo.Notifier.instance;
    var e                  = nucleo.EVENTS;

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
    var m = Model.loadingMode;

    if (mode == undefined || mode == null ||
        (mode != m.LIVE && mode != m.LATER && mode != m.DETACHED)) {
        throw('the mode ' + mode + 'is not a valid loading mode');
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
 * This function creates AND ADD a new actor to this scene
 * @param {Model} model the model from which a new actor will be created AND added to this scene
 *
 * If you are looking to create but not adding an actor call new Actor(model) instead.
 *
 * @returns actor the actor that was created and added to the scene, from the model passed as parameter
 */
nucleo.Scene.prototype.createActor = function (model) {
    var actor = new nucleo.Actor(model);
    this.addActor(actor);
    return actor;
};

/**
 * Creates multiples actors at once
 * @param {[ Model ]} models a list of models to create actors from
 */
nucleo.Scene.prototype.createActors = function (models) {
    var i = models.length;
    while (i--) {
        this.createActor(models[i]);
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
    var i = this.views.length;
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
    var idx = this._actors.indexOf(actor);
    var _actor = this._actors.splice(idx, 1);
    _actor = null;
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
nucleo.Scene.prototype.setPropertyFor = function (list, property, value) {
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
    var i = this._actors.length;
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
    this._actors = [];
    nucleo.c.actor = null;
    this.computeBoundingBox();
};

/**
 * Retrieves an actor object by name
 * @param name the name of the actor to retrieve
 */
nucleo.Scene.prototype.getActorByName = function (name) {
    name = name.replace(/\.[^/.]+$/, "");
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
    var i = this._actors.length;
    while (i--) {
        if (condition(this._actors[i])) {
            idx.push(i);
        }
    }
    var results = [];
    var j = idx.length;
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
nucleo.Scene.prototype.setAnimation = function (animation) {
    if (animation instanceof nucleo.FrameAnimation) {
        this.frameAnimation = animation;
        this.frameAnimation.scene = this;
        var i = this.views.length;
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
        this.frameAnimation = null;
    }
};

/**
 * Returns a list with the actor names
 * @returns {Array} a list with the actor names
 */
nucleo.Scene.prototype.getActorNames = function () {
    var list = [];
    var i = this._actors.length;
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
    var i = this._actors.length;
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
