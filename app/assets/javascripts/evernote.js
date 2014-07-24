/*global Evernote, EpicEditor */
window.Evernote = {
  Models: {},
  Collections: {},
  Views: {
    renderNotebooks: function ($notebooks) {
      Evernote.Collections.notebooks.fetch();
      
      var indexView = new Evernote.Views.NotebooksIndex({
        collection: Evernote.Collections.notebooks
      });
      
      $notebooks.html(indexView.render().$el);
    }
  },
  Routers: {},
  initialize: function($notebooks, $notes, $noteEditor) {
    Evernote.Collections.notebooks = new Evernote.Collections.Notebooks();
    
    Evernote.Views.renderNotebooks($notebooks);
    
    Evernote.editor = new EpicEditor({
      clientSideStorage: false
    }).load();
    
    new Evernote.Routers.Router({
      $notebooks: $notebooks,
      $notes: $notes,
      $noteEditor: $noteEditor
    });
    Backbone.history.start();
  }
};
