Asana.Views.ListShow = Backbone.CompositeView.extend({
  template: JST['lists/list'],
  events: {},

  className: 'list',
  render: function () {
    var renderedContent = this.template({ list: this.model });
    this.$el.html(renderedContent);
    this.attachSubviews();

    return this;
  },

  initialize: function () {
    var that = this;
    this.model.items().each(function (item) {
      var _item = new Asana.Items._Item;
      that.addSubview('#list-items', _item.render());
    })
  },
})