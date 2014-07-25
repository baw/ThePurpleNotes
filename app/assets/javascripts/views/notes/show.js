/*global EpicEditor, Evernote, JST */
Evernote.Views.NoteShow = Backbone.CompositeView.extend({
  events: {
    "click .save":"saveContent",
    "click .delete": "deleteContent"
  },
  template: JST["notes/show"],
  
  afterRender: function () {
    Evernote.editor = new EpicEditor({
      autogrow: {
        minHeight: 200,
        maxHeight: 450
      },
      clientSideStorage: false
    });
    
    Evernote.editor.load();
    Evernote.editor.importFile(this.model.escape("title"),
                               this.model.escape("content"));
    Evernote.editor.on("autosave", this.autoSave.bind(this));
  },
  
  autoSave: function () {
    var view = this;
    
    this.timeout && clearTimeout(this.timeout);
    this.timeout = setTimeout(function () {
      view.saveContent();
    }, 2000);
  },
  
  deleteContent: function () {
    this.model.destroy();
    this.model = null;
  },
  
  initialize: function () {
    this.listenTo(this.model.tags(), "sync add remove", this.renderTags);
  },
  
  remove: function () {
    this.model && this.saveContent();
    Backbone.CompositeView.prototype.remove.call(this);
    Evernote.editor.removeListener("autosave");
  },
  
  render: function () {
    var renderedContent = this.template({
      note: this.model
    });
    
    this.$el.html(renderedContent);
    this.renderTitle();
    this.renderTags();
    this.renderTagsNew();
    
    return this;
  },
  
  renderTags: function () {
    this.$(".tags").html("");
    
    var view = this;
    _(this.model.tags().models).each(function (tag) {
      var tagView = new Evernote.Views.TagShow({
        model: tag
      });
      view.addSubview(".tags", tagView);
    });
  },
  
  renderTagsNew: function () {
    var tagsNew = new Evernote.Views.TagsNew({
      collection: this.model.tags()
    });
    
    this.addSubview(".tagsNew", tagsNew);
  },
  
  renderTitle: function () {
    var noteTitleView = new Evernote.Views.NoteTitle({
      model: this.model
    });
    
    this.addSubview("#noteShowTitle", noteTitleView);
  },
  
  saveContent: function (event) {
    var content = Evernote.editor.exportFile();
    this.model.save({ "content": content });
  }
});
