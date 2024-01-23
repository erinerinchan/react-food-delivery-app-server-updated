import mongoose from 'mongoose'

// Schema for meals
const mealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'This field is required.',
    index: true
  },
  description: {
    type: String,
    required: 'This field is required.'
  },
  price: {
    type: Number,
    required: 'This field is required.'
  },
  image: {
    type: String,
    required: 'This field is required.'
  },
  popular: {
    type: Boolean,
    required: 'This field is required.'
  }
})

export default mealSchema
