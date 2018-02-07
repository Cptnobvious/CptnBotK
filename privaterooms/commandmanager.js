"use strict"

var config = require('./config.json');
var paste = require('./pastebinwrapper.js');

/*----------------------
---Commands available---

---Call in Bot---
*rent <name>                - Rents a room with <name>
*statistics                 - Lists number of active/inactive rooms and max rooms

---Call in Room
*permit <@user/all>         - Allows a user or makes room public
*forbid <@user/all>         - Denies a user or public to a room
*rename <name>              - Renames a room
*close                      - Called by admin or room owner to close a room

---Debug---
*debughere                  - Gives room and category name
*help                       - Gives a list of commands and how to use them
-----------------------*/

const commandList = {
    debughere:  require('./commands/debughere.js'),
    request:    require('./commands/rent.js'),
    permit:     require('./commands/permit.js'),
    forbid:     require('./commands/forbid.js'),
    close:      require('./commands/close.js')
}

const handleCommand = function (msg){

    var cmd = getCommand(msg);

    if (cmd == null){
        return false;
    }

    for (let i in commandList){
       if(cmd.toLowerCase() == commandList[i].commandstr.toLowerCase()){
           commandList[i].run(msg);
           break;
       }
    }

}

//function to get the command name, warning this can throw null
//TODO: convering that to an array may be unsafe
function getCommand (msg) {
    var arr = msg.content.split(" ");
    var str = arr[0];
    if (str.length > 1){
        return str.substring(1, str.length).toLowerCase();
    }

    return null;
}

//Check that the string uses the prefix defined in the config
function hasPrefix (str) {
    if (str.startsWith(config.prefix)){
        return true;
    }

    return false;
}

const init = function() {
    paste.init();
    console.log("Private Rooms Initialized");
}

module.exports = {
    handleCommand: handleCommand,
    init: init
}