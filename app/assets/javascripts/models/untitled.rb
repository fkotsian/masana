- .postable won''t work for default until handle new View (project, list, item (keydown))

- link Item and its _item for updates (as do with _lists and List)
  - update one on its model 'change'

- New List-Item view
  - First with temporary button
  - Then generate on keydown



- fix app-rouyting so can load page from URL and can share

- then back to rendering new_view
- reset seeds
- attach a blank _item subview in the ListShow if list.items() is empty
    - should this be done in the listShow render(), or in the items() collection create? kinda makes sense to do in items; only case is how get listID (actually that is just this.id in list.items(). sweet)