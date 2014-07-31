/*global Evernote*/
Evernote.Searches.search = function ($search, $div) {
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
  
  var sortByCount = function (firstNote, secondNote) {
    if (firstNote.count < secondNote.count) {
      return -1;
    } else if (firstNote.count > secondNote.count) {
      return 1;
    } else {
      return 0;
    }
  };
  
  $search.on("keyup", function () {
    var searchString = $search.val();
    var results = [];
    
    if (searchString === "") return [];
    _(Evernote.Collections.notebooks.models).each(function (notebooks) {
      _(notebooks.notes().models).each(function (note) {
        var num = 0;
        
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
      
      results.sort(sortByCount);
      
      Evernote.Searches.displayResults(results.slice(0, 10), $div);
    });
  });
};