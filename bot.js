const Discord = require('discord.js');	// required for Discord functions
const fs = require("fs");		// required for file I/O
const client = new Discord.Client();		// this is the actual Bot

class RaidLog
{
	constructor(crown, voiceChannel)
	{
		this.members 		= new Map();	// history of members that participated in raid: key - member; value - seconds in raid
		this.crown 			= crown;		// user to which the raid is registered (should be whoever started it)
		this.voiceChannel 	= voiceChannel;	// channel in which the raid is taking place
		this.lastUpdate		= Date.now();

		// add each member currently in the voice channel to the map of m
		voiceChannel.members.every( member => members[member] = 0 );
	} // end constructor
	
	
}
 

client.on('ready', () => {

    console.log('I am ready!');

}); // end client.on(ready)

 

client.on('message', message => {

    if (message.content === 'ping') {

       message.reply('pong');

       }
	   
	if (message.content === 'list'){
		
	}
	
	if (message.content === 'guild'){
		//var server = bot.guilds.get(message.guild.id).id;
		//message.reply(server);
		
		//message.reply('guild');
		//message.reply("Guild: [" + guild.name + "]");
	}

}); // end client.on(message)


client.on('voiceStateUpdate', (oldMember, newMember) => {
  let newUserChannel = newMember.voiceChannel
  let oldUserChannel = oldMember.voiceChannel


  if(oldUserChannel === undefined && newUserChannel !== undefined) {

     // User Joins a voice channel
	 //client.message.send(author, "Joined Channel");
	 client.channels.find("name", "raidlog").send(newMember + " Joined Channel " + newUserChannel);

  } else if(newUserChannel === undefined){

    // User leaves a voice channel
	//client.message.send(author, "Left Channel");
	client.channels.find("name", "raidlog").send(oldMember + " Left Channel " + oldUserChannel);
  } else if (oldUserChannel === newUserChannel){
		// user muted or unmuted themselves. Ignore the event.
  }  
  else{
	  client.channels.find("name", "raidlog").send(oldMember + " Left Channel " + oldUserChannel);
	  client.channels.find("name", "raidlog").send(newMember + " Joined Channel " + newUserChannel);
	  
  }
  
}); // end client.on(voicestateupdate)


// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret