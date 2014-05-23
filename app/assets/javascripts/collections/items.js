Asana.Collections.Items = Backbone.Collection.extend({
  model: Asana.Models.Item,
  url: 'api/lists/:list_id/items',

  comparator: function (item) {
    return item.get('created_at');
  },

  initialize: function(models, options) {
    this.list = options.list;
  },

})