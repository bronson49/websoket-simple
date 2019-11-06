const http = require('http');
const WebSocketServer = require('websocket').server;
const clients = [];

const server = http.createServer();
server.listen(8080, function() {
    console.log((new Date()) + ' Server is listening on http://localhost:8080');
});

const wsServer = new WebSocketServer({
    httpServer: server
});

wsServer.on('request', function(request) {

    const connection = request.accept(null, request.origin);
    clients.push(connection);

    connection.on('message', function(message) {
        //console.log('Received Message:', message.utf8Data);
        // connection.sendUTF('user: '+message.utf8Data);
        clients.forEach(client =>{
            client.sendUTF(message.utf8Data);
        })
    });
    connection.on('close', function(reasonCode, description) {
        console.log('Client has disconnected.');
    });
});