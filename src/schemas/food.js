import mongoose from 'mongoose'

// Schema for food
const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'This field is required',
    index: true
  },
  meals: [
    {
      type: 'ObjectId',
      ref: 'Meal'
    }
  ]
})

export default foodSchema
