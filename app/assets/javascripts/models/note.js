/*global Evernote */
Evernote.Models.Note = Backbone.Model.extend({
  parse: function (jsonResponse) {
    if (jsonResponse.sharing) {
      this.sharing = new Evernote.Models.Sharing(jsonResponse.sharing);
      delete jsonResponse.sharing;
    }
    
    return jsonResponse;
  },
  
  tags: function () {
    return Evernote.Collections.taggings.where({
      "note_id": this.id
    });
  },
  
  urlRoot: function () {
    return this.collection.notebook.url() + "/notes/";
  }
});
