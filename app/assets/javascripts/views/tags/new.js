/*global PurpleNotes, JST */
PurpleNotes.Views.TagsNew = Backbone.View.extend({
  className: "tagForm fa fa-plus",
  events: {
    "submit": "submitForm",
    "focus #tagName": "newTagFocus",
    "blur #tagName": "newTagBlur"
  },
  tagName: "form",
  template: JST["tags/new"],
  
  initialize: function (options) {
    this.note = options.note;
  },
  
  newTagBlur: function (event) {
    var $target = $(event.target);
    $target.removeClass("tagNameExpanded");
    $target.addClass("tagTextGoAway");
    $target.parent().addClass("fa fa-plus");
  },
  
  newTagFocus: function (event) {
    var $target = $(event.target);
    $target.addClass("tagNameExpanded");
    $target.removeClass("tagTextGoAway");
    $target.parent().removeClass("fa fa-plus");
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
    
    PurpleNotes.Collections.taggings.create({
      "name": tagName,
      "note_id": this.note.id
    });
    
    $tagName.val("").blur();
  }
});