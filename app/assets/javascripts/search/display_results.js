/*global Evernote */
Evernote.Searches.displayResults = function (notes, $div) {
  Evernote.Searches.view && Evernote.Searches.view.remove();
  
  Evernote.Searches.view = new Evernote.Views.SearchIndex({
    notes: notes
  });
  
  $div.html(Evernote.Searches.view.render().$el);
};