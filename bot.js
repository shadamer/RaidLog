// TODO: Register user that created raid to the raid itself?
// TODO: Check privileges of user that issued command to see if they can create/end raids

const Discord 	= require('discord.js');	// Discord API
const fs 		= require("fs");			// File i/o
const client 	= new Discord.Client();		// Discord bot

const cmdPrefix = '$'; // should probably persist beyond the instance of the bot so that it can be customized and saved

var activeRaids;	// map representing active raids: key - voice channel; value - 

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
	}

	// Update the duration of each member's presence in the voice channel
	function update()
	{
		let secondsToAdd = (Date.now() - this.lastUpdate) / 1000;
		this.members.forEach( (member, duration) => duration += secondsToAdd );
	}

	// Report the current status
	function getReport()
	{
		let report = '';

		members.forEach( (member, duration) => s += member.username + '\t\t' + duration + ' seconds\n' );
		return report;
	}
};

// log the client in
client.login(process.env.BOT_TOKEN); //BOT_TOKEN is the Client Secret

// Command registration and object instantiation
// Runs once at login
client.once
(
	'ready',
	() =>
	{
		activeRaids = new Map();
	}
);

client.on
(
	'message',
	message =>
	{
		// Only try to match command if message begins with specified command prefix
		if (message.content.search(cmdPrefix) == 0)
		{
			// Strip out command prefix
			let cmdMsg = message.content.substring(1, message.content.length - 1);


			// raid start command
			if 		(cmdMsg === 'raid_start')
			{
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
		}
	}
);

client.on
(
	'voiceStateUpdate',
	(oldMember, newMember) =>
	{
		// member previously wasn't in a voice channel so they must have joined a channel
		if (!oldMember.voiceChannelID)
		{
			if (activeRaids.has(newMember.voiceChannelID))
			{
				// Update durations for each member in the voice channel, then add the new member if
				// they don't already exist
				activeRaids[newMember.voiceChannelID].update();
				if (!activeRaids[newMember.voiceChannelID].members.has(newMember))
					activeRaids[newMember.voiceChannelID].members[newMember] = 0;
			}
		}
		
		// Otherwise member was already in a voice channel
		else
		{
			// Need to check if member left channel or just muted/unmuted themselves
			// If voiceChannelID is the different for old and new, member must have left the channel
			if (oldMember.voiceChannelID !== newMember.voiceChannelID)
			{
				// Update durations for each member in the voice channel
				activeRaids[newMember.voiceChannelID].update();
			}

		}
	}
);
 
