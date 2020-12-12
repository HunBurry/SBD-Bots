module.exports = {
	name: 'createchannel',
	description: 'Used by admins to say anything they want in a channel, given a channel id.',
	async execute(args, message, client, databases) {

        nameIQ = ''
        if (args.length > 1) {
            for (let i = 0; i < args.length; i++) {
                nameIQ = nameIQ + "-" + args[i]
            }
        }
        else {
            nameIQ = args[0]
        }

        nameIQ = nameIQ + "-discussion";
        nameIQ = nameIQ.trim();

        role = message.guild.roles.cache.find(role => role.id == '741122911154471105');

        console.log(message.channel.parent)

        newChannel = await message.guild.channels.create(nameIQ, {
            type: 'text',
            permissionOverwrites: [
                {
                    id: role,
                    deny: ['VIEW_CHANNEL'],
                },
            ],
            parent: message.channel.parent,
            topic: "Voting/Discussion on " + nameIQ
        })

        const Discord = require('discord.js')

        const pollEmbed = new Discord.MessageEmbed()
            .setColor(message.member.displayHexColor)
            .setTitle('New Poll/Vote')
            .addFields(
                { name: 'Time from Start:', value: "24 Hours", inline: true },
                { name: 'Description:', value: "Voting/Discussion on " + nameIQ + "\n\nUse the appropriate reaction to vote. Reaction will be removed afterwards."},
            );

        channel = newChannel;

        console.log(newChannel)

        poll = await newChannel.send(pollEmbed);

        ///message.delete();

        await poll.react('👍').then(() => poll.react('👎'))

        const filter = (reaction, user) => {
            //console.log(user)
            //console.log(reaction)
            //console.log('👎')
            //console.log(reaction)
            //console.log(['👍', '👎'].includes(reaction.emoji.name))
            return ['👍', '👎'].includes(reaction.emoji.name)
        };

        noVotes = [];
        yesVotes = [];

        const collector = poll.createReactionCollector(filter, { time: 86400000  });

        collector.on('collect', reaction => {
            user = reaction.users.cache.array()[1]
            //console.log(m)
            //console.log(m.users);
            console.log(reaction)
            if (!noVotes.includes(user.username) && !yesVotes.includes(user.username)) {
                if (reaction.emoji.name === '👍') {
                    yesVotes.push(user.username);
                    console.log('yes')
                } 
                else {
                    noVotes.push(user.username)
                    console.log('no')
                };
                user.send('Vote recorded.');
            }
            else {
                if (noVotes.includes(user.username)) {
                    let index = noVotes.indexOf(user.username);
                    if (index > -1) {
                        noVotes.splice(index, 1);
                    }
                }
                if (yesVotes.includes(user.username)) {
                    let index = yesVotes.indexOf(user.username);
                    if (index > -1) {
                        yesVotes.splice(index, 1);
                    }
                }

                if (reaction.emoji.name === '👍') {
                    yesVotes.push(user.username)
                } 
                else {
                    noVotes.push(user.username)
                };
                user.send("Vote re-recorded.")
            }

            ///message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));

            const userReactions = poll.reactions.cache.filter(reaction => reaction.users.cache.has(user.id));
            try {
                for (const reaction of userReactions.values()) {
                    reaction.users.remove(user.id);
                }
            } 
            catch (error) {
                console.error('Failed to remove reactions.');
            }
        });

        collector.on('end', collected => {
            poll.delete();
            channel.send("The poll for the topic `" + desc + "`is now closed. There were " + yesVotes.length.toString() + " yes votes and " + noVotes.length.toString() + " no votes.")
            console.log(yesVotes);
            console.log(noVotes)
        });

    },
}