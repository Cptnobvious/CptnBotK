"use strict"

const Discord = require("discord.js");

const initChannelPermissions = function (channel){
    channel.overwritePermissions()
}

const allowView = function (user, channel){
    channel.overwritePermissions(user, {
        'VIEW_CHANNEL':         true,
        'SEND_MESSAGES':        true,
    });
}

const disallowView = function (user, channel){
    channel.overwritePermissions(user, {
        'VIEW_CHANNEL':         false,
        'SEND_MESSAGES':        false,
    });
}

module.exports = {
    allowView: allowView,
    disallowView: disallowView
}