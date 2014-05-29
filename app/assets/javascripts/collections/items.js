Asana.Collections.Items = Backbone.Collection.extend({
  model: Asana.Models.Item,
  initialize: function(models, options) {
    this.list = options.list;
  },
  url: function() {
    return 'api/lists/' + this.list.escape('id') + '/items';
  },
  comparator: 'rank',

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

  bumpRanks: function(targetRank) {
    this.models.each(function(item) {
      var thisRank = item.get('rank');
      if (thisRank > targetRank) {
        item.set('rank', parseInt(thisRank) + 1);
        item.save({});
      }
    })
  },

})