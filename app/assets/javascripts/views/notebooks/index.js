/*global Evernote, JST */
Evernote.Views.NotebooksIndex = Backbone.CompositeView.extend({
  template: JST["notebooks/index"],
  
  initialize: function () {
    this.listenTo(this.collection, "sync add remove", this.renderNotebooks);
  },
  
  render: function () {
    var renderedContent = this.template();
    
    this.$el.html(renderedContent);
    
    this.renderNotebooks();
    this.renderFormNew();
    
    return this;
  },
  
  renderFormNew: function () {
    var renderedFormNew = new Evernote.Views.NotebookNew();
    
    this.addSubview(".form", renderedFormNew);
  },
  
  renderNotebooks: function () {
    $(".notebooks-list").html("");
    
    var view = this;
    _(this.collection.models).each(function (notebook) {
      var notebookView = new Evernote.Views.NotebookView({
        model: notebook
      });
      
      view.addSubview(".notebooks-list", notebookView);
    });
  }
});