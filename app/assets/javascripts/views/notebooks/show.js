/*global Evernote, JST*/
Evernote.Views.NotebookShow = Backbone.View.extend({
  tagName: "ul",
  template: JST["notebooks/show"],
  
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.notes(), "sync add, remove", this.render);
  },
  
  render: function () {
    var renderContent = this.template({
      notes: this.model.notes().models
    });
    
    this.$el.html(renderContent);
    
    return this;
  }
});