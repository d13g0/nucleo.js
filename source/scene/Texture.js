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

