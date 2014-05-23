Asana.Collections.Comments = Backbone.Collection.extend({
  model: Asana.Models.Comment,
  // url: ,
  comparator: function(comment) {
    return comment.get('created_at');
  },
  initialize: function() {},
})