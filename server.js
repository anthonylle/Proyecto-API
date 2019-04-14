const express = require('express');
const router = express();
const http = require('http');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
//Enable CORS for all HTTP methods
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const config = require('./config.js');
const mongoose = require('mongoose');
require('./server/routes/course/course.routes.js')(router);  //Add route file here
require('./server/routes/food/food.routes.js')(router);  //Add route file here
require('./server/routes/task/task.routes.js')(router);  //Add route file here

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(config.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// default route
router.get('/', (req, res) =>{
	res.send("Welcome to this API");
});

const server = http.createServer(router);
server.listen(process.env.PORT || config.serverport, function(){
	console.log("Express server running on port: 5000");
});