import mongoose from 'mongoose'

// Schema for food
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: 'This field is required',
    index: true
  },
  passwordHash: {
    type: String,
    required: 'This field is required'
  }
})

export default userSchema
