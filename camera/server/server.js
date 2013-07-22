var express = require('express'),
    spawn = require('child_process').spawn,
    app = express();


app.use(express.static(__dirname + '/public'));

app.get('/video', function(req, res){
    res.writeHead({"Content-Type":"video/ogg","Transfer-Encoding" : "chunked"});
    var vid = spawn('raspivid', ['-t', '0', '-vf', '-w','640', '-h', '400', '-o', '-']);//, { stdio: [null, res.socket, res.socket] });

    vid.stdout.pipe(res);
    //console.log("spawned - vid");
    //console.log(vid);
    res.connection.on('close',function(){ vid.kill(); });
});

app.listen(3000);
console.log('Listening on port 3000');
