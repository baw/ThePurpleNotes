/*global Evernote */
Evernote.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "notebooksIndex"
  },
  
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },
  
  notebooksIndex: function () {
    Evernote.Collections.notebooks.fetch();
    
    var indexView = new Evernote.Views.NotebooksIndex({
      collection: Evernote.Collections.notebooks
    });
    
    this._swapViews(indexView);
  },
  
  _swapViews: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});