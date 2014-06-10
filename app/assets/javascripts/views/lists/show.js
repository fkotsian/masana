Asana.Views.ListShow = Backbone.CompositeView.extend({
  template: JST['lists/list'],
  events: {
    // 'click .editable': 'insertEdit',
    'blur h3.postable, p.postable': 'updateList',
    'submit h3.postable, p.postable': 'updateList',
    'submit #list-form': 'preventWholePost',
    'submit input': 'attachNewList',
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
  
  preventWholePost: function (event) {
    event.preventDefault();
    console.log('preventing full-form submit')
    /*Refactor: to submit whole form, update each item to have unique _name_, 
      then nest all _items under _list_.
      This will save all the items to the list model. 
      Probably need a handler for saving this._items in the List model. */
  },
  
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
    // this._decrementModels(threshold);
    this._decrementViews(threshold);
  },

  _decrementModels: function(threshold){
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
  
  _decrementViews: function(threshold){
    var items = this.$el.find('.renderable-item');
    _.each(items, function(item) {
      var dragHook = $(item).find('.item-drag-hook');
      var dispRank = parseInt(dragHook.text());
      debugger
      if (dispRank > threshold) {
        dragHook.text(dispRank - 1);
      } 

      var itemRank = $(item).attr('data-item-rank');
      if (itemRank > threshold) {
        $(item).attr('data-item-rank', dispRank - 1)
      }
    })
  },

  incrementItems: function(threshold){
    this._incrementModels(threshold);
    this._incrementViews(threshold);
  },
  
  _incrementModels: function(threshold){
    var items = this.collection;
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
  
  _incrementViews: function(threshold){
    var items = this.$el.find('.renderable-item');
    _.each(items, function(item) {
      var dragHook = $(item).find('.item-drag-hook');
      var dispRank = parseInt(dragHook.text());
      if (dispRank > threshold) {
        dragHook.text(dispRank + 1);
      } 

      var itemRank = $(item).attr('data-item-rank');
      if (itemRank > threshold) {
        $(item).attr('data-item-rank', dispRank + 1)
      }
    })
  },
  
  attachNewList: function(prevRank) {
    this.incrementItems(prevRank);
    var that = this;
    //can refactor this into an Items collection factory method
    // it's saing this is a DOM element?
    var blankItem = this.collection.create({
      title: '',
      description: 'New description',
      list_id: this.model.get('id'),
      rank: prevRank + 1,
    }, {
      wait: true,
      success: function(resp) {
        that.addItemView(blankItem, prevRank);
        that.handleNewItem(prevRank + 1);
      }
    });

    //NB: New items are still not saved to collection (and so occasionally cannot be accessed by keyup/keydown) -- need to refetch collection
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

  handleNewItem: function(rank){
    var newRow = $(this.$el.find('tr[data-item-rank="' + rank + '"]')[0]);
    setTimeout(function(){
      newRow.find('.postable').click();
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
    currentItem.find('.postable').focus();
  },

  clear: function(event) {
    $(event.target).val('');
  },

})