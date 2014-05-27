Asana.Collections.Projects = Backbone.Collection.extend({
  model: Asana.Models.Project,
  url: '/api/projects',
  comparator: function (project) {
    return project.get('created_at');
  },

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

  findList: function(listId) {
    for (var i = 0; i < this.models.length; i++) {
      var project = this.models[i];
      var lists = project.lists();
      var list = lists.getOrFetch(listId);
      if (list) {
        return list;
      }
    };

  },

  initialize: function() {},
});

Asana.projects = new Asana.Collections.Projects();