Asana.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    // perhaps use a $projectEl, $listEl, and $itemEl (in same vein as NewsReader sidebar)
  },

  routes: {
    '': 'appContainer',
    'projects/index': 'projectsIndex',
    'projects/new': 'projectNew',
    'projects/:id': 'projectShow',
    'projects/:id/lists': 'listsIndex',
    'projects/:id/lists/:list_id/items': 'itemsIndex'
  },

  appContainer: function() {

    var that = this;
    Asana.projects.fetch({
      success: function (resp) {
        console.log("Successfully fetched Projects in Container: " + resp);
        var appContainer = new Asana.Views.Container();
        that.swapView(appContainer);
      },
      error: function (resp) {
        console.log("Error: " + resp);
      }
    });

  },

  projectsIndex: function() {
    Asana.projects.fetch({
      success: function (resp) {
        console.log("Successfully fetched Projects in Index: " + resp);
      },

      error: function (resp) {
        console.log("Error: " + resp);
      }

    });

    var projectsIndex = new Asana.Views.ProjectsIndex({
      collection: Asana.projects
    });
    this.swapView(projectsIndex);
  },

  swapView: function (newView) {
    this._currentView && this._currentView.remove();
    this._currentView = newView;
    this.$rootEl.html(newView.render().$el);
  }
})