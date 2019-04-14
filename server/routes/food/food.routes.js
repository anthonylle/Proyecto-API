module.exports = (router) => {
    const foods = require('./food.controller.js');

    // Create a new Food
    router.post('/foods', foods.create);

    // Retrieve all Foods
    router.get('/foods', foods.findAll);

    // Retrieve a single Food with foodId
    router.get('/foods/:foodId', foods.findOne);

    // Update a Food with foodId
    router.put('/foods/:foodId', foods.update);

    // Delete a Food with foodId
    router.delete('/foods/:foodId', foods.delete);
}