/*global Evernote, JST */
Evernote.Views.NoteView = Backbone.View.extend({
  events: {
    "click .note-item": "makeActive"
  },
  template: JST["notes/_note"],
  
  initialize: function (options) {
    this.clearActiveNote = options.clearActiveNote;
    
    this.listenTo(this.model, "sync change:title", this.render);
  },
  
  makeActive: function () {
    this.clearActiveNote();
    
    this.model.set("active", true);
    this.render();
  },
  
  render: function () {
    var renderedContent = this.template({
      makeActive: this.model.get("active") ? "active" : "",
      note: this.model
    });
    
    this.$el.html(renderedContent);
    
    return this;
  }
});