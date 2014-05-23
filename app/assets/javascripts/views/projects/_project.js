Asana.Views._Project = Backbone.CompositeView.extend({
  template: JST['projects/_project'],
  events: {},

  tagName: 'li',
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
      // debugger
      // it doesn't know how to get the list title?
      that.addSubview('#project-lists', _list.render())
    })

  },
})