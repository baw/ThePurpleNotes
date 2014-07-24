Backbone.Collection.prototype.getOrFetch = function (id) {
  var that = this;
  
  var obj = this.get(id);
  if (obj) {
    obj.fetch();
  } else {
    obj = new this.model({ "id": id });
    obj.fetch({
      success: function () {
        that.add(obj);
      }
    });
  }
  
  return obj;
};