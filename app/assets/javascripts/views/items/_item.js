Asana.Views._Item = Backbone.View.extend({
  template: JST['items/_item'],
  events: {},

  render: function () {
    var renderedContent = this.template({ item: this.model });
    this.$el.html(renderedContent);
    return this;
  },
})