var texto="";

var http = require('http'),
    fs = require('fs'),
    // NEVER use a Sync function except at start-up!
    index = fs.readFileSync(__dirname + '/index.html');

// Send index.html to all requests
var app = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});

// Socket.io server listens to our app
var io = require('socket.io').listen(app);

// Send current time to all connected clients
function enviarValor(valor) {
    io.emit('valor', {data:valor});
}

// Send current time every 10 secs
//setInterval(sendTime, 1000);


// Emit welcome message on connection
io.on('connection', function(socket) {
	
    // Use socket to communicate with this particular client only, sending it it's own id
    socket.on('valor', function(data){texto=data.data;enviarValor(texto);});
    socket.emit('welcome', {texto:texto});
});

app.listen(3000);

