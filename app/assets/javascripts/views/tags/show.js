/*global Evernote, JST */
Evernote.Views.TagShow = Backbone.View.extend({
  className: "tag",
  events: {
    "click .tagDelete" : "tagDelete"
  },
  tagName: "span",
  template: JST["tags/show"],
  
  initialize: function () {
    this.listenTo(this.model, "change:title", this.render);
  },
  
  render: function () {
    var renderContent = this.template({
      tag: this.model
    });
    
    this.$el.html(renderContent);
    
    return this;
  },
  
  tagDelete: function (event) {
    event.preventDefault();
    this.model.destroy();
  }
});