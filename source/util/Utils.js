//Check if JQuery is available
if (typeof(jQuery) == 'undefined'){
    nucleo.jquery = false;
    console.warn('JQuery is not available');
}
else{
    nucleo.jquery = true;
    console.info('JQuery is available');
}

nucleo.util = {

    /**
     * Pi divided by 2
     */
    piOver2: Math.PI /2,
    /**
     * Multiplicative constant to convert degrees to radians
     */
    deg2rad : Math.PI / 180,
    /**
     * Multiplicative constant to convert radians to degrees
     */
    rad2deg : 180 / Math.PI,

    isMac: function(){
        return navigator.platform.toUpperCase().indexOf("MAC") != -1;
    },
    /**
     *Returns a RGB color based on an integer (0..16 millions?)
     */
    int2rgb: function(i){
        return [((i >> 16) & 0xFF)/256,((i >> 8) & 0xFF)/256,(i & 0xFF)/256];
    },

    frac2rgb: function(r,g,b){
        var c = nucleo.util.createArr3(r,g,b);
        c[0] = Math.round(255 * c[0]);
        c[1] = Math.round(255 * c[1]);
        c[2] = Math.round(255 * c[2]);
        return c;
    },

    rgb2frac: function(r,g,b){ //@TODO: is this round  good?
        var c = nucleo.util.createArr3(r,g,b);
        c[0] = Math.round(c[0] / 255);
        c[1] = Math.round(c[1] / 255);
        c[2] = Math.round(c[2] / 255);
        return c;
    },

    rgb2hex: function(r,g,b){
        var c = nucleo.util.createArr3(r,g,b);
        return "#" + ((1 << 24) + (c[0] << 16) + (c[1]<< 8) + c[2]).toString(16).slice(1);
    },

    /**
     * This function is attributed to Tim Down
     * @link{http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb}
     */
    hex2rgb: function(hex){
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16)
        ] : null;
    },
    /**
     * Rescales the color from [0,255] to [0,1]
     * WebGL uses [0,1] range
     */
    rgb2decimal : function(rgb){
        if (rgb == null || rgb == undefined) return null;
        return [rgb[0]/255, rgb[1]/255,rgb[2]/255];
    },

    createColor : function(r,g,b){
        var color = [];
        if (r == undefined) {
            return null;
        }

        if (r instanceof Array){
            var c = r.slice(0);
            r = c[0];
            g = c[1];
            b = c[2];
        }

        if (typeof(r) == 'string'){
            color = this.rgb2decimal(this.hex2rgb(r));
        }
        else if (typeof(r) == 'number'){
            if (r <0 || g == undefined || b == undefined || g <0 || b <0){
                return null; //invalid color
            }
            else if (r>1 || g>1 || b>1){
                color = this.rgb2decimal([r,g,b]);
            }
            else{
                color = [r,g,b];
            }
        }

        return color;
    },
    /**
     * Formats Arrays, vec3 and vec4 for display
     *
     * @param {Array, vec3, vec4} arr the object to format
     * @param {Number} digits the number of decimal figures
     */
    format: function(arr, digits){
        var p = Math.pow(10,digits);
        if (typeof(arr) == 'object'){

            var result = '[';
            for (var i=0; i < arr.length-1; i+=1){
                result  += Math.round(arr[i] * p) / p + ', ';
            }
            result += Math.round(arr[arr.length-1] * p) / p  + ']'
        }
        else if (typeof(arr) == 'number'){
            result = '[' + Math.round(arr * p) / p  + ']';
        }
        return result;
    },

    /**
     * Creates a vector from a set of parameters
     * @param {Array, vec3, Number} x it can be an Array, a vec3 or a number
     * @param {Number} y if x is a number, this parameter corresponds to the y-component
     * @param {Number} z if x is a number, this parameter corresponds to the z-component
     */
    createVec3: function(x,y,z){
        var vvv = vec3.create();
        if (x instanceof Array || x instanceof Float32Array){
            vvv = vec3.clone(x)
        }
        else{
            vvv = vec3.fromValues(x,y,z);
        }
        return vvv;
    },
    /**
     * Creates an array from a set of parameters
     * @param {Array, vec3, Number} x it can be an Array, a vec3 or a number
     * @param {Number} y if x is a number, this parameter corresponds to the y-component
     * @param {Number} z if x is a number, this parameter corresponds to the z-component
     */
    createArr3: function(x,y,z){
        var vvv = []
        if (x instanceof Array || x instanceof Float32Array){
            vvv[0] = x[0];
            vvv[1] = x[1];
            vvv[2] = x[2];
        }
        else{
            vvv[0] = x;
            vvv[1] = y;
            vvv[2] = z;
        }
        return vvv;
    },

    generateUID: function(){
        function S4() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        }
        return (S4()+"-"+S4()+"-"+S4()+"-"+S4());
    },

    extend : function(){
        var ret = {};
        var len = arguments.length;
        for (var i=0; i<len; i++) {
            for (p in arguments[i]) {
                if (arguments[i].hasOwnProperty(p)) {
                    ret[p] = arguments[i][p];
                }
            }
        }
        return ret;
    },

    getPath : function(path){
        if (path ==undefined || path == null) {
            return "";
        }
        else if (path.length - 1 == path.lastIndexOf('/')){
            return path;
        }
        else if (path.lastIndexOf('.') > path.lastIndexOf('/')){
            return path.substring(0, path.lastIndexOf('/')+1)
        }
        else
            return path + '/';
    },
    /**
     * Returns an angle between 0 and 360 deg
     * @param{Number} angle the angle
     */
    getAngle : function(angle){
        if (angle > 360 || angle <-360) {
            return angle % 360;
        }
        else return angle;
    },
    /**
     *Converts degrees to radians
     * @param{Number} deg angle in degrees
     */
    deg2rad : function(deg){
        return deg * Math.PI / 180;
    },

    doTimer : function(length, resolution, oninstance, oncomplete){
        var steps = (length / 100) * (resolution / 10),
            speed = length / steps,
            count = 0,
            start = new Date().getTime();

        function instance(){
            if(count++ == steps)
            {
                oncomplete(steps, count);
            }
            else
            {
                oninstance(steps, count);
                var diff = (new Date().getTime() - start) - (count * speed);
                window.setTimeout(instance, (speed - diff));
            }
        };
        window.setTimeout(instance, speed);
    },


    console : function(txt,flag) {
        if (nucleo.DEBUG == true || flag){
            console.info(txt);
        }
    }
};

Array.prototype.max = function(){
    if (this.length > 65535){
        var max = this[0];
        for(var i=0,N = this.length; i <N; i+=1){
            if (this[i] > max){
                max = this[i];
            }
        }
        return max;
    }
    else{
        return Math.max.apply(null, this);
    }
};

Array.prototype.min = function(){
    if (this.length > 65535){
        var min = this[0];
        for(var i=0,N = this.length; i <N; i+=1){
            if (this[i] < min){
                min = this[i];
            }
        }
        return min;
    }
    else{
        return Math.min.apply(null, this);
    }
};




Array.prototype.hasObject = (
    !Array.indexOf ? function (o)
    {
        var l = this.length + 1;
        while (l -= 1)
        {
            if (this[l - 1] === o)
            {
                return true;
            }
        }
        return false;
    } : function (o)
    {
        return (this.indexOf(o) !== -1);
    }
);

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(/* function */ callback, /* DOMElement */ element){
            return window.setTimeout(callback, 1000 / 60);
        };
})();

window.cancelRequestAnimFrame = ( function() {
    return window.cancelAnimationFrame          ||
        window.webkitCancelRequestAnimationFrame    ||
        window.mozCancelRequestAnimationFrame       ||
        window.oCancelRequestAnimationFrame     ||
        window.msCancelRequestAnimationFrame        ||
        clearTimeout
})();




//Replacing jquery
nucleo.ajax = function(params){

    if (nucleo.jquery){
        $.ajax(params);
        return;
    }

    var request = new XMLHttpRequest();
    request.open(params.type, params.url,true);
    request.onload = function(){

    };


    request.send();


};