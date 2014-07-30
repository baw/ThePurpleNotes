/*global Evernote, JST */
Evernote.Views.TagNotes = Backbone.CompositeView.extend({
  template: JST["tags/notes"],
  
  addNote: function (note) {
    var noteView = new Evernote.Views.NoteView({
      model: note,
      clearActiveNote: this.clearActiveNote
    });
    
    this.notesView.push(noteView);
    
    this.addSubview(this.noteListSelector, noteView);
  },
  
  initialize: function (options) {
    this.notes = options.notes;
    this.noteListSelector = ".notes-list";
    this.listenTo(
      Evernote.Collections.taggings,
      "change:name add remove",
      this.render
    );
  },
  
  remove: function () {
    debugger;
    this.clearActiveNote();
    Backbone.CompositeView.prototype.remove.call(this);
  },
  
  render: function () {
    var renderContent = this.template({
      tagging: this.model
    });
    
    this.$el.html(renderContent);
    
    this.renderNotes();
    
    return this;
  },
  
  renderNotes: function () {
    this.notesView = [];
    
    //TODO: try to figure out away to not use the prototype of another class
    this.clearActiveNote = Evernote.Views.NotebookShow.prototype.clearActiveNote.bind({
      notes: this.notesView
    }),
    
    this.$(this.noteListSelector).html("");
    this.removeSubviews(this.noteListSelector);
    
    _(this.notes).each(this.addNote.bind(this));
  }
});