/*global Evernote, JST */
Evernote.Views.TagNotes = Backbone.View.extend({
  template: JST["tags/notes"],
  
  initialize: function (options) {
    this.notes = options.notes;
    this.listenTo(
      Evernote.Collections.taggings,
      "change:name add remove",
      this.render
    );
    
    var view = this;
    _(this.notes).each(function (note) {
      view.listenTo(note, "change sync", view.render);
    });
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