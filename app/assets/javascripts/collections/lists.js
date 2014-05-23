Asana.Collections.Lists = Backbone.Collection.extend({
  initialize: function(models, options) {
    this.project = options.project;
  },

  model: Asana.Models.List,

  comparator: function (list) {
    return list.get('created_at');
  },

  url: function() {
    return 'api/' + this.project.id + '/lists'
  }
})