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
