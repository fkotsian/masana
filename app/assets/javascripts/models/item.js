Asana.Models.Item = Backbone.Model.extend({
  url: function() {
    return 'api/lists/' + this.get('list_id') +
    '/items/' + this.get('id'); // for API use
  },
  urlHelper: function() {
    return '#lists/' + this.get('list_id') +
           '/items/' + this.get('id');       // for template use
  },

  initialize: function() {},
})