module.exports = (router) => {
    const tasks = require('./task.controller.js');

    // Create a new Task
    router.post('/tasks', tasks.create);

    // Retrieve all Tasks
    router.get('/tasks', tasks.findAll);

    // Retrieve a single Task with taskId
    router.get('/tasks/:taskId', tasks.findOne);

    // Update a Task with taskId
    router.put('/tasks/:taskId', tasks.update);

    // Delete a Task with taskId
    router.delete('/tasks/:taskId', tasks.delete);
}