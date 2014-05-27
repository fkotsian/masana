Asana.Views.ListShow = Backbone.CompositeView.extend({
  template: JST['lists/list'],
  events: {
    'click .editable': 'insertEdit',
    'blur h3.postable, p.postable': 'updateList',
    'submit h3.postable, p.postable': 'updateList',
    // 'click p.postable': 'clear',
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
      var _item = new Asana.Views._Item({ model: item ,
                    project_id: that.model.get('project_id') });
      that.addSubview('#list-items', _item.render());
    })

    this.listenTo(this.model, 'change', this.render);

    // this.listenTo(this.subviews(), 'add remove', this.render); //don't need yet
  },

  insertEdit: function(event) {
    $editable = $(event.target);
    switch ($editable.prop('tagName')) {
    case 'H3':
      input = '<form><input type="text" value="' + $editable.text() + '" name="list[title]"></input></form>';
      break;
    case 'P':
      input = '<form><input type="text" value="' + $editable.text() + '" name="list[description]"></input></form>';
      break;
    default:
      input = '<form><input type="text" value="' + $editable.text() + '" name="item[title]"></input></form>';
   }
    $editable.toggleClass('editable');
    $editable.toggleClass('postable');

    $editable.html(input);
  },

  updateList: function(event) {
    event.preventDefault();
    $postable = $(event.target);
    // $postable.toggleClass('postable');
    // $postable.toggleClass('editable');

    formData = $postable.parent().serializeJSON();
    this.model.save(formData, {
      success: function(resp) {
        console.log("Successfully updated .postable list: " + resp.item);
      },
      error: function(resp) {
        console.log("Error in updating .postable: " + resp);
      }
    });
  },

  clear: function(event) {
    $(event.target).val('');
  },

})