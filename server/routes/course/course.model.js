const mongoose = require('mongoose');

const CourseSchema = mongoose.Schema({
    name: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Courses', CourseSchema);
