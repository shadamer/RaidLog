const Discord = require('discord.js');	// required for Discord functions
const fs = require("fs");		// required for file I/O
const client = new Discord.Client();		// this is the actual Bot

const cmdPrefix = '$'; // should probably persist beyond the instance of the bot so that it can be customized and saved

var activeRaids;	// map representing active raids: key - voice channel; value - 

class RaidLog
{
	constructor(crown, voiceChannel)
	{
		this.raidID			= new string(Date.getFullYear()+Date.getFullMonth()+Date.getFullDate()+getHours()+getMinutes()+getSeconds());
		this.members 		= new Map();	// history of members that participated in raid: key - member; value - seconds in raid
		this.crown 			= crown;		// user to which the raid is registered (should be whoever started it)
		this.voiceChannel 	= voiceChannel;	// channel in which the raid is taking place
		this.lastUpdate		= Date.now();	// start time of a raid
		this.raidStartTime 	= Date.now();	// end time of a raid
		// add each member currently in the voice channel to the map of m
		voiceChannel.members.every( member => members[member] = 0 );
	} // end constructor
	
	// Update the duration of each member's presence in the voice channel
	update()
	{
		let secondsToAdd = (Date.now() - this.lastUpdate) / 1000;
		this.members.forEach( (member, duration) => duration += secondsToAdd );
	}
	
	// Report the current status
	getReport()
	{
		let report = '';

		members.forEach( (member, duration) => s += member.username + '\t\t' + duration + ' seconds\n' );
		return report;
	}
} // end class RaidLog
 
 
 // Command registration and object instantiation
// Runs once at login
client.once
(
	'ready',
	() =>
	{
		activeRaids = new Map();
	}
); // end client.once

client.on('ready', () => {

    console.log('I am ready!');

}); // end client.on(ready)



client.on
(
	'message',
	message =>
	{
		
		//let cmdMsg = message.content.substring(1, message.content.length);
		//client.channels.find('name', 'raidlog').send('cmdMsg: ' + cmdMsg);
		/*	
		// Only try to match command if message begins with specified command prefix
		if (message.content.startsWith(cmdPrefix))
		{
			// Strip out command prefix
			let cmdMsg = message.content.substring(1, message.content.length);
			client.channels.find('name', 'raidlog').send('cmdMsg: ' + cmdMsg);

			// raid start command
			if 		(cmdMsg === 'raid_start')
			{
				client.channels.find('name', 'raidlog').send('Calling raid_start');
				// Check privileges of user that sent command here

				// First check if the user who issued the command is in a voice channel
				// Not sure if empty string or undefined returned
				if (typeof message.member.voiceChannelID)
				{
					// Make sure that a raid isn't already active
					activeRaids[message.member.voiceChannelID] = new RaidLog(message.member, message.member.voiceChannel);
					
				}
			}

			// raid end command
			else if (cmdMsg === 'raid_end')
			{
				// Check privileges of user that sent command here
				client.channels.find('name', 'raidlog').send('Calling raid_end');
				
				// Check to see if a raid is registered for the voice channel the author of the message is in
				if (activeRaids.has(message.member.voiceChannelID))
				{
					activeRaids[message.member.voiceChannelID].update();

					client.channels.find('name', 'raidlog').send(activeRaids[message.member.voiceChannel].getReport());
					
				}
				else
				{
					// inform user that no raid is registered to the given voice channel
					client.channels.find('name', 'raidlog').send('No active raid is registered to your current voice channel!');
				}
			}

			// move raid command
			// Move the raid to a different channel without ending the logging session
			// If a raid is already active in the specified channel, join the two raids together (?)
			else if (cmdMsg === 'raid_move')
			{

			}
		} // end check cmd prefix block
		*/
		
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
	} // end message block
	
	
); // end client.on(message)

client.on('voiceStateUpdate', (oldMember, newMember) => {
  let newUserChannel = newMember.voiceChannel
  let oldUserChannel = oldMember.voiceChannel


  if(oldUserChannel === undefined && newUserChannel !== undefined) {

     // User Joins a voice channel
	 //client.message.send(author, "Joined Channel");
	 if (newUserChannel !== '#AFK'){
		client.channels.find("name", "raidlog").send(newMember + " Joined Channel " + newUserChannel);
	 }

  } else if(newUserChannel === undefined){

    // User leaves a voice channel
	//client.message.send(author, "Left Channel");
	if (oldUserChannel !== '#AFK'){
		client.channels.find("name", "raidlog").send(oldMember + " Left Channel " + oldUserChannel);
	}
  } else if (oldUserChannel === newUserChannel){
		// user muted or unmuted themselves. Ignore the event.
  }  
  else{
	  // we don't care about AFK
	  if (oldUserChannel !== '#AFK'){
		client.channels.find("name", "raidlog").send(oldMember + " Left Channel " + oldUserChannel);
	  }
	  if (newUserChannel !== '#AFK'){
		client.channels.find("name", "raidlog").send(newMember + " Joined Channel " + newUserChannel);
	  }
  }
  
}); // end client.on(voicestateupdate)


// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret