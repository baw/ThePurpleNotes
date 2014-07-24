Evernote.Views.NoteShow = Backbone.View.extend({
  template: JST["notes/show"],
  events: {
    "click .save": "saveContents",
    "keyup #noteEditor": "autoSave"
  },
  
  afterRender: function () {
  },
  
  autoSave: function () {
    var view = this;

    this.timeout && clearTimeout(this.timeout);
    this.timeout = setTimeout(function () {
      view.saveContents();
    }, 2000);
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
