var fs = require('fs');
fs.readFile('cbg-basketball.json', format);

function format(err, data){
	if(err) throw err;
    var array = data.toString().split("\n");
    for(var i = 0; i < array.length; i++) {
        var entry = JSON.parse(array[i]);

        var ref;
        if(entry.refs[0][1] == 2)
            ref = entry.refs[0];
        else if(entry.refs[1][1] == 2)
            ref = entry.refs[1];
        else
            ref = entry.refs[2]
        console.log(ref);
    	array[i]= parseFloat(entry.ball[0]).toFixed(5)+" "+parseFloat(entry.ball[1]).toFixed(5) +
        " | "+parseFloat(ref[0][0]).toFixed(5)+" "+parseFloat(ref[0][1]).toFixed(5); 
    	console.log(i+": "+array[i]);
    }
    var newData = array.join("\n");
    fs.writeFile('ballWithRef2.txt',newData, function(){
    	console.log("done");
    })
}