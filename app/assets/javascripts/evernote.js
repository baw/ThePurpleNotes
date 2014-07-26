/*global Evernote */
window.Evernote = {
  Models: {},
  Collections: {},
  Views: {
    renderSidebar: function ($notebooks, $tags) {
      Evernote.Collections.notebooks.fetch();
      
      var indexView = new Evernote.Views.NotebooksIndex({
        collection: Evernote.Collections.notebooks
      });
      
      $notebooks.html(indexView.render().$el);
      
      Evernote.Collections.tags.fetch();
      
      var tagsIndexView = new Evernote.Views.TagsIndex({
        collection: Evernote.Collections.tags
      });
      
      $tags.html(tagsIndexView.render().$el);
    }
  },
  Routers: {},
  initialize: function($notebooks, $notes, $noteEditor, $tags) {
    Evernote.Collections.notebooks = new Evernote.Collections.Notebooks();
    Evernote.Collections.tags = new Evernote.Collections.Tags();
    
    Evernote.Views.renderSidebar($notebooks, $tags);
    
    new Evernote.Routers.Router({
      $notebooks: $notebooks,
      $notes: $notes,
      $noteEditor: $noteEditor,
      $tags: $tags
    });
    Backbone.history.start();
  }
};
