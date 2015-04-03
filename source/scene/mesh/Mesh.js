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
 * In a mesh, the geometry is structured in units called cells (triangles).
 * This class provides operations on individual cells.
 * 
 * @class Provides cell by cell operations on models
 * @constructor 
 * @param {Actor} prior the model for this mesh
 * @author Diego Cantor
 */
nucleo.Mesh = function Mesh(actor){
    
    if (actor == undefined){
        throw('Mesh: the model passed as parameter cannot be undefined');
    }
    
    this.name = actor.name +'-mesh';
    this.cells = [];
    this.color = [0.8,0.8,0.8]; 
    this.actor = actor;
    this.model = undefined;   //internal representation of the mesh
    this._createMesh(actor);
};



/**
 * Sets the mesh color
 */
nucleo.Mesh.prototype.setColor = function(color){
    this.color = color;
    this._setModelColor(this.color);
};

/**
 * Receives an array with vertex colors (one color per vertex) 
 * interpolates these colors and assign cell colors
 */
nucleo.Mesh.prototype.scalarsToCellColors = function(scalars, lut){
    
};

/**
 * Update the mesh colors based on the current cell colors
 */
nucleo.Mesh.prototype.updateColor = function(){
    var model = this.model;
    
    model.colors = [];
    model.pickingColors = [];
    //@TODO review if this can be replaced with a reverse while
    for(var i=0, count = this.cells.length; i<count; i +=1){
           
            for (var j = 0; j<3;j+=1){
                model.colors.push.apply(model.colors,this.cells[i].color);
                model.pickingColors.push.apply(model.pickingColors, this.cells[i]._pickingColor);
            }
    }
    
    this.actor.updateRenderable();
};



 
/**
 * Determines if this mesh contains the cell indicated by the parameter cellUID
 * @param {String} cellUID the unique identifier of a cell
 */
nucleo.Mesh.prototype.hasCell = function(cellUID){
  var i = this.cells.length;
  while(i--){
      if (this.cells[i].UID == cellUID){
          return true;
      }
  } 
  return false; 
};  

/**
 * Determines if this mesh contains the cell indicated by the parameter cellUID
 * @param {String} cellUID the unique identifier of a cell
 */
nucleo.Mesh.prototype.getCell = function(cellUID){
    var i = this.cells.length;
    while(i--){
      if (this.cells[i].UID == cellUID){
          return this.cells[i];
      }
  } 
  return null; 
};

    
     

nucleo.Mesh.prototype.removeCell = function(cellUID){
  var idx = -1;
  var i = this.cells.length;
  while(i--){
      if (this.cells[i].UID == cellUID){
          idx = i;
          break;
      }
  }
  if (idx !=-1) {
        this.cells.splice(idx,1);
        //TODO: is this efficient?
        this._createModel();
   }
   
};  

/**
 * This is just an experimental method. Determines what cells are facing the camera. 
 * May be this can be used for anything? I don't know! 
 * Maybe to see through a surface??
 *
 * @param {Object} camera
 * @param {Object} angle
 */
nucleo.Mesh.prototype.intersect = function(camera, angle){
    
    var ray = camera._forward;
    
    selection = [];

    /*for(var i=0;i<this.normals.length; i+=1){
        var dp = Math.acos(vec3.dot(ray, this.normals[i])) * nucleo.define.RAD_2_DEG;
        if (Math.abs(dp) <= angle){
            selection = selection.concat(this.indices[i]);
        }  
    }*/
    return selection;
};

/**
 * Identifies the cells existing in the 
 * @private
 */
nucleo.Mesh.prototype._createMesh = function(actor){
    var prior = actor.model;
    var ver = prior.vertices;
    var ind = prior.indices;
    
    var self = this;
    this.cells = [];
    
    function createMeshTask(){
        var start = new Date().getTime();
        
        var cellIndex = 0;
        
        //@TODO: assign colors if they exist. Should we give the option to change luts here?
        // probably not. Every time the actor changes its LUT the mesh should react and update its colors  

        var meshColor = [self.color[0], self.color[1], self.color[2]];
        
        //1. CREATE CELLS
        for(var i=0, L = ind.length; i<L; i+=3){ 
            idx  = ind[i];
            var triangle = [],x,y,z,idx;

            x = ver[idx*3];
            y = ver[idx*3 + 1];
            z = ver[idx*3 + 2];   
            triangle.push([x,y,z]);

            idx = ind[i+1];
            x = ver[idx*3];
            y = ver[idx*3 + 1];
            z = ver[idx*3 + 2];   
            triangle.push([x,y,z]);

            idx = ind[i+2];            
            x = ver[idx*3];
            y = ver[idx*3 + 1];
            z = ver[idx*3 + 2];   
            triangle.push([x,y,z]);

            
            self.cells.push(new Cell(self, cellIndex, triangle, meshColor));
            cellIndex += 1;
        }
        
        
        self._createModel();
        
        var elapsed = new Date().getTime() - start;
        console.info('Mesh ['+ self.name +'] generated in '+elapsed+ ' ms');
        
    };
    
    //because this operation is time consuming it is deferred here.
    //this causes that the mesh is not available for rendering until this operation finishes.
   setTimeout(function(){createMeshTask()},0);
};


/**
 * Based on the mesh information it creates an internal model of the mesh.
 * @private
 * 
 */
nucleo.Mesh.prototype._createModel = function(){
    
    var model = new Model(this.name+'-model');
    
    model.colors = [];
    model.pickingColors = [];
    
    for(var i=0, count = this.cells.length; i<count; i +=1){
            model.indices.push.apply(model.indices,[i*3, i*3+1, i*3+2]);
            model.vertices.push.apply(model.vertices,this.cells[i].getFlattenVertices());
            
            for (var j = 0; j<3;j+=1){
                model.colors.push.apply(model.colors,this.cells[i].color);
                model.pickingColors.push.apply(model.pickingColors, this.cells[i]._pickingColor);
            }
    }
    
    model.computeNormals();
    model.setType(define.Model.TYPE.MESH);
    
    this.model = model;
    this.actor.updateRenderable(Renderable.TASK.CREATE);
    
};

/**
 * @param {vec3} color the new color
 * @private
 */
nucleo.Mesh.prototype._setModelColor = function(color){
    
    if (this.model == undefined) return;
    
    var model = this.model;
    model.colors = [];
    
    for(var i=0, count = this.cells.length; i<count; i +=1){
            this.cells[i].color = [color[0], color[1], color[2]];
            for (var j = 0; j<3;j+=1){
                model.colors.push.apply(model.colors,this.cells[i].color);
            }
    }
    
    this.actor.updateRenderable(Renderable.TASK.CREATE);
};

/**
 * @private
 * @param {Object} cell the cell to be updated
 */
nucleo.Mesh.prototype._updateCellColor = function(index){
    
    var color = this.cells[index].color;
    
    for(var i = index*9, N = index*9+9; i<N; i+=3){
        this.model.colors[i] = color[0];
        this.model.colors[i+1] = color[1];
        this.model.colors[i+2] = color[2];
    }
    
    this.actor.updateRenderable(Renderable.TASK.UPDATE_COLORS);
    
};
