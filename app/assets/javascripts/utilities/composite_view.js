Backbone.CompositeView = Backbone.View.extend({
  addSubview: function (selector, subview) {
    this.subviews(selector).push(subview);
    
    this.attachSubview(selector, subview);
  },
  
  attachSubview: function (selector, subview) {
    this.$(selector).append(subview.render().$el);
    
    subview.delegateEvents();
  },
  
  remove: function () {
    Backbone.View.prototype.call(this);
    _(this.subviews).each(function (subviews) {
      _(subviews).each(function (subview) {
        subview.remove();
      });
    });
  },
  
  removeSubview: function (selector, subview) {
    subview.remove();
    
    var subviews = this.subviews(selector);
    subviews.splice(subviews.indexOf(subview), 1);
  },
  
  subviews: function (selector) {
    this._subviews = this._subviews || {};
    
    if (selector) {
      this._subviews[selector] = this._subviews[selector] || [];
      return this._subviews[selector];
    } else {
      return this._subviews;
    }
  }
});