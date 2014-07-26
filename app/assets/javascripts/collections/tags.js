/*global Evernote */
Evernote.Collections.Tags = Backbone.Collection.extend({
  model: Evernote.Models.Tag,
  
  initialize: function (options) {
    this.note = options && options.note;
  },
  
  url: function () {
    var urlRoot;
    if (this.note) {
      urlRoot = this.note.url();
    } else {
      urlRoot = "api/notebooks/0/notes/0";
    }
    return urlRoot + "/tags";
  }
});