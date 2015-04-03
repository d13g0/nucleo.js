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
 * Creates a Landmark object and associates it with a Camera.
 * 
 * 
 * @class Stores the camera state so it can be retrieved later 
 * @constructor this is the constructor doc
 * @param {Camera} camera
 * @author Diego Cantor
 * @see Camera
  */

nucleo.Landmark = function Landmark(name, camera) {
	
	if(!( camera instanceof nucleo.Camera)) {
		alert('Landmark needs a Camera as argument');
		return null;
	}
	
	this.name             = name;
	
	var c = camera;
    
    this._matrix          = mat4.clone(c._matrix);
    this._right           = vec3.clone(c._right);
    this._up              = vec3.clone(c._up);
    this._forward         = vec3.clone(c._forward);   
    this._position        = vec3.clone(c._position);
    this._focalPoint      = vec3.clone(c._focalPoint);
    this._distanceVector  = vec3.clone(c._distanceVector);
    
    this._azimuth       = c._azimuth;
    this._elevation     = c._elevation;
    this._roll          = c._roll;
    this._relAzimuth    = c._relAzimuth;
    this._relElevation  = c._relElevation;
    this._relRoll       = c._relRoll;
    this._dollyingStep  = c._dollyngStep; //dollying step
    this._distance      = c._distance;

};


/**
 * Updates the camera with the state stored in Landmark.
 */
nucleo.Landmark.prototype.retrieve = function(camera) {
    
	var c = camera;
	

    
    c._matrix          = mat4.copy(c._matrix,this._matrix);
    c._right           = vec3.copy(c._right,this._right);
    c._up              = vec3.copy(c._up,this._up);
    c._forward         = vec3.copy(c._forward,this._forward);   
    c._position        = vec3.copy(c._position,this._position);
    c._focalPoint      = vec3.copy(c._focalPoint,this._focalPoint);
    c._distanceVector  = vec3.copy(c._distanceVector, this._distanceVector);
    
    c._azimuth       = this._azimuth;
    c._elevation     = this._elevation;
    c._roll          = this._roll;
    c._relAzimuth    = this._relAzimuth;
    c._relElevation  = this._relElevation;
    c._relRoll       = this._relRoll;
    c._dollyingStep  = this._dollyngStep; //dollying step
    c._distance      = this._distance;
    
    c.refresh();
};
