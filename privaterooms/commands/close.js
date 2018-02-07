"use strict"

const comutils = require('./../botutils.js');
const paste = require('./../pastebinwrapper.js');
const fetch = require('./../logfetch.js')

const close = {
    run: function (msg) {

        //Make sure this is called in valid channels only
        if (!comutils.isInBotCategory(msg) || comutils.isInListenRoom(msg)){
            msg.channel.send("You cannot close this channel!");
            msg.delete();
            return;
        }

        //pull a list of people to send this paste to
        var sendTo = msg.channel.members.array();

        //Warn users that this could take a minute.
        msg.channel.send("I will begin compiling a log and close this channel upon completion.");

        //Send it off into the pastebin stuff.
        fetch.fetchLog(msg.channel, sendTo);

    },
    commandstr: "close"
}

module.exports = close;