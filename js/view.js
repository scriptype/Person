var view = function(){
  
  var
    element     = $("div#people"),
    
    htmlize     = function(objectInfo, method, template){
    
      if (method==="html") {
  
        // To avoid to loop through all info.
        var initialInfo = ["id","age","sex","location"];
        
        for (var key in initialInfo) {
        
          // Get values of keys
          var prop = initialInfo[key];
          
          // If any of the properties in DOM is different from originial object;
          if ( objectInfo.info[prop] !== $("div#"+objectInfo.info.uniqueId).find("."+prop).text() ) {
          
            // Sync them.
            $("div#"+objectInfo.info.uniqueId).find("."+prop).text(objectInfo.info[prop]);
            
            console.log("updated DOM");
          
          }
          
        }
        
      }
      
      // Which means, there is currently no such person object in DOM.
      if (method==="append") {
      
        // Prepare template to render.
        $(template).find("h1.id").text(objectInfo.info.id);
        $(template).find("span.age").text(objectInfo.info.age);
        $(template).find("span.sex").text(objectInfo.info.sex);
        $(template).find("span.location").text(objectInfo.info.location);
        
        // Append a div with object's uniqueId into target element.
        element.append("<div class='person' id='"+objectInfo.info.uniqueId+"'></div>");
        
        // Insert new instance's properties to its new created empty layout.
        $("div#"+objectInfo.info.uniqueId).append(template);
        
        console.log("appended");
        
      }
      
      // Get length of properties in added.  
      var
        addedInfo       = objectInfo.infoHistory.added,
        addedInfoLength = 0;
      
      for (var i in addedInfo) {
      
        addedInfoLength++
        if (addedInfoLength > 0) break;
        
      }
      
      // If any added value exists re-render and overwrite it to HTML.
      if (addedInfoLength > 0) {
      
        var timeline_template = "";
      
        for (var key in addedInfo) {
          
          // Append log to timeline template for each added data.
          timeline_template += "<li>"
                               +objectInfo.info.id+
                               " has set "+key+" as "+
                               "<span>"+addedInfo[key]+"</span>"+
                               "</li>"
        
          // Find object's respective timeline and push template in it.
          $("div#"+objectInfo.info.uniqueId)
          .find("ul.timeline")
          .html(timeline_template);
        
        }
        
      }
  
    };

  // Loop through each personObject in localStorage.
  for (var personObject in localStorage) {
    
    var
      person      = JSON.parse( localStorage[personObject] ),
      template    = $.parseHTML( $("script#person_template").text() );
    
    // Look for personObjects that have contents in HTML.
    if ( $("div#"+person.info.uniqueId).text() !== "" ) {
    
      // Send person to htmlize to look for differences between DOM and person.info.
      htmlize(person, "html");
      
    }
    
    // If there are personObjects which are not passed to HTML yet.
    else {
    
      // Add new instance to HTML with .append()
      htmlize(person, "append", template);
      
    }
    
  }


// Old shit.

//var view = function(modelObject){

  //var
  //  UID         = modelObject,
  //  model       = JSON.parse( localStorage[UID] ),
  //  template    = $.parseHTML( $("script#person_template").text() ),
  //  element     = $("div#people"),
  //  id          = model.info.id,
  //  age         = model.info.age,
  //  sex         = model.info.sex,
  //  loc         = model.info.location,
  //  initialInfo = model.infoHistory.initial,
  //  addedInfo   = model.infoHistory.added;
    
  //$(template).find("h1").text(id);
  //$(template).find("h2 span#age").text(age);
  //$(template).find("h2 span#sex").text(sex);
  //$(template).find("h2 span#location").text(loc);
    
  //if (document.getElementById(UID) === null) {
  //  element.append('<div class="person" id="'+UID+'"></div>');
  //}
  
  //$("div#"+UID).html(template)
  
}