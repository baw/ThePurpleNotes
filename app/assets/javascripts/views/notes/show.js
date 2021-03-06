/*global EpicEditor, PurpleNotes, JST */
PurpleNotes.Views.NoteShow = Backbone.CompositeView.extend({
  events: {
    "click .save":"saveContent",
    "click .delete": "deleteContent"
  },
  template: JST["notes/show"],
  
  afterRender: function () {
    this.editor = new EpicEditor({
      clientSideStorage: false,
      focusOnLoad: true,
      theme: {
        base: 'http://cdnjs.cloudflare.com/ajax/libs/epiceditor/0.2.2/themes/base/epiceditor.css',
        preview: 'http://cdnjs.cloudflare.com/ajax/libs/epiceditor/0.2.2/themes/preview/github.css',
        editor: 'http://cdnjs.cloudflare.com/ajax/libs/epiceditor/0.2.2/themes/editor/epic-light.css'
      }
    });
    
    this.editor.load();
    this.editor.importFile(this.model.escape("title"),
                           this.model.escape("content"));
    this.editor.on("autosave", this.autoSave.bind(this));
  },
  
  autoSave: function () {
    var view = this;
    this.$("#saveStatus").addClass("edited").removeClass("saved");
    
    this.timeout && clearTimeout(this.timeout);
    this.timeout = setTimeout(function () {
      view.saveContent();
    }, 2000);
  },
  
  deleteContent: function () {
    //need to make 'this.model' null prior to destroy the model to make it null
    //before remove event is triggered
    var note = this.model;
    this.model = null;
    
    var notebookID = note.get("notebook_id");
    note.destroy();
    
    Backbone.history.navigate("/notebooks/" + notebookID, {
      trigger: true
    });
    this.model = null;
  },
  
  initialize: function () {
    this.listenTo(PurpleNotes.Collections.taggings, "sync add remove", this.renderTags);
    this.listenTo(this.model, "sync", this.renderShare);
    this.shareURLContainer = ".shareUrlContainer";
  },
  
  remove: function () {
    if (this.model && this.model.collection.notebook) {
      this.model && this.saveContent();
    }
    Backbone.CompositeView.prototype.remove.call(this);
    this.editor.removeListener("autosave");
  },
  
  render: function () {
    var renderedContent = this.template({
      note: this.model
    });
    
    this.$el.html(renderedContent);
    this.renderTitle();
    this.renderTags();
    this.renderTagsNew();
    this.renderShare();
    
    return this;
  },
  
  renderShare: function () {
    this.$(this.shareURLContainer).html("");
    this.removeSubviews(this.shareURLContainer);
    
    var shareView = new PurpleNotes.Views.Sharing({
      model: this.model
    });
    
    this.addSubview(this.shareURLContainer, shareView);
  },
  
  renderTags: function () {
    this.$(".tags").html("");
    
    var view = this;
    _(this.model.tags()).each(function (tag) {
      var tagView = new PurpleNotes.Views.TagShow({
        model: tag
      });
      view.addSubview(".tags", tagView);
    });
  },
  
  renderTagsNew: function () {
    var tagsNew = new PurpleNotes.Views.TagsNew({
      collection: this.model.tags(),
      note: this.model
    });
    
    this.addSubview(".tagsNew", tagsNew);
  },
  
  renderTitle: function () {
    var noteTitleView = new PurpleNotes.Views.NoteTitle({
      model: this.model
    });
    
    this.addSubview("#noteShowTitle", noteTitleView);
  },
  
  saveContent: function (event) {
    this.timeout && clearTimeout(this.timeout);
    
    var content = this.editor.exportFile();
    if (this.model.get("content") !== content) {
        var view = this;
        this.model.save({ "content": content }, {
            success: function () {
                view.$("#saveStatus").addClass("saved").removeClass("edited");
            },
            error: function () {
                alert("There was a problem in saving your note.");
            }
        });
    }
  }
});
