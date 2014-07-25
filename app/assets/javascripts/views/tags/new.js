/*global Evernote, JST */
Evernote.Views.TagsNew = Backbone.View.extend({
  events: {
    "submit": "submitForm"
  },
  tagName: "form",
  template: JST["tags/new"],
  
  render: function () {
    var renderContent = this.template();
    
    this.$el.html(renderContent);
    
    return this;
  },
  
  submitForm: function (event) {
    event.preventDefault();
    var $tagName = $("#tagName");
    var tagName = $tagName.val();
    this.collection.create({
      name: tagName
    });
    
    $tagName.val("");
  }
});