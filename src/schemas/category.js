import mongoose from 'mongoose'

// Schema for category
const categorySchema = new mongoose.Schema({
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

export default categorySchema
