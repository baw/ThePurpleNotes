Backbone.Model.prototype.parse = function (jsonResponse) {
  if (jsonResponse[this.associatedWithName]) {
    this[this.associatedWithName]().set(jsonResponse[this.associatedWithName], { parse: true });
    delete jsonResponse[this.associatedWithName];
  }
  
  return jsonResponse;
};