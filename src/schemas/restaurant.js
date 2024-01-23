import mongoose from 'mongoose'

// Schema for restaurant page
const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'This field is required.',
    index: true
  },
  categories: [{
    type: 'ObjectId',
    ref: 'Category'
  }],
  dietaries: [{
    type: 'ObjectId',
    ref: 'Dietary'
  }],
  image: {
    type: String,
    required: 'This field is required.'
  },
  ratings: {
    type: Number,
    required: 'This field is required.'
  },
  opening_time: {
    type: String,
    required: 'This field is required.'
  },
  min_expenditure: {
    type: Number,
    required: 'This field is required.'
  },
  foods: [{
    type: 'ObjectId',
    ref: 'Food'
  }]
})

export default restaurantSchema
