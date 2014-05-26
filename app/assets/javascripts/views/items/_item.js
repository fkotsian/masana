Asana.Views._Item = Backbone.View.extend({
  template: JST['items/_item'],
  events: {
    'click a': 'assignToUser',
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
    // $link = $(event.target);
    // userId = $link.parent().attr('data-id');
    // console.log(userId);
    console.log(this.model.get('rank'));
    // debugger
  },
})