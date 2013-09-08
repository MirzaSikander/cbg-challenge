var fs = require('fs');
fs.readFile('cbg-basketball.json', format);

function format(err, data){
	if(err) throw err;
    var array = data.toString().split("\n");
    var newArray = [];
    for(var i = 0; i < array.length; i++) {
        var entry = JSON.parse(array[i]);
        if(entry.ball[2] > 10){
            newArray.push(i);
        }
    }
    var newData = newArray.join("\n");
    fs.writeFile('higherThanRim.txt',newData, function(){
    	console.log("done");
    })
}