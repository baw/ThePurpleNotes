/*global Evernote */
Evernote.Collections.Tags = Backbone.Collection.extend({
  comparator: function (tag) {
    return tag.escape("name").toLowerCase();
  },
  model: Evernote.Models.Tag,
  
  initialize: function (options) {
    this.note = options && options.note;
  },
  
  url: "api/taggings"
});