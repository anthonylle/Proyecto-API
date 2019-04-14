const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    description: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Tasks', TaskSchema);
