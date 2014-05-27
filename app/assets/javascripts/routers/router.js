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
    'projects/:project_id/lists/:id': 'listShow',
    'lists/:list_id/items/:id': 'itemShow',
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

  listShow: function(projectId, id) {
    var list = Asana.projects.getOrFetch(projectId).lists().getOrFetch(id);
    var newListView = new Asana.Views.ListShow({ model: list });
    this.swapPaneView('#list-pane', newListView);

    /*on refactor:
        - remove ContainerView
        - move ContainerView's template into Root.html.erb
        - router has 3 base $els: $projectEl, $listEl, $itemEl
        - route ('') now maps to nothing, or simply rerendering the ProjectPane
        - each $el's view has a collection object that can be referenced
        - each view listensTo its collection object for changes and rerenders
        - on app initialize, create each PaneView and attach subviews as before
        - need 3 different SwapView and _currentView objects in Router
    */
  },

  itemShow: function(listId, id) {
    var list = Asana.projects.findList(listId);
    var item = list.items().getOrFetch(id);
    var newItemView = new Asana.Views.ItemShow({ model: item,
                                    projectId: list.get('project_id') });
    this.swapPaneView('#item-pane', newItemView);
  },

  swapPaneView: function(paneSelector, newView) {
    this._currentView.removeSubviews(paneSelector);
    this._currentView.addSubview(paneSelector, newView);
  },

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
