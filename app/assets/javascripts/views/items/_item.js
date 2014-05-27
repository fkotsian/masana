Asana.Views._Item = Backbone.View.extend({
  template: JST['items/_item'],

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },

  events: {
    'click input.submit-assignment-btn': 'assignToUser',
    'click input.assignee-email': 'clear',
  },

  tagName: 'tr',
  className: 'list-item',
  render: function () {
    var renderedContent = this.template({ item: this.model });
    this.$el.html(renderedContent);
    return this;
  },

  assignToUser: function(event) {
    event.preventDefault();

    $form = $(event.target).parent();
    newAssigneeEmail = $form.serializeJSON().new_assignee_email;
    this.model.save({ 'newAssigneeEmail': newAssigneeEmail },{
      success: function(resp) {
        console.log("Successfully saved assignment: " + resp);
      },
      error: function(resp) {
        console.log("Error in assigning task: " + resp);
        debugger
      }
    });
    // possibly trigger collection to re-render (need listener on collection)
    // this.render() // render this model // or use a listener on this.model.sync => render()
  },

  clear: function(event) {
    $(event.target).val('');
  },
})