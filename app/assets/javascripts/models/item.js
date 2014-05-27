Asana.Models.Item = Backbone.Model.extend({
  initialize: function() {},
  urlHelper: function() {
    // return 'api/lists/' + this.get('id'); // for API use
    return '#lists/' + this.escape('list_id') +
           '/items/' + this.escape('id');       // for template use
  },
})