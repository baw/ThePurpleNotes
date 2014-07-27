/*global Evernote */
Evernote.Collections.Tags = Backbone.Collection.extend({
  comparator: "name",
  model: Evernote.Models.Tag,
  
  initialize: function (options) {
    this.note = options && options.note;
  },
  
  url: "api/taggings"
});