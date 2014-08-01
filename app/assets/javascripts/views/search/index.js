/*global PurpleNotes, JST */
PurpleNotes.Views.SearchIndex = Backbone.CompositeView.extend({
  template: JST["search/index"],
  
  initialize: function (options) {
    this.notesSelector = ".notes-list";
    this.notes = options.notes;
  },
  
  render: function () {
    var renderContent = this.template();
    
    this.$el.html(renderContent);
    
    this.renderResults();
    
    return this;
  },
  
  renderResults: function () {
    this.$(this.notesSelector).html("");
    this.removeSubviews(this.notesSelector);
    this.noteViews = [];
    
    var view = this;
    _(this.notes).each(function (noteObj) {
      var noteView = new PurpleNotes.Views.NoteView({
        model: noteObj.note,
        clearActiveNote: PurpleNotes.Views.NotebookShow.prototype.clearActiveNote.bind({
          notes: view.noteViews
        })
      });
      
      view.noteViews.push(noteView);
      
      view.addSubview(view.notesSelector, noteView);
    });
  }
});