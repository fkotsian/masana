Asana.Views.ItemShow = Backbone.View.extend({
  template: JST['items/item'],

  initialize: function(options) {
    this.projectId = options.projectId;
    this.project = Asana.projects.get(this.projectId);
    if (!this.project) {
      this.project = new Asana.Models.Project();
    }

    this.listenTo(this.model, 'sync change', this.render);
    // this.listenTo(this.model.list, 'sync', this.render)
  },

  events: {
    'click .editable': 'insertEdit',
    'blur h3.postable, p.postable': 'updateItem',
    'submit h3.postable, p.postable': 'updateItem',
    'click .glyphicon-remove': 'closePane',
  },

  className: 'item-show',

  render: function () {
    // alert('rendering item show')
    var renderedContent = this.template({
      item: this.model,
      project: this.project
    });
    this.$el.html(renderedContent);

    // attach comments as a subview; if this.model then attach

    return this;
  },

  insertEdit: function(event) {
    $editable = $(event.target);
    switch ($editable.prop('tagName')) {
    case 'P':
      input = '<form><input type="text" value="' + $editable.text() + '" name="item[description]"></input></form>';
      break;
    default:
      input = '<form><input type="text" value="' + $editable.text() + '" name="item[title]"></input></form>';
   }
    $editable.toggleClass('editable');
    $editable.toggleClass('postable');

    $editable.html(input);
  },

  updateItem: function(event) {
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

  closePane: function(event) {},


})