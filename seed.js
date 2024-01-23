import 'dotenv/config'
import { faker } from '@faker-js/faker'
import db from './src/controllers/_helpers/mongoose.js'

const genRandomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const getRandomId = (array) => array[genRandomNum(0, array.length - 1)]._id

const reset = async () => {
  console.log('Reset Start') // eslint-disable-line
  await db.Dietary.deleteMany()
  await db.Category.deleteMany()
  await db.Meal.deleteMany()
  await db.Food.deleteMany()
  await db.Restaurant.deleteMany()
  console.log('Reset End') // eslint-disable-line
}

// Dietaries of restaurants
const createDietaries = async () => {
  console.log('Dietaries Start') // eslint-disable-line
  const dietariesData = [
    { name: 'Gluten free' },
    { name: 'Halal' },
    { name: 'Organic' },
    { name: 'Vegan' },
    { name: 'Vegetarian' }
  ]

  const dietaries = await db.Dietary.insertMany(dietariesData)

  console.log('Dietaries End') // eslint-disable-line
  return dietaries
}

// Categories of restaurants
const createCategories = async () => {
  console.log('Categories Start') // eslint-disable-line
  const categoriesData = [
    { name: 'American' },
    { name: 'Argentinian' },
    { name: 'Asian' },
    { name: 'Belgian' },
    { name: 'Brazilian' },
    { name: 'British' },
    { name: 'Cantonese' },
    { name: 'Chinese' },
    { name: 'Chiu Chow' },
    { name: 'Dessert' },
    { name: 'Filipino' },
    { name: 'French' },
    { name: 'Greek' },
    { name: 'Hawaiian' },
    { name: 'HongKongese' },
    { name: 'Indian' },
    { name: 'Indonesian' },
    { name: 'Iranian' },
    { name: 'Italian' },
    { name: 'Japanese' },
    { name: 'Korean' },
    { name: 'Latin American' },
    { name: 'Lebanese' },
    { name: 'Malaysian' },
    { name: 'Mediterranean' },
    { name: 'Mexican' },
    { name: 'Middle Eastern' },
    { name: 'Moroccan' },
    { name: 'Nepalese' },
    { name: 'Peking' },
    { name: 'Peruvian' },
    { name: 'Portuguese' },
    { name: 'Shanghainese' },
    { name: 'Sichuan' },
    { name: 'Singaporean' },
    { name: 'Spanish' },
    { name: 'Taiwanese' },
    { name: 'Thai' },
    { name: 'Turkish' },
    { name: 'Vietnamese' },
    { name: 'Western' }
  ]

  const categories = await db.Category.insertMany(categoriesData)

  console.log('Categories End') // eslint-disable-line
  return categories
}

// Restaurants & Foods & Meals
const createRestaurants = async (dietaries, categories) => {
  const restaurantsLength = 100
  const foodsLength = restaurantsLength * 3
  const mealsLength = foodsLength * 3

  // Meals
  console.log('Meals Start') // eslint-disable-line
  const mealsData = []
  for (let i = 0; i < mealsLength; i += 1) {
    mealsData.push({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      image: `${faker.image.food()}?${faker.random.word()}`,
      popular: faker.datatype.boolean()
    })
  }
  const meals = await db.Meal.insertMany(mealsData)
  console.log('Meals End') // eslint-disable-line

  // Foods
  console.log('Foods Start') // eslint-disable-line
  const foodsData = []
  for (let i = 0; i < foodsLength; i += 1) {
    foodsData.push({
      name: faker.commerce.productAdjective(),
      meals: meals.splice(0, 3).map((meal) => meal._id)
    })
  }
  const foods = await db.Food.insertMany(foodsData)
  console.log('Foods End') // eslint-disable-line

  // Restaurants
  console.log('Restaurants Start') // eslint-disable-line
  const restaurantsData = []
  for (let i = 0; i < restaurantsLength; i += 1) {
    restaurantsData.push({
      name: faker.company.companyName(),
      categories: Array(genRandomNum(1, 3)).fill(null).map(() => getRandomId(categories)).filter((v, j, s) => s.indexOf(v) === j),
      dietaries: Array(genRandomNum(1, 4)).fill(null).map(() => getRandomId(dietaries)).filter((v, j, s) => s.indexOf(v) === j),
      image: `${faker.image.food()}?${faker.random.word()}`,
      ratings: genRandomNum(1, 5),
      opening_time: ['11:00', '11:30', '12:00'][genRandomNum(0, 2)],
      min_expenditure: [100, 150, 200][genRandomNum(0, 2)],
      foods: foods.splice(0, 3).map((meal) => meal._id)
    })
  }
  const restaurants = await db.Restaurant.insertMany(restaurantsData)
  console.log('Restaurants End') // eslint-disable-line

  // Backward Associate Restaurants
  console.log('Restaurants Association Start') // eslint-disable-line
  const promises = []
  restaurants.forEach((restaurant) => {
    restaurant.categories.forEach((category) => {
      promises.push(db.Category.updateOne({
        _id: category._id
      }, {
        $addToSet: {
          restaurants: [restaurant._id]
        }
      }))
    })

    restaurant.dietaries.forEach((dietary) => {
      promises.push(db.Dietary.updateOne({
        _id: dietary._id
      }, {
        $addToSet: {
          restaurants: [restaurant._id]
        }
      }))
    })
  })
  await Promise.all(promises)
  console.log('Restaurants Association End') // eslint-disable-line
}

const start = async () => {
  await reset()
  const dietaries = await createDietaries()
  const categories = await createCategories()
  await createRestaurants(dietaries, categories)
}

start()
