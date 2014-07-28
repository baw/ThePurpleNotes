/*global Evernote, JST */
Evernote.Views.NoteNew = Backbone.View.extend({
  events: {
    "submit": "formSubmit"
  },
  tagName: "form",
  template: JST["notes/new"],
  
  formSubmit: function (event) {
    event.preventDefault();
    var $noteTitle = this.$("#noteTitle");
    var title = $noteTitle.val();
    $noteTitle.val("");
    
    var notebook = this.collection.notebook;
    var note = this.collection.create({
      "title": title
    }, {
      success: function () {
        Backbone.history.navigate(
          "notebooks/" + notebook.escape("id") + "/notes/" + note.escape("id"),
          { trigger: true }
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