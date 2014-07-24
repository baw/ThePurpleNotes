/*global Evernote */
Evernote.Routers.Router = Backbone.Router.extend({
  routes: {
    "notebooks/:id": "notebookShow",
    "notebooks/:id/notes/:id": "noteShow"
  },
  
  initialize: function (options) {
    this.$selectors = {};
    this.$selectors["notebooks"] = options.$notebooks;
    this.$selectors["notes"] = options.$notes;
    this.$selectors["noteEditor"] = options.$noteEditor;
  },
  
  //Shows the notes for the current notebook
  notebookShow: function (id) {
    var notebook = Evernote.Collections.notebooks.getOrFetch(id);
    
    var notebookShow = new Evernote.Views.NotebookShow({
      model: notebook
    });
    
    this._swapViews("notes", notebookShow);
  },
  
  //shows the note in the noteditor
  noteShow: function (notebookId, noteId) {
    var notebook = Evernote.Collections.notebooks.getOrFetch(notebookId);
    var note = notebook.notes().getOrFetch(noteId);
    
    var noteShowView = new Evernote.Views.NoteShow({
      model: note,
      notebookId: notebookId
    });
    
    this._swapViews("noteEditor", noteShowView);
    noteShowView.afterRender();
  },
  
  _swapViews: function (area, view) {
    this._currentViews = this._currentViews || {};
    this._currentViews[area] && this._currentViews[area].remove();
    this._currentViews[area] = view;
    this.$selectors[area].html(view.render().$el);
  }
});
