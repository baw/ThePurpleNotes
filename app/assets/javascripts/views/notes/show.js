/*global EpicEditor, Evernote, JST */
Evernote.Views.NoteShow = Backbone.CompositeView.extend({
  events: {
    "click .save":"saveContent",
    "click .delete": "deleteContent",
    "click .share": "shareContent"
  },
  template: JST["notes/show"],
  
  afterRender: function () {
    this.editor = new EpicEditor({
      clientSideStorage: false,
      focusOnLoad: true
    });
    
    this.editor.load();
    this.editor.importFile(this.model.escape("title"),
                               this.model.escape("content"));
    this.editor.on("autosave", this.autoSave.bind(this));
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
    this.listenTo(Evernote.Collections.taggings, "sync add remove", this.renderTags);
  },
  
  remove: function () {
    this.model && this.saveContent();
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
    
    return this;
  },
  
  renderTags: function () {
    this.$(".tags").html("");
    
    var view = this;
    _(this.model.tags()).each(function (tag) {
      var tagView = new Evernote.Views.TagShow({
        model: tag
      });
      view.addSubview(".tags", tagView);
    });
  },
  
  renderTagsNew: function () {
    var tagsNew = new Evernote.Views.TagsNew({
      collection: this.model.tags(),
      note: this.model
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
    var content = this.editor.exportFile();
    this.model.save({ "content": content });
  },
  
  shareContent: function (event) {
    console.log("shareContent");
    var sharing = new Evernote.Models.Sharing({
      "note_id": this.model.escape("id")
    });
    sharing.save({}, {
      success: function () {
        $(event.target).remove();
        var $shareUrl = $("#shareUrl");
        var url =  "/sharings/" + sharing.get("url");
        $shareUrl.prop("href", url);
        $shareUrl.text(url);
      }
    });
  }
});
