/*global Evernote, JST */
Evernote.Views.TagNotes = Backbone.CompositeView.extend({
  template: JST["tags/notes"],
  
  addNote: function (note) {
    var noteView = new Evernote.Views.NoteView({
      model: note,
      notes: this.notesView
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
    this.$(this.noteListSelector).html("");
    this.removeSubviews(this.noteListSelector);
    
    _(this.notes).each(this.addNote.bind(this));
  }
});