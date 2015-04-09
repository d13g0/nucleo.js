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
 along with Nucleo.js.  If not, see <http://www.gnu.org/licenses/>.
 ---------------------------------------------------------------------------*/
/*
 * Idea: to use a lightweight pattern. A pool of vxlModels that are reused.
 * Every frame the information is copied to the buffers, instead of saving as many gl vbos as models
 */
/**
 * Provides frame-to-frame animation
 *
 * @class Manages a frame-to-frame animation
 * @constructor
 * @param map  JSON object where each property name is one frame and each property value
 * is a list of actors
 * var map = {"frame1":["actor1","actor2"], "frame2":["actor3","actor4"]}
 *
 */
nucleo.FrameAnimation = function FrameAnimation(map) {
    this.scene = null;

    this.actorByFrameMap = [];
    this.activeFrame     = 1;
    this.mark            = 1;
    this._running        = false;
    this.frameCount      = 0;
    this.renderRate      = 500;

    this._startDate = undefined;
    this._time      = 0;

    this._setup(map);

};

/**
 * The actor will appear in the indicated frame of this animation
 * @param {Number} frame the frame
 * @param {String} actorName the name of the actor. It must exist.
 */
nucleo.FrameAnimation.prototype.addActorToFrame = function (frame, actorName) {
    if (typeof(this.actorByFrameMap[frame]) == 'undefined') {
        this.actorByFrameMap[frame] = new Array();
    }
    if (this.actorByFrameMap[frame].indexOf(actorName) == -1) {
        this.actorByFrameMap[frame].push(actorName);
    }
    if (frame > this.frameCount) this.frameCount = frame;
};

/**
 * Map is a JSON object where each property name is one frame and each property value
 * is a list of actors
 *
 * var map = {"frame1":["actor1","actor2"], "frame2":["actor3","actor4"]}
 * @private
 */
nucleo.FrameAnimation.prototype._setup = function (map) {
    this.activeFrame = 1;

    for (var f in map) {
        var actorList = map[f];
        var frame     = parseInt(f.substr(5, f.length));
        for (var i = 0, max = actorList.length; i < max; i += 1) {
            this.addActorToFrame(frame, actorList[i]);
        }
    }
    nucleo.util.console('FrameAnimation: Setup finished.');
};

/**
 * Starts the animation loop
 * @param {Number} rate the framerate for the animation (optional)
 */
nucleo.FrameAnimation.prototype.start = function (rate) {
    if (this.scene == null) throw 'FrameAnimation: the animation is not associated with any scene. Please use scene.setFrameAnimation method';

    this._startDate = new Date().getTime();
    this._time      = 0;
    this._running   = true;

    if (rate != undefined && rate >= 0) {
        this.renderRate = rate;
    }

    this._timeUp();
};


/**
 * Implements a self-adjusting timer
 * @see http://www.sitepoint.com/creating-accurate-timers-in-javascript/
 * @private
 */
nucleo.FrameAnimation.prototype._timeUp = function () {
    if (!this._running) return;

    this.nextFrame();

    if (this._time == this.renderRate * 100) {  //for long running animations
        this._time      = 0;
        this._startDate = new Date().getTime();
    }

    this._time += this.renderRate;

    var diff = (new Date().getTime() - this._startDate) - this._time;

    if (diff > this.renderRate) diff = 0; //ignore it

    setTimeout((function (self) {
        return function () {
            self._timeUp();
        };
    })(this), this.renderRate - diff);

};

/**
 * Stops the animation loop
 */
nucleo.FrameAnimation.prototype.stop = function () {
    this._running = false;
};

/**
 * Sets the frame rate
 * @param rate
 */
nucleo.FrameAnimation.prototype.setFrameRate = function (rate) {
    if (rate <= 0) return;
    this.stop();
    this.renderRate = rate;
    this.start();
};


/**
 * Selects the actors that will be visible in the current frame
 */
nucleo.FrameAnimation.prototype.update = function () {

    if (this.scene == null) throw 'FrameAnimation: the animation is not associated with any scene. Please use scene.setFrameAnimation method';


    //hide previous actors
    var previousActors = this.getPreviousFrames(1);
    var NUM            = previousActors.length;
    for (var i = 0; i < NUM; i++) {
        var actor = this.scene.getActorByName(previousActors[i]);
        if (actor != null) {
            actor.setVisible(false);
        }
    }

    //then we decide which ones are visible
    var currentActors = this.actorByFrameMap[this.activeFrame];
    NUM               = currentActors.length;
    for (i = 0; i < NUM; i++) {
        actor = this.scene.getActorByName(currentActors[i]);
        if (actor != null) {
            actor.setVisible(true);
        }
    }
};

/**
 * Verifies if the frame number passed as parameter is in the range of the current animation
 * @param frame_number {Number} a frame number
 * @returns true if the number passed as parameter is a valid frame number, false otherwise
 */
nucleo.FrameAnimation.prototype.isValidFrame = function (frame_number) {
    return (frame_number >= 1 && frame_number <= this.frameCount);
};

/**
 * Moves the animation to the next valid frame. If the activeFrame is the last frame in the animation, then
 * the animation is reset to the first frame.
 */
nucleo.FrameAnimation.prototype.nextFrame = function () {
    if (this.activeFrame < this.frameCount) {
        this.activeFrame++;
    }
    else {
        this.activeFrame = 1;
    }
};

/**
 * Gets the next n_frames valid frames. Works as a circular buffer.
 */
nucleo.FrameAnimation.prototype.getNextFrames = function (n_frames) {
    var list = [];
    var c    = this.activeFrame;
    if (n_frames > this.frameCount) n_frames = this.frameCount;
    for (var i = 1; i <= n_frames; i++) {
        var next = c + i;
        if (this.isValidFrame(next)) {
            list.push(next);
        }
        else {
            list.push(next - this.frameCount);
        }
    }
    nucleo.util.console('Animation: next frames: ' + list);
    return list;
};

/**
 * Gets the previous n frames. Works as a circular buffer.
 */
nucleo.FrameAnimation.prototype.getPreviousFrames = function (n_frames) {
    var list = [];
    var c    = this.activeFrame;
    if (n_frames > this.frameCount) n_frames = this.frameCount;
    for (var i = 1; i <= n_frames; i++) {
        var previous = c - i;
        if (this.isValidFrame(previous)) {
            list.push(previous);
        }
        else {
            list.push(this.frameCount + previous);
        }
    }
    nucleo.util.console('Animation: previous frames: ' + list);
    return list;
};

/**
 * Sets f as the active frame
 * @param frame_number the frame to set as active
 */
nucleo.FrameAnimation.prototype.setFrame = function (frame_number) {
    if (frame_number >= 1 && frame_number <= this.frameCount) {
        this.activeFrame = frame_number;
        this.render();
    }
};

