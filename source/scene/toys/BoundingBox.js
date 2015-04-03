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
 * @class Cuboid that encloses the visible extent of a Scene
 * @constructor
 * @extends Actor
 */
nucleo.BoundingBox = function BoundingBox() {

    var _model = new nucleo.Model();
    _model.load('bounding box', nucleo.define.Model.BoundingBox)

	nucleo.Actor.call(this, _model);

    this.bb 		= this.setBoundingBox([-1,-1,-1,1,1,1]);
    this.mode 		= nucleo.Actor.MODE.WIREFRAME;
    this.visible 	= false;
    this.toy    	= true;
};

//BoundingBox IS an Actor
nucleo.BoundingBox.prototype = new nucleo.Actor();
nucleo.BoundingBox.prototype.constructor = nucleo.BoundingBox;

/**
* Sets the bounding box
* @param {Array} b the bounding box. The format of this param should be [x1,y1,z1,x2,y2,z2]
* where x1,y1,z1 correspond to the minimum bounding coordinates and x2,y2,z2 correspond to the
* maximum bounding coordinates
*/
nucleo.BoundingBox.prototype.setBoundingBox = function(b){
	this.bb = [
		b[0], b[1], b[2],
		b[0], b[4], b[2],
		b[3], b[4], b[2],
		b[3], b[1], b[2],
		b[0], b[1], b[5],
		b[0], b[4], b[5],
		b[3], b[4], b[5],
		b[3], b[1], b[5] 
		];
        
    this.model.vertices = this.bb;
    this.reallocate();
};



