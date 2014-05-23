Asana.Views._List = Backbone.View.extend({
  template: JST['lists/_list'],
  events: {
    // 'click .project-list': 'displayInListPane',
    // on click render in lists-pane
  },

  tagName: 'li',
  className: 'project-list',
  render: function () {
    var renderedContent = this.template({ list: this.model });
    this.$el.html(renderedContent);
    return this;
  },

  displayInListPane: function (event) {
    // Backbone.history.navigate()  // no can't navigate bc still need projectspane
    // a way to bubble it up to ContainerView?
    // use a listener!
    debugger
    console.log("You clicked list id: " + this.model.get('id'));
    return this.model; //?
  },

  initialize: function () {},
})