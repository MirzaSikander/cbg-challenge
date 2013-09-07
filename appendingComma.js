var fs = require('fs');
fs.readFile('cbg-basketball.json', format);

function format(err, data){
	if(err) throw err;
    var array = data.toString().split("\n");
    for(var i = 0; i < array.length; i++) {
    	array[i] = array[i] + ",";
    }
    var newData = array.join("\n");
    fs.writeFile('cbg-improved.js',newData, function(){
    	console.log("done");
    })
}