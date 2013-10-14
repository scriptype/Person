Person
======

Mother of all person classes.

Create a new instance of Person with console like:
  
  var x = new Person("scriptyper",20,"m","istanbul");
  
Your instance must now appear in DOM. This is provided with using localStorage as a temporary database. When an instance created, it's passed to localStorage and after generation of it, view function is triggered. View function checks for any new data in localStorage, turns any new data into DOM contents.

Once created, instance objects will always be in DOM as their data is stored in localStorage.

Currently, editing instances belongs to older sessions is a challange. This feature may or may not be included in later versions.
