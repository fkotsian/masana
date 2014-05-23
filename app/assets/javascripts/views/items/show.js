Asana.Views.ItemShow = Backbone.View.extend({
  template: JST['items/item'],
  events: {},

  render: function () {
    var renderedContent = this.template({ item: this.model });
    this.$el.html(renderedContent);
    return this;
  },
})