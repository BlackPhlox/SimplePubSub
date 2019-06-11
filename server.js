var express = require('express'),
    faye = require('faye'),
    http = require('http');

var app = express(),
    server = http.createServer(app),
    bayeux = new faye.NodeAdapter({mount: '/faye', timeout: 45});

bayeux.attach(server);

bayeux.on('handshake', function(clientId) {
    console.log('Client connected', clientId);
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

var port = process.env.PORT || 8000;
server.listen(port, function() {
    console.log('Listening on ' + port);
});