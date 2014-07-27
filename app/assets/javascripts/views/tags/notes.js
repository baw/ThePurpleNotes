/*global Evernote, JST */
Evernote.Views.TagNotes = Backbone.View.extend({
  template: JST["tags/notes"],
  
  initialize: function (options) {
    this.notes = options.notes;
  },
  
  render: function () {
    var renderContent = this.template({
      notes: this.notes,
      tagging: this.model
    });
    
    this.$el.html(renderContent);
    
    return this;
  }
});