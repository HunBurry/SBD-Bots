module.exports = {
	name: 'hands',
	description: 'Used by admins to say anything they want in a channel, given a channel id.',
	execute(args, message, client, databases) {

        myUrl = 'https://cdn.discordapp.com/attachments/753379609831276604/768183750584434718/image0.jpg'

        const embed = {
            "image": {
                "url": myUrl
            }
        };
        message.channel.send({
            embed
        });
    },
};