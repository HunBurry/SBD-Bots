const {
    strict
} = require("assert");

module.exports = {
    name: 'raidcompare',
    description: 'Used by admins to say anything they want in a channel, given a channel id.',
    async execute(args, message, client, databases) {
        console.log("HI!")
        const Discord = require('discord.js')
        myCommand = client.commands.get("checkName")
        name = await myCommand.execute(message.author.username, databases);
        hold2 = await client.commands.get("nickToUser").execute(args, message, databases);
        console.log(name);
        console.log(hold2);
        name2 = await client.commands.get("checkName").execute(hold2, databases);
        console.log(name2);
        //console.log(args);
        //console.log(message);
        //console.log(client)
        ///name2 = await client.commands.get("checkName").execute(
        ///    client.commands.get("nickToUser").execute(args, message, databases), databases
        ///)

        if (name) {
            let p1Stats = await databases[7].findOne({
                where: {
                    discordName: message.author.username
                }
            });
            console.log(p1Stats)
            if (p1Stats) {
                if (name2) {
                    n2 = await client.commands.get("nickToUser").execute(args, message, databases)
                    console.log(n2)
                    let p2Stats = await databases[7].findOne({
                        where: {
                            discordName: n2
                        }
                    });
                    if (p2Stats) {
                        const myEmbed = new Discord.MessageEmbed()
                            .setTitle('Raid Stats: ' + name + " vs. " + name2)
                            .setColor(message.member.displayHexColor)
                            .setFooter("All values are based on cached data, updated each time a user runs the `-raids` command. Use reactions T and C to toggle between time and overall completitons.")
                            .addFields({
                                name: 'Total Leviathan Completions',
                                value: p1Stats['levi'].toString() + " vs. " + p2Stats['levi'].toString(),
                                inline: true
                            }, {
                                name: 'Total SoS Completions',
                                value: p1Stats['sos'].toString() + " vs. " + p2Stats['sos'].toString(),
                                inline: true
                            }, {
                                name: 'Total Last Wish Completions',
                                value: p1Stats['lw'].toString() + " vs. " + p2Stats['lw'].toString(),
                                inline: true
                            }, {
                                name: 'Total Garden Completions',
                                value: p1Stats['garden'].toString() + " vs. " + p2Stats['garden'].toString(),
                                inline: true
                            }, {
                                name: 'Total CoS Completions',
                                value: p1Stats['cos'].toString() + " vs. " + p2Stats['cos'].toString(),
                                inline: true
                            }, {
                                name: 'Total EoW Completions',
                                value: p1Stats['eow'].toString() + " vs. " + p2Stats['eow'].toString(),
                                inline: true
                            }, {
                                name: 'Total SoTP Completions',
                                value: p1Stats['sotp'].toString() + " vs. " + p2Stats['sotp'].toString(),
                                inline: true
                            }, );
                        const myEmbed2 = new Discord.MessageEmbed()
                            .setTitle('Raid Stats: ' + name + " vs. " + name2)
                            .setColor(message.member.displayHexColor)
                            .setFooter("All values are based on cached data, updated each time a user runs the `-raids` command. Use reactions T and C to toggle between time and overall completitons.")
                            .addFields({
                                name: 'Fastest Leviathan Completion',
                                value: p1Stats['leviTime'] + " vs. " + p2Stats['leviTime'],
                                inline: true
                            }, {
                                name: 'Fastest SoS Completion',
                                value: p1Stats['sosTime'] + " vs. " + p2Stats['sosTime'],
                                inline: true
                            }, {
                                name: 'Fastest Last Wish Completion',
                                value: p1Stats['lwTime'] + " vs. " + p2Stats['lwTime'],
                                inline: true
                            }, {
                                name: 'Fastest Garden Completion',
                                value: p1Stats['gardenTime'] + " vs. " + p2Stats['gardenTime'],
                                inline: true
                            }, {
                                name: 'Fastest CoS Completion',
                                value: p1Stats['cosTime'] + " vs. " + p2Stats['cosTime'],
                                inline: true
                            }, {
                                name: 'Fastest EoW Completion',
                                value: p1Stats['eowTime'] + " vs. " + p2Stats['eowTime'],
                                inline: true
                            }, {
                                name: 'Fastest SoTP Completion',
                                value: p1Stats['sotpTime'] + " vs. " + p2Stats['sotpTime'],
                                inline: true
                            }, );
                        myMes = await message.channel.send(myEmbed);

                        myMes.react('🇹')
                            .then(() => myMes.react('🇨'))
                            .catch(() => console.error('One of the emojis failed to react.'));

                        userIDIQ = message.author.id

                        const filter = (reaction, user) => {
                            myArr = ['🇹', '🇨']
                            return (myArr.includes(reaction.emoji.name) && (user.id === userIDIQ))
                        };

                        const collector = myMes.createReactionCollector(filter, {
                            time: 300000
                        });

                        collector.on('collect', (reaction, user) => {
                            if (reaction.emoji.name == '🇹') {
                                myMes.edit(myEmbed2).then(msg => console.log(`Updated the content of a message to ${myMes.content}`))
                                    .catch(console.error);
                                ///myMes.reactions.removeAll()
                            }
                            else if (reaction.emoji.name == '🇨') {
                                myMes.edit(myEmbed).then(msg => console.log(`Updated the content of a message to ${myMes.content}`))
                                    .catch(console.error);
                                ///myMes.reactions.removeAll()
                            }
                        })

                        collector.on('end', collected => {
                            console.log("done");
                        });
                    }
                    else {
                        message.channel.send("Could not find user's cached stats. Please tell them to try running `-raids`.")
                    }
                }
                else {
                    message.channel.send("That user is not registed in the system. Tell them to try `-help register` for more information!");
                }
            }
            else {
                message.channel.send("Could not find cached stats. Please try running `-raids`.")
            }
        }
        else {
            message.channel.send("You aren't registed in the system. Try `-help register` for more information!");
        }
    },
};