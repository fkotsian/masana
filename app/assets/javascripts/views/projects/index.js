Asana.Views.ProjectsIndex = Backbone.CompositeView.extend({
  template: JST['projects/index'],

  initialize: function () {
    this.listenTo(this.collection, 'add remove sync', this.render);
  },

  render: function () {
    var renderedContent = this.template({
      projects: this.collection
    });

    this.$el.html(renderedContent);
    return this;
  },

  delete: function (event) {
    var projID = $(event.target).attr('data-id');
    var deletablProjt = this.collection.get(projID);
    deletableProj.destroy();
  }
})