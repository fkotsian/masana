Asana.Collections.Projects = Backbone.Collection.extend({
  model: Asana.Models.Project,
  urlRoot: '/api/projects',
  initialize: function() {},
})