Asana.Collections.Lists = Backbone.Collection.extend({
  model: Asana.Models.List,
  url: function() {
    return 'api/projects/' + this.project.id + '/lists';
  },
  comparator: function (list) {
    return list.get('created_at');
  },

  getOrFetch: function(id) {
    var lists = this;
    var list = lists.get(id);

    if (!list) {
      list = new Asana.Models.List({ id: id })
      list.fetch({
        success: function() { lists.add(list); }
      })
    }

    return list;
  },

  initialize: function(models, options) {
    this.project = options.project;
  },

})