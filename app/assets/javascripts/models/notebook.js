/*global Evernote */
Evernote.Models.Notebook = Backbone.Model.extend({
  urlRoot: "api/notebooks",
  
  notes: function () {
    if (this._notes === undefined) {
      this._notes = new Evernote.Collections.Notes({
        notebook: this
      });
    }
    
    return this._notes;
  },
  
  parse: function (jsonResponse) {
    if (jsonResponse.notes) {
      this.notes().set(jsonResponse.notes, { parse: true });
      delete jsonResponse.notes;
    }
    
    return jsonResponse;
  }
});