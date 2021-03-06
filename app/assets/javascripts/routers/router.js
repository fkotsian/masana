Asana.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    // perhaps use a $projectEl, $listEl, and $itemEl (in same vein as NewsReader sidebar)
    this.renderAppContainer();
  },

  routes: {
    '': 'dashboard',
    // 'projects/index': 'projectsIndex',
    'projects/new': 'projectNew',
    'projects/:id': 'projectShow',
    // 'projects/:id/lists': 'listsIndex',
    'projects/:project_id/lists/:id': 'listShow',
    'lists/:list_id/items/:id': 'itemShow',
  },

  renderAppContainer: function() {
    // our base collection = Asana.projects
    if(!this._appContainer) {
      this._appContainer = new Asana.Views.Container({
        collection: Asana.projects
      });
      this.swapView(this._appContainer);
    }
  },

  projectShow: function(id) {},

  dashboard: function() {
    // maintain rendered AppContainer view
  },

  listShow: function(projectId, id) {
    var list = Asana.projects.getOrFetch(projectId).lists().getOrFetch(id);
    var newListView = new Asana.Views.ListShow({
      model: list
    });
    this.swapPaneView('#list-pane', newListView);
  },

  // itemShow: function(listId, id) {
  //   console.log('in itemShow');
  //   var list = Asana.projects.findList(listId);
  //   var item = list.items().getOrFetch(id);
  //   var newItemView = new Asana.Views.ItemShow({
  //     model: item,
  //     projectId: list.get('project_id')
  //   });
  //   this.swapPaneView('#item-pane', newItemView);
  // },

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
