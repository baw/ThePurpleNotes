/*global Evernote, JST, EpicEditor */
Evernote.Views.NoteShow = Backbone.View.extend({
  template: JST["notes/show"],
  events: {
    "click .save": "saveContents",
    "keyup": "autoSave"
  },
  
  afterRender: function () {
    this.editor = new EpicEditor({
      file: { defaultContent: this.model.escape("content") }
    }).load();
    this.editor.on("autosave", this.autoSave.bind(this));
  },
  
  autoSave: function () {
    var view = this;

    this.timeout && clearTimeout(this.timeout);
    this.timeout = setTimeout(function () {
      view.saveContents();
    }, 2000);
  },

  initialize: function (options) {
    var that = this;
  },
  
  render: function () {
    var renderedContent = this.template({
      note: this.model
    });
    
    this.$el.html(renderedContent);
    
    return this;
  },
  
  saveContents: function (event) {
    var content = this.editor.exportFile();
    this.model.save({ "content": content });
  }
});
