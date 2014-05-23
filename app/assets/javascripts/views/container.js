Asana.Views.Container = Backbone.CompositeView.extend({
  template: JST['container'],

  events: {},

  className: 'pane-box container',
  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);

    this.attachSubviews();
    return this;
  },

  // renderPanes: function() {
  // },

  initialize: function () {
    var projectsPane = new Asana.Views.ProjectsIndex({ collection: Asana.projects });
    var listPane = new Backbone.View();
    var itemPane = new Backbone.View();

    this.addSubview('#projects-pane', projectsPane.render());
    this.addSubview('#list-pane', listPane.render());
    this.addSubview('#item-pane', itemPane.render());

    //initialize listenTos here
  },
})