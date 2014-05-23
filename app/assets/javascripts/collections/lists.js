Asana.Collections.Lists = Backbone.Collection.extend({
  model: Asana.Models.List,
  urlRoot: 'api/:project_id/lists'
})