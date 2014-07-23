/*global Evernote */
window.Evernote = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    Evernote.Collections.notebooks = new Evernote.Collections.Notebooks();
    new Evernote.Routers.Router({
      $rootEl: $("#main")
    });
    Backbone.history.start();
  }
};
