"use strict"

const pasteinterface = require('better-pastebin');
const pasteconfig = require('./pastebinauths.json');

const init = function () {
    pasteinterface.setDevKey(pasteconfig.devkey);
    console.log("Pastebin wrapper initialized");
    /*pasteinterface.login(pasteconfig.username, pasteconfig.password, function(success, data){
        if (!success) {
            console.log("Failed to login to pastebin");
            return false;
        }
    });*/
}

//Creates a paste and sends the URL to the callback function
const createPaste = function (id, text, callback){

    var options = {
        contents: text,
        name: id,
        privacy: "1"
    }

    //Create the thing and send the URL to the callback function
    pasteinterface.create(options, 
        function (success, url){
            if (success) {
               return callback(url);
            }
        }
    );

}

module.exports = {
    init: init,
    createPaste, createPaste
}