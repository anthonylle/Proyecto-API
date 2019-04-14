module.exports = (router) => {
    const courses = require('./course.controller.js');

    // Create a new Course
    router.post('/courses', courses.create);

    // Retrieve all Courses
    router.get('/courses', courses.findAll);

    // Retrieve a single Course with courseId
    router.get('/courses/:courseId', courses.findOne);

    // Update a Course with courseId
    router.put('/courses/:courseId', courses.update);

    // Delete a Course with courseId
    router.delete('/courses/:courseId', courses.delete);
}