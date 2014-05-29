Asana.Models.Item = Backbone.Model.extend({
  urlRoot: function() {
    return 'api/lists/' + this.get('list_id') +
    '/items' //+ this.get('id'); // for API use
  },
  urlHelper: function() {
    return '#lists/' + this.get('list_id') +
           '/items/' + this.get('id');       // for template use
  },

  initialize: function() {},
})