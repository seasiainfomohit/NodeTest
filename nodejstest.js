'user strict'
var fs = require('fs');

//Exercise 1
/**There is an odometer in a bike and it is broken in a way whenever there supposed to be value 4 in one of the 5 digits in odometer it skips that and shows 5. It is not able to display the digit 4. For example, if the odometer is at reading 32363 KM then next reading it will show is 32365 and not 32364 or if the odometer shows 3999 then next reading it will show is 5000 instead 4000. 
So if odometer shows the current reading 56287 then what is its actual reading?
*/
export async function odometer(event, context, callback) {
    let current_reading = 56287;
    let count = 0;
    let patt1 = /[4]/g;
    var i = 0;
    for (i; i <= current_reading; i++) {
        let str = i.toString();
        let result = str.match(patt1);
        if (result != null) {
            count += 1;
        }
    }
    let actual_reading = (current_reading) - (count);
    callback(null, actual_reading);
}

//Exercise 2
/**
We have a file which has 10 million numbers put in randomly ranging from 0 to 99.
Sort the array and write it to another file without keeping the whole array into memory or reading the whole file at once and putting it in memory. 
*/
export async function randomnumber(event, context, callback) {
    //generate random numbers
    var arr = [];
    // write data to the file
    fs.writeFile('input_random_number.txt', '', (err) => {
        if (err) throw err;
    });
    while (arr.length < 99) {
        var randomnumber = Math.floor(Math.random() * 99) + 1;
        if (arr.indexOf(randomnumber) > -1) continue;
        arr[arr.length] = randomnumber + '\n';
        fs.appendFileSync('input_random_number.txt', randomnumber + '\n');
    }

    // read file
    fs.readFile('../../input_random_number.txt', 'utf8', function(err, data) {
        if (err) throw err;
        var outputData = {};
        var myLines = fs.readFileSync('../../input_random_number.txt').toString().split('\n').forEach(function(data) {
            outputData.push(data);
        });
        // write outputdata to the file
        fs.writeFile('output_number.txt', outputDataArray.sort(), (err) => {
            if (err) throw err;
        });
    });

}

//Exercise 3
/**
There is an attached log file from one of the development web server. 

Line number 2 of this log file is something like this "Processing by SprintsController#show as JSONAPI"

This tells us, sprints controller's show action(method or function) ran. You have to parse this log file and output it the number of times the controller's actions run.

Expected Output:

SprintsController => show action ran 23 times
SprintsController => index action ran 17 times
and so on.

*/
export async function sprintcontroller(event, context, callback) {
    fs.readFile('../../development.log', 'utf8', function(err, data) {
        if (err) throw err;
        var showCounter = 0;
        var indexCounter = 0;
        var myLines = fs.readFileSync('../../development.log').toString().split('\n').forEach(function(line) {
            if (line.indexOf('SprintsController#show') >= 0) {
                showCounter += 1;
            }
            if (line.indexOf('SprintsController#index') >= 0) {
                indexCounter += 1;
            }
        });

        var data = {
            'show': "SprintsController => show action ran " + showCounter + " times",
            'index': "SprintsController => index action ran " + indexCounter + " times"
        };

        callback(null, data);

    });
}