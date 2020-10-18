module.exports = {
	name: 'steamregister',
	description: 'Used by admins to say anything they want in a channel, given a channel id.',
	async execute(args, message, client, databases) {
        holdN = '';
        if (args.length > 1) {
            for (let i = 0; i < args.length; i++) {
                holdN = holdN + args[i] + " "
            }
            holdN = holdN.trim();
        }
        else {
            holdN = args[0]
        }
        try {
            const tag = await databases[10].create({
                discordName: message.author.username,
                gamerTag: holdN
            });
            const embed = {
                "title": "Registration",
                "description": "You have been registered as " + holdN + "."
            }
            message.channel.send({
                embed
            });
        }
        catch (e) {
            if (e.name == 'SequelizeUniqueConstraintError') {
                const upd = await databases[10].update({
                    gamerTag: holdN
                }, {
                    where: {
                        discordName: message.author.username
                    }
                })
                const embed = {
                    "title": "Registration",
                    "description": "You have been re-registered as " + holdN + "."
                }
                message.channel.send({
                    embed
                });
            }
            else {
                return message.reply('Something went wrong with registering. Contact HunBurry.');
            }
        }
    },
};