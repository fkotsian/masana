Asana.Views.ItemShow = Backbone.View.extend({
  template: JST['items/item'],
  events: {
    'click .editable': 'insertEdit',
    'blur h3.postable, p.postable': 'updateItem',
    'submit h3.postable, p.postable': 'updateItem',
    'click .glyphicon-remove': 'closePane',
  },

  className: 'item-show',
  render: function () {
    var renderedContent = this.template({ item: this.model,
                                          project: this.project });
    this.$el.html(renderedContent);

    // attach comments as a subview; if this.model then attach

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
  },

  updateItem: function(event) {

  },

  closePane: function(event) {},

  initialize: function(options) {
    this.projectId = options.projectId;
    this.project = Asana.projects.get(this.projectId);
    if (!this.project) {
      this.project = new Asana.Models.Project();
    }
  }
})