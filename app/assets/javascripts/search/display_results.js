/*global PurpleNotes */
PurpleNotes.Searches.displayResults = function (notes, $div) {
  PurpleNotes.Searches.view && PurpleNotes.Searches.view.remove();
  
  PurpleNotes.Searches.view = new PurpleNotes.Views.SearchIndex({
    notes: notes
  });
  
  $div.html(PurpleNotes.Searches.view.render().$el);
};