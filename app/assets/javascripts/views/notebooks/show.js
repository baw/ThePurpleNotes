/*global Evernote, JST*/
Evernote.Views.NotebookShow = Backbone.CompositeView.extend({
  template: JST["notebooks/show"],
  
  addNote: function (note) {
    var renderedNoteView = new Evernote.Views.NoteView({
      model: note,
      notes: this.notes
    });
    
    this.notes.push(renderedNoteView);
    
    this.addSubview(this.notesList, renderedNoteView);
  },
  
  initialize: function (options) {
    this.notesList = ".notes-list";
    
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.notes(), "sync change:title add remove", this.renderNotes);
  },
  
  render: function () {
    var renderContent = this.template({
      notebook: this.model
    });
    
    this.$el.html(renderContent);
    
    this.renderNotes();
    this.renderNoteNew();
    
    return this;
  },
  
  renderNotes: function () {
    this.notes = [];
    $(this.notesList).html("");
    this.removeSubviews(this.notesList);
    
    _(this.model.notes().models).each(this.addNote.bind(this));
  },
  
  renderNoteNew: function () {
    var renderedNoteNewView = new Evernote.Views.NoteNew({
      collection: this.model.notes()
    });
    
    this.addSubview(".newNoteForm", renderedNoteNewView);
  }
});