const Food = require('./food.model.js');


//Create new Food
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        return res.status(400).send({
            message: "Food content can not be empty"
        });
    }
    
    // Create a Food
    const food = new Food({
        name: req.body.name || "Unnamed food"
    });

    // Save Food in the database
    food.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the food."
        });
    });
};

// Retrieve all foods from the database.
exports.findAll = (req, res) => {
    Food.find()
    .then(foods => {
        res.send(foods);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving foods."
        });
    });
};

// Find a single food with a foodId
exports.findOne = (req, res) => {
    Food.findById(req.params.foodId)
    .then(food => {
        if(!food) {
            return res.status(404).send({
                message: "Food not found with id " + req.params.foodId
            });            
        }
        res.send(food);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Food not found with id " + req.params.foodId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving food with id " + req.params.foodId
        });
    });
};

// Update a food
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Food content can not be empty"
        });
    }

    // Find and update a food with the request body
    Food.findByIdAndUpdate(req.params.foodId, {
        name: req.body.name || "No course name"
    }, {new: true})
    .then(food => {
        if(!food) {
            return res.status(404).send({
                message: "Food not found with id " + req.params.foodId
            });
        }
        res.send(food);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Food not found with id " + req.params.foodId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating food with id " + req.params.foodId
        });
    });
};

// Delete a food with the specified foodId in the request
exports.delete = (req, res) => {
    Food.findByIdAndRemove(req.params.foodId)
    .then(food => {
        if(!food) {
            return res.status(404).send({
                message: "Food not found with id " + req.params.foodId
            });
        }
        res.send({message: "Food deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Food not found with id " + req.params.foodId
            });                
        }
        return res.status(500).send({
            message: "Could not delete food with id " + req.params.foodId
        });
    });
};