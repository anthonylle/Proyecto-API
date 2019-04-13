const express = require('express');
const router = express();
const http = require('http');

router.get('/', (req, res) =>{
	res.send('Hello World');
});

const server = http.createServer(router);
server.listen(5000, function(){
	console.log("Express server running on port: 5000");
});