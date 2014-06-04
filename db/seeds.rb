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
  { title: 'Get $',
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
  { title: 'Berkshire',
    description: 'Current market cap: 15.35B',
    project_id: 1
  },
  # 2
  { title: 'Save the Rainforest',
    project_id: 2
  },
  # 3
  { title: 'Find Polar Bears',
    project_id: 3
  },
  # 4
  { title: 'See if Sasquatch is real',
    project_id: 3
  },
  # 5
  { title: 'Chase a Thunderstorm',
    project_id: 3
  },
  # 6
  { title: 'Buy Munger a birthday present',
    project_id: 3
  }
])

list_1_items = List.first.items.create([
  { title: "Get Money",
    description: "Got to spend money to make money",
    due_date: "1988/11/10",
    rank: 1
  },
  { title: "Get Paid",
    description: "Lil B said so",
    due_date: Date.today.to_s,
    rank: 2
  },
  { title: "Drink Couvoisier with Jay",
    description: "HOV",
    due_date: Date.today.to_s,
    rank: 3
  },
  { title: "Party on a Boat",
    description: "Need: Nautical-themed Pashmina Afghan",
    due_date: Date.today.to_s,
    rank: 4
  },
])
