const Discord = require('discord.js');	// required for Discord functions
const fs = require("fs");		// required for file I/O
const client = new Discord.Client();		// this is the actual Bot

 

client.on('ready', () => {

    console.log('I am ready!');

});

 

client.on('message', message => {

    if (message.content === 'ping') {

       message.reply('pong');

       }

});


client.on('voiceStateUpdate', (oldMember, newMember) => {
  let newUserChannel = newMember.voiceChannel
  let oldUserChannel = oldMember.voiceChannel


  if(oldUserChannel === undefined && newUserChannel !== undefined) {

     // User Joins a voice channel
	 //client.message.send(author, "Joined Channel");
	 client.channels.find("name", "general").send(newMember + " Joined Channel " + newUserChannel);

  } else if(newUserChannel === undefined){

    // User leaves a voice channel
	//client.message.send(author, "Left Channel");
	client.channels.find("name", "general").send(oldMember + " Left Channel " + oldUserChannel);
	

  }
});


// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret