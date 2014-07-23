/*global Evernote */
Evernote.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "notebooksIndex",
    "notebooks/:id": "notebookShow",
    "notebooks/:id/notes/:id": "noteShow"
  },
  
  initialize: function (options) {
    this.$selectors = {};
    this.$selectors["notebooks"] = options.$notebooks;
    this.$selectors["notes"] = options.$notes;
    this.$selectors["noteEditor"] = options.$noteEditor;
  },
  
  //show all notebooks, updates notes view, and show first note in noteditor
  notebooksIndex: function () {
    Evernote.Collections.notebooks.fetch();
    
    var indexView = new Evernote.Views.NotebooksIndex({
      collection: Evernote.Collections.notebooks
    });
    
    this._swapViews("notebooks", indexView);
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
    
  },
  
  _swapViews: function (area, view) {
    this._currentViews = this._currentViews || {};
    this._currentViews[area] && this._currentViews.remove();
    this._currentViews[area] = view;
    this.$selectors[area].html(view.render().$el);
  }
});