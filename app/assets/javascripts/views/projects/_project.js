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
  initialize: function () {},
})