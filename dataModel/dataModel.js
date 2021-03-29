const mongoose = require('mongoose')

const dataModel = new mongoose.Schema({
  desc: {
    type: String,
    trim: true,
    required: [true, 'Task Description si required'],
  },
  author: {
    type: String,
    trim: true,
    required: [true, 'Provide Author'],
  },
  ctr: {
    type: Date,
    default: Date.now,
  },
  priority: {
    type: String,
    default: 'low',
    enum: ['low', 'moderate', 'high'],
  },
})

module.exports = mongoose.model('dataModel', dataModel)
