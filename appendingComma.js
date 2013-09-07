var fs = require('fs');
fs.readFile('cbg-basketball.json', format);

function format(err, data){
	if(err) throw err;
    var array = data.toString().split("\n");
    var j = array.length - 1;
    for(var i = 0; i < j; i++) {
    	var temp = array[i] + ",";
    	array[i] = array[j] + ",";
    	array[j] = temp;
    	j--;
    	console.log(i +" "+ j);
    }
    var newData = array.join("\n");
    fs.writeFile('cbg-improved.js',newData, function(){
    	console.log("done");
    })
}