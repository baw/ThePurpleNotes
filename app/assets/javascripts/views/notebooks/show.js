/*global Evernote, JST*/
Evernote.Views.NotebookShow = Backbone.CompositeView.extend({
  template: JST["notebooks/show"],
  
  addNote: function (note) {
    var renderedNoteView = new Evernote.Views.NoteView({
      clearActiveNote: this.clearActiveNote.bind(this),
      model: note
    });
    
    this.notes.push(renderedNoteView);
    
    this.addSubview(this.notesList, renderedNoteView);
  },
  
  clearActiveNote: function () {
    _(this.notes).each(function (note) {
      note.model.set("active", false);
    });
  },
  
  initialize: function (options) {
    this.notesList = ".notes-list";
    
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.notes(), "change:title add remove", this.renderNotes);
  },
  
  remove: function () {
    this.clearActiveNote();
    Backbone.CompositeView.prototype.remove.call(this);
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
    this.$(this.notesList).html("");
    this.removeSubviews(this.notesList);
    
    _(this.model.notes().models).each(this.addNote.bind(this));
  },
  
  renderNoteNew: function () {
    var renderedNoteNewView = new Evernote.Views.NoteNew({
      clearActiveNote: this.clearActiveNote.bind(this),
      collection: this.model.notes()
    });
    
    this.addSubview(".newNoteForm", renderedNoteNewView);
  }
});