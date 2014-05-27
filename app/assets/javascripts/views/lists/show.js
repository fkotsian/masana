Asana.Views.ListShow = Backbone.CompositeView.extend({
  template: JST['lists/list'],
  events: {
    'click .editable': 'insertEdit',
    // 'blur .postable': 'updateList',
    // 'submit .postable': 'updateList',
    // 'blur .postable': 'updateItem',
    // 'removeShow': 'insertEdit' //bubble up from subview-- how?
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

    // this.listenTo(this.model.items(), 'change', this.render);
    // might be better served as a listenTo on the subview..
    // does 'change' give access to the changed item? then I can rerender just that one


    // this.listenTo(this.subviews(), 'add remove', this.render); //don't need yet
  },

  // removeShow: function() {
  //
  // },
  insertEdit: function(event) {
    $editable = $(event.target);
    // input = '<td class="item-title postable">' + $editable.attr('')
    switch ($editable.prop('tagName')) {
    case 'H*':
      input = '<form><input type="text" value="' + $editable.text() + '" name="list[title]"></input></form>';
      break;
    case 'P':
      input = '<form><input type="text" value="' + $editable.text() + '" name="list[description]"></input></form>';
      break;
    default:
      input = '<form><input type="text" value="' + $editable.text() + '" name="item[title]"></input></form>';
    }
    input = '<form><input type="text" value="' + $editable.text() + '" name="item[title]"></input></form>';
    $editable.toggleClass('editable');
    $editable.toggleClass('postable');
    $editable.html(input);
  },

  updateList: function(event) {
    $form = $(event.target).parent();
    formData = $form.serializeJSON();
    this.model.save(formData);
  },

  updateItem: function(event) {
    $form = $(event.target).parent();
    formData = $form.serializeJSON();
    this.model.lists().save(formData); //still won't work bc list_id not in formData
  },
  //
  // showEdit: function(event) {
  //   //access this subview -- not sure if this is how
  //   //use subviews() array
  //   oldView = $(event.currentTarget);
  //   debugger
  //   //create new EditView
  //   editView = new Asana.Views._Form({ model: oldView.model });
  //   //remove this subview and append EditView
  //   // should I be routing here?
  //   this.replaceSubview('#list-items', oldView, newView);
  // },
})