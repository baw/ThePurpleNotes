/*global PurpleNotes */
window.PurpleNotes = {
  Models: {},
  Collections: {},
  Views: {
    renderSidebar: function ($notebooks, $tags) {
      var indexView = new PurpleNotes.Views.NotebooksIndex({
        collection: PurpleNotes.Collections.notebooks
      });
      
      $notebooks.html(indexView.render().$el);
      
      var tagsIndexView = new PurpleNotes.Views.TagsIndex({
        collection: PurpleNotes.Collections.taggings
      });
      
      $tags.html(tagsIndexView.render().$el);
    }
  },
  Routers: {},
  Searches: {},
  initialize: function($notebooks, $notes, $noteEditor, $tags, $bootstrappedData, $search) {
    PurpleNotes.Collections.notebooks = new PurpleNotes.Collections.Notebooks();
    PurpleNotes.Collections.taggings = new PurpleNotes.Collections.Tags();
    
    var bootstrappedData = JSON.parse($bootstrappedData.html());
    PurpleNotes.Collections.notebooks.reset(bootstrappedData.notebooks, { parse: true });
    PurpleNotes.Collections.taggings.reset(bootstrappedData.taggings, { parse: true });
    
    PurpleNotes.Views.renderSidebar($notebooks, $tags);
    
    new PurpleNotes.Routers.Router({
      $notebooks: $notebooks,
      $notes: $notes,
      $noteEditor: $noteEditor,
      $tags: $tags
    });
    Backbone.history.start();
    
    PurpleNotes.Searches.search($search, $notes);
  }
};
