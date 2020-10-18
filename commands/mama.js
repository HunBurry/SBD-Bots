module.exports = {
	name: 'mama',
	description: 'Used by admins to say anything they want in a channel, given a channel id.',
	execute(args, message, client, databases) {
        const embed = {
            "image": {
                "url": "https://media.discordapp.net/attachments/723027487201820744/732641513418522674/39s8dn.jpg"
            }
        };
        message.channel.send({
            embed
        });
        message.delete();
    },
};