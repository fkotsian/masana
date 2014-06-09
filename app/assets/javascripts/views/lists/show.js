Asana.Views.ListShow = Backbone.CompositeView.extend({
  template: JST['lists/list'],
  events: {
    // 'click .editable': 'insertEdit',
    'blur h3.postable, p.postable': 'updateList',
    'submit h3.postable, p.postable': 'updateList',
    'submit #list-form': 'debug',
    'submit #list-form': 'attachNewList',
    // 'click p.postable': 'clear',
    'click .renderable-item': 'renderInItemPane',
    'keydown input': 'navigateUpOrDown',
  },
  
  className: 'row',
  render: function () {
    console.log('rendering')
    var renderedContent = this.template({ list: this.model });
    this.$el.html(renderedContent);
    this.attachSubviews();

    return this;
  },
  
  debug: function (event) {
    event.preventDefault();
    console.log('preventing full-form submit')
    /*This is for now. 
      Refactor: to submit whole form, update each item to have unique _name_, 
      then nest all _items under _list_.
      This will save all the items to the list model. 
      Probably need a handler for saving this._items in the List model. */
  },

  initialize: function () {
    var that = this;
    var items = this.collection = this.model.items();
    this._currentRank = 1;
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
    
    var defaultItem = items.first();
    this.createItemPane(defaultItem);

    this.listenTo(this.model, 'sync change:title change:description', this.render);
    this.listenTo(this.collection, "addNewItem", this.handleNewItem);
    // this.listenTo(items, 'sort', this.render);

    // setInterval(10, saveMyWork);
  },
  
  saveMyWork: function() {
    // find form (add id to it - listItems form)
    // submit form
    // but preventDefault, don't re-render
    // implement concurrent-typers (if type in _item have to render in _itemView)
    
    // alternatively to async save: Asana seems to have async save, AND a save every time we enter/leave the _item form. We can do that too. Say, 30 seconds save-all, save _item model when leave (up/down/submit). Still need JQuery concurrent-typer (easy enough bc _item is a subview, can $ on it.)
  },

  // insertEdit: function(event) {
  //   $editable = $(event.target);
  //   switch ($editable.prop('tagName')) {
  //   case 'H3':
  //     input = '<form><input type="text" value="' + $editable.text() + '" name="list[title]"></input></form>';
  //     break;
  //   case 'P':
  //     input = '<form><input type="text" value="' + $editable.text() + '" name="list[description]"></input></form>';
  //     break;
  //   default:
  //     input = '<form><input type="text" value="' + $editable.text() + '" name="item[title]"></input></form>';
  //   }
  //   $editable.toggleClass('editable');
  //   $editable.toggleClass('postable');
  // 
  //   $editable.html(input);
  // 
  //   $editable.find('input').focus()
  // },

  updateList: function(event) {
    console.log('updating list!')
    event.preventDefault();
    var $postable = $(event.target);

    var formData = $postable.serializeJSON();
    this.model.save(formData.list, {
      success: function(resp) {
        // console.log("Successfully updated .postable list: " + resp.attributes);
      },
      error: function(resp) {
        // console.log("Error in updating .postable list: " + resp);
      }
    });
  },

  decrementItems: function(threshold){
    console.log('decrementing')
    var items = this.model.items();
    items.each(function(item) {
      var thisRank = item.get('rank');
      if (thisRank > threshold) {
        var newRank = parseInt(thisRank) - 1;
        item.set('rank', newRank);
        item.save({}, {
          wait: true,
          success: function(updatedItem){},
          error: function(resp){},
        });
      }
    })
  },

  incrementItems: function(threshold){
    var items = this.model.items();
    items.each(function(item) {
      var thisRank = item.get('rank');
      if (thisRank > threshold) {
        var newRank = parseInt(thisRank) + 1;
        item.set('rank', newRank);
        item.save({}, {
          wait: true,
          success: function(updatedItem){},
          error: function(resp){},
        });
      }
    })
  },

  attachNewList: function(event) {
    event.preventDefault();
    console.log('creating new blank item')
    debugger
    
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
    }, {
      wait: true,
    });
    // Refactor: how can we wait til saves are done to do this? Or stack events on top of saves? Need no renders til done.
    this.addItemView(blankItem, targetRank);
    this.collection.trigger('addNewItem', blankItem);

    //NB: New items are still not saved to DB (and so occasionally cannot be accessed by keyup/keydown)
  },


  addItemView: function(item, index){
    var _item = new Asana.Views._Item({
      model: item,
      project_id: this.model.get('project_id'),
      parent: this,
    });
    var renderedItem = _item.render();
    this.addSubview('#list-items', renderedItem, index);
  },

  handleNewItem: function(item){
    this.render();
    var newRow = $(this.$el.find('tr[data-item-rank="' + item.get('rank') + '"]')[0]);
    // allow delay to account for delay in render(list) due to updating ranks
    setTimeout(function(){
      newRow.find('.editable').click();
    }, 500);
  },
  
  createItemPane: function(item) {
    var itemView = new Asana.Views.ItemShow({
      model:   item,
      project: this.model.project_id,
    });
    this._itemView = itemView;
    this.addSubview('#item-pane', itemView);
  },

  renderInItemPane: function(event) {
    var $renderable = $(event.target).closest('tr');
    var itemId = $renderable.find('.item-assignee-btn').attr('data-id');
    console.log('Now rendering in item pane: ' + itemId)
    var item = this.collection.getOrFetch(itemId);
    var newItemView = new Asana.Views.ItemShow({
      model: item,
      projectId: this.model.get('project_id')
    });
    this.removeSubview('#item-pane', this._itemView);
    this._itemView = newItemView;
    this.addSubview('#item-pane', newItemView);
     
    // if (itemId) {
    //   var url = '#lists/' + this.model.escape('id') + '/items/' + itemId;
    //   // Backbone.history.navigate(url, { trigger: true });
    // }
  },

  navigateUpOrDown: function(keypress) {
    console.log('keypress!' + keypress.which + '; ' + this._currentRank)
    // var dir;
    if (keypress.which === 40) {
      // dir = 1;
      this.setCurrentRank(this._currentRank + 1);
    } else if (keypress.which === 38) {
      // dir = -1;
      this.setCurrentRank(this._currentRank - 1);
    }
  },

  setCurrentRank: function(rank) {
    if (rank < 1) { rank = 1 }
    else if (rank > this.collection.length) { rank = this.collection.length };
    console.log('setting rank to ' + rank)
    this._currentRank = rank;
    var currentItem = $('*[data-item-rank="' + rank + '"]');
    debugger
    // currentItem.find('.editable').click();
    currentItem.find('.postable').focus();
  },

  clear: function(event) {
    $(event.target).val('');
  },

})