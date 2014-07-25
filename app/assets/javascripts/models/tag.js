/*global Evernote */
Evernote.Models.Tag = Backbone.Model.extend({
  urlRoot: function () {
    return this.collection.note.url() + "/tags";
  }
});