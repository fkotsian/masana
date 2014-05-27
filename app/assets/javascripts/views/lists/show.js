Asana.Views.ListShow = Backbone.CompositeView.extend({
  template: JST['lists/list'],
  events: {
    'click .editable': 'removeShow',
    'removeShow': 'insertEdit' //bubble up from subview-- how?
    //and also how to bring it back = 'click outside-editable'?
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

    // this.listenTo(this.subviews(), 'add remove', this.render); //don't need yet
  },

  removeShow: function() {

  },
  insertEdit: function() {

  },

  showEdit: function(event) {
    //access this subview -- not sure if this is how
    //use subviews() array
    oldView = $(event.currentTarget);
    debugger
    //create new EditView
    editView = new Asana.Views._Form({ model: oldView.model });
    //remove this subview and append EditView
    // should I be routing here?
    this.replaceSubview('#list-items', oldView, newView);
  },
})