module.exports = {
	name: 'shoulder',
	description: 'Used by admins to say anything they want in a channel, given a channel id.',
	async execute(args, message, client, databases) {
        const Discord = require('discord.js');
        const first = new Discord.MessageEmbed()
            .setTitle("Shoulder Charge Kills Leaderboard")
            .setColor(message.member.displayHexColor)
            .setDescription("1. Beeftastic1 (" + Math.floor(Math.random() * 1000000000).toString() + ")\n2. Everyone Else (Combined: " + Math.floor(Math.random() * 1000000).toString() + ")")
        message.channel.send(first)
    },
};