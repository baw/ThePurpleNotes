/*global PurpleNotes, JST */
PurpleNotes.Views.TagsIndex = Backbone.View.extend({
  template: JST["tags/index"],
  
  initialize: function () {
    this.listenTo(this.collection, "sync add remove", this.render);
  },
  
  render: function () {
    var tags = _(this.collection.pluck("name")).uniq();
    
    var view = this;
    tags = tags.map(function (tagName) {
      return view.collection.findWhere({
        name: tagName
      });
    });
    
    var renderedContent = this.template({
      tags: tags
    });
    
    this.$el.html(renderedContent);
    
    return this;
  }
});