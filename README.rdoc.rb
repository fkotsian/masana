IMPORTANT ASANA FEATURES

---VIEWS---
- inital view is:
Sidebar with project index
Current project view
Current task view

- also exists: Calendar view

---MVP---
Projects, Lists, and Tasks
Comments
Ability to Check-off completion
Keyboard Shortcuts for add-new-task, complete-task
Section header display via CSS
Drag-sort tasks
Collapse-menu Chevron buttons
# Calendar view?
# Search for text?

---SCHEMA----
Project:
Title
- Members
- Lists

List:
Title
- Tasks

Task:
Title
Description
Due_date
- Owner (is_a User)
Completed?
# - Subtask (is another Model)
# Priority: 1,2,3 = green, yellow, red

Comment:
Body
- Author *is_a User
Created_at

User:
Email
# ProfilePicture
# DisplayName (for display in task_owner)
# Icon

---FEATURES---

Phase 1:
- Project model
- List model
- Task model
- Comment model
- User model
- Required associations
DONE_IN_RAILS: 5/21/14
- Validation tests for models
DONE_IN_BACKBONE: 5/23/14 (except backbone validations)

- Basic seed data
- Heroku setup
- Configure gemfile and application.js for Backbone
DONE: 5/22/14

- Basic CSS
- Begin CSS Styling for Projects and Tasks
- More Basic CSS
DONE: 5/26/14
- Assign tasks to members
    - show User''s favicon or initials in 'assign to member slot'
    -- has to pass User to Item... dislike (use jbuilder)

    (- can remove assignee on click 'X' inside 'Assign Member' popup)
    (- get list of project members on click (event, preventDefault, trigger) )
BASICS_DONE: 5/26/14

- Editable:
  - ListShow
  - on mouseover, outline (titles) (can be CSS: :hover)
  - on click, replace with same classes as have, and current val as val() in form
  - on any keydown, save view.model (and rerender => listen to view.model 'change'
_ITEMS_DONE: 5/26/14
- also checkout how to do many subviews

- List Popup on click
    - click _list sidebar -> notify #project_view to render _list in _list_pane
    - event needs to be on containerView to render in list_pane
    - _list view template in project needs css class .renderable
    - need list_id or that model or the subview in order to know which to render
- Item Popup on click

- Item .editable

- New List-Item on return or keydown 'down'

- Navigate among list-items via 'up' 'down'

- Style Devise login/signup views using Bootstrap
- Login_as_guest

- Setup Pingdom or New Relic to keep Heroku active
- Heroku keys are uploaded to github? Need Figaro?

# - Share project with members

- Track completion (completed/incomplete tasks)
- Can mark tasks complete/incomplete
- Completion causes popup or model in bottom-left corner

- Track time started/completed

Phase 2:

# - Add new project by pressing "return" on Project view
- Add new task by pressing "return" on Task view
  - this will extend 'submit' event in _Item

- Create section header with ending ':'
- Clicking on any task pulls up Edit on that header

- Clicking Project in sidebar renders that Project in Project View
- Clicking Task in Project View renders that Task in Task View

- Add Comments Backbone model and collection
- Add Comments Backbone View
- Add Comment seed data
- Display Comments from all Project Members in Task View



Phase 3:
- Search searches through all Tasks for desired text

- Implement Asana keyboard shortcuts

- Create Calendar View
- Button to Switch to calendar view

- Add due dates to Tasks
- Clicking Project in Calendar View renders start/due dates for each task in that Project in Calendar View

- Style Calendar View

Phase 4: Thursday and Friday
- Tweak, finalize CSS to reflect Asana look/feel
- Create ~Asana logo (VIPasana? and yoga/hollywood-related tasks?)

- Create demo login

- Create seed data
- Create buttons to auto-populate projects and tasks

