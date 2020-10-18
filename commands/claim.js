module.exports = {
	name: 'claim',
	description: 'Used by admins to say anything they want in a channel, given a channel id.',
	async execute(args, message, client, databases) {
        const tag2 = await databases[1].findOne({
            where: {
                id: parseInt(args[0])
            }
        });
        const tag = await databases[2].create({
            player: message.author.username
        });
        otherPlayer = '';
        if (message.author.username == tag2.player1) {
            otherPlayer = tag2.player2
        }
        else {
            otherPlayer = tag2.player
        }
        gen = client.channels.cache.get('357883718821478410') ///357883718821478410
        message.channel.send("Hey everyone, " + message.author.username + " just beat someone in a challenge. Give them a virtual beer, and make sure to challenge someone yourself! Run -help challenge for info!")
        gen.send("Hey everyone, " + message.author.username + " just beat someone in a challenge. Give them a virtual beer, and make sure to challenge someone yourself! Run -help challenge for info!");
        tag2.destroy();
    },
};