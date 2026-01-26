puts "Seeding users..."
user = User.find_or_create_by!(email: "admin@gmail.com") do |u|
  u.password = "1234"
end

puts "Seeding categories..."
biryani = Category.find_or_create_by!(name: "Biryani") do |c|
  c.position = 1
  c.active = true
end

starters = Category.find_or_create_by!(name: "Starters") do |c|
  c.position = 2
  c.active = true
end

drinks = Category.find_or_create_by!(name: "Drinks") do |c|
  c.position = 3
  c.active = true
end

puts "Seeding menu items..."

MenuItem.find_or_create_by!(name: "Chicken Biryani - Half") do |m|
  m.price = 120
  m.category = biryani
  m.image_url = "https://tse4.mm.bing.net/th/id/OIP.ngrriLkPVYpJ0cFQQlB0YwHaHa?pid=Api&P=0&h=180"
  m.active = true
end

MenuItem.find_or_create_by!(name: "Chicken Biryani - Full") do |m|
  m.price = 180
  m.category = biryani
  m.image_url = "https://tse4.mm.bing.net/th/id/OIP.ngrriLkPVYpJ0cFQQlB0YwHaHa?pid=Api&P=0&h=180"
  m.active = true
end

MenuItem.find_or_create_by!(name: "Chicken Fry") do |m|
  m.price = 150
  m.category = starters
  m.image_url = "https://tse4.mm.bing.net/th/id/OIP.fBA2g1LAZtmLItn38PoeAgHaHa?pid=Api&P=0&h=180"
  m.active = true
end

MenuItem.find_or_create_by!(name: "Cold Drink") do |m|
  m.price = 40
  m.category = drinks
  m.image_url = "https://tse4.mm.bing.net/th/id/OIP.PxMMNNsL05BXZs_WU7pVJwHaE5?pid=Api&P=0&h=180"
  m.active = true
end

puts "Seeding completed."
