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
 * 
 * @param {Object} allocate
 * @param {Object} render
 * @param {Object} deallocate
 */
nucleo.ExternalEngine = function ExternalEngine(renderer, allocate, render, deallocate){
    nucleo.Engine.call(this);
    this.renderer = renderer;
    this.allocateCallback = allocate;
    this.renderCallback = render;
    this.deallocateCallback = deallocate;
};

nucleo.ExternalEngine.prototype = new nucleo.Engine();
nucleo.ExternalEngine.prototype.constructor = nucleo.ExternalEngine;


nucleo.ExternalEngine.prototype.allocate = function(scene){
    this.allocateCallback(this.renderer, scene);
};


nucleo.ExternalEngine.prototype.render = function(scene){
    this.renderCallback(this.renderer, scene);  
};

nucleo.ExternalEngine.prototype.deallocate = function(scene){
    this.deallocateCallback(this.renderer, scene);  
};
