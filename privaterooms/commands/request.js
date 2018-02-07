"use strict"

const comutil = require('./../botutils.js');
const config = require('./../config.json');
const perms = require('./../permissions.js');

const request = {
    run: function (msg) {
        if (comutil.isInListenRoom(msg)){
            var args = comutil.getArgs(msg);

            if (args.length < 1){
                return false;
            }

            //Setup the options
            var options = {
                type: "text",
                parent: msg.channel.parent
            }

            msg.guild.createChannel(args[0], options).then((newchannel) => {
                perms.allowView(msg.author, newchannel);
                newchannel.send(msg.author.toString());
            });

            msg.delete();
        }
    },
    commandstr: "request"
}

module.exports = request;   