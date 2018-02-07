"use strict"

const comutil = require('./../botutils.js');
const config = require('./../config.json');
const perms = require('./../permissions.js');
const gems = require('./../gemsintegration.js');

/*When called in the listen 
room/category this command 
will create a new room
with the given name*/

const rent = {
    run: function (msg) {
        if (comutil.isInListenRoom(msg)){
            //Get the arguments from the message
            var args = comutil.getArgs(msg);

            //Check that you sent a room name
            if (args.length < 1){
                msg.delete();
                return false;
            }

            //Check that the user has enough gems.
            if (gems.checkUserGems(msg.author, config.rentgemsrequired)){
                //Charge the user
                gems.chargeGems(msg.author, config.rentgemsrequired);

                //Setup the options
                var options = {
                    type: "text",
                    parent: msg.channel.parent
                }

                //Create the channel
                msg.guild.createChannel(args[0], options).then((newchannel) => {
                    //Assign permissions to the new owner
                    perms.allowView(msg.author, newchannel);

                    //Link to new channel in commands channel
                    msg.channel.send("Room created at " + newchannel.toString());

                    //@ the new owner in the channel
                    newchannel.send("I have created your channel " + msg.author.toString());
                });

                //Cleanup the message
                msg.delete();
            } else {
                //Warn the user that they didn't have enough gems.
                msg.channel.send("You do not have enough gems for this " + msg.author.toString());
                //and clean up the message
                msg.delete;
            }
        }
    },
    commandstr: "rent"
}

module.exports = rent;   