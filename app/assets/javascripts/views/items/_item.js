Asana.Views._Item = Backbone.View.extend({
  template: JST['items/_item'],

  initialize: function(options) {
    this.project_id = options.project_id;

    //listen for rank change and re-render
    this.listenTo(this.model, 'sync', this.render);
  },

  events: {
    'click input.submit-assignment-btn': 'assignToUser',
    'click input.assignee-email': 'clear',
    'blur .postable': 'handleInputBlur',
    'submit .postable': 'handleSubmit',
  },

  tagName: 'tr',
  className: 'list-item renderable-item',
  attributes: function(){return{'data-item-rank': this.model.get('rank')}},
  render: function () {
    var renderedContent = this.template({ item: this.model });
    this.$el.html(renderedContent);
    return this;
  },

  handleInputBlur: function(event){
    console.log('blur from ' + this.model.get('title'));
    var $postable = $(event.target.parentElement);
    this.updateItem($postable);
  },

  handleSubmit: function(event){
    console.log('submit from ' + this.model.get('title'));
    event.preventDefault();
    var $form = $(event.target);
    this.updateItem($form);
  },

  updateItem: function($form) {
    var formData = $form.serializeJSON().item;
    this.model.save(formData, {
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

    var $form = $(event.target).parent();
    var newAssigneeEmail = $form.serializeJSON().new_assignee_email;
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