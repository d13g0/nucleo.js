/**
 * Manages the lookup table files. The constructor will try to load all
 * the lookup tables defined in nucleo.def.luts at once.
 * 
 * @class Manages the lookup tables
 * @constructor
 */
nucleo.LookupTableManager = function LookupTableManager(){
	this._hashmap = {};
	this._location = "";
	nucleo.Notifier.instance.publish(nucleo.EVENTS.DEFAULT_LUT_LOADED,this);
};

/**
 * Relative path to the webpage where lookup tables can be located.
 * @param {String} loc
 */
nucleo.LookupTableManager.prototype.setLocation = function(loc){
	this._location = loc;
};

/**
 * Load a lookup table file
 * @param {String} name the filename of the lookup table to load
 */
nucleo.LookupTableManager.prototype.load = function(name){
    if (this.isLoaded(name)) return;

	var manager    = this;
	var uri        =  this._location+'/'+name+'.lut';
	var nocacheuri = uri +'?nocache=' + (new Date()).getTime();

		
    var successHandler = function(manager,name){
        return function(payload, textStatus){
            manager._handle(name,payload);
        };
   };
   
   var errorHandler = function(uri){
       return function(request, status, error){
           if(error.code = 1012){
               alert('The file '+uri+' could not be accessed. \n\n'+
               'Please make sure that the path is correct and that you have the right pemissions');
           }
           else{
               alert ('There was a problem loading the file '+uri+'. HTTP error code:'+request.status);
           }       
        };
    };
	
    var request  = $.ajax({
        url         : nocacheuri,
        type        :"GET",
        dataType    : "json",
        mimeType    : "text/plain",
        success     : successHandler(manager,name),
        error       : errorHandler(uri)
    }); 
};

/**
 * Once the lookup table file is retrieved, this method adds it to the lookup table manager
 */
nucleo.LookupTableManager.prototype._handle = function (ID, payload) {
	var lut = new nucleo.LookupTable();
	lut.load(ID,payload);
	this._hashmap[ID] = lut;
	
	if (lut.ID == nucleo.def.lut.main){
		nucleo.Notifier.instance.fire(nucleo.EVENTS.DEFAULT_LUT_LOADED, this);
	}
};
/**
 * Check if a lookup table has been loaded by this lookup table manager
 * @param {String} ID the id of the table to check
 */
nucleo.LookupTableManager.prototype.isLoaded = function(ID){
	return this._hashmap[ID] != undefined;
};

/**
 * Retrieves a lookup table
 * @param {String} ID id of the lookup table to retrieve
 */
nucleo.LookupTableManager.prototype.get = function(ID){
	return this._hashmap[ID];
};

/**
 * Returns a list with the names of all of the lookup tables that have been loaded.
 * @returns {Array} an array with the names of the lookup tables that have been loaded
 */
nucleo.LookupTableManager.prototype.getAllLoaded = function(){
    var tables = [];
    for(lut in this._hashmap){
        tables.push(this._hashmap[lut].ID);
    }
    return tables;
};

/**
 * Checks if all the lookup tables have been loaded
 */
nucleo.LookupTableManager.prototype.allLoaded = function(){
    var size = 0;
    //@TODO is there a better way to estimate size?
	for(var lut in this._hashmap){
        size++;
    }
	return (nucleo.define.LookupTable.list.length == size);
};

/**
 * Loads all the lookup tables defined in nucleo.def.luts
 */
nucleo.LookupTableManager.prototype.loadAll = function(){
	for(var i=0;i<nucleo.define.LookupTable.list.length;i++){
		this.load(nucleo.define.LookupTable.list[i]);
	}
};

/**
 * Creates the global lookup table manager and load all the lookup tables at once
 */
nucleo.LookupTableManager.instance = new nucleo.LookupTableManager();
