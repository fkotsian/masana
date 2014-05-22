Asana.Models.Project = Backbone.Model.extend({
  url: '/api/projects/:id',

  parse: function(json) {
    if (json.lists) {
      this.lists().set(json.lists, { parse: true });
      delete json.lists;
    }
    return json;
  },

  lists: function() {
    if (!this._lists) {
      this._lists = new Asana.Collections.Lists([], { project: this })
    }
    return this._lists;
  },

  initialize: function() {},

});