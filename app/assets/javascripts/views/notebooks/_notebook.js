/*global Evernote, JST */
Evernote.Views.NotebookView = Backbone.View.extend({
  events: {
    "click .removeNotebook": "removeNotebook",
    "click .notebook-item": "makeActive"
  },
  template: JST["notebooks/_notebook"],
  
  initialize: function (options) {
    this.notebookViews = options.notebookViews;
    
    this.listenTo(this.model, "sync change:title", this.render);
  },
  
  makeActive: function (event) {
    _(this.notebookViews).each(function (notebookView) {
      notebookView.model.set("active", false);
      notebookView.render();
    });
    
    this.model.set("active", true);
    this.render();
  },
  
  removeNotebook: function () {
    var notes = this.model.notes();
    this.model.destroy({
      success: function () {
        var note;
        while (note = notes.first()) {
          var taggings = Evernote.Collections.taggings.where({
            "note_id": parseInt(note.escape("id"), 10)
          });
          
          var tagging;
          while (tagging = taggings.pop()) {
            tagging.trigger("destroy", tagging);
          }
          
          note.trigger("destroy", note);
        }
        
        notes.remove();
      }
    });
  },
  
  render: function () {
    var renderedContent = this.template({
      notebook: this.model,
      makeActive: this.model.get("active") ? "active" : ""
    });
    
    this.$el.html(renderedContent);
    
    return this;
  }
});