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
    this.setupPage();
  },

  setupPage: function() {
    var projectsPane = new Asana.Views.ProjectsIndex({
      collection: this.collection
    });

    var defaultList = this.collection.first().lists().first();
    var listPane = new Asana.Views.ListShow({
      model: defaultList
    });  // this should be all owned_tasks eventually, but for now it's just lists.first()
    var defaultItem = new Asana.Models.Item();
    var itemPane = new Asana.Views.ItemShow({
      model: defaultItem
     });

    this.removeSubviews('#projects-pane');
    this.removeSubviews('#list-pane');
    this.removeSubviews('#item-pane');
    this.addSubview('#projects-pane', projectsPane.render());
    this.addSubview('#list-pane', listPane.render());
    this.addSubview('#item-pane', itemPane.render());
  },

  renderInProjectPane: function(event) {},

  renderInListPane: function(event) {},

  renderInItemPane: function(event) {},
})