"use strict"

//Fetches a log from a channel and returns it as a single string
//Takes the channel and a list of people to send it to
//TODO this whole thing should return a promise when completed instead of closing the channel itself
const paste = require('./pastebinwrapper.js');

const maxfetch = 50;

const fetchLog = function (chan, sendTo) {

    var log;

    //In chunks of maxfetch grab all the messages in the channel
    var queryoptions = {
        limit:  maxfetch
    }


    chan.messages.fetch(queryoptions).then( m => {
        var currentlog = m;
        var last = currentlog.last().id
        if (currentlog.size == maxfetch){
            fetchMore(currentlog, chan, sendTo, last)
        } else {
            printToParties(currentlog, sendTo);
        }
    });    
}

const printToParties = function (cLog, parties){
    //sanitize the log into readable text
    var tLog = ""
    var hLog = cLog.array();
    hLog = hLog.reverse();
    for (var i in hLog){
        tLog = tLog + 
            hLog[i].author.username + 
            ": " +
            hLog[i].cleanContent +
            "\n";
    }
    
    //dump log into a pastebin
    //get name of the channel
    var chanName = hLog[0].channel.name;

    paste.createPaste(chanName, tLog, function(url) {
        for (var k in parties){
            if (!parties[k].user.bot){
                parties[k].createDM().then(dm => {
                    dm.send("Here you go. I finished making your log.");
                    dm.send(url);
                    //TODO closing channels here is hacky fix this
                    hLog[0].channel.delete();
                });
            }
        }
    });
}

const fetchMore = function (cLog, chan, sendTo, beforeId){
    var queryoptions = {
        limit: maxfetch,
        before: beforeId
    }

    chan.messages.fetch(queryoptions).then( m => {
        var currentlog = cLog.concat(m);
        var last = currentlog.last().id;
        if (m.size == maxfetch){
            fetchMore(currentlog, chan, sendTo, last)
        } else {
            printToParties(currentlog, sendTo);
        }
    });
}

module.exports = {
    fetchLog: fetchLog
}