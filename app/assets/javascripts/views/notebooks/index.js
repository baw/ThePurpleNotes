/*global Evernote, JST */
Evernote.Views.NotebooksIndex = Backbone.CompositeView.extend({
  template: JST["notebooks/index"],
  
  afterRender: function () {
    new mlPushMenu(
      document.getElementById('mp-menu'),
      document.getElementById('trigger')
    );
    
    console.log("afterRender");
  },
  
  initialize: function () {
    this.listenTo(this.collection, "sync add change:title remove", this.render);
    
    var view = this;
    this.render = _.wrap(this.render.bind(this), function (render) {
      render();
      // view.afterRender();
      
      return view;
    });
  },
  
  render: function () {
    console.log("render");
    var renderedContent = this.template({
      notebooks: this.collection.models
    });
    
    this.$el.html(renderedContent);
    
    this.renderNotebooks();
    this.renderFormNew();
    
    this.afterRender();
    
    return this;
  },
  
  renderNotebooks: function () {
    var view = this;
    _(this.collection.models).each(function (notebook) {
      var notebookShow = new Evernote.Views.NotebookShow({
        model: notebook
      });
      
      view.addSubview("#notebooks", notebookShow);
    });
  },
  
  renderFormNew: function () {
    var renderedFormNew = new Evernote.Views.NotebookNew();
    
    this.addSubview(".form", renderedFormNew);
  }
});