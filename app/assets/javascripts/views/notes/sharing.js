/*global PurpleNotes, JST */
PurpleNotes.Views.Sharing = Backbone.View.extend({
  events: {
    "click .share": "shareContent",
    "click .unShare": "unShareContent"
  },
  template: JST["notes/sharing"],
  
  initialize: function () {
    this.sharing = this.model && this.model.sharing();
    this.listenTo(this.sharing, "sync", this.render);
  },
  
  render: function () {
    var renderedContent = this.template({
      shareURL: this.sharing && this.sharing.get("active") && this.sharing.get("url")
    });
    
    this.$el.html(renderedContent);
    
    return this;
  },
  
  shareContent: function (event) {
    this.sharing.set({
      "note_id": this.model.escape("id"),
      "active": true
    });
    this.sharing.save();
  },
  
  unShareContent: function (event) {
    this.sharing.save({
      active: false
    });
  }
});