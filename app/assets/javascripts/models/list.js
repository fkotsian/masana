Asana.Models.List = Backbone.Model.extend({
  url: function() {
    // return 'api/lists/' + this.get('id'); // for API use
    return '/lists/' + this.get('id');       // for template use
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

  initialize: function () {}
})

