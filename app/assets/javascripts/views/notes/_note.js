/*global Evernote, JST */
Evernote.Views.NoteView = Backbone.View.extend({
  events: {
    "click .note-item": "makeActive"
  },
  template: JST["notes/_note"],
  
  initialize: function (options) {
    this.notebook = options.notebook;
    this.notes = options.notes;
  },
  
  makeActive: function () {
    _(this.notes).each(function (note) {
      note.model.set("active", false);
    });
    
    this.model.set("active", true);
    this.render();
  },
  
  render: function () {
    var renderedContent = this.template({
      makeActive: this.model.get("active") ? "active" : "",
      note: this.model,
      notebook: this.notebook
    });
    
    this.$el.html(renderedContent);
    
    return this;
  }
});