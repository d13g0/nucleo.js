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



