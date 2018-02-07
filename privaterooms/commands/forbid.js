"use strict"

const comutil = require('./../botutils.js');
const perms = require('./../permissions.js');

const forbid = {
    run: function (msg) {

        if (comutil.isInBotCategory(msg)){
            //Break if this is in the commands room
            if (comutil.isInBotChannel(msg)){
                return false;
            }

            var args = comutil.getArgs(msg);

            //Break if they didn't send any arguments
            if (args.length < 1){
                return false;
            }

            var mentions = msg.mentions.members.array();

            for (var i in mentions) {
                if (mentions[i].user.bot){
                    continue;
                }

                //TODO this should work by removing permissions, not just switching them to "off"
                perms.disallowView(mentions[i].user, msg.channel);
                msg.channel.send("I have hidden this channel from " + mentions[i].toString());
            }

            msg.delete();
        }

    },
    commandstr: "forbid"
}

module.exports = forbid;