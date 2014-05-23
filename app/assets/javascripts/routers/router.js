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
    var appContainer = new Asana.Views.Container();
    Asana.projects.fetch();
    this.swapView(appContainer);
  },

  projectsIndex: function() {
    var projectsIndex = new Asana.Views.ProjectsIndex({
      collection: Asana.projects
    });

    Asana.projects.fetch();
    this.swapView(projectsIndex);
  },

  swapView: function (newView) {
    this._currentView && this._currentView.remove();
    this._currentView = newView;
    this.$rootEl.html(newView.render().$el);
  }
})