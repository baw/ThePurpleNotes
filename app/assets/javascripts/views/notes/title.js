/*global Evernote, JST */
Evernote.Views.NoteTitle = Backbone.View.extend({
  events: {
    "click .editTitle": "editTitle",
    "submit form": "changeTitle"
  },
  template: JST["notes/title"],
  
  changeTitle: function (event) {
    event.preventDefault();
    var title = $("#newTitle").val();
    
    this.model.save({
      "title": title
    });
    
    this.edit = false;
    this.render();
  },
  
  editTitle: function (event) {
      event.preventDefault();
      this.edit = true;
      this.render();
  },
  
  initialize: function () {
    this.edit = false;
    this.listenTo(this.model, "change:title", this.render);
  },
  
  render: function () {
    var renderedContent = this.template({
      edit: this.edit,
      note: this.model
    });
    
    this.$el.html(renderedContent);
    
    return this;
  }
});