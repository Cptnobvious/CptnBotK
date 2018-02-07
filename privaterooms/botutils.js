"use strict"

const config = require('./config.json');

//Get an array of arguments off the message
const getArgs = function getArgs(msg){
    var arr = msg.content.split(" ");
    var arr2 = new Array;
    for (var i = 1; i < arr.length; i++){
        arr2[i - 1] = arr[i];
    }

    return arr2;
}

//Checks to see if the message is in both the defined category and channel
const isInListenRoom = function (msg) {
    if (isInBotCategory(msg) && isInBotChannel(msg)){
        return true;
    }

    return false;
}

//Check that you're in the defined category
const isInBotCategory = function (msg) {
    if (msg.channel.parent.name.toLowerCase() == config.category.toLowerCase()){
        return true;
    }

    return false;
}

//Check that you're in the defined botcommand room
const isInBotChannel = function (msg) {
    if (msg.channel.name.toLowerCase() == config.channel.toLowerCase()){
        return true;
    }

    return false;
}

module.exports = {
    getArgs: getArgs,
    isInListenRoom: isInListenRoom,
    isInBotCategory: isInBotCategory,
    isInBotChannel: isInBotChannel
}