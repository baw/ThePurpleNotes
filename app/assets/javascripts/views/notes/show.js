/*global Evernote, JST */
Evernote.Views.NoteShow = Backbone.View.extend({
  template: JST["notes/show"],
  
  autoSave: function () {
    var view = this;
    
    this.timeout && clearTimeout(this.timeout);
    this.timeout = setTimeout(function () {
      view.saveContent();
    }, 2000);
  },
  
  deleteContent: function () {
    this.model.destroy();
  },
  
  initialize: function (options) {
    $(document).off("click.save");
    $(document).off("click.delete");
    $(document).on("click.save", ".save", this.saveContent.bind(this));
    $(document).on("click.delete", ".delete", this.deleteContent.bind(this));
  },
  
  render: function () {
    $("#noteShowTitle").html(this.model.escape("title"));
    
    Evernote.editor.importFile(this.model.escape("title"), this.model.escape("content"));
    Evernote.editor.removeListener("autosave");
    Evernote.editor.on("autosave", this.autoSave.bind(this));
    
    return this;
  },
  
  saveContent: function (event) {
    var content = Evernote.editor.exportFile();
    this.model.save({ "content": content });
  }
});
