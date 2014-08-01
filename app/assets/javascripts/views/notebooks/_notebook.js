/*global PurpleNotes, JST */
PurpleNotes.Views.NotebookView = Backbone.View.extend({
  events: {
    "click .editNotebookTitleButton": "editNotebookTitleButton",
    "submit .editNotebookTitleForm": "editNotebookTitleFormSubmit",
    "click .removeNotebook": "removeNotebook",
    "click .notebook-item": "makeActive"
  },
  template: JST["notebooks/_notebook"],
  
  editNotebookTitleButton: function (event) {
    event.preventDefault();
    var $input = this.$(".editNotebookTitle");
    
    if (this.edit) {
      this.edit = false;
      this.render();
    } else {
      this.edit = true;
      this.render();
      $input.focus();
    }
  },
  
  editNotebookTitleFormSubmit: function (event) {
    event.preventDefault();
    var $input = this.$(".editNotebookTitle");
    var title = $input.val();
    
    this.model.save({
      "title": title
    });
    
    this.model.collection.sort();
    this.edit = false;
  },
  
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
          var taggings = PurpleNotes.Collections.taggings.where({
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
      editable: this.edit,
      notebook: this.model,
      makeActive: this.model.get("active") ? "active" : ""
    });
    
    this.$el.html(renderedContent);
    
    return this;
  }
});