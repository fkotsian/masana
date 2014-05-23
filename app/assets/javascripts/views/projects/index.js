Asana.Views.ProjectsIndex = Backbone.CompositeView.extend({
  template: JST['projects/index'],
  events: {},

  initialize: function () {
    this.listenTo(this.collection, 'remove sync', this.render);

    var that = this;
    this.collection.each(function (project) {
      var _project = new Asana.Views._Project({ model: project });
      that.addSubview('#projects', _project.render());
    });
  },

  className: 'projects-index',
  render: function () {
    var renderedContent = this.template({
      projects: this.collection
    });

    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  },

  delete: function (event) {
    var projID = $(event.target).attr('data-id');
    var deletableProj = this.collection.get(projID);
    deletableProj.destroy();
  }
})