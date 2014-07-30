Backbone.Collection.prototype.getOrFetch = function (id) {
  var that = this;
  
  var obj = this.get(id);
  if (obj) {
    return obj;
  } else {
    console.log("fetch");
    obj = new this.model({ "id": id });
    this.add(obj);
    
    obj.fetch({
      error: function () {
        that.remove(obj);
      }
    });
    
    return obj;
  }
};
