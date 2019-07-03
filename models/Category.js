const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categotySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  key: {
    type: String
  },
  imageSrc: {
    type: String,
    default: ''
  },
  user: {
    ref: 'users',
    type: Schema.Types.ObjectId
  }
  
})

module.exports = mongoose.model('categories', categotySchema)