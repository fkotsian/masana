Asana.Collections.Lists = Backbone.Collection.extend({
  initialize: function(models, options) {
    this.project = options.project;
  },

  model: Asana.Models.List,

  url: function() {
    return 'api/' + this.project.id + '/lists'
  }
})