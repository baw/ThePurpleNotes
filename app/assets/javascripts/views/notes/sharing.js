/*global Evernote, JST */
Evernote.Views.Sharing = Backbone.View.extend({
  events: {
    "click .share": "shareContent"
  },
  template: JST["notes/sharing"],
  
  initialize: function () {
    this.listenTo(this.model.sharing(), "sync", this.render);
  },
  
  render: function () {
    var renderedContent = this.template({
      shareURL: this.model.sharing() && this.model.sharing().get("url")
    });
    
    this.$el.html(renderedContent);
    
    return this;
  },
  
  shareContent: function (event) {
    this.model.sharing().set({
      "note_id": this.model.escape("id")
    });
    this.model.sharing().save({}, {
      success: function () {
        console.log("sharing save");
      }
    });
  }
});