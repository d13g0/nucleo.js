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
 * @namespace Application Programing Interface namespace.
 *  
 * Using nucleo.api in your programs you will be able to access many of the features offered by 
 * Nucleo.js library.
 * 
 * By design, type checking is enforced throughout the functions provided by the public API. 
 * The goal is to help novice programmers that will use the API more often than advanced programmers.
  */
nucleo.api = {
 
 /**
  * Creates and returns a View object
  * @param {String} canvas_id The canvas' Document Object Model (DOM) id.
  * @param {Scene} scene optional, the scene associated to this view
  * @param {Boolean} handleLayout if true or absent, the canvas will be resized dynamically
  * @returns {View} a new View object
  */
 setup : function(canvas_id, scene, handleLayout){
 	if (scene != null && !(scene instanceof Scene)) throw ('api.setup: scene parameter is invalid');
 	return new View(canvas_id,scene,handleLayout);
 },
  
  /**
   * Sets the rendering rate of the current view
   * @param {Number} r the new rendering rate given as a number in milliseconds
   * @see api#setCurrentView
   */
 setRenderRate : function(r){
	nucleo.c.view.renderer.setRenderRate(r);
  },
  
  /**
   *Sets the render mode for the current view or the view passed as second
   * parameter 
   * @param {String} mode one of the modes defined in <code>nucleo.def.renderer.mode</code>
   * @param {View} view the view (Optional) If this is not set up then the current view is used
   */
  setRenderMode : function(mode, view){
      if (view == undefined && nucleo.c.view == undefined){
          throw ('api.setRnederMode: you need to define a view');
      }
      else if (view != undefined && view instanceof View){
          view.renderer.setMode(mode);
      }
      else {
          nucleo.c.view.renderer.setMode(mode);
      }
      
  },
  /**
   *Changes the field of view of the current camera
   * 
   * @param{Number} fov the field of view in degrees [0-360] 
   */
  setFieldOfView : function(fov){
      if (fov >0 && fov <= 360){
        nucleo.c.camera.setFieldOfView(fov);
      }
      else{
          throw('api.setFieldOfView: the field of view should be between 0 and 360 degrees');
      }
  },
 
 /**
  * If the object passed as a parameter is a View then it sets it up as the current view.
  * All subsequent calls to API functions that reference the current view will be redirected
  * to affect the newly set object.
  * @param {a} the View object that we want to make the current one
  */
 setCurrentView :  function(a){
	if (a instanceof View){
		nucleo.c.view = a;
	}
 },

 /**
  * Returns the current view. This is the view that is receiving all the API calls
  * @returns {View} the current view
  */
 getCurrentView :  function(){
	return nucleo.c.view;
 },
 
 
 /**
  * Sets the current actor
  * @param {Actor, String} actor This could be an actor object or an actor name
  * 
  * If the actor name is passed to this method, there must be a current scene. 
  * Otherwise an exception will raise.
  */
 setCurrentActor :  function(actor){
	if (actor instanceof Actor){
		nucleo.c.actor = actor;
	}
	else if (typeof actor == 'string'){
		if (nucleo.c.scene == undefined) throw ('nucleo.api.setCurrentActor: there is no Current scene. Please call nucleo.api.setCurrentScene');
		
		var theActor = nucleo.c.scene.getActorByName(actor);
		if (theActor != undefined){
			nucleo.c.actor = theActor;
		}
		else {
			throw ('nucleo.api.setCurrentActor: the actor '+actor+' does not exist in the current scene');
		}
	}
	else{
	    nucleo.c.actor = actor;
	}
 },
 
 getCurrentActor :  function(){
	return nucleo.c.actor;
 },

 /*setCurrentCamera :  function(a){
	if (a instanceof Camera){
		nucleo.c.camera = a;
	}
 },
 
 getCurrentCamera :  function(){
	return nucleo.c.camera;
 },*/

 setLookupTable :  function(name){
 	if (!nucleo.go.lookupTableManager.isLoaded(name)){
		util.console('Lookup Table '+name+' has not been loaded');
		return;
	}
	
	nucleo.c.view.scene.setLookupTable(name);
 },
 
 /**
  *@param {String} folder. This parameter is required. It specifies the location from where
  * the lookup tables will be loaded. If this parameter is not passed the current folder will
  * be used. The current folder is determined on running time and it is the folder where Nucleo is
  * located.
  */
 loadLUTS :  function(folder){
 	nucleo.go.lookupTableManager.setLocation(folder);
	nucleo.go.lookupTableManager.loadAll();
 },

 /**
  * Go back to square one. A clean scene with no actors
  * @TODO: Provide the option to keep the models in the cache (ModelManager)
  */
 resetScene :  function(){
    if (nucleo.c.animation) nucleo.c.animation.stop();
	nucleo.c.view.reset();
	modelManagerInstance.reset();
 },
 

 
 /**
  * Loads a sequence
  * @param {String} prefix the shared name by all the files. For instance part in part1, part2, ...
  * @param {Number} start start number in the sequence
  * @param {Number} end end number in the sequence
  * @param {String} path relative path to the webpage where the files are located
  * @param {String} mode a loading mode (See load method)
  * @param {String} scene the scene where the generated actors should be placed
  */
 loadSequence :  function(prefix, start, end, path,mode,scene){
    
    var scene = scene==null?nucleo.c.scene:scene;
    var models = [];
    
    var p = util.getPath(path);
    
    for(var i=start;i<=end; i+=1){
        models.push(p + prefix+i+'.json');
    }
    if (mode != undefined && mode != null){
        scene.setLoadingMode(mode);
    }
    
    modelManagerInstance.loadList(models, scene);
 },
 
 /**
  * Activates the axis in the current view
  * The axis is always centered in the focal point of the camera
  */
 axisON :  function(){
    if (nucleo.c.scene == undefined){
       throw ('nucleo.api.axisON: There is no current scene');
    }
	nucleo.c.scene.toys.axis.setVisible(true);
	nucleo.c.camera.refresh();
 },
 
 /**
  * Hides the axis in the current view
  */
 axisOFF :  function(){
    if (nucleo.c.scene == undefined){
        throw ('nucleo.api.axisOFF: There is no current scene');
    }
	nucleo.c.scene.toys.axis.setVisible(false);
	nucleo.c.camera.refresh();
 },
 
 /**
  * Shows the global bounding box of the current scene 
  * @TODO: move the bounding box to the scene object
  */
 boundingBoxON :  function(){
    if (nucleo.c.scene == undefined){
        throw ('nucleo.api.boundingBoxON: There is no current scene');
    } 
	nucleo.c.scene.toys.boundingbox.setVisible(true);
	nucleo.c.camera.refresh();
 },
 
  /**
  * Shows the global bounding box of the current scene 
  * @TODO: move the bounding box to the scene object
  */
 boundingBoxOFF:  function(){
    if (nucleo.c.scene == undefined){
        throw ('nucleo.api.boundingBoxOFF: There is no current scene');
    }
	nucleo.c.scene.toys.boundingbox.setVisible(false);
	nucleo.c.camera.refresh();
 },
 
/**
 * Shows the scene's floor. If the dimension and spacing have not been set, then the floor wiill not be visible'
 * @param{NUmber} dimension the floor dimension (this number will be multiplied by 2 to cover the negative cartesian space)
 * @param{Number} spacing the spacing tells how often we have grid divisions
 */
floorON: function(dimension, spacing){
    if (nucleo.c.scene == undefined){
        throw ('nucleo.api.floorON: There is no current scene');
    }
    if (dimension == undefined || spacing == undefined){
        nucleo.c.scene.toys.floor.setVisible(true);
    }
    else{
        nucleo.c.scene.toys.floor.setGrid(dimension, spacing);
    }
    nucleo.c.camera.refresh();
},

/**
 * Hides the floor in the current scene 
 */
floorOFF: function(){
    if (nucleo.c.scene == undefined){
        throw ('nucleo.api.floorOFF: There is no current scene');
    }
    nucleo.c.scene.toys.floor.setVisible(false);
    nucleo.c.camera.refresh();
},
 

/**
 * Sets the background color of the current view.
 * @param {Number, Array, vec3} r it can be the red component, a 3-dimensional Array or a vec3 (glMatrix)
 * @param {Number} g if r is a number, then this parameter corresponds to the green component
 * @param {Number} b if r is a number, then this parameter corresponds to the blue component
 */ 
 setBackgroundColor :  function(r,g,b){
	nucleo.c.view.setBackgroundColor(r,g,b);
 },



/**
 * If an actor has been selected (If there is an current actor in nucleo.c.actor),
 * changes its visualization mode to WIREFRAME. 
 * Otherwise,shows all the scene in WIREFRAME mode.
 * 
 * @see nucleo.def.actor.mode
 */ 
wireframeON :  function(){
	if (nucleo.c.actor){
		nucleo.c.actor.setVisualizationMode(nucleo.def.actor.mode.WIREFRAME);
	}
	else {
		nucleo.c.scene.setVisualizationMode(nucleo.def.actor.mode.WIREFRAME);
	}
	util.console('API:Wireframe is shown.');
 },
 
 /**
  * Changes the visualization mode of the current actor (or all the actors if there's no current actor')
  * to a solid representation
  * @see nucleo.def.actor.mode
  */
 surfaceON :  function(){
	if (nucleo.c.actor){
		nucleo.c.actor.setVisualizationMode(nucleo.def.actor.mode.SOLID);
	}
	else {
		nucleo.c.view.scene.setVisualizationMode(nucleo.def.actor.mode.SOLID);
	}
	util.console('API:Wireframe is hidden.');
 },
 
 /**
  * Changes the visualization mode of the current actor (or all the actors if there's no current actor')
  * to a point representation
  * @see nucleo.def.actor.mode
  */
 pointsON :  function(){
	if (nucleo.c.actor){
		nucleo.c.actor.setVisualizationMode(nucleo.def.actor.mode.POINTS);
	}
	else {
		nucleo.c.view.scene.setVisualizationMode(nucleo.def.actor.mode.POINTS);
	}
 },
 
  /**
  * Changes the visualization mode of the current actor (or all the actors if there's no current actor')
  * to a solid representation
  * @see nucleo.def.actor.mode
  */
 solidWireframeON :  function(){
    if (nucleo.c.actor){
        nucleo.c.actor.setVisualizationMode(nucleo.def.actor.mode.WIRED_AND_SOLID);
    }
    else {
        nucleo.c.view.scene.setVisualizationMode(nucleo.def.actor.mode.WIRED_AND_SOLID);
    }
    util.console('API:Wireframe is hidden.');
 },
 /**
  * Returns a list of actor names. 
  * @param {Scene} scene the scene. This parameter is optional 
  */
 getActorNames : function(scene){
    var _scene = scene;
    if (_scene == undefined){ //look in the current scene
        if (nucleo.c.scene == undefined){
            throw ('nucleo.api.getActorNames: There is no current scene');
        }
        else{
            _scene = nucleo.c.scene;
        }
    }
    return _scene.getActorNames();
 },
 
 /**
  *Creates an actor group for the current scene
  * @param {String} name name of the actor group
  * @param {List} list list of actors to add to the actor group
  * @returns {ActorGroup} the actor group
  * @see Scene#createActorGroup 
  */
 createActorGroup: function(name, list){
     return nucleo.c.scene.createActorGroup(name, list);
 },
 
 /**
  *Returns a new actor group (ActorGroup) with all the actors in the current scene
  * @see ActorGroup
  */
 getAllActors: function(){
     var scene = nucleo.c.scene;
     
     var group = scene.getActorGroup('all');
     
     if (group == undefined){
        group = scene.createActorGroup('all', nucleo.c.scene._actors);
     }
     else{
         group.reset(nucleo.c.scene._actors);
     }
     
     return group;
 },
 
 /**
  *Retrieves an actor by name or UID
  * @param {String} actorNameOrUID actor name or UID
  * @param {Scene} scene looks in the specified scene. This parameter is optional. 
  * If not specified, the current scene (nucleo.c.scene) will be queried
  */
 getActor: function(actorNameOrUID, scene){
     var actor = this.getActorByName(actorNameOrUID, scene);
     
     if (actor == null){
         actor = this.getActorByUID(actorNameOrUID, scene);
     }
     return actor;
 },
 /**
  * Retrieves an actor object by UID
  * @param {String} actorUID the UID of the actor
  * @param {Scene} scene looks in the specified scene. This parameter is optional. 
  * If not specified, the current scene (nucleo.c.scene) will be queried
  *  
  */
 getActorByUID :  function(actorUID,scene){
    var _scene = scene;
    if (_scene == undefined){ //look in the current scene
        if (nucleo.c.scene == undefined){
            throw ('nucleo.api.getActorByUID: There is no current scene. Please the scene you want to look the actor with uid: '+UID+' into');
        }
        else{
            _scene = nucleo.c.scene;
        }
    }
    
    return _scene.getActorByUID(actorUID);
 },
 /**
  * Retrieves an actor object by name
  * @param {String} actorName the name of the actor
  * @param {Scene} scene looks in the specified scene. This parameter is optional. 
  * If not specified, the current scene (nucleo.c.scene) will be queried
  *  
  */
 getActorByName :  function(actorName,scene){
 	var _scene = scene;
 	if (_scene == undefined){ //look in the current scene
 		if (nucleo.c.scene == undefined){
 			throw ('nucleo.api.getActorByName: There is no current scene. Please the scene you want to look the actor '+actorName+' into');
 		}
 		else{
 			_scene = nucleo.c.scene;
 		}
 	}
 	
 	return _scene.getActorByName(actorName);
 },
 
 /**
  * @param {Number} op  opacity value between 0 and 1 (float)
  * @TODO: Reevaluate this method. Opacity is shader dependent
  */
 setActorOpacity :  function(op){
    var opacity = Math.min(Math.max(0,Math.abs(op)),1);
	if (nucleo.c.actor){
		nucleo.c.actor.setOpacity(op);
	}
	else{
		nucleo.c.view.scene.setOpacity(opacity);
	}
	nucleo.c.view.refresh();
	util.console('API:Opacity changed to '+(op*100)+'%');
  },
  
 
 /**
  * Sets a property for one of the actors in the current scene.
  * This metod requires a current scene
  * @param {Actor, String} actor it can be a Actor or a String with the actor name
  * @param {String} property the property to change 
  * @param {Object} value the new value
  */
 setActorProperty :  function (actor, property, value){
	
	if (nucleo.c.scene == undefined) throw ('nucleo.api.setActorProperty: there is no current scene. Please call nucleo.api.setCurrentScene');
	
	var scene = nucleo.c.scene;
	var _actor = actor;
	if (_actor instanceof Actor){
		_actor.setProperty(property,value);
	}
	else{ //TODO: assuming string.VALIDATE!
		_actor = scene.getActorByName(_actor);
		if (_actor == undefined) throw 'The actor '+_actor+' does not belong to the current scene'
		_actor.setProperty(property,value);
	}
 },
 
 /**
  * Sets a property for all the actors 
  * @param {String} property the property to change 
  * @param {Object} value the new value
  * @param {Scene} scene the scene (optional). If this parameter is not passed the current scene is used 
  */
 setPropertyForAll : function (property, value, scene){
    var s = undefined; 
    if (nucleo.c.scene == undefined && scene == undefined) throw ('nucleo.api.setPropertyForAll: there is no current scene. Please call nucleo.api.setCurrentScene');
    if (scene == undefined){
        s  = nucleo.c.scene;
    }
    else {
        s = scene;
    }
    s.setPropertyForAll(property,value);         
 },
 
 
 /**
  * Sets a property for all the actors in the list 
  * @param {Array} list list of actors (String or Actor)
  * @param {String} property the property to change 
  * @param {Object} value the new value
  * @param {Scene} scene the scene (optional). If this parameter is not passed the current scene is used 
  */
 setPropertyFor : function(list, property, value, scene){
    var s = undefined; 
    if (nucleo.c.scene == undefined && scene == undefined) throw ('nucleo.api.setPropertyForAll: there is no current scene. Please call nucleo.api.setCurrentScene');
    if (scene == undefined){
        s  = nucleo.c.scene;
    }
    else {
        s = scene;
    }
    s.setPropertyFor(list,property,value);
 },
 
 /**
 * <p>Returns a list of actors based on the condition passed as parameter.</p>
 * <p>The condition is a function with the following signature:</p>
 * <p><code> condition(Actor): returns boolean</code></p>
 * <p>If the condition evaluates true then that actor is included in the results</p>
 * 
 * @param {function} condition the condition to evaluate in the actor list
 * @param {Scene} scene (Optional) If this parameter is not set, the current scene will be used
 * @returns {Array} list of actors 
 */
 getActorsThat : function(condition, scene){
    var s = undefined;
    if (nucleo.c.scene == undefined && scene == undefined) throw ('nucleo.api.setPropertyForAll: there is no current scene. Please call nucleo.api.setCurrentScene');
    if (scene == undefined){
        s = nucleo.c.scene;
    }
    else{
        s = scene;
    }
    return s.getActorsThat(condition);
 },
 
 /**
  * Flip the normals of the current actor or the whole scene if the current actor is undefined
  */
 flipActorNormals :  function (){
	if (nucleo.c.actor){
		nucleo.c.actor.flipNormals();
	}
	else{
		nucleo.c.view.scene.flipNormals();
	}
	nucleo.c.view.refresh();
 },
 
 /**
  *If there is an animation object (nucleo.c.animation) then
  * it stops the animation 
  */
 stopAnimation :  function(){
	if(nucleo.c.animation != null) nucleo.c.animation.stop();
 },
 
 /**
  *If there is an animation object (nucleo.c.animation) then
  * it starts the animation 
  */
 startAnimation :  function(){
	if(nucleo.c.animation != null) nucleo.c.animation.start();
 },
 
 /**
  * If there is a FrameAnimation object attached to the scene then it 
  * sets the current animation frame
  * @param {Number} f the animation frame index
  */
 setFrame :  function(f){
	if (nucleo.c.animation == null) return;
	var a = nucleo.c.animation;
	a.stop();
	if (f>=1){
		a.setFrame(f);
	}
	else{
		util.console('API:frame ' + f +' does not exist. Animation goes back to the beginning');
		a.setFrame(1);
	}
 },

 /**
  *Removes the current animation from the scene 
  */
 clearAnimation :  function(){
	if(nucleo.c.animation){
		nucleo.c.animation.stop();
		nucleo.c.animation = null;
	}
 },
 /**
  * Resets the current camera
  */
 resetCamera :  function(){
	nucleo.c.camera.reset();
 },
 
 /**
  * Saves the current camera state
  */
 saveCamera :  function(){
	nucleo.c.camera.save();
 },
 
 /**
  * Retrieves the last saved camera state
  */
 retrieveCamera :  function(){
	nucleo.c.camera.retrieve();
 },
 
 /**
  * Sets the azimuth of the camera
  * @param {Number} a azimuth
  */
 setAzimuth :  function(a){
	nucleo.c.camera.setAzimuth(a);
 },
 
 /**
  * Sets the elevation of the camera
  * @param {Number} e elevation
  */
 setElevation :  function(e){
	nucleo.c.camera.setElevation(e);
 },
 
 
 getLookupTables :  function(){
    return nucleo.go.lookupTableManager.getAllLoaded();
 },
 
 //runScript :  function(file){
 //use JQuery here.
 //}
 

 //TODO: Wwork in progress... sorry for the mess.
 //buildProgramFromDOM: function(id,VERTEX_SHADER_DOM_ID,FRAGMENT_SHADER_DOM_ID){
 //       var vshader= document.getElementById(VERTEX_SHADER_DOM_ID);
        
     
 //},
  /**
  * Forces the renderer to use a specific program
  * @param{View} view the view to configure
  * @param{Object} program a JSON object that defines the progrma to execute
  * @param{Engine} engine (optional) the engine that the renderer should use to communicate with the program. T
  *                        
  */
 setProgram :  function(view,program){
    view.renderer.engine.pm.setProgram(program);
    
 },
 
 /**
  *Releases the program used by the view passed as parameter
  * @param{View} view
  */
 releaseProgram: function(view){
     view.renderer.engine.pm.releaseProgram();
 },
 /**
  * Returns the name of the current program
  * @param {View} view the view that we want to query. If this parameter is not passed,
  * the current view will be used (nucleo.c.view)
  */
 getProgram : function(view){
     if (view == undefined){
         view = nucleo.c.view
     }
     if (view == undefined){
         throw ('nucleo.api.getProgram: please indicate a view');
     }
     return view.renderer.engine.pm._current_program_ID;
 },
 /**
  * Sets the default value for an uniform
  */
  setUniformDefault: function(programID, uniformID, value){
      nucleo.c.view.renderer.engine.pm.setDefault(programID, uniformID, value)
  },
  
  setUniform: function(uniformID, value){
      nucleo.c.view.renderer.engine.pm.setUniform(uniformID, value)
  },
  
  /**
   * Gets the default value for an uniform 
   */
  getUniformDefault: function(programID, uniformID){
      nucleo.c.view.renderer.engine.pm.getDefault(programID, uniformID);
  },
  
  /**
   * Return the uniform names of the current program
   */
  getUniformList: function(){
      return nucleo.c.view.renderer.pm._uniformList[nucleo.c.view.renderer.pm._currentProgramID].slice(0);
  },
  
  getUniform : function(uniformID){
     return nucleo.c.view.renderer.pm.getUniform(uniformID);
  },
  
  /**
   * <p>Suscribes the to Nucleo events </p>
   * 
   * <p>The context parameter corresponds to the class that is going to listen for Nucleo events.</p>
   * 
   * <p>Such class needs to implement a method to handle the events that it has subscribed to. This method/function needs
   * to have the following signature:</p>
   * 
   * <p><code>handleEvent(event, src)</code></p>
   * 
   * <p> The event parameter corresponds to the event that has been fired by Nucleo. Notice that
   * your class will only be notified of those events that it has been subscribed to.
   * 
   * @param {String, Array} list the event or events that we are going to subscribe to
   * @param {Object} context the object that needs to implement the handleEvent method
   * 
   */
  subscribe: function(list, context){
  	notifierInstance.subscribe(list, context);
  }
  
 }; 
 