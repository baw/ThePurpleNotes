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
    console.log(title);
    this.collection.create({
      "title": title
    });
  },
  
  render: function () {
    var renderedContent = this.template();
    
    this.$el.html(renderedContent);
    
    return this;
  }
});