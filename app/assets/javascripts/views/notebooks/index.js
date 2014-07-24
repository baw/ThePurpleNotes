/*global Evernote, JST */
Evernote.Views.NotebooksIndex = Backbone.CompositeView.extend({
  template: JST["notebooks/index"],
  
  initialize: function () {
    this.listenTo(this.collection, "sync add change:title", this.render);
  },
  
  render: function () {
    var renderedContent = this.template({
      notebooks: this.collection.models
    });
    
    this.$el.html(renderedContent);
    
    this.renderFormNew();
    
    return this;
  },
  
  renderFormNew: function () {
    var renderedFormNew = new Evernote.Views.NotebookNew();
    
    this.addSubview(".form", renderedFormNew);
  }
});