/*global PurpleNotes */
PurpleNotes.Collections.Notebooks = Backbone.Collection.extend({
  url: "api/notebooks",
  model: PurpleNotes.Models.Notebook,
  
  comparator: function (notebook) {
    return notebook.escape("title").toLowerCase();
  }
});