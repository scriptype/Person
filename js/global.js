view();

var Person = function(id,age,sex,location) {
  
  if (arguments.length !== 0) {
  
    // Text to keep as initial if no initial arguments avaible
    var defaultText = "N/A"
    
    this.uniqueId = function(){
      var unique = ""
      for (var i=0;i<64;i++) {
        var rand  = Math.round(Math.random()*64)
        unique  += rand
      }
      return unique
     }
    
    // Keep different info types to store
    this.infoHistory =
    {
      initial : {
        id: id || defaultText,
        age: age || defaultText,
        sex: sex || defaultText,
        location: location || defaultText,
        generation: new Date(),
        uniqueId: this.uniqueId()
      },
      added : {},
      deleted: {},
      lastUpdate : ""
    };
    
    // Create general info object
    this.info = this.compile({});
    
    // Store in the localStorage.
    this.store();
  
  }
  
  else {
    
    console.log("Add some info and try again.");
    return {
      invalidInstance: (function(x){x=null})(this)
    }
    
  }
  
};

// Gather all types of data to a single property
Person.prototype.compile = function(obj){

  // Deep copy
  obj = $.extend(
    true,
    obj,
    this.infoHistory.initial,
    this.infoHistory.added,
    this.infoHistory.lastUpdate
  )
  
  console.log("compiled");
  
  // Return obj itself
  return obj
};

// Add new info for person
Person.prototype.addInfo = function(key,value){

  // Add new info to added
  if( this.info[key] ) {
    console.log("edited");
  } else {
    console.log("added")
  }
  
  this.infoHistory.added[key] = value;
  
  // Update
  this.update();
  
};

// Delete properties only from non-initial info
Person.prototype.deleteInfo = function(key){
  
  // Add deleted property to infoHistory.deleted
  this.infoHistory.deleted[key] = this.infoHistory.added[key];
  
  // Delete property from added
  delete this.infoHistory.added[key];
  
  console.log("deleted");
  
  // Update
  this.update();
  
};

Person.prototype.editInfo = function(key,value){

  this.addInfo(key,value);

}
  
// Recompile this.info and refresh lastUpdate
Person.prototype.update = function(){

  // Set lastUpdate as current time
  this.infoHistory.lastUpdate = new Date();
  
  // Recompile from scratch. Easy exclusion of deleted properties.
  this.info = this.compile({});
  
  console.log("updated");
  
  this.store();
};

Person.prototype.store = function(){
  
  var UID = UID ? UID : this.infoHistory.initial.uniqueId
  
  localStorage[UID] = JSON.stringify(this);
  
  console.log("stored");
  
  view();
  
}