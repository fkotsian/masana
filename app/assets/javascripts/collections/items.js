Asana.Collections.Items = Backbone.Collection.extend({
  model: Asana.Models.Item,
  url: function() {
    'api/lists/' + this.list.id + '/items';
  },
  comparator: function (item) {
    return item.get('created_at');
  },

  getOrFetch: function(id) {
    var items = this;
    var item = items.get(id);

    if (!item) {
      item = new Asana.Models.Item({ id: id })
      item.fetch({
        success: function() { items.add(item); }
      })
    }

    return item;
  },

  initialize: function(models, options) {
    this.list = options.list;
  },

})