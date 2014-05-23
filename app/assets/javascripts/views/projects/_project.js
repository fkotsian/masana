Asana.Views._Project = Backbone.CompositeView.extend({
  template: JST['projects/_project'],
  events: {
    'click .project-list': 'displayInListPane',
  },
  //
  displayInListPane: function (event) {
    console.log("You clicked list el: " + $(event.target));
  },

  tagName: 'li',
  className: 'project',
  render: function () {
    var renderedContent = this.template({ project: this.model });
    this.$el.html(renderedContent);

    this.attachSubviews();
    return this;
  },
  initialize: function () {
    var lists = this.model.lists();
    var that = this;
    lists.each(function (list) {
      var _list = new Asana.Views._List({ model: list });
      that.addSubview('#project-lists', _list.render());
    })

  },
})