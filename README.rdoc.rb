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
- Validation tests for models
DONE_IN_RAILS: 5/21/14
DONE_IN_BACKBONE: ____

- Share project with members
- Assign tasks to members

- Track completion (completed/incomplete tasks)
- Can mark tasks complete/incomplete
- Track time started/completed

Phase 2:

- Add new project by pressing "return" on Project view
- Add new task by pressing "return" on Task view

- Create section header with ending ':'
- Clicking on any task pulls up Edit on that header

- Clicking Project in sidebar renders that Project in Project View
- Clicking Task in Project View renders that Task in Task View

- Display Comments from all Project Members in Task View

- Begin CSS Styling for Projects and Tasks


Phase 3:
- Search searches through all Tasks for desired text

- Implement Asana keyboard shortcuts

- Create Calendar View
- Button to Switch to calendar view

- Add due dates to Tasks
- Clicking Project in Calendar View renders start/due dates for each task in that Project in Calendar View

- Style Calendar View

Phase 4:
- Tweak, finalize CSS to reflect Asana look/feel
- Create ~Asana logo (VIPasana? and yoga/hollywood-related tasks?)

- Create demo login

- Create seed data
- Create buttons to auto-populate projects and tasks

