/*global PurpleNotes, JST*/
PurpleNotes.Views.NotebookShow = Backbone.CompositeView.extend({
  events: {
    "click .sort .by" : "sortBy"
  },
  
  template: JST["notebooks/show"],
  
  addNote: function (note) {
    var renderedNoteView = new PurpleNotes.Views.NoteView({
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
    this.listenTo(this.model.notes(), "change:title add remove sort", this.renderNotes);
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
    debugger;
    this.notes = [];
    this.$(this.notesList).html("");
    this.removeSubviews(this.notesList);
    
    _(this.model.notes().models).each(this.addNote.bind(this));
    
    if (this.notes[0]) this.notes[0].makeActive();
  },
  
  renderNoteNew: function () {
    var renderedNoteNewView = new PurpleNotes.Views.NoteNew({
      clearActiveNote: this.clearActiveNote.bind(this),
      collection: this.model.notes()
    });
    
    this.addSubview(".newNoteForm", renderedNoteNewView);
  },
  
  sortBy: function (event) {
    debugger;
    console.log("sortBy");
    event.preventDefault();
    var $target = $(event.target);
    var sorting = $target.data("sort");
    
    console.log(sorting);
    
    this.model.notes().comparator = function (model) {
      if (sorting === "created_at" || sorting === "updated_at") {
        return  - new Date(model.escape(sorting)).getTime();
      } else {
        return "-" + model.escape(sorting).toLowerCase();
      }
    }
    
    this.model.notes().sort();
  }
});