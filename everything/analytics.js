var bbDim = {
	width: 40, //y
	height: 10, //z
	length: 40 //x
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
					//going back
					//assumption: the ball must have started at the floor sometime
					//in the past
					var j = i;
					for(var another_ballz = ballz; another_ballz > 5; j-- ){
						 another_ballz = data[j].ball[2] 
					}
					if(shot_frames.indexOf(j) < 0){
						//need to check if the direction is towards the basket
						//creating two vectors
						var v1 = [ ballx - data[j].ball[0], bally - data[j].ball[1] ];
						// (5.3, 25) is the location of the rim 
						var v2 = [ 5.3 - data[j].ball[0], 25 - data[j].ball[1] ];

						if(calculateAngle(v1, v2) < 0.785398163)
							shot_frames.push(j)
					}
				}
			}
		}

		if( boundbox2.z <= ballz && ballz <= boundbox2.z + bbDim.height ){
			if(boundbox2.y <= bally && bally <=boundbox2.y + bbDim.width){
				if(boundbox2.x <= ballx && ballx <= boundbox2.x + bbDim.length){
					//going back
					//assumption: the ball must have started at the floor sometime
					//in the past
					var j = i;
					for(var another_ballz = ballz; another_ballz > 5; j-- ){
						 another_ballz = data[j].ball[2] 
					}
					if(shot_frames.indexOf(j) < 0){
						//need to check if the direction is towards the basket
						//creating two vectors
						var v1 = [ ballx - data[j].ball[0], bally - data[j].ball[1] ];
						// (94 - 5.3, 25) is the location of the rim on the other side
						var v2 = [ 94 - 5.3 - data[j].ball[0], 25 - data[j].ball[1] ];

						if(calculateAngle(v1, v2) < 0.785398163)
							shot_frames.push(j)
					}
				}
			}
		}

	}
	return shot_frames;
}

function calculateAngle(v1, v2){
	return Math.acos( (v1[0] * v2[0] + v1[1] * v2[1]) / (Math.sqrt(Math.pow(v1[0],2)+Math.pow(v1[1],2)) * Math.sqrt(Math.pow(v2[0],2)+Math.pow(v2[1],2))));
}