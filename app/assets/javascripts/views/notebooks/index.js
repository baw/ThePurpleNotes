/*global Evernote, JST */
Evernote.Views.NotebooksIndex = Backbone.CompositeView.extend({
  template: JST["notebooks/index"],
  
  addNotebook: function (notebook) {
    var notebookView = new Evernote.Views.NotebookView({
      model: notebook,
      notebookViews: this.notebookViews
    });
    
    this.notebookViews.push(notebookView);
    
    this.addSubview(this.notebookSelector, notebookView);
  },
  
  initialize: function () {
    this.listenTo(this.collection, "sync remove", this.renderNotebooks);
    this.listenTo(this.collection, "add", this.addNotebook);
    
    this.notebookSelector = ".notebooks-list";
    this.notebookViews = [];
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
    this.notebookViews = [];
    $(this.notebookSelector).html("");
    this.removeSubviews(this.notebookSelector);
    
    _(this.collection.models).each(this.addNotebook.bind(this));
  }
});