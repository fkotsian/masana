Asana.Views.ListShow = Backbone.CompositeView.extend({
  template: JST['lists/list'],
  initialize: function () {
    var that = this;
    var items = this.collection = this.model.items();
    view = this;

    if (items.length > 0) {
      items.each(function (item, index) {
        that.addItemView(item, index);
      });
    } else {
      var blankItem = items.create({
        title: 'Add an Item',
        description: 'New description',
        list_id: that.model.get('id'),
      });
      this.addItemView(blankItem);
    }

    this.listenTo(this.model, 'sync change:title change:description', this.render);
    this.listenTo(this.collection, "addNewItem", this.handleNewItem);

    // this.listenTo(items, 'sort', this.render);
  },

  handleNewItem: function(item){
    console.log('rendering due to new item')
    this.render();
  },

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
    console.log('rendering')
    var renderedContent = this.template({ list: this.model });
    this.$el.html(renderedContent);
    this.attachSubviews();

    return this;
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
    var $postable = $(event.target);

    var formData = $postable.parent().serializeJSON();
    this.model.save(formData.list, {
      success: function(resp) {
        // console.log("Successfully updated .postable list: " + resp.attributes);
      },
      error: function(resp) {
        // console.log("Error in updating .postable list: " + resp);
      }
    });
  },

  incrementItems: function(threshold){
    var items = this.model.items();
    items.each(function(item) {
      var thisRank = item.get('rank');
      // console.log(item.get('title') + "'s old rank: " + thisRank);
      if (thisRank > threshold) {
        var newRank = parseInt(thisRank) + 1;
        // console.log('updating ' + item.get('title') + " to " + newRank);
        item.set('rank', newRank);
        // item.set('rank', newRank);
        item.save({}, {
          success: function(updatedItem){
            var newRank = updatedItem.get('rank');
            var data = updatedItem.get('title');
            // console.log(data + "'s new rank: " + newRank);
          },
          wait: true,
          error: function(resp){
            // console.log("ERRORR!@@@@!!!")
          }
        });
      }
    })
  },

  attachNewList: function(event) {
    console.log('creating new blank item')

    event.preventDefault();
    var $row = $(event.target.parentElement.parentElement);
    var targetRank = parseInt($row.find('.item-drag-hook').text());
    this.incrementItems(targetRank);

    var items = this.model.items();
    //can refactor this into an Items collection factory method
    var blankItem = items.create({
      title: '',
      description: 'New description',
      list_id: this.model.get('id'),
      rank: targetRank + 1,
    },  {
      wait: true,
      success: function() {},
    });
    // how does it attach this before the item saves are done?
    this.addItemView(blankItem, targetRank);
    this.collection.trigger('addNewItem', blankItem);
  },


  addItemView: function(item, index){
    //index will be new location in list
    //if an item is already there, it will be moved up
    var _item = new Asana.Views._Item({
      model: item,
      project_id: this.model.get('project_id')
    });
    var renderedItem = _item.render();
    this.addSubview('#list-items', renderedItem, index);
  },

  renderInItemPane: function(event) {
    var $renderable = $(event.target.parentElement);
    var itemId = $renderable.find('.item-assignee-btn').attr('data-id');
    if (itemId) {
      var url = '#lists/' + this.model.escape('id') + '/items/' + itemId;
      Backbone.history.navigate(url, { trigger: true });
    }
  },
  clear: function(event) {
    $(event.target).val('');
  },

})