import 'dotenv/config'
import mongoose from 'mongoose'
import restaurantSchema from '../../schemas/restaurant.js'
import foodSchema from '../../schemas/food.js'
import mealSchema from '../../schemas/meal.js'
import categorySchema from '../../schemas/category.js'
import dietarySchema from '../../schemas/dietary.js'
import userSchema from '../../schemas/user.js'

const main = async () => {
  await mongoose.connect(process.env.MONGODB_URI)
}

// eslint-disable-next-line
main().then(() => console.log('connected')).catch((err) => console.log(err))

const Restaurant = mongoose.model('Restaurant', restaurantSchema)
const Food = mongoose.model('Food', foodSchema)
const Meal = mongoose.model('Meal', mealSchema)
const Category = mongoose.model('Category', categorySchema)
const Dietary = mongoose.model('Dietary', dietarySchema)
const User = mongoose.model('User', userSchema)

const db = {
  Restaurant,
  Food,
  Meal,
  Category,
  Dietary,
  User
}

export default db
