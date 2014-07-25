/*global Evernote */
window.Evernote = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function($notebooks, $notes, $noteEditor) {
    Evernote.Collections.notebooks = new Evernote.Collections.Notebooks();
    
    // Evernote.Views.renderNotebooks($notebooks);
    
    new Evernote.Routers.Router({
      $notebooks: $notebooks,
      $notes: $notes,
      $noteEditor: $noteEditor
    });
    Backbone.history.start();
  }
};
