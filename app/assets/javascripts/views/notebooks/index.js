/*global PurpleNotes, JST */
PurpleNotes.Views.NotebooksIndex = Backbone.CompositeView.extend({
  template: JST["notebooks/index"],
  
  addNotebook: function (notebook) {
    var notebookView = new PurpleNotes.Views.NotebookView({
      model: notebook,
      notebookViews: this.notebookViews
    });
    
    this.notebookViews.push(notebookView);
    
    this.addSubview(this.notebookSelector, notebookView);
  },
  
  initialize: function () {
    this.listenTo(this.collection, "sync change:title remove add", this.renderNotebooks);
    
    this.notebookSelector = ".notebooks-list";
  },
  
  render: function () {
    var renderedContent = this.template();
    
    this.$el.html(renderedContent);
    
    this.renderNotebooks();
    this.renderFormNew();
    
    return this;
  },
  
  renderFormNew: function () {
    var renderedFormNew = new PurpleNotes.Views.NotebookNew();
    
    this.addSubview(".form", renderedFormNew);
  },
  
  renderNotebooks: function () {
    this.notebookViews = [];
    this.$(this.notebookSelector).html("");
    this.removeSubviews(this.notebookSelector);
    
    _(this.collection.models).each(this.addNotebook.bind(this));
  }
});