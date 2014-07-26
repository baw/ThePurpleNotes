/*global Evernote, JST */
Evernote.Views.TagsIndex = Backbone.View.extend({
  template: JST["tags/index"],
  
  initialize: function () {
    this.listenTo(this.collection, "sync add remove", this.render);
  },
  
  render: function () {
    var renderedContent = this.template({
      tags: this.collection.models
    });
    
    this.$el.html(renderedContent);
    
    return this;
  }
});