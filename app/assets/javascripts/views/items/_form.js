Asana.Views._Form = Backbone.View.extend({
  template: JST['items/_form'],

  initialize: function() {
    //'click outside': 'submitForm',
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
  },

  clear: function(event) {
    $(event.target).val('');
  },

  //submitForm: function(event) {
    //formData = $('.editable:target').serializeJSON
    //this.model.save(formData)
    //render _Item view
  // }
})