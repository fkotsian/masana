Asana.Views._Item = Backbone.View.extend({
  template: JST['items/_item'],

  initialize: function(options) {
    this.project_id = options.project_id;

    this.listenTo(this.model, 'sync change:title', this.render);
  },

  events: {
    'click input.submit-assignment-btn': 'assignToUser',
    'click input.assignee-email': 'clear',
    'blur .postable': 'updateItem',
    'submit .postable': 'updateItemAndAttachNew',
  },

  tagName: 'tr',
  className: 'list-item renderable-item',
  render: function () {
    var renderedContent = this.template({ item: this.model });
    this.$el.html(renderedContent);
    return this;
  },

  updateItem: function(event) {
    event.preventDefault();
    $postable = $(event.target);
    // $postable.toggleClass('postable');
    // $postable.toggleClass('editable'); // don't need it bc are rerendering

    formData = $postable.parent().serializeJSON();
    // debugger
    this.model.save(formData, {
      success: function(resp) {
        console.log("Successfully updated .postable; rank: " + resp.attributes.rank);
      },
      error: function(resp) {
        console.log("Error in updating .postable; rank: " + resp.attributes.rank);
        debugger
      }
    });
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
        // debugger
      }
    });
    // possibly trigger collection to re-render (need listener on collection)
    // this.render() // render this model // or use a listener on this.model.sync => render()
  },

  clear: function(event) {
    $(event.target).val('');
  },
})