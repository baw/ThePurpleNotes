/*global Evernote, JST */
Evernote.Views.NotebooksIndex = Backbone.View.extend({
  template: JST["notebooks/index"],
  
  initialize: function () {
    this.listenTo(this.collection, "sync add change:title", this.render);
  },
  
  render: function () {
    console.log("render");
    var renderedContent = this.template({
      notebooks: this.collection.models
    });
    
    this.$el.html(renderedContent);
    
    return this;
  }
});