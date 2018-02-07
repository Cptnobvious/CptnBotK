"use strict"

function runAtMidnight(func) {
    var now = new Date();
    var night = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1, // the next day, ...
        0, 0, 0 // ...at 00:00:00 hours
    );
    var msToMidnight = night.getTime() - now.getTime();

    setTimeout(function() {
        resetAtMidnight();    //      Then, reset again next midnight.
        func.run();           //      The function to run at midnight
    }, msToMidnight);
}



module.exports = {
    runAtMidnight: runAtMidnight
}