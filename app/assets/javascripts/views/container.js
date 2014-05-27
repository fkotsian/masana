Asana.Views.Container = Backbone.CompositeView.extend({
  template: JST['container'],

  events: {},

  className: 'pane-box row',
  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);

    this.attachSubviews();
    return this;
  },

  initialize: function () {
    var projectsPane = new Asana.Views.ProjectsIndex({ collection: Asana.projects });
    var defaultList = Asana.projects.first().lists().first();
    var listPane = new Asana.Views.ListShow({ model: defaultList });  // this should be all owned_tasks eventually, but for now it's just lists.first()
    var defaultItem = new Asana.Models.Item();
    var itemPane = new Asana.Views.ItemShow({ model: defaultItem }); // this should default to be a new_item

    this.addSubview('#projects-pane', projectsPane.render());
    this.addSubview('#list-pane', listPane.render());
    this.addSubview('#item-pane', itemPane.render());

    //initialize listenTos here
  },

  renderInProjectPane: function(event) {},

  renderInListPane: function(event) {},

  renderInItemPane: function(event) {},
})