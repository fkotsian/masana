Asana.Views._List = Backbone.View.extend({
  template: JST['lists/_list'],
  events: {
    // on click render in lists-pane
  },
  render: function () {
    var renderedContent = this.template({ list: this.model });
    this.$el.html(renderedContent);

    this.attachSubviews();
    return this;
  },
  initialize: function () {}
})