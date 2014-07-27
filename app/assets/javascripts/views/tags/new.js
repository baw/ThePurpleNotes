/*global Evernote, JST */
Evernote.Views.TagsNew = Backbone.View.extend({
  events: {
    "submit": "submitForm"
  },
  tagName: "form",
  template: JST["tags/new"],
  
  initialize: function (options) {
    this.note = options.note;
  },
  
  render: function () {
    var renderContent = this.template();
    
    this.$el.html(renderContent);
    
    return this;
  },
  
  submitForm: function (event) {
    event.preventDefault();
    var $tagName = $("#tagName");
    var tagName = $tagName.val();
    
    Evernote.Collections.taggings.create({
      "name": tagName,
      "note_id": this.note.id
    });
    
    $tagName.val("");
  }
});