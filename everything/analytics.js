var bbDim = {
	width: 40, //y
	height: 10, //z
	length: 40 //x
}
var bbZ = 10;
var boundbox1 = {
	x: 0,
	y: 25 - bbDim.width / 2,
	z: bbZ
}

var boundbox2 = {
	x: 94 - bbDim.length,
	y: 25 - bbDim.width / 2,
	z: bbZ
}

function findClosestPerson(frameNo) {
	//findTheClosestPerson
	shotMadeFrame = data[frameNo];
	var closest_person = {
		id: 0,
		dist2: null
	};
	var p;
	for (p = 0; p < 5; p++) {
		//calculating distance^2 for home team
		var dist2 = Math.pow(shotMadeFrame.home[p][0][0] - shotMadeFrame.ball[0], 2) +
			Math.pow(shotMadeFrame.home[p][0][1] - shotMadeFrame.ball[1], 2);
		if (dist2 < closest_person.dist2 || closest_person.dist2 == null) {
			closest_person = {
				id: shotMadeFrame.home[p][1],
				dist2: dist2,
				team: "home"
			}
		}
	}
	for (p = 0; p < 5; p++) {
		//calculating distance^2 for away
		var dist2 = Math.pow(shotMadeFrame.away[p][0][0] - shotMadeFrame.ball[0], 2) +
			Math.pow(shotMadeFrame.away[p][0][1] - shotMadeFrame.ball[1], 2);
		if (dist2 < closest_person.dist2 || closest_person.dist2 == null) {
			closest_person = {
				id: shotMadeFrame.away[p][1],
				dist2: dist2,
				team: "away"
			}
		}
	}
	for (p = 0; p < 3; p++) {
		//calculating distance^2 for ref because apparantly I have to take that into account
		var dist2 = Math.pow(shotMadeFrame.refs[p][0][0] - shotMadeFrame.ball[0], 2) +
			Math.pow(shotMadeFrame.refs[p][0][1] - shotMadeFrame.ball[1], 2);
		if (dist2 < closest_person.dist2 || closest_person.dist2 == null) {
			closest_person = {
				id: shotMadeFrame.refs[p][1],
				dist2: dist2,
				team: "refs"
			}
		}
	}
	return closest_person;
}



function findShots() {
	var shot_frames = [];
	for (var i = 0; i < data.length; i++) {
		var ballx = data[i].ball[0];
		var bally = data[i].ball[1];
		var ballz = data[i].ball[2];

		if (boundbox1.z <= ballz && ballz <= boundbox1.z + bbDim.height) {
			if (boundbox1.y <= bally && bally <= boundbox1.y + bbDim.width) {
				if (boundbox1.x <= ballx && ballx <= boundbox1.x + bbDim.length) {
					//going back to when the ball was shot
					//assumption: the ball must have started at the floor sometime
					//in the past
					var j = i;
					for (var another_ballz = ballz; another_ballz > 5; j--) {
						another_ballz = data[j].ball[2]
					}
					if (shot_frames.indexOf(j) < 0) {
						var shotMadeFrame = data[j];
						//need to check if the direction is towards the basket
						//creating two vectors
						var v1 = [ballx - shotMadeFrame.ball[0], bally - shotMadeFrame.ball[1]];
						// (5.3, 25) is the location of the rim 
						var v2 = [5.3 - shotMadeFrame.ball[0], 25 - shotMadeFrame.ball[1]];

						if (calculateAngle(v1, v2) < 0.34906585) {
							closest_person = findClosestPerson(j);	
							if (closest_person.team != "refs") {
								shot_frames.push(j)
							}
						}
					}

				}
			}
		}

		if (boundbox2.z <= ballz && ballz <= boundbox2.z + bbDim.height) {
			if (boundbox2.y <= bally && bally <= boundbox2.y + bbDim.width) {
				if (boundbox2.x <= ballx && ballx <= boundbox2.x + bbDim.length) {
					//going back
					//assumption: the ball must have started at the floor sometime
					//in the past
					var j = i;
					for (var another_ballz = ballz; another_ballz > 5; j--) {
						another_ballz = data[j].ball[2]
					}
					if (shot_frames.indexOf(j) < 0) {
						//need to check if the direction is towards the basket
						//creating two vectors
						var v1 = [ballx - data[j].ball[0], bally - data[j].ball[1]];
						// (94 - 5.3, 25) is the location of the rim on the other side
						var v2 = [94 - 5.3 - data[j].ball[0], 25 - data[j].ball[1]];

						if (calculateAngle(v1, v2) < 0.34906585){
							closest_person = findClosestPerson(j);
							if(closest_person.team != "refs"){
								shot_frames.push(j)
							}
						}
					}
				}
			}
		}

	}
	return shot_frames;
}

function calculateAngle(v1, v2) {
	return Math.acos((v1[0] * v2[0] + v1[1] * v2[1]) / (Math.sqrt(Math.pow(v1[0], 2) + Math.pow(v1[1], 2)) * Math.sqrt(Math.pow(v2[0], 2) + Math.pow(v2[1], 2))));
}