/*global PurpleNotes */
PurpleNotes.Models.Notebook = Backbone.Model.extend({
  associatedWithName: "notes",
  urlRoot: "api/notebooks",
  
  notes: function () {
    if (this._notes === undefined) {
      this._notes = new PurpleNotes.Collections.Notes([], {
        notebook: this
      });
    }
    
    return this._notes;
  }
});