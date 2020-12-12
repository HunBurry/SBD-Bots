module.exports = {
	name: 'poll',
	description: 'Used by admins to say anything they want in a channel, given a channel id.',
	async execute(args, message, client, databases) {
        const Discord = require('discord.js');

        desc = '';
        for (let i = 1; i < args.length; i++) {
            desc = desc + args[i] + " "; ///compiles args (split during pre-processing) into a description that can be used
        }

        timePeriod = args[0];

        const pollEmbed = new Discord.MessageEmbed()
            .setColor(message.member.displayHexColor)
            .setTitle('New Poll/Vote')
            .addFields(
                { name: 'Time from Start:', value: args[0] + " Minutes", inline: true },
                { name: 'Description:', value: desc + "\n\nUse the appropriate reaction to vote. Reaction will be removed afterwards."},
            );

        channel = message.channel;

        poll = await message.channel.send(pollEmbed);

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

        const collector = poll.createReactionCollector(filter, { time: 60000 * parseInt(timePeriod) });

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

        

        /*poll.awaitReactions(filter, {max: 1000, time: 60000 * parseInt(timePeriod), errors: ['time'] })
            .then(collected => {
                console.log("entered")
                const reaction = collected.first();
                user = reaction.author;
                console.log(reaction)
                ///console.log(user)

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

            })
            .catch(collected => {
                console.log(collected)
                console.log("ugh")
                ////message.reply('you reacted with neither a thumbs up, nor a thumbs down.');
            });
            */
    },
}