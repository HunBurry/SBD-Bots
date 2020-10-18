module.exports = {
	name: 'members',
	description: 'Used by admins to say anything they want in a channel, given a channel id.',
	execute(args, message, client, databases) {
        message.channel.send("The server currently has " + message.guild.memberCount.toString() + " members.");
    }
}