/*global Evernote */
Evernote.Collections.Notes = Backbone.Collection.extend({
  model: Evernote.Models.Note,
  
  initialize: function (options) {
    this.notebook = options.notebook;
  },
  
  url: "api/notes"
});