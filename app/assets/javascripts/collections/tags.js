/*global Evernote */
Evernote.Collections.Tags = Backbone.Collection.extend({
  model: Evernote.Models.Tag,
  
  initialize: function (options) {
    this.note = options.note;
  },
  
  url: function () {
    return this.note.url() + "/tags";
  }
});