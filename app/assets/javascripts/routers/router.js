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
    // 'projects/:id/lists': 'listsIndex',
    'projects/:id/lists/:list_id': 'listShow',
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

  listShow: function(id, listId) {
    var list = Asana.projects.getOrFetch(id).lists().getOrFetch(listId);
    var newListView = new Asana.Views.ListShow({ model: list })
    this._currentView.removeSubviews('#list-pane');
    this._currentView.addSubview('#list-pane', newListView);

    /*on refactor:
        - remove ContainerView
        - move ContainerView's template into Root.html.erb
        - router has 3 base $els: $projectEl, $listEl, $itemEl
        - each $el's view has a collection object that can be referenced
        - each view listensTo its collection object for changes and rerenders
        - on app initialize, create each PaneView and attach subviews as before
        - need 3 different SwapView and _currentView objects in Router
    */
  },

  swapPaneView: function(paneSelector, newView) {
    this._currentView.removeSubviews(paneSelector);
    this._currentView.addSubview(newView);
  }

  swapView: function (newView) {
    this._currentView && this._currentView.remove();
    this._currentView = newView;
    this.$rootEl.html(newView.render().$el);
  }
})

  // projectsIndex: function() {
  //   Asana.projects.fetch({
  //     success: function (resp) {
  //       console.log("Successfully fetched Projects in Index: " + resp);
  //     },
  //
  //     error: function (resp) {
  //       console.log("Error: " + resp);
  //     }
  //
  //   });
  //
  //   var projectsIndex = new Asana.Views.ProjectsIndex({
  //     collection: Asana.projects
  //   });
  //   this.swapView(projectsIndex);
  // },
