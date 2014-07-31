/*global Evernote */
Evernote.Models.Notebook = Backbone.Model.extend({
  urlRoot: "api/notebooks",
  
  parse:  function (jsonResponse) {
    if (jsonResponse.notes) {
      this.notes().set(jsonResponse.notes, {
        parse: true
      });
      Evernote.Collections.notes.add(this.notes().models);
      delete jsonResponse.notes;
    }
    
    return jsonResponse;
  },
  
  notes: function () {
    if (this._notes === undefined) {
      this._notes = new Evernote.Collections.Notes({
        notebook: this
      });
    }
    
    return this._notes;
  }
});