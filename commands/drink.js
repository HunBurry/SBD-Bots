module.exports = {
	name: 'drink',
	description: 'Used by admins to say anything they want in a channel, given a channel id.',
	async execute(args, message, client, databases) {
        const tag2 = await databases[3].findOne({
            where: {
                player: message.author.username
            }
        });
        if (tag2 == null) {
            const tag = await databases[3].create({
                player: message.author.username,
                numberOfBeers: 1
            });
            message.channel.send(message.author.username + " just had their first beer.")
        }
        else {
            numIQ = tag2.numberOfBeers + 1;
            tag2.numberOfBeers = tag2.numberOfBeers + 1;
            tag2.save();
            starting = message.author.username + " just had their " + numIQ + " beer. They are "
            verys = ''
            for (let i = 0; i <= numIQ; i++) {
                if (i % 5 == 0) {
                    verys = verys + "very "
                }
            }
            message.channel.send(starting + verys + "drunk.")
        }
    },
};