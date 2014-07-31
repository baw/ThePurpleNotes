/*global Evernote*/
Evernote.Searches.search = function ($search) {
  var count = function (searchString, stringToSearch) {
    searchString = searchString.toLowerCase();
    stringToSearch = stringToSearch.toLowerCase();
    
    var countNum =  0;
    var index    = -1;
    do {
      index = stringToSearch.indexOf(searchString, index + 1);
      
      if (index !== -1) countNum++;
        
    } while (index !== -1);
    
    return countNum;
  };
  
  $search.on("keyup", function () {
    var searchString = $search.val();
    var results = [];
    
    if (searchString === "") return [];
    // console.log(searchString);
    _(Evernote.Collections.notes.models).each(function (note) {
      var num = 0;
      // if (note.id === 2) debugger;
      var title = note.get("title");
      
      if (title) {
        num += count(searchString, title);
      }
      
      var content = note.get("content");
      if (content) {
        num += count(searchString, content);
      }
      if (num > 0) {
        results.push({
          count: num,
          note: note
        });
      }
    });
    
    results.sort(function (firstNote, secondNote) {
      if (firstNote.count < secondNote.count) {
        return -1;
      } else if (firstNote.count > secondNote.count) {
        return 1;
      } else {
        return 0;
      }
    });
  });
};