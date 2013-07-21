var cv = require('opencv')
  , assert = require('assert')
  , fs =require('fs')


console.log(cv.version)
cv.readImage("./me.jpg", function(err, im){
console.log("image object: " + im);
console.log("image methods: ");
for(var x in im){
	console.log(x);
}
//clone just so we can try to crop to the face only
var cloned = im.clone();

					im.detectObject(cv.FACE_CASCADE, {}, function(err, faces){  
 
								for (var i=0;i<faces.length; i++){
									var x = faces[i];
//									im.ellipse(x.x + x.width/2, x.y + x.height/2, x.width/2, x.height/2);
									cloned.rectangle([x.x,x.y],[x.x + x.width, x.y + x.height],[0,255,0],2);
								}

								cloned.save('./out.png');   
  					});
});
