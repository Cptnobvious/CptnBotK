"use strict";

const debughere = {
    run: function (msg) {
        msg.channel.send(msg.channel.parent.name + " / " + msg.channel.name);
    },
    commandstr: "debughere"
}

module.exports = debughere;