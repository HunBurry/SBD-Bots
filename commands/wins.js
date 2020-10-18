module.exports = {
	name: 'wins',
	description: 'Used by admins to say anything they want in a channel, given a channel id.',
	async execute(args, message, client, databases) {
        
        const tag2 = await databases[2].findAll({
            where: {
                player: message.author.username
            }
        });
        message.channel.send("You currently have " + tag2.length + " challenge wins.");
    },
};