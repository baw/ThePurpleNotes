/*global Evernote */
Evernote.Collections.Notebooks = Backbone.Collection.extend({
  url: "api/notebooks",
  model: Evernote.Models.Notebook,
  
  comparator: "title",
});