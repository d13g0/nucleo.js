
/**
 * <p> 
 * Handles asynchronous communication among classes in Nucleo
 * using a publisher-subscriber mechanism
 * </p>
 * 
 * @class Hub for the publish-subscribe mechanism among Nucleo entities
 * @constructor
 */
nucleo.Notifier = function(){
	this.targetList = {};
	this.sourceList = {};
    
};

/**
 * <p>Used by any class to declare the events that the class will listen for.</p>
  
 * @param {Object} list
 * @param {Object} receiver
 */
nucleo.Notifier.prototype.subscribe = function(list,receiver){
	if (typeof(list)=='string'){
		this._addTarget(list,receiver);
	}
	else if (list instanceof Array){
		for (var i=0;i<list.length;i+=1){
			this._addTarget(list[i],receiver);
		}
	}
	else {
		throw 'Notifier.receives: this method receives a string or a list of strings'
	}
};

/**
 * <p>Used by any class to declare the events that the class will generate</p> 
 * @param {Object} list
 * @param {Object} sender
 */
nucleo.Notifier.prototype.publish = function(list,sender){
	if (typeof(list)== 'string'){
		this._addSource(list,sender);
	}
	else if (list instanceof Array){
		for (var i=0;i<list.length;i+=1){
			this._addSource(list[i],sender);
		}
	}
	else {
		throw 'Notifier.sends: this method receives a string or a list of strings';
	}
};


/**
 * Any class can use this method to tell the notifier that it will listen to 
 * a particular event.
 * 
 * @param {Object} event the event the class will listen to
 * @param {Object} target the object that will listen for the event
 * @private
 */
nucleo.Notifier.prototype._addTarget = function(event, target){
	nucleo.util.console('Notifier: adding target for event '+event);
	var targetList = this.targetList;
	if (targetList[event]== undefined){
		targetList[event] = [];
	}
	targetList[event].push(target);
};


/**
 * Any class can use this method to tell the notifier that it will emit a particular event
 * 
 * @param {Object} event the event to emit
 * @param {Object} src the object that will emit the event
 * @private 
 */
nucleo.Notifier.prototype._addSource = function(event,src){
	nucleo.util.console('Notifier: adding source for event '+event);
	var targetList = this.targetList;
	var sourceList = this.sourceList;
	
	if (sourceList[event]== undefined){
		sourceList[event] = [];
	}
	
	if (targetList[event]== undefined){
		targetList[event] = [];
	}
	
	sourceList[event].push(src);
};

/**
 * <p>Invoked by any class when it needs to emit an event that should be propagated to other
 * objects in the library</p>
 * 
 * <p>The notifier will first verify if the object emitting the event has been authorized to do so.
 * This is, the object should have registered using <code>publish</code>.
 * After that, the notifier will retrieve a list of the objects that have registered as listeners of 
 * the particular event and fires the event to them using JQuery.
 * </p>
 *  
 * @param {Object} event
 * @param {Object} src
 */
nucleo.Notifier.prototype.fire = function(event, src){
    
    if (this.targetList[event].length == 0) return; //quick and simple
    
    var self = this;
    
    function processEvent(){
    	var targetList = self.targetList;
        var idx = self.sourceList[event].indexOf(src);
        if (idx == -1){
        	throw 'The source '+src+' is not registered to trigger the event '+event+'. Did you use Notifier.publish?';
        }
    	
    	nucleo.util.console('Notifier: firing ' +event);
    	
    	var targets = self.targetList[event];
    	
    	for (var index=0;index<targets.length;index++){
    	    if (typeof(targets[index]) =='object'){
                targets[index].handleEvent(event,src);
            }
            else if (typeof(targets[index] == 'function')){
                targets[index](event,src);
            }
        }
	}
	setTimeout(function(){processEvent();},0);
};




/**
 * Gets a list of the events handled by this Notifier
 */
nucleo.Notifier.prototype.getEvents = function(){
	var list = [];
	for (var event in this.sourceList){
		list.push(event);
	}
	return list;
};


/**
 * Get a list of the objects that are currently registered to listen for a particular event 
 * @param {Object} event the event in question
 */
nucleo.Notifier.prototype.getTargetsFor = function(event){
	var targets = this.targetList[event];
	var list = [];
	for (var index=0;index<targets.length;index++){
		list.push(targets[index]);
	}
	return list; //@TODO: Reevaluate
};

/**
 *Global notifier object
 * @todo: review if it is possible/advisable to implement a singleton
 */
nucleo.Notifier.instance = new nucleo.Notifier();
 

    



