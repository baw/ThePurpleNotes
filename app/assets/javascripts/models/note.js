/*global PurpleNotes */
PurpleNotes.Models.Note = Backbone.Model.extend({
  parse: function (jsonResponse) {
    if (jsonResponse.sharing) {
      this.sharing().set(jsonResponse.sharing);
      delete jsonResponse.sharing;
    }
    
    return jsonResponse;
  },
  
  sharing: function () {
    if (this._sharing === undefined) {
      this._sharing = new PurpleNotes.Models.Sharing();
    }
    
    return this._sharing;
  },
  
  tags: function () {
    return PurpleNotes.Collections.taggings.where({
      "note_id": this.id
    });
  },
  
  urlRoot: function () {
    return this.collection.notebook.url() + "/notes/";
  }
});
