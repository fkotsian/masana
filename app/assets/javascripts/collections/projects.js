Asana.Collections.Projects = Backbone.Collection.extend({
  model: Asana.Models.Project,
  url: '/api/projects',
  getOrFetch: function(id) {
    var projects = this;
    var project = projects.get(id);

    if (!project) {
      project = new Asana.Models.Project({ id: id })
      project.fetch({
        success: function() { projects.add(project); }
      })
    }

    return project;
  },
  initialize: function() {},
});