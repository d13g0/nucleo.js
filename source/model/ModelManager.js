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
    this.toLoad = [];
    this.models = [];

    var e = nucleo.EVENTS;

    nucleo.Notifier.instance.publish([
        e.MODELS_LOADING,
        e.MODEL_NEW,
        e.MODELS_LOADED
    ], this);

    nucleo.Notifier.instance.subscribe(e.READER_DONE, this);
};

/**
 * Handles Nucleo events to which this model manager is subscribed to
 * @param {String} event the event that was fired
 * @param {Object} source the object that fired the event
 */
nucleo.ModelManager.prototype.handleEvent = function (event, source) {
    var reader = source;
    var model = reader.getModel();
    this.add(model, reader.scene);
};


/**
 * Uses an Ajax mechanism to load models from a Web Server.
 * @param {String} uri The path to the file that will be loaded.
 * @param {Scene} scene The scene that will create an actor for this model. This parameter is optional.
 */
nucleo.ModelManager.prototype.load = function (uri, scene) {

    var dtype, mime, nocacheuri, manager = this,
        filename = uri.replace(/^.*[\\\/]/, ''),
        modelname = filename.split('.')[0],
        extension = filename.split('.')[1];

    if (manager.isModelLoaded(modelname)) return;

    if (extension == 'vtk') {
        dtype = 'text';
        mime = 'text/plain';
    }
    else if (extension == 'json') {
        dtype = 'json';
        mime = 'application/json';
    }
    else {
        throw ('ModelManager.load ERROR: Unknown filetype [' + extension + ']');
    }

    nocacheuri = uri + '?nocache=' + (new Date()).getTime();

    nucleo.util.console('ModelManager.load: Requesting ' + uri + '...');
    nucleo.Notifier.instance.fire(nucleo.EVENTS.MODELS_LOADING, this);

    var successHandler = function (manager, modelname, scene) {
        switch (extension) {
            case 'json':
                return function (json, textStatus) {
                    json.uri = filename;
                    json.path = nucleo.util.getPath(uri);
                    json.name = modelname;
                    manager.add(json, scene);
                };
                break;
            case 'vtk':
                return function (data) {
                    var reader = new VTKReader(scene);
                    reader.readText(modelname, data);
                };
        }
    };

    var errorHandler = function (uri) {
        return function (request, status, error) {

            if (error.code = 1012) {
                alert('The file ' + uri + ' could not be accessed. \n\n' +
                'Please make sure that the path is correct and that you have the right pemissions');
            }
            else {
                alert('There was a problem loading the file ' + uri + '. HTTP error code:' + request.status);
            }
        };
    };

    nucleo.ajax(
        {
            url: nocacheuri,
            type: "GET",
            dataType: dtype,
            mimeType: mime,
            success: successHandler(manager, modelname, scene),
            error: errorHandler(uri)
        }
    );
};


/**
 * Loads a list of models and assigns them to a scene
 * @param {Array} list list of files to load
 * @param {Scene} scene scene to callback when the models are loaded
 */
nucleo.ModelManager.prototype.loadList = function (list, scene) {
    this.toLoad = list.slice(0);
    nucleo.util.console('ModelManager.loadList: models to load ->' + this.toLoad.length);
    for (var i = 0; i < this.toLoad.length; i++) {
        this.load(this.toLoad[i], scene);
    }
};

/**
 *
 * @param {Object} p_object the JSON object that contains the definition of the model or
 * an instance of Model. The object must have a 'name' property.
 * @param {Scene} p_scene the scene to be called back when the model is created
 */
nucleo.ModelManager.prototype.add = function (p_object, p_scene) {

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
                p_scene.createActor(model);
            }
            else if (p_scene.loadingMode == nucleo.Model.LOADING_MODE.LATER) {
                if (self.allLoaded()) {
                    p_scene.createActors(self.models);
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
    };

    setTimeout(function () {
        scheduled_add();
    }, 0);
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
 * @param {String} name the name of the model to check
 */
nucleo.ModelManager.prototype.isModelLoaded = function (name) {
    for (var i = 0; i < this.models.length; i++) {
        if (this.models[i].name == name) return true;
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
 * @param {String} name the name of the model to retrieve
 */
nucleo.ModelManager.prototype.getModelByName = function (name) {
    for (var i = 0, max = this.models.length; i < max; i += 1) {
        if (this.models[i].name == name) return this.models[i];
    }
    return null;
};

/**
 * Defines the global Model Manager
 */
nucleo.ModelManager.instance = new nucleo.ModelManager();