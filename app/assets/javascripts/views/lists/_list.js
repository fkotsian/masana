Asana.Views._List = Backbone.View.extend({
  template: JST['lists/_list'],
  events: {},

  tagName: 'li',
  className: 'project-list',
  render: function () {
    var renderedContent = this.template({ list: this.model });
    this.$el.html(renderedContent);
    return this;
  },

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
  },
})