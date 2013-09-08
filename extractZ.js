var fs = require('fs');
fs.readFile('cbg-basketball.json', format);

function format(err, data){
	if(err) throw err;
    var array = data.toString().split("\n");
    for(var i = 0; i < array.length; i++) {
    	array[i] = JSON.parse(array[i]).ball[2]; 
    	console.log(array[i]);
    }
    var newData = array.join("\n");
    fs.writeFile('basketball-z.txt',newData, function(){
    	console.log("done");
    })
}