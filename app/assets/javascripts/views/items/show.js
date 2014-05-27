Asana.Views.ItemShow = Backbone.View.extend({
  template: JST['items/item'],
  events: {},

  render: function () {
    var renderedContent = this.template({ item: this.model });
    this.$el.html(renderedContent);

    // attach comments as a subview; if this.model then attach

    return this;
  },

  initialize: function(options) {
    this.projectId = options.projectId;
  }
})