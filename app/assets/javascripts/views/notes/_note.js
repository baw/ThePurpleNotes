/*global Evernote, JST */
Evernote.Views.NoteView = Backbone.View.extend({
  className: "list-group-item",
  tagName: "li",
  template: JST["notes/_note"],
  
  initialize: function (options) {
    this.notebook = options.notebook;
  },
  
  render: function () {
    var renderedContent = this.template({
      note: this.model,
      notebook: this.notebook
    });
    
    this.$el.html(renderedContent);
    
    return this;
  }
});