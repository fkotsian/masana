Asana.Models.List = Backbone.Model.extend({
  url: function() {
    return 'api/lists/' + this.get('id');
  },

  urlHelper: function() {
    return '#projects/' + this.escape('project_id') +
           '/lists/' + this.escape('id');
  },

  parse: function (json) {
    if (json.items) {
      this.items().set(json.items, { parse: true });
      delete json.items;
    }
    return json;
  },

  items: function () {
    if (!this._items) {
      this._items = new Asana.Collections.Items([], { list: this });
    }
    return this._items;
  },

  initialize: function (options) {},
})

