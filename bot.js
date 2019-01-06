const Discord = require('discord.js');

const client = new Discord.Client();

 

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
	 client.channels.find("name", "general").send("Joined Channel");

  } else if(newUserChannel === undefined){

    // User leaves a voice channel
	//client.message.send(author, "Left Channel");
	client.channels.find("name", "general").send("Left Channel");
	

  }
});


// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret