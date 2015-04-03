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


