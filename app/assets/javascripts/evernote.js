/*global Evernote */
window.Evernote = {
  Models: {},
  Collections: {},
  Views: {
    renderSidebar: function ($notebooks, $tags) {
      var indexView = new Evernote.Views.NotebooksIndex({
        collection: Evernote.Collections.notebooks
      });
      
      $notebooks.html(indexView.render().$el);
      
      var tagsIndexView = new Evernote.Views.TagsIndex({
        collection: Evernote.Collections.taggings
      });
      
      $tags.html(tagsIndexView.render().$el);
    }
  },
  Routers: {},
  initialize: function($notebooks, $notes, $noteEditor, $tags, $bootstrappedData) {
    Evernote.Collections.notebooks = new Evernote.Collections.Notebooks();
    Evernote.Collections.taggings = new Evernote.Collections.Tags();
    
    var bootstrappedData = JSON.parse($bootstrappedData.html());
    Evernote.Collections.notebooks.reset(bootstrappedData.notebooks, { parse: true });
    Evernote.Collections.taggings.reset(bootstrappedData.taggings, { parse: true });
    
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
