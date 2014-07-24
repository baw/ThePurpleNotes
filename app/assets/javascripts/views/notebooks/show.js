/*global Evernote, JST*/
Evernote.Views.NotebookShow = Backbone.CompositeView.extend({
  template: JST["notebooks/show"],
  
  initialize: function (options) {
    
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.notes(), "sync add, remove", this.render);
  },
  
  render: function () {
    var renderContent = this.template({
      notes: this.model.notes().models,
      notebookId: this.model.escape("id")
    });
    
    this.$el.html(renderContent);
    
    this.renderNoteNew();
    
    return this;
  },
  
  renderNoteNew: function () {
    var renderedNoteNewView = new Evernote.Views.NoteNew({
      collection: this.model.notes()
    });
    
    this.addSubview(".newNoteForm", renderedNoteNewView);
  }
});