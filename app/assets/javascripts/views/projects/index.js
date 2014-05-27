Asana.Views.ProjectsIndex = Backbone.CompositeView.extend({
  template: JST['projects/index'],
  events: {
    'click .renderable-list': 'renderInListPane',
  },

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

  // renderInListPane: function(event) {
  //   listId =
  //   Backbone.history.navigate('/lists/')
  // },

  delete: function (event) {
    var projID = $(event.target).attr('data-id');
    var deletableProj = this.collection.get(projID);
    deletableProj.destroy();
  }
})