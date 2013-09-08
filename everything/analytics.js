var bbDim = {
	width: 16, //y
	height: 2, //z
	length: 19 //x
}
var bbZ = 10;
var boundbox1 = {
	x: 0,
	y: 25 - bbDim.width/2,
	z: bbZ 
}

var boundbox2 = {
	x: 94 - bbDim.length,
	y: 25 - bbDim.width/2,
	z: bbZ 
}

function findShots(){
	var shot_frames = [];
	for(var i = 0; i < data.length ; i++){
		var ballx = data[i].ball[0];
		var bally = data[i].ball[1];
		var ballz = data[i].ball[2];

		if( boundbox1.z <= ballz && ballz <= boundbox1.z + bbDim.height ){
			if(boundbox1.y <= bally && bally <=boundbox1.y + bbDim.width){
				if(boundbox1.x <= ballx && ballx <= boundbox1.x + bbDim.length){
					shot_frames.push(i)
				}
			}
		}

		if( boundbox2.z <= ballz && ballz <= boundbox2.z + bbDim.height ){
			if(boundbox2.y <= bally && bally <=boundbox2.y + bbDim.width){
				if(boundbox2.x <= ballx && ballx <= boundbox2.x + bbDim.length){
					shot_frames.push(i)
				}
			}
		}

	}
	return shot_frames;
}