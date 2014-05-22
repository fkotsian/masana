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
  }
})