var port = process.env.PORT || 5000; 
var http = require('http'),
	app = http.createServer(handler),
 	url = require('url'),
	mime = require('mime'),
	fs = require('fs'),
	format = require('util').format;

	//http://stackoverflow.com/questions/7357734/how-do-i-get-the-time-of-day-in-javascript-node-js
function getDateTime() {
    var date = new Date();
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;
}

function reportStatus(response, message){
	response.writeHeader(200, {"Content-Type": 'text/plain'});  
	response.write(message);  
	response.end();
}

function handler(request, response) {
	var parsed_url = url.parse(request.url);
	var file_to_load;
	//PROXY:
	//if the url contains /graphite/ then it will make a request to
	//the graphite server

	if(parsed_url.pathname == '/')
		file_to_load = 'everything/index.html';
	else{
		file_to_load = 'everything'+parsed_url.path;

	}
	fs.readFile(file_to_load, function (err, html) {
	if (err) {
		response.writeHeader(404, {"Content-Type": 'text/html'});  
		response.write('Your requsted webpage could not be found'+
			'<br>Please check your path and try again ');  
		response.end();
		return;
	}       
	response.writeHeader(200, {"Content-Type": mime.lookup(file_to_load)});  
	response.write(html);  
	response.end();  
	});
}

app.listen(port);
console.log('Server running at http://0.0.0.0:'+port);
