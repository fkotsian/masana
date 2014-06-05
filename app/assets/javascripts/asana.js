window.Asana = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function () {
    // fetch new projects
    Asana.projects.fetch({
      success: function() {
        new Asana.Routers.Router({
          $rootEl: $('#content')
        });
        Backbone.history.start();
      }
    })
  }
};

Backbone.CompositeView = Backbone.View.extend({
  addSubview: function (selector, subview, index) {
    if(index){
      this.subviews(selector).splice(index, 0, subview);
      // this.attachSubviewAtIndex(selector, subview.render(), index);
    } else {
      this.subviews(selector).push(subview);
    }
    
    this.attachSubview(selector, subview.render());
  },

  attachSubview: function (selector, subview) {
    this.$(selector).append(subview.$el);
    subview.delegateEvents();
  },

  attachSubviewAtIndex: function (selector, subview, index) {
    this.$(selector + " tr:nth-child(index)").before(subview.$el);
    // this.$(selector).append(subview.$el);
    subview.delegateEvents();
  },


  attachSubviews: function () {
    var view = this;
    _(this.subviews()).each(function (subviews, selector) {
      view.$(selector).empty();
      // if (view.compareBy) {
      //   subviews.sort(view.compareBy);
      // }
      _(subviews).each(function (subview) {
        view.attachSubview(selector, subview);
      });
    });
  },

  // remove from DOM
  remove: function() {
    Backbone.View.prototype.remove.call(this);
    _(this.subviews()).each(function (subviews) {
      _(subviews).each(function (subview) { subview.remove(); });
    });
  },

  // remove from subviews() array
  removeSubview: function (selector, subview) {
    subview.remove();

    var subviews = this.subviews(selector);
    subviews.splice(subviews.indexOf(subview), 1);
  },

  // remove all subviews at selector from array and DOM
  removeSubviews: function (selector) {
    var subviews = this.subviews(selector);
    var that = this;
    _(subviews).each(function(subview) {
      that.removeSubview(selector, subview);
    });
  },

  subviews: function (selector) {
    this._subviews = this._subviews || {};
    if (!selector) {
      return this._subviews;
    } else {
      this._subviews[selector] = this._subviews[selector] || [];
      return this._subviews[selector];
    }
  }
});
