/*global Evernote, JST */
Evernote.Views.NotebookNew = Backbone.View.extend({
  events: {
    "submit": "formSubmit"
  },
  tagName: "form",
  template: JST["notebooks/new"],
  
  formSubmit: function (event) {
    event.preventDefault();
    var $notebookTitle = this.$("#notebookTitle");
    var title = $notebookTitle.val();
    $notebookTitle.val("");
    
    Evernote.Collections.notebooks.create({
      "title": title
    });
  },
  
  render: function () {
    var renderedContent = this.template();
    
    this.$el.html(renderedContent);
    
    return this;
  }
});