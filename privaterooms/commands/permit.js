"use strict"

const comutil = require('./../botutils.js');
const perms = require('./../permissions.js');

const permit = {
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

                perms.allowView(mentions[i].user, msg.channel);
                msg.channel.send("I have allowed " + mentions[i].toString() + " to see this channel.");
            }

            msg.delete();
        }

    },
    commandstr: "permit"
}

module.exports = permit;