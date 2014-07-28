/*global Evernote, JST */
Evernote.Views.NotebookView = Backbone.View.extend({
  template: JST["notebooks/_notebook"],
  
  initialize: function () {
    this.listenTo(this.model, "sync change:title", this.render);
  },
  
  render: function () {
    var renderedContent = this.template({
      notebook: this.model
    });
    
    this.$el.html(renderedContent);
    
    return this;
  }
});