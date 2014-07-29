/*global Evernote */
Evernote.Collections.Notebooks = Backbone.Collection.extend({
  url: "api/notebooks",
  model: Evernote.Models.Notebook,
  
  comparator: function (notebook) {
    return notebook.escape("title").toLowerCase();
  }
});