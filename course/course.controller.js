const Course = require('./course.model.js');


//Create new Course
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        return res.status(400).send({
            message: "Course content can not be empty"
        });
    }
    console.log("RECEIVED REQUEST");
    console.log(req);
    // Create a Course
    const course = new Course({
        name: req.body.name || "Unnamed course"
    });

    // Save Course in the database
    course.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the course."
        });
    });
};

// Retrieve all courses from the database.
exports.findAll = (req, res) => {
    Course.find()
    .then(courses => {
        res.send(courses);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving courses."
        });
    });
};

// Find a single course with a courseId
exports.findOne = (req, res) => {
    Course.findById(req.params.courseId)
    .then(course => {
        if(!course) {
            return res.status(404).send({
                message: "Course not found with id " + req.params.courseId
            });            
        }
        res.send(course);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Course not found with id " + req.params.courseId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving course with id " + req.params.courseId
        });
    });
};

// Update a course
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Course content can not be empty"
        });
    }

    // Find and update course with the request body
    Course.findByIdAndUpdate(req.params.courseId, {
        name: req.body.name || "No course name"
    }, {new: true})
    .then(course => {
        if(!course) {
            return res.status(404).send({
                message: "Course not found with id " + req.params.courseId
            });
        }
        res.send(course);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Course not found with id " + req.params.courseId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating course with id " + req.params.courseId
        });
    });
};

// Delete a course with the specified courseId in the request
exports.delete = (req, res) => {
    Course.findByIdAndRemove(req.params.courseId)
    .then(course => {
        if(!course) {
            return res.status(404).send({
                message: "Course not found with id " + req.params.courseId
            });
        }
        res.send({message: "Course deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Course not found with id " + req.params.courseId
            });                
        }
        return res.status(500).send({
            message: "Could not delete course with id " + req.params.courseId
        });
    });
};