/*global Evernote */
Evernote.Collections.Notes = Backbone.Collection.extend({
  url: "api/notes",
  model: Evernote.Models.Note
});