module.exports = {
	name: 'challenges',
	description: 'Used by admins to say anything they want in a channel, given a channel id.',
	async execute(args, message, client, databases) {
        myCommand = client.commands.get("checkName")
        const Discord = require('discord.js')
        n1 = await myCommand.execute(message.author.username, databases);
        const first = await databases[1].findAll({
            where: {
                player1: n1
            }
        });
        const second = await databases[1].findAll({
            where: {
                player2: n1
            }
        });

        myString = '';
        const embed = new Discord.MessageEmbed()
        .setTitle('Challenges for ' + n1)
        .setColor(message.member.displayHexColor);

        for (let i = 0; i < first.length; i++) {
            embed.addFields(
                {
                    name: n1 + " vs. " + first[i]['player2'] + " (#" + first[i]['id'] + ")", value: first[i]['description'], inline: true
                }
            )
        }

        for (let i = 0; i < second.length; i++) {
            embed.addFields(
                {
                    name: n1 + " vs. " + second[i]['player2'] + " (#" + second[i]['id'] + ")", value: second[i]['description'], inline: true
                }
            )
        }

        message.channel.send(embed)
    },
};