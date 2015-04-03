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
 * @class Visible three-dimensional system of coordinates 
 * @constructor
 * @author Diego Cantor
 */
nucleo.Axis = function Axis() {

    var _model = new nucleo.Model();
    _model.load('axis', nucleo.define.Model.Axis)

    nucleo.Actor.call(this,_model);

    this.centre 	= [0,0,0];
	this.mode 		= nucleo.Actor.MODE.WIREFRAME;
	this.visible 	= false;
	this.toy     	= true;
};

nucleo.Axis.prototype 				= new nucleo.Actor();
nucleo.Axis.prototype.constructor 	= nucleo.Axis;
/**
* Sets the centre of the axis actor in the scene
*/
nucleo.Axis.prototype.setCentre = function (ctr){
    var x = ctr[0];
	var y = ctr[1];
	var z = ctr[2];
	
	this.centre[0] = x;
	this.centre[1] = y;
	this.centre[2] = z;
    
    var ver = this.model.vertices;
	
	ver[0] = x-1;
	ver[1] = y;
	ver[2] = z;
	
	ver[3] = x+1;
	ver[4] = y;
	ver[5] = z;
	
	ver[6] = x;
	ver[7] = y-2;
	ver[8] = z;
	
	ver[9] = x;
	ver[10] = y+2;
	ver[11] = z;
	
	ver[12] = x;
	ver[13] = y;
	ver[14] = z-1;
	
	ver[15] = x;
	ver[16] = y;
	ver[17] = z+1;
};