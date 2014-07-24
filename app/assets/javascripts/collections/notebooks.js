/*global Evernote */
Evernote.Collections.Notebooks = Backbone.Collection.extend({
  url: "api/notebooks",
  model: Evernote.Models.Notebook,
  
  comparator: "title",
  
  getOrFetch: function (id) {
    var notebooks = this;
    
    var notebook = this.get(id);
    if (notebook) {
      notebook.fetch();
    } else {
      notebook = new this.model({ id: id });
      notebook.fetch({
        success: function () {
          notebooks.add(notebook);
        }
      });
    }
    
    return notebook;
  }
});