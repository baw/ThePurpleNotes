/*global PurpleNotes */
PurpleNotes.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "clearArea",
    "notebooks/:id": "notebookShow",
    "notebooks/:id/notes/:id": "noteShow",
    "tags/:id": "tagShow"
  },
  
  clearArea: function () {
    console.log("clearArea");
    this._swapViews("noteEditor", null, {
      clear: true
    });
    this._swapViews("notes", null, {
      clear: true
    });
  },
  
  initialize: function (options) {
    this.$selectors = {};
    this.$selectors["notebooks"] = options.$notebooks;
    this.$selectors["notes"] = options.$notes;
    this.$selectors["noteEditor"] = options.$noteEditor;
  },
  
  //Shows the notes for the current notebook
  notebookShow: function (id) {
    var notebook = PurpleNotes.Collections.notebooks.getOrFetch(id);
    
    var notebookShow = new PurpleNotes.Views.NotebookShow({
      model: notebook
    });
    
    var note = notebook.notes().first();
    if (note) {
      var noteShowView = new PurpleNotes.Views.NoteShow({
        model: note
      });
      
      this._swapViews("noteEditor", noteShowView);
      noteShowView.afterRender();
    } else {
      this._swapViews("noteEditor", null, {
        clear: true
      });
    }
    
    this._swapViews("notes", notebookShow);
  },
  
  //shows the note in the noteditor
  noteShow: function (notebookId, noteId) {
    var notebook = PurpleNotes.Collections.notebooks.getOrFetch(notebookId);
    var note = notebook.notes().getOrFetch(noteId);
    
    var noteShowView = new PurpleNotes.Views.NoteShow({
      model: note
    });
    
    this._swapViews("noteEditor", noteShowView);
    noteShowView.afterRender();
  },
  
  tagShow: function (id) {
    id = parseInt(id, 10);
    var taggings = PurpleNotes.Collections.taggings.where({
      "tag_id": id
    });
    
    var notes = _(taggings).map(function (tagging) {
      var notebook = PurpleNotes.Collections.notebooks.getOrFetch(
        tagging.escape("notebook_id")
      );
      
      return notebook.notes().getOrFetch(tagging.escape("note_id"));
    });
    
    notes = _(notes).sortBy(function (note) {
      return note.get("title");
    });
    
    var tagShowView = new PurpleNotes.Views.TagNotes({
      notes: notes,
      model: taggings[0]
    });
    
    this._swapViews("notes", tagShowView);
  },
  
  _swapViews: function (area, view, options) {
    this._currentViews = this._currentViews || {};
    this._currentViews[area] && this._currentViews[area].remove();
    this._currentViews[area] = view;
    
    if (options && options.clear) {
      this.$selectors[area].html("");
    } else {
      this.$selectors[area].html(view.render().$el);
    }
  }
});
