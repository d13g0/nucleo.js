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
nucleo.ModelManager.instance = new nucleo.ModelManager();