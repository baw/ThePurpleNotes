/*global Evernote */
Evernote.Models.Note = Backbone.Model.extend({
  associatedWithName: "tags",
  
  tags: function () {
    if (this._tags === undefined) {
      this._tags = new Evernote.Collections.Tags({
        note: this
      });
    }
    
    return this._tags;
  },
  
  urlRoot: function () {
    return this.collection.notebook.url() + "/notes/";
  }
});
