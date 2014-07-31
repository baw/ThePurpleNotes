/*global Evernote */
Evernote.Collections.Notes = Backbone.Collection.extend({
  model: Evernote.Models.Note,
  
  comparator: function (note) {
    return note.escape("title").toLowerCase();
  },
  
  initialize: function (models, options) {
    this.notebook = options.notebook;
  },
  
  url: function () {
    return this.notebook.url() + "/notes";
  }
});
