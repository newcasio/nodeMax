//create a server using node


//only import what is needed
const http =  require('http');

//import local files, will look for routes.js, look in file to find what has been exported
const routes = require('./routes');

//createServer, use imported routes as argument
const server = http.createServer(routes.handler);




//listen to new server on port 3000
server.listen(3000);
