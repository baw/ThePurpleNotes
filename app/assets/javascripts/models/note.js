/*global Evernote */
Evernote.Models.Note = Backbone.Model.extend({
  urlRoot: function () {
    return this.collection.notebook.url() + "/notes/";
  }
});
