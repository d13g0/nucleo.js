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
 * A Camera object simplifies WebGL programming by providing a simple object interface to the lower level
 * matrix manipulations that are required to view a 3D scene.
 *
 * <p>A Camera is always associated to one <code>View</code> object. However, one View object can host multiple
 * cameras (through its <code>CameraManager</code>)</p>
 *
 * @class Determines which region of the scene will be visible to the user.
 * @constructor Creates a Camera.
 * @param {View} p_view
 * @param {Object} p_type the type of camera
 * @author Diego Cantor
 */
nucleo.Camera = function Camera(p_view, p_type) {

    this.UID = nucleo.util.generateUID(); //unique identification key
    this.view = p_view;

    this._matrix         = mat4.create();
    this._right          = vec3.fromValues(1, 0, 0);
    this._up             = vec3.fromValues(0, 1, 0);
    this._forward        = vec3.fromValues(0, 0, 1);
    this._position       = vec3.fromValues(0, 0, 1);
    this._focalPoint     = vec3.fromValues(0, 0, 0);
    this._distanceVector = vec3.fromValues(0, 0, 0);

    this._azimuth      = 0;
    this._elevation    = 0;
    this._roll         = 0;
    this._relAzimuth   = 0;
    this._relElevation = 0;
    this._relRoll      = 0;
    this._dollyingStep = 0;
    this._distance     = 1;
    this._rotate_world = false; //invert the horizontal coordinate system HCS

    this._fov  = nucleo.define.Camera.FRUSTUM.FOV;
    this._near = nucleo.define.Camera.FRUSTUM.NEAR;
    this._far  = nucleo.define.Camera.FRUSTUM.FAR;

    this._aspect      = undefined;
    this._perspective = mat4.create();
    this.updatePerspective();  //set the default perspective matrix

    this._following    = undefined;
    this._trackingMode = nucleo.define.Camera.TRACKING.DEFAULT;

    this.landmarks         = [];
    this._lmarkAnimationID = undefined; //useful to interrupt landmark animations


    if (p_type != undefined) {
        this.setType(p_type, undefined);
    } else {
        this.setType(nucleo.Camera.TYPE.EXPLORING, undefined);
    }


};

/*
 * Constants
 */
nucleo.Camera.TYPE     = nucleo.define.Camera.TYPE;
nucleo.Camera.TRACKING = nucleo.define.Camera.TRACKING;
nucleo.Camera.FRUSTUM  = nucleo.define.Camera.FRUSTUM;
nucleo.Camera.AXIS     = nucleo.define.Camera.AXIS;


/**
 * If flag is true, it reverses the azimuth and elevation angles.
 * Subsequent calls to rotate, setAzimuth, setElevation,
 * changeAzimuth or changeElevation will cause the inverted effect.
 * setRoll or changeRoll is not affected by this method.
 *
 * This inversion is useful when one wants to simulate that the world
 * is moving, instead of the camera.
 *
 * By default the camera angles are not reversed.
 * @param{Boolean} flag the boolean flag to reverse the angles.
 */
nucleo.Camera.prototype.setWorldRotation = function (flag) {
    this._rotate_world = flag;
    this._getAngles();
    return this;
};

/**
 * Establishes the type of camera
 * @param {Object} p_type the type of camera
 * @param {define.Camera.TRACKING} p_tracking_mode if the camera is of tracking type, the tracking mode can be set as
 * an optional parameter here.
 * @see Camera.TYPE,
 * @see Camera.TRACKING
 */
nucleo.Camera.prototype.setType = function (p_type, p_tracking_mode) {

    var t = nucleo.Camera.TYPE;

    if (p_type != t.ORBITING && p_type != t.TRACKING && p_type != t.EXPLORING) {
        console.warn('Camera.setType WARNING type [' + p_type + '] unknown. Setting camera to EXPLORING type.');
        this.type = t.EXPLORING;
        this.setWorldRotation(true);
    }
    else {

        this.type = p_type;
        if (this.type == t.EXPLORING) {
            this.setWorldRotation(true);
        }
        else {
            this.setWorldRotation(false);
        }
        this._getAngles();
    }

    if (this.type == nucleo.Camera.TYPE.TRACKING && p_tracking_mode != undefined) {
        this.setTrackingMode(p_tracking_mode);
    }

    return this;


};

/**
 * Sets the tracking type of this camera when it follows an actor
 * <p>To set the tracking type of the camera <code>myCamera</code> you should make sure that your camera is of tracking type with:
 *  <code>myCamera.setType(Camera.TYPE.TRACKING)</code>.
 *  For instance:
 * </p>
 *  <pre class='prettyprint'>
 *  var actor = view.scene.getActor('cone'); //from the current scene
 *  var camera = view.getCurrentCamera();
 *  camera.setType(nucleo.Camera.TYPE.TRACKING);
 *  camera.setTrackingMode(nucleo.Camera.TRACKING.ROTATIONAL);
 *  camera.follow(actor);
 * </pre>
 * <p> a shorter way would be:</p>
 * <pre class='prettyprint'>
 *  var actor = view.scene.getActor('cone'); //from the current scene
 *  var camera = view.getCurrentCamera();
 *  camera.setType(nucleo.Camera.TYPE.TRACKING);
 *  camera.follow(actor, nucleo.Camera.TRACKING.ROTATIONAL);
 * </pre>
 * @see nucleo.Camera#follow,
 * @see nucleo.Camera.TRACKING
 *
 *
 */
nucleo.Camera.prototype.setTrackingMode = function (mode) {
    if (this.type != nucleo.Camera.TYPE.TRACKING) {
        alert("Impossible to set a tracking mode if the camera is not of tracking type");
        throw("Impossible to set a tracking mode if the camera is not of tracking type");
    }
    if (mode == undefined) return;
    this._trackingMode = mode;
};

/**
 * Follows a given actor. If this operation is called on an ORBITING camera,
 * the camera mode will change to be a TRACKING camera.
 *
 * @param {Actor, String} actor actor to track (It can be the actor name or the actor instance)
 * @param {String} trackingType one of the possible values of <code>Camera.TRACKING</code>
 * @see {Camera#setType}
 */
nucleo.Camera.prototype.follow = function (actor, trackingType) {

    var instance;

    this.setType(nucleo.Camera.TYPE.TRACKING, trackingType);

    if (actor instanceof nucleo.Actor) {
        instance = actor;
    }
    else if (typeof(actor) == 'string') {
        instance = this.view.scene.getActorByName(actor);
    }

    if (instance == undefined) {
        console.error('Camera.follow ERROR: The actor ' + actor + ' does not exist');
    }
    else {
        this._following = instance;
        instance.addTrackingCamera(this);
    }

    return this;
};

/**
 * Stops following an actor
 */
nucleo.Camera.prototype.unfollow = function () {
    this._following.removeTrackingCamera(this);
    this._following = undefined;
    return this;
};

/**
 * Updates the camera according to the current tracking mode. This method is a callback used by the
 * Actor class to notify the camera of any actor transformations. This is applicable of course only when
 * this camera is following the actor passed as parameter here
 * @param {Actor} actor the actor being followed by this camera
 */
nucleo.Camera.prototype.updateWithActor = function (actor) {
    if (this._following != actor) return; //fail safe

    var Camera = nucleo.Camera;

    switch (this._trackingMode) {
        case Camera.TRACKING.DEFAULT:
            break;
        case Camera.TRACKING.ROTATIONAL:
        case Camera.TRACKING.CINEMATIC:
            this.setFocalPoint(actor._position);
            break;
        case Camera.TRACKING.TRANSLATIONAL:
            this.translate(actor._translation);
            this.setFocalPoint(actor._position);
            break;
    }
};
/**
 *<p>Sets the camera position in the scene
 * This method has three parameters x,y,z which represent the coordinates for
 * the camera's position.
 * </p>
 * <p>
 * This method takes into account the current focal point. The camera will look at the
 * focal point after this operation. If you want to move the camera position and the focal point
 * simultaneously, then use <code>Camera.translate</code>.
 * </p>
 *
 * @param {Number, Array} x the x-coordinate. x can also be an Array [a,b,c] in this case the y and z parameters are discarded.
 * @param {Number} y the y-coordinate
 * @param {Number} z the z-coordinate
 * @see{Camera#translate}
 */
nucleo.Camera.prototype.setPosition     = function (x, y, z) {
    this._setPosition(x, y, z);
    this.setFocalPoint(this._focalPoint);
    return this;
};

/**
 * Looks at a given point in space (sets the focal point of this camera).
 *
 * Note: If the camera is doing cinematic tracking, the up vector will be affected.
 * @param {Number, Array, vec3} x it can be the x coordinate, a 3-dimensional Array or a vec3 (glMatrix)
 * @param {Number} y if x is a number, then this parameter corresponds to the y-coordinate
 * @param {Number} z if x is a number, then this parameter corresponds to the z-coordinate
 */
nucleo.Camera.prototype.setFocalPoint = function (x, y, z) {

    var up = vec3.fromValues(0, 1, 0);
    //var up = vec3.create(this._up);
    this._focalPoint = nucleo.util.createVec3(x, y, z);

    if (this._trackingMode == nucleo.Camera.TRACKING.CINEMATIC) {
        var d  = vec3.subtract(vec3.create(), this._focalPoint, this._position);
        var x  = d[0], y = d[1], z = d[2], r = vec3.length(d);
        var el = Math.asin(y / r) * nucleo.define.RAD_2_DEG;
        var az = 90 + Math.atan2(z, x) * nucleo.define.RAD_2_DEG;
        var m  = mat4.create();
        mat4.rotateY(m, m, az * nucleo.define.DEG_2_RAD);
        mat4.rotateX(m, m, el * nucleo.define.DEG_2_RAD);
        up     = vec3.transformMat4(vec3.create(), [0, 1, 0], m);
    }

    mat4.invert(this._matrix, mat4.lookAt(mat4.create(), this._position, this._focalPoint, up));

    this._getAxes();
    this._getDistance();
    this._getAngles();
    return this;
};

/**
 * Position the camera to a given distance from the current focal point
 * @param {Number} d the distance
 * @TODO: REVIEW COMMENTED CODE
 */
nucleo.Camera.prototype.setDistance = function (d) {

    if (this._distance == d || d < 0) {
        return;
    }

    this._distance = d;

    // Distance should be greater than .0002
    if (this._distance < 0.0002) {
        this._distance = 0.0002;
        console.warn("Camera.setDistance WARN: Distance is set to minimum (0.0002)");
    }

    this._dollyingStep = this._distance / 100;

    var pos = vec3.create();

    d     = this._distance;
    var n = this._forward;
    var f = this._focalPoint;

    pos[0] = d * n[0] + f[0];
    pos[1] = d * n[1] + f[1];
    pos[2] = d * n[2] + f[2];

    this._setPosition(pos);
    return this;
};

/**
 * Changes the initial azimuth of the camera
 * @param {Number} el the azimuth increment in degrees
 */
nucleo.Camera.prototype.changeAzimuth = function (az) {
    this.setAzimuth(this._azimuth + az);
    return this;
};

/**
 * Changes the initial elevation of the camera
 * @param {Number} el the elevation increment in degrees
 */
nucleo.Camera.prototype.changeElevation = function (el) {
    this.setElevation(this._elevation + el);
    return this;
};


/**
 * Changes the initial roll of the camera
 * @param {Number} rl the roll increment in degrees
 */
nucleo.Camera.prototype.changeRoll = function (rl) {
    this.setRoll(this._roll + rl);
    return this;
};
/**
 * Sets the initial azimuth of the camera
 * @param {Number} el the azimuth in degrees
 */
nucleo.Camera.prototype.setAzimuth = function (az) {

    this._azimuth = this._getAngle(az);
    this._computeMatrix();

    this._getAxes();
    if (this.type == nucleo.Camera.TYPE.ORBITING || this.type == nucleo.Camera.TYPE.EXPLORING) {
        this._getPosition();
    }
    else if (this.type == nucleo.Camera.TYPE.TRACKING) {
        this._getFocalPoint();
    }
    return this;
};

nucleo.Camera.prototype.getAzimuth = function(){
    return this._azimuth;
}

/**
 * Sets the initial elevation of the camera
 * @param {Number} el the elevation in degrees
 */
nucleo.Camera.prototype.setElevation = function (el) {

    this._elevation = this._getAngle(el);
    this._computeMatrix();

    this._getAxes();
    if (this.type == nucleo.Camera.TYPE.ORBITING || this.type == nucleo.Camera.TYPE.EXPLORING) {
        this._getPosition();
    }
    else if (this.type == nucleo.Camera.TYPE.TRACKING) {
        this._getFocalPoint();
    }
    return this;
};

/**
 * Sets the initial roll of the camera
 * Rotates the camera around its view (forward) axis
 * @param {Number} angle the roll angle
 */
nucleo.Camera.prototype.setRoll = function (angle) {

    var Camera = nucleo.Camera;

    this._roll = this._getAngle(angle);
    this._computeMatrix();

    this._getAxes();
    if (this.type == Camera.TYPE.ORBITING || this.type == Camera.TYPE.EXPLORING) {
        this._getPosition();
    }
    else if (this.type == Camera.TYPE.TRACKING) {
        this._getFocalPoint();
    }
    return this;
};

/**
 * Changes the azimuth and elevation with respect to the current camera axes
 * @param {Number} azimuth the relative azimuth
 * @param {Number} elevation the relative elevation
 * @param {Number} roll the relative roll
 */
nucleo.Camera.prototype.rotate = function (azimuth, elevation, roll) {

    var Camera = nucleo.Camera;

    if (this.type == Camera.TYPE.EXPLORING) {

        azimuth   = this._getAngle(azimuth);
        elevation = this._getAngle(elevation);
        roll      = this._getAngle(roll);

        var rotX = quat.setAxisAngle(quat.create(), [1, 0, 0], -elevation * nucleo.define.DEG_2_RAD);
        var rotY = quat.setAxisAngle(quat.create(), [0, 1, 0], -azimuth * nucleo.define.DEG_2_RAD);

        if (this._rotate_world) {
            rotX = quat.setAxisAngle(quat.create(), [1, 0, 0], elevation * nucleo.define.DEG_2_RAD);
            rotY = quat.setAxisAngle(quat.create(), [0, 1, 0], azimuth * nucleo.define.DEG_2_RAD);
        }

        var rotZ = quat.setAxisAngle(quat.create(), [0, 0, 1], roll * nucleo.define.DEG_2_RAD);
        var rotQ = quat.multiply(quat.create(), rotY, rotX);

        rotQ          = quat.multiply(quat.create(), rotQ, rotZ);
        var rotMatrix = mat4.fromQuat(mat4.create(), rotQ);
        mat4.translate(this._matrix, this._matrix, [0, 0, -this._distance]);
        mat4.multiply(this._matrix, this._matrix, rotMatrix);
        mat4.translate(this._matrix, this._matrix, [0, 0, this._distance]);
    }
    else {
        if (Math.abs(this._elevation + elevation) > 90) return; //don't allow
        this._relElevation = this._getAngle(elevation);
        this._relAzimuth   = this._getAngle(azimuth);
        this._relRoll      = this._getAngle(roll);
        this._elevation += this._relElevation;
        this._azimuth += this._relAzimuth;
        this._roll += this._relRoll;

        this._computeMatrix();
    }


    this._getAxes();
    if (this.type == Camera.TYPE.ORBITING || this.type == Camera.TYPE.EXPLORING) {
        this._getPosition();
    }
    else if (this.type == Camera.TYPE.TRACKING) {
        this._getFocalPoint();
    }

    this._update();
    return this;
};


/**
 * Performs the dollying operation in the direction indicated by the camera normal axis.
 * The dollying mechanism offered by a camera makes sure that the camera moves fast
 * towards the object when the distance is large and slow when it is very close to the object.
 * For that effect, every time that the new position  (after dollying) is calculated, the field dstep is computed.
 *
 * @param {Number} value the dollying value
 *
 */
nucleo.Camera.prototype.dolly = function (value) {

    var Camera = nucleo.Camera;

    var n    = this._forward;
    var pos  = vec3.clone(this._position);
    var step = value * this._dollyingStep;
    pos[0] += step * n[0];
    pos[1] += step * n[1];
    pos[2] += step * n[2];

    this._setPosition(pos);
    if (this.type == Camera.TYPE.ORBITING || this.type == Camera.TYPE.EXPLORING) {
        this._getDistance();
    }
    else if (this.type == Camera.TYPE.TRACKING) {
        //move the focal point and keep the distance
        vec3.add(this._focalPoint, pos, this._distanceVector);
    }
    return this;
};

/**
 * Translates the camera side-to-side and up-and-down
 * @param {Number} dx the horizontal displacement
 * @param {Number} dy the vertical displacement
 */
nucleo.Camera.prototype.pan = function (tx, ty) {

    var coords = nucleo.util.createVec3(tx, ty, 0);
    var pos    = vec3.clone(this._position);

    vec3.add(pos, pos, vec3.scale(vec3.create(), this._right, coords[0]));
    vec3.add(pos, pos, vec3.scale(vec3.create(), this._up, coords[1]));

    this._setPosition(pos);

    return this;
};

/**
 * Translates the camera by a given vector
 *
 * @param {Number, Array, vec3} x it can be the x coordinate, a 3-dimensional Array or a vec3 (glMatrix)
 * @param {Number} y if x is a number, then this parameter corresponds to the y-coordinate
 * @param {Number} z if x is a number, then this parameter corresponds to the z-coordinate
 */
nucleo.Camera.prototype.translate = function (x, y, z) {

    var coords = nucleo.util.createVec3(x, y, z);
    var pos    = vec3.clone(this._position);

    vec3.add(pos, pos, coords);
    this._setPosition(pos);
    return this;
};


/**
 * This method updates the 3D scene
 * This is the call stack:
 * Camera.refresh -> View.refresh -> Renderer.render
 */
nucleo.Camera.prototype.refresh = function () {
    this.view.refresh();
    return this;
};


/**
 *  Looks at a given actor without displacing the camera
 *  @param {String, Actor} actor The name of the actor or the actor object this camera will look at.
 */
nucleo.Camera.prototype.lookAt = function (actor) {

    if (actor instanceof nucleo.Actor) {
        this.setFocalPoint(actor._position);
    }

    else if (typeof(actor) == 'string') {
        var actor = this.view.scene.getActorByName(actor);
        if (actor == undefined) {
            throw 'Camera.lookAt ERROR: The actor ' + actorName + ' does not exist'
        }
        else {
            this.setFocalPoint(actor._position);
        }
    }
    return this;
};


/**
 *  Performs a close up of an actor.
 *  @param {String, Actor}  actor The name of the actor or the actor object this camera will look at.
 *  @see <a href="http://en.wikipedia.org/wiki/Close-up">Close-up (Wikipedia)</a>
 */
nucleo.Camera.prototype.closeUp = function (actor) {
    if (actor instanceof nucleo.Actor) {
        this._shot(actor._bb);
    }
    else if (typeof(actor) == 'string') {
        var actor = this.view.scene.getActorByName(actor);
        if (actor == undefined) {
            throw 'Camera.lookAt ERROR: The actor ' + actorName + ' does not exist'
        }
        else {
            this._shot(actor._bb);
        }
    }
    return this;
};

/**
 * The camera moves to a position where all the actors in the scene are viewed. The actors
 * are seen in full within their surrounding environment.
 *
 * A long shot uses the global bounding box of the view's scene
 * @see <a href="http://en.wikipedia.org/wiki/Long_shot">Long Shot (Wikipedia)</a>
 */
nucleo.Camera.prototype.longShot = function () {
    this.view.scene.computeBoundingBox(); //perfect example of BY DEMAND UPDATING OF BB
    this._shot(this.view.scene.bb);
    return this;
};

/**
 * Changes the field of view of the  camera
 *
 * @param{Number} fov the field of view in degrees [0-360]
 * @see <a href="http://en.wikipedia.org/wiki/Angle_of_view">Angle of view</a>
 */
nucleo.Camera.prototype.setFieldOfView = function (fov) {
    this._fov = fov;
    return this;
};

/**
 * Creates a new landmark without moving the camera. It basically defines
 * 'future' landmarks.
 * @param {String} name the landmark given name
 * @param {Array, vec3} position the position of this landmark
 * @param {Array, vec3} focalPoint the desired focalPoint for the camera at the landmark
 * @see Landmark
 */
nucleo.Camera.prototype.createLandmark = function (name, position, focalPoint, roll) {

    var c = new Camera(this.view, this.type);
    c.setPosition(position);
    c.setFocalPoint(focalPoint);
    if (roll != undefined) {
        c.setRoll(roll);
    }
    var l = new Landmark(name, c);
    this.landmarks.push(l);
    return this;
};

/**
 * Saves the current camera state in a landmark
 * @param {String} name the landmark name
 * @see Landmark
 */
nucleo.Camera.prototype.setLandmark = function (name) {
    var l = new Landmark(name, this);
    this.landmarks.push(l);
    return this;
};


/**
 * Retrieves the landmark by name from the known landmarks
 * @param {String} name the landmark name
 * @param {Number} length (optional) the duration of the animation
 * @param {Number} fps (optional) the number of frames per second (estmate)
 * two landmarks.
 * @see Landmark
 */
nucleo.Camera.prototype.gotoLandmark        = function (name, length, fps) {

    var lmark = undefined;
    var i     = this.landmarks.length;
    while (i--) {
        if (this.landmarks[i].name == name) {
            lmark = this.landmarks[i];
            break;
        }
    }

    if (lmark == undefined) {
        console.warn('Camera.goTo: landmark with name: ' + name + ', was not found');
        return;
    }

    if (length == undefined || length == 0) {
        lmark.retrieve(this);
        return;
    }

    if (this._lmarkAnimationID != undefined) {
        window.clearTimeout(this._lmarkAnimationID);
    }

    var self      = this;
    var dest_pos  = lmark._position;
    var dest_fp   = lmark._focalPoint;
    var dest_roll = lmark._roll;

    if (length == undefined) {
        length = 1000;
    }
    if (fps == undefined) {
        fps == 20;
    }

    var interactor = this.view.interactor;
    interactor.disconnectFromView(); //do not process events during animation

    function animate(length, resolution) {
        var steps = (length / 100) * (resolution / 10),
            speed = length / steps,
            count = 0,
            start = new Date().getTime();

        function iteration() {

            var inter_fp   = vec3.create();
            var inter_pos  = vec3.create();
            var inter_roll = 0;
            if (count++ != steps) {
                percent  = count / steps;
                percent2 = (1 - Math.cos(percent * Math.PI)) / 2; //cosine interpolation is smoother
                inter_fp   = vec3.lerp(inter_fp, self._focalPoint, dest_fp, percent2);
                inter_pos  = vec3.lerp(inter_pos, self._position, dest_pos, percent2);
                inter_roll = self._roll * (1 - percent2) + dest_roll * (percent2);

                self.setFocalPoint(inter_fp);
                self.setPosition(inter_pos);
                self.setRoll(inter_roll);
                self.refresh();

                var dist = vec3.dist(inter_fp, dest_fp) + vec3.dist(inter_pos, dest_pos);
                if (dist > 0.01) {
                    var diff               = (new Date().getTime() - start) - (count * speed);
                    self._lmarkAnimationID = window.setTimeout(iteration, (speed - diff));
                }
                else {
                    self.setFocalPoint(dest_fp);
                    self.setPosition(dest_pos);
                    self.setRoll(dest_roll);
                    self.refresh();
                    interactor.connectView(this.view); //reconnect interactor
                }
                return;
            }
        };

        //first time invocation
        self._lmarkAnimationID = window.setTimeout(iteration, speed);
    }

    animate(length, fps);
    return this;

};
/**
 * The animation map has one entry per gotoLandmark step
 * steps = [ ['landmark_1',duration_1, fps_1],
 *           ['landmark_2',duration_2, fps_2],
 *           ...
 *           ['landmark_N,duration_N,fps_N]];
 * }
 */
nucleo.Camera.prototype.doLandmarkAnimation = function (steps) {

    var _steps = steps.slice(0); //copy so we can destroy it
    var camera = this;

    function processStep() {
        if (_steps.length == 0) {
            return;
        }

        if (camera._stop_lmark_animation) {
            camera._stop_lmark_animation = false;
            nucleo.util.console('Landmark Animation Stopped', true);
            return;
        }

        step = _steps.splice(0, 1)[0];

        lmark    = step[0];
        duration = step[1];
        fps      = step[2];
        camera.gotoLandmark(lmark, duration, fps);
        window.setTimeout(processStep, duration);
    }

    processStep();
    return this;
};


/**
 * If there is a landmark based animation in progress it will stop it.
 */
nucleo.Camera.prototype.stopLandmarkAnimation = function () {
    this._stop_lmark_animation = true;
};

/**
 * Returns a list of known landmarks
 */
nucleo.Camera.prototype.getLandmarks = function () {
    var lmarks = [];
    var i      = this.landmarks.length;
    while (i--) {
        lmarks.push(this.landmarks[i].name);
    }
    return lmarks;
};

/**
 * This method sets the camera to a distance such that the area covered by the bounding box (parameter)
 * is viewed.
 * @param {BoundingBox} bb the bounding box
 */
nucleo.Camera.prototype._shot = function (bb) {

    this.setElevation(0);
    this.setAzimuth(0);
    this.setRoll(0);

    var maxDim = Math.max(bb[3] - bb[0], bb[4] - bb[1]);

    cc = [0, 0, 0];

    cc[0] = (bb[3] + bb[0]) / 2;
    cc[1] = (bb[4] + bb[1]) / 2;
    cc[2] = (bb[5] + bb[2]) / 2;

    cc[0] = Math.round(cc[0] * 1000) / 1000;
    cc[1] = Math.round(cc[1] * 1000) / 1000;
    cc[2] = Math.round(cc[2] * 1000) / 1000;

    if (maxDim != 0) {
        var d = 1.5 * maxDim / (Math.tan(this._fov * Math.PI / 180));
        this.setPosition([cc[0], cc[1], cc[2] + d]);
    }

    this.setFocalPoint(cc);
    this.refresh();
};


/**
 * <p>Forces the aspect ratio of the camera to a certain value.</p>
 * <p>To go back to the default aspect ratio that relies on the dimensions
 * of the view associated to this camera use:
 *
 * <code>setAspectRatio(undefined)</code>
 *
 * </p>
 * @param {Number} p_aspect the new aspect ratio
 */
nucleo.Camera.prototype.setAspectRatio = function (p_aspect) {
    this._aspect = p_aspect;
}

/**
 * Sets the perspective of the camera. Defines the viewing frustum and its shape
 * @param {Number} p_near the distance from the camera to the near plane
 * @param {Number} p_far the distance from the camera to the far plane
 * @param {Number} p_angle the vertical field of view in degrees
 * @param {Number} p_aspect the desired aspect ratio (optional). If not defined the camera
 * automatically selects the current width/height radio of the respective view.
 */
nucleo.Camera.prototype.setPerspective = function (p_near, p_far, p_angle, p_aspect) {
    var view = this.view;

    this._fov    = p_angle;
    this._near   = p_near;
    this._far    = p_far;
    this._aspect = p_aspect;
    var rads     = nucleo.util.deg2rad(p_angle);

    if (this._aspect == undefined) {
        mat4.perspective(this._perspective, rads, view.width / view.height, this._near, this._far);
    }
    else {
        mat4.perspective(this._perspective, rads, this._aspect, this._near, this._far);
    }
};

/**
 * Updates the current perspective matrix when one of the internal perspective variables
 * [near,far,fov] has changed, or when the view has changed its dimensions [width, height]
 *
 */
nucleo.Camera.prototype.updatePerspective = function () {
    var view = this.view;
    var rads = nucleo.util.deg2rad(this._fov);
    if (this._aspect == undefined) {
        mat4.perspective(this._perspective, rads, view.width / view.height, this._near, this._far);
    }
    else {
        mat4.perspective(this._perspective, rads, this._aspect, this._near, this._far);
    }
};

/**
 * Prints a summary of the camera variables on the browser's console
 */
nucleo.Camera.prototype.status = function () {
    console.info('------------- Camera Status -------------');
    console.info('       type: ' + this.type);
    console.info('      right: ' + nucleo.util.format(this._right, 2));
    console.info('         up: ' + nucleo.util.format(this._up, 2));
    console.info('    forward: ' + nucleo.util.format(this._forward, 2));
    console.info('   position: ' + nucleo.util.format(this._position, 2));
    console.info('focal point: ' + nucleo.util.format(this._focalPoint, 2));

    console.info('    azimuth: ' + nucleo.util.format(this._azimuth, 2));
    console.info('  elevation: ' + nucleo.util.format(this._elevation, 2));
    console.info('       roll: ' + nucleo.util.format(this._roll, 2));
    console.info('   distance: ' + nucleo.util.format(this._distance, 2));
    console.info('   d vector: ' + nucleo.util.format(this._distanceVector, 2));
};


/**
 * Inverts the camera mattrix to obtain the correspondent Model-View Transform
 * @returns {mat4} m the Model-View Transform
 */
nucleo.Camera.prototype.getViewTransform = function () {
    return mat4.invert(mat4.create(), this._matrix);
};

/**
 * Sets the camera matrix
 * @param {mat4} matrix the new camera matrix
 */
nucleo.Camera.prototype.setMatrix = function (matrix) {
    this._matrix = matrix;
    this._update();
};

/**
 * Sets the  camera matrix
 * @private
 */
nucleo.Camera.prototype._computeMatrix = function () {

    var rotX,
        rotY,
        rotZ = quat.setAxisAngle(quat.create(), [0, 0, 1], this._roll * nucleo.define.DEG_2_RAD);

    mat4.identity(this._matrix);
    if (this.type == nucleo.Camera.TYPE.TRACKING) {
        rotX = quat.setAxisAngle(quat.create(), [1, 0, 0], this._elevation * nucleo.define.DEG_2_RAD);
        rotY = quat.setAxisAngle(quat.create(), [0, 1, 0], this._azimuth * nucleo.define.DEG_2_RAD);
    }
    else {
        //only consider HCS for EXPLORING and ORBITING cameras
        if (this._rotate_world) {
            rotX = quat.setAxisAngle(quat.create(), [1, 0, 0], this._elevation * nucleo.define.DEG_2_RAD);
            rotY = quat.setAxisAngle(quat.create(), [0, 1, 0], this._azimuth * nucleo.define.DEG_2_RAD);
        }
        else {
            rotX = quat.setAxisAngle(quat.create(), [1, 0, 0], -this._elevation * nucleo.define.DEG_2_RAD);
            rotY = quat.setAxisAngle(quat.create(), [0, 1, 0], -this._azimuth * nucleo.define.DEG_2_RAD);
        }
    }


    var rotQ      = quat.multiply(quat.create(), rotY, rotX);
    rotQ          = quat.multiply(quat.create(), rotQ, rotZ);
    var rotMatrix = mat4.fromQuat(mat4.create(), rotQ);

    if (this.type == nucleo.Camera.TYPE.ORBITING || this.type == nucleo.Camera.TYPE.EXPLORING) {
        mat4.translate(this._matrix, this._matrix, this._focalPoint);
        mat4.multiply(this._matrix, this._matrix, rotMatrix);
        mat4.translate(this._matrix, this._matrix, [0, 0, this._distance]);
    }
    else if (this.type == nucleo.Camera.TYPE.TRACKING) {
        mat4.translate(this._matrix, this._matrix, this._position);
        mat4.multiply(this._matrix, this._matrix, rotMatrix);
    }
};


/**
 * Sets the camera position in the camera matrix
 * @private
 */
nucleo.Camera.prototype._setPosition = function (x, y, z) {
    this._position = nucleo.util.createVec3(x, y, z);
    var m          = this._matrix;
    m[12]          = this._position[0];
    m[13]          = this._position[1];
    m[14]          = this._position[2];
    m[15]          = 1;
};

/**
 * Recalculates axes based on the current matrix
 * @private
 */
nucleo.Camera.prototype._getAxes = function () {
    var m = this._matrix;
    vec3.copy(this._right, vec4.transformMat4(vec4.create(), [1, 0, 0, 0], m));
    vec3.copy(this._up, vec4.transformMat4(vec4.create(), [0, 1, 0, 0], m));
    vec3.copy(this._forward, vec4.transformMat4(vec4.create(), [0, 0, 1, 0], m));
    vec3.normalize(this._right, this._right);
    vec3.normalize(this._up, this._up);
    vec3.normalize(this._forward, this._forward);
};

/**
 * Recalculates the position based on the current matrix
 * Called only when camera is of ORBITING type
 * @private
 */
nucleo.Camera.prototype._getPosition = function () {
    var m = this._matrix;
    vec3.copy(this._position, vec4.transformMat4(vec4.create(), [0, 0, 0, 1], m));
    this._getDistance();
};

/**
 * Called only when camera is of TRACKING type
 * @private
 */
nucleo.Camera.prototype._getFocalPoint = function () {

    vec3.transformMat3(this._distanceVector, [0, 0, -this._distance], mat3.fromMat4(mat3.create(), this._matrix));
    vec3.add(this._focalPoint, this._position, this._distanceVector);
    this._getDistance();
};

/**
 * Recalculates the distance variables based on the current state
 * @private
 */
nucleo.Camera.prototype._getDistance = function () {
    this._distanceVector = vec3.subtract(vec3.create(), this._focalPoint, this._position);
    this._distance       = vec3.length(this._distanceVector);
    this._dollyingStep   = this._distance / 100;
};

/**
 * Recalculates euler angles based on the current state
 * @private
 */
nucleo.Camera.prototype._getAngles = function () {


    //Recalculates angles  
    var x = this._distanceVector[0], y = this._distanceVector[1], z = this._distanceVector[2];
    var r = vec3.length(this._distanceVector);

    //FAST FAIL: If there is no distance we cannot compute angles
    if (r == 0) {
        this._elevation = 0;
        this._azimuth   = 0;
        return;
    }

    if (this.type == nucleo.Camera.TYPE.TRACKING) {
        this._elevation = Math.asin(y / r) * nucleo.define.RAD_2_DEG;
        this._azimuth   = Math.atan2(-x, -z) * nucleo.define.RAD_2_DEG;
    }
    else {
        if (this._rotate_world) {
            this._elevation = Math.asin(y / r) * nucleo.define.RAD_2_DEG;
            this._azimuth   = Math.atan2(-x, -z) * nucleo.define.RAD_2_DEG;
        }
        else {
            this._elevation = -1 * Math.asin(y / r) * nucleo.define.RAD_2_DEG;
            this._azimuth   = -1 * Math.atan2(-x, -z) * nucleo.define.RAD_2_DEG;

        }
    }

};


/**
 * Recalculates the camera state from the camera matrix
 * @private
 */
nucleo.Camera.prototype._update = function () {
    this._getAxes();
    this._getPosition();
    this._getDistance();
    this._getAngles();
};

/**
 * @private
 */
nucleo.Camera.prototype._calculateAngles = function () {
    var rotM = mat4.toMat3(this._matrix);
    var Q    = mat3.toQuat4(rotM);
    var x    = Q[0], y = Q[1], z = Q[2], w = Q[3];

    var roll  = Math.atan2(2 * (w * x + y * z), 1 - 2 * (x * x + y * y)) * nucleo.define.RAD_2_DEG;
    var pitch = Math.asin(2 * (w * y - z * y)) * nucleo.define.RAD_2_DEG;
    var yaw   = Math.atan2(2 * (w * z + x * y), 1 - 2 * (y * y + z * z)) * nucleo.define.RAD_2_DEG;

    console.info(' roll :' + nucleo.util.format(roll, 2));
    console.info('pitch :' + nucleo.util.format(pitch, 2));
    console.info('  yaw :' + nucleo.util.format(yaw, 2));
};

/**
 * Returns an angle between 0 and 360 degrees
 * @private
 */
nucleo.Camera.prototype._getAngle = function (angle) {

    if (angle == undefined) {
        return 0;
    }
    else if (angle > 360 || angle < -360) {
        return angle % 360;
    }
    else return angle;
};
 
