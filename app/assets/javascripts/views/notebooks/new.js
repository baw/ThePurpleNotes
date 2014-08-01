/*global PurpleNotes, JST */
PurpleNotes.Views.NotebookNew = Backbone.View.extend({
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
    
    var notebook = PurpleNotes.Collections.notebooks.create({
      "title": title
    }, {
      success: function () {
        Backbone.history.navigate(
          "/notebooks/" + notebook.escape("id"), {
            trigger: true
          }
        );
      }
    });
  },
  
  render: function () {
    var renderedContent = this.template();
    
    this.$el.html(renderedContent);
    
    return this;
  }
});