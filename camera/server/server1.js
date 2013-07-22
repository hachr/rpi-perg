var express = require('express'),
    spawn = require('child_process').spawn,
    app = express();


app.use(express.static(__dirname + '/public'));

app.get('/video', function(req, res){
    res.writeHead({"Content-Type":"video/mp4","Transfer-Encoding" : "chunked"});
    var vid = spawn('raspivid', ['-t', '0', '-vf', '-w','640', '-h', '400', '-o', '-']);
    
    vid.stdout.on('data', function(data){
        console.log('writing...');
	res.write(data);
    });

    res.connection.on('close',function(){ vid.kill(); });
});

app.listen(3001);
console.log('Listening on port 3001');
