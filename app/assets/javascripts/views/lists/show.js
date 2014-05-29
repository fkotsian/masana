Asana.Views.ListShow = Backbone.CompositeView.extend({
  template: JST['lists/list'],
  events: {
    'click .editable': 'insertEdit',
    'blur h3.postable, p.postable': 'updateList',
    'submit h3.postable, p.postable': 'updateList',
    'submit td.postable': 'attachNewList',
    // 'click p.postable': 'clear',
    'click .renderable-item': 'renderInItemPane',
    // 'click .blank-item': 'subEmptyItem',

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
    var items = this.model.items();

    if (items.length > 0) {
      items.each(function (item) {
        var _item = new Asana.Views._Item({ model: item,
                                            project_id: that.model.get('project_id') });
        that.addSubview('#list-items', _item.render());
      })
    } else {
      var blankItem = items.create({ title: 'Add an Item',
                                     description: 'New description',
                                     list_id: that.model.get('id'), });
     debugger
     //refactor: can make a blankItem view extending subview --
     //add the class and the listener to clear on first click
      var _blankItem = new Asana.Views._Item({ model: blankItem,
                                          project_id: that.model.get('project_id') });
      that.addSubview('#list-items', _blankItem.render());
    }

    this.listenTo(this.model, 'sync change', this.render);
    this.listenTo(items, 'add', this.render);

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
    $editable.find('input').focus()
  },

  updateList: function(event) {
    event.preventDefault();
    $postable = $(event.target);
    // $postable.toggleClass('postable');
    // $postable.toggleClass('editable');

    formData = $postable.parent().serializeJSON();
    this.model.save(formData, {
      success: function(resp) {
        console.log("Successfully updated .postable list: " + resp.attributes);
      },
      error: function(resp) {
        console.log("Error in updating .postable: " + resp);
      }
    });
  },

  attachNewList: function(event) {
    event.preventDefault();

    console.log('attaching new item k')
    var targetRank = $(event.target.parentElement.parentElement)
        .find('.item-drag-hook').text();
    targetRank = parseInt(targetRank);

    var items = this.model.items();
    items.each(function(item) {
      var thisRank = item.get('rank');
      if (thisRank > targetRank) {
        item.set('rank', parseInt(thisRank) + 1);
        item.save({});
      }
    })
    //can refactor this into an Items collection factory method
    var blankItem = items.create({
                                    title: '',
                                    description: 'New description',
                                    list_id: this.model.get('id'),
                                    rank: targetRank + 1,
                                },{
                                  wait: true,
                                  success: function(resp) {console.log('goddammit it saved!')},
                                  error: function(resp) {console.log('no savey new')},
                                });
    var _blankItem = new Asana.Views._Item({
                                        model: blankItem,
                                        project_id: this.model.get('project_id'),
                                          });
    this.addSubview('#list-items', _blankItem.render());

    //now focus it and trigger click events on this new subview (ie move the cursor down there)
  },

  renderInItemPane: function(event) {
    $renderable = $(event.target.parentElement);
    itemId = $renderable.find('.item-assignee-btn').attr('data-id');
    if (itemId) {
      var url = '#lists/' + this.model.escape('id') + '/items/' + itemId;
      Backbone.history.navigate(url, { trigger: true });
    }
  },


  clear: function(event) {
    $(event.target).val('');
  },

})