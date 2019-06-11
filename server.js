let express = require('express'),
    faye = require('faye'),
    http = require('http');

let app = express(),
    server = http.createServer(app),
    bayeux = new faye.NodeAdapter({mount: '/faye', timeout: 45});

bayeux.attach(server);

bayeux.on('handshake', (clientId) => {
    console.log(`Client connected ${clientId}`);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

let port = process.env.PORT || 8000;
server.listen(port, () => {
    console.log(`Listening on ${port}`);
});