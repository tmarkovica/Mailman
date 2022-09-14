var http = require('http');
const port = 3000
const app = require('./app');

const server = http.createServer(app);

server.listen(port, function(error) {
    if (error) {
        console.log('Something went wrong', error);
    }
    else {
        console.log('Server is listening on port ' + port);
    }
})