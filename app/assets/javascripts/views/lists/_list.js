Asana.Views._List = Backbone.View.extend({
  template: JST['lists/_list'],
  events: {
    // on click render in lists-pane
  },
  tagName: 'li',
  render: function () {
    var renderedContent = this.template({ list: this.model });
    this.$el.html(renderedContent);
    return this;
  },
  initialize: function () {},
})