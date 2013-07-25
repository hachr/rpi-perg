var cv = require('opencv')
  , assert = require('assert')
  , fs =require('fs')
  , Camera = require('picam').Camera;
//  , OCVCamera = require('picam').OCVCamera;


function takePicture(){
	var camera = new Camera(Camera.DEFAULT_PROFILE);
	camera.on('snapped', function(data){

        	fs.writeFileSync(data.id +".jpg",data.image,'binary');
	});

	camera.on('error',function(data){
		console.log('error: ' + JSON.stringify(data));	
	});


	camera.takeJPG();
}

function takePictureWithFaceDetection(){
	var camera = new OCVCamera(Camera.DEFAULT_PROFILE);

        camera.on('error',function(data){
                console.log('error: ' + JSON.stringify(data));
        });


	camera.on('snapped', function(data){
        	var im = data.image;
        	im.detectObject(cv.FACE_CASCADE, {}, function(err, faces){
        
        		for (var i=0;i<faces.length; i++){
                		var x = faces[i];
                		im.rectangle([x.x,x.y],[x.x + x.width, x.y + x.height],[0,255,0],2);
        		}       
        
        		im.save('./'+data.id + ".jpg");
		});   
	});
	camera.takeJPG();
}


takePicture();
//setTimeout(takePictureWithFaceDetection,10000);
