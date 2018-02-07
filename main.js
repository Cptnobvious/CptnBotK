"use strict"

//Require the auth json file where I put the token
var auth = require('./auth.json');

// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();

//The guild the client is on
const guild = null;

//Import the modules
var privateRooms    = require('./privaterooms/commandmanager.js');
var admin           = require('./admin/adminmain.js');

// Log our bot in
client.login(auth.token);

// Let us know discord reacted to our login
client.on('ready', () => {
    init();
    console.log('I am ready!');
});

// Recieve message events and send them to the modules
client.on('message', message => {
    privateRooms.handleCommand(message);
    admin.readMessage(message);
});

client.on('guildMemberAdd', member => {
    admin.onJoin(member);
});


function init(){
    console.log("Starting initilization of modules");
    privateRooms.init();
    admin.init();
    console.log("Finished initializing modules");
}
