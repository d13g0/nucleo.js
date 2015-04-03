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
 * A cell is the minimum surface that can be selected on a mesh
 * @class Provides cell definitions
 * @constructor
 * @author Diego Cantor
 */
nucleo.Cell = function Cell(mesh, index, vertices, color){
    
    this.UID = nucleo.util.generateUID();
    this.mesh  = mesh;
    this.index = index;
    this.vertices = vertices;
    this.color = color==undefined?[0.8,0.8,0.8]:color; //@TODO: this is a hack
    this.normal = [0,0,0]; 
    this.position = [0,0,0];
    this._calculatePosition();
    this._calculateNormal();
    this._pickingColor  = nucleo.Picker.instance.getColorFor(this);
};

nucleo.Cell.prototype._calculatePosition = function(){
    this.position[0] = (this.vertices[0][0] + this.vertices[1][0] + this.vertices[2][0])/3;
    this.position[1] = (this.vertices[0][1] + this.vertices[1][1] + this.vertices[2][1])/3;
    this.position[2] = (this.vertices[0][2] + this.vertices[1][2] + this.vertices[2][2])/3;
};
    
    
/**
 * Calculates the cell normal
 * @private
 */
nucleo.Cell.prototype._calculateNormal = function(){
    var p1 = vec3.subtract(vec3.create(),this.vertices[1], this.vertices[0]);
    var p2 = vec3.subtract(vec3.create(),this.vertices[2], this.vertices[0]);
    this.normal =  vec3.normalize(this.normal, vec3.cross(this.normal,p1,p2));
};

/**
 * Returns an unidimensional array with the vertex information
 * [[a,b,c],[d,e,f],[g,h,i]] --> [a,b,c,d,e,f,g,h,i]
 */
nucleo.Cell.prototype.getFlattenVertices = function(){
    var v = this.vertices;
    return [v[0][0],v[0][1],v[0][2],v[1][0],v[1][1],v[1][2],v[2][0],v[2][1],v[2][2]];
};


/**
 * Updates the cell color. 
 * @param {Object} r
 * @param {Object} g
 * @param {Object} b
 */
nucleo.Cell.prototype.setColor = function(r,g,b){
    this.color = nucleo.util.createArr3(r,g,b);
    
    this.mesh._updateCellColor(this.index);
    
}
