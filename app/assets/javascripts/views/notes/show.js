/*global Evernote, JST, Pen */
Evernote.Views.NoteShow = Backbone.View.extend({
  template: JST["notes/show"],
  events: {
    "click .save": "saveContents"
  },
  
  afterRender: function () {
    this.pen = new Pen("#noteEditor");
  },
  
  initialize: function (options) {
    var that = this;
  },
  
  render: function () {
    var renderedContent = this.template({
      note: this.model
    });
    
    this.$el.html(renderedContent);
    
    return this;
  },
  
  saveContents: function (event) {
    var content = this.$("#noteEditor").text();
    this.model.save({ "content": content });
  }
});
