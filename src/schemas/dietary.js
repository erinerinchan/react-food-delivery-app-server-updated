import mongoose from 'mongoose'

// Schema for category
const dietarySchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'This field is required.',
    index: true
  },
  restaurants: [
    {
      type: 'ObjectId',
      ref: 'Restaurant'
    }
  ]
})

export default dietarySchema
