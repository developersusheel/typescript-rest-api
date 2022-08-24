const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
  title: {
    type: 'string',
    required: true,
    unique: true
  }
}, {
  timestamps: true,
});

module.exports = mongoose.models.Project || mongoose.model('Project', projectSchema);