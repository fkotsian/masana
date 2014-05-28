Asana.Models.Item = Backbone.Model.extend({
  url: function() {
    return 'api/lists/' + this.get('id'); // for API use
  },
  urlHelper: function() {
    return '#lists/' + this.escape('list_id') +
           '/items/' + this.escape('id');       // for template use
  },

  initialize: function() {},
})