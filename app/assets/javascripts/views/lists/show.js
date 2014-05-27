Asana.Views.ListShow = Backbone.CompositeView.extend({
  template: JST['lists/list'],
  events: {
    'click .editable': showEdit,
  },

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
      var _item = new Asana.Views._Item({ model: item });
      that.addSubview('#list-items', _item.render());
    })
  },

  showEdit: function(event) {
    //access this subview -- not sure if this is how
    oldView = $(event.currentTarget);
    debugger
    //create new EditView
    editView = new Asana.Views._Form({ model = oldView.model });
    //remove this subview and append EditView
    this.removeSubview('#list-items', oldView);
    this.addSubview('#list-items', editView);
  },
})