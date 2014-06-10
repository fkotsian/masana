Asana.Views._Item = Backbone.View.extend({
  template: JST['items/_item'],

  initialize: function(options) {
    this.project_id = options.project_id;
    this.parent = options.parent;

    //listen for rank change and re-render
    // this.listenTo(this.model, 'sync', this.render);
  },

  events: {
    // 'click input.submit-assignment-btn': 'assignToUser',
    'click input.assignee-email': 'clear',
    'focus .postable': 'selectRow',
    'blur .postable': 'handleInputBlur',
    // 'submit .postable': 'handleSubmit',
    'click .item-delete-btn': 'handleDeleteButton',
    'keydown input': 'maybeDeleteOrAdd',
  },

  tagName: 'tr',
  className: 'list-item renderable-item',
  attributes: function(){return{'data-item-rank': this.model.get('rank')}},
  render: function () {
    var renderedContent = this.template({ item: this.model });
    this.$el.html(renderedContent);
    return this;
  },
  
  selectRow: function(event) {
    var $input = $(event.target);
    var $row = $input.closest('tr');
    $row.addClass('selected');
  },
  
  deselectRow: function(event) {
    var $input = $(event.target);
    var $row = $input.closest('tr');
    $row.removeClass('selected');
  },

  handleInputBlur: function(event) {
    this.deselectRow(event);    
    var $input = $(event.target);
    $input.attr('value', $input.val());
    this.updateItem($input);
  },

  handleSubmit: function(event) {
    event.preventDefault();
    this.deselectRow(event);    
    var $input = $(event.target);
    this.updateItem($input);
    
    var prevRank = this.model.get('rank');
    this.parent.attachNewList(prevRank);
  },

  updateItem: function($input) {
    var inputData = $input.serializeJSON().item;
    this.model.save(inputData, {
      success: function(resp) {
        console.log("Successfully updated .postable; title: " + resp.attributes.title);
      },
      error: function(resp) {
        console.log("Error in updating .postable; rank: " + resp.attributes.rank);
      }
    });
  },

  assignToUser: function(event) {
    event.preventDefault();

    var $assignInput = $(event.target).parent();
    var newAssigneeEmail = $assignInput.serializeJSON().new_assignee_email;
    this.model.save({ 'newAssigneeEmail': newAssigneeEmail },{
      success: function(resp) {
        console.log("Successfully saved assignment: " + resp);
      },
      error: function(resp) {
        console.log("Error in assigning task: " + resp);
        // debugger
      }
    });
    // possibly trigger collection to re-render (need listener on collection)
    // this.render() // render this model // or use a listener on this.model.sync => render()
  },

  maybeDeleteOrAdd: function(keypress) {
    if (keypress.which === 13) {
      this.handleSubmit(keypress);
    } else if (keypress.which === 8 && $(keypress.target).val() === '') {
      var $row = $(keypress.target.parentElement.parentElement.parentElement);
      var targetRank = parseInt($row.find('.item-drag-hook').text());
      this.deleteItem(targetRank);
    }
  },

  handleDeleteButton: function(event) {
    var $row = $(event.target.parentElement.parentElement);
    var targetRank = parseInt($row.find('.item-drag-hook').text());

    this.deleteItem(targetRank);
  },

  deleteItem: function(itemRank) {
    this.parent.decrementItems(itemRank);
    debugger
    
    this.model.destroy();
    this.remove();
    // this.parent.removeSubview('#list-items', this);
    this.parent.setCurrentRank(itemRank - 1);
  },

  clear: function(event) {
    $(event.target).val('');
  },
})