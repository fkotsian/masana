# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

guest = User.create([
  { email: "hi@yourname.com",
    password: "checkmeout"   }
])

projects = Project.create([
  # 1
  { title: 'Work',
    user_id: 1              },
  # 2
  { title: 'Charity',
    user_id: 1   },
  # 3
  { title: 'Personal Projects',
    user_id: 1
  }
])

lists = List.create([
  # 1
  { title: 'Learn Angular.js',
    description: 'The next Backbone',
    project_id: 1
  },
  # 2
  { title: 'MBTI app?',
    description: 'Serve info based on Myers-Briggs profiles',
    project_id: 1
  },
  # 3
  { title: 'Education app review service',
    description: 'Lots of discussion, but no digital platform',
    project_id: 1
  },
  # 2
  { title: 'Save the Rainforest',
    project_id: 2
  },
  # 5
  { title: 'Fix Education',
    description: 'It starts with helping teachers',
    project_id: 2
  },
  # 6
  { title: 'Meet Warren Buffett',
    project_id: 3
  },
  # 
  { title: 'See if Sasquatch is real',
    project_id: 3
  },
  # 8
  { title: 'Chase a Thunderstorm',
    project_id: 3
  },
])

list_1_items = List.first.items.create([
  { title: "Do Angular tutorial",
    description: "http://www.toptal.com/angular-js/a-step-by-step-guide-to-your-first-angularjs-app",
    due_date: "1988/11/10",
    rank: 1
  },
  { title: "Build sample app",
    description: "Perhaps rebuild Masana using Angular",
    due_date: Date.today.to_s,
    rank: 2
  },
  { title: "Celebrate",
    description: "Call everybody",
    due_date: Date.today.to_s,
    rank: 3
  },
  { title: "Throw Boat Party",
    description: "Need: Nautical-themed Pashmina Afghan",
    due_date: Date.today.to_s,
    rank: 4
  },
])

list_2_items = List.find(2).items.create([
  { title: "Ideas go here",
    rank: 1
  }
])

list_6_items = List.find(6).items.create([
  { title: "Crack stock market",
    rank: 1
  },
  { title: "Get Warren's phone number",
    rank: 2
  },
  { title: "Give financial advice",
    rank: 3
  },
  { title: "Become best friends forever",
    rank: 4
  },
  { title: "Get to call him 'Buffy'",
    rank: 5
  },
  { title: "Retire and live happily ever after",
    rank: 6
  },
])

list_7_items = List.find(7).items.create([
  { title: "Get GPS",
    rank: 1
  },
  { title: "Watch for blurry shadows",
    rank: 2
  },
  { title: "Plant GPS on blurry shadow",
    rank: 3
  },
  { title: "GPS leads me to Sasquatch (or not)",
    rank: 4
  },
  { title: "???",
    rank: 5
  },
  { title: "Profit",
    rank: 6
  },
])

list_8_items = List.find(8).items.create([
  { title: "Get sweet Jeep",
    rank: 1
  },
  { title: "Move to Philly",
    rank: 2
  },
  { title: "Just hang out",
    rank: 3
  },
  { title: "Found it!",
    rank: 4
  },
  { title: "Give chase to the elements",
    rank: 5
  },
  { title: "Repeat",
    rank: 6
  },
])
