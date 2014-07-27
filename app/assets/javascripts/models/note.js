/*global Evernote */
Evernote.Models.Note = Backbone.Model.extend({
  tags: function () {
    return Evernote.Collections.taggings.where({
      "note_id": this.id
    });
  },
  
  urlRoot: function () {
    return this.collection.notebook.url() + "/notes/";
  }
});
