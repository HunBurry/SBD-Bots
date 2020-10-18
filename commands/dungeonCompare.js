const {
    strict
} = require("assert");

module.exports = {
    name: 'dungeoncompare',
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
            let p1Stats = await databases[8].findOne({
                where: {
                    discordName: message.author.username
                }
            });
            console.log(p1Stats)
            if (p1Stats) {
                if (name2) {
                    n2 = await client.commands.get("nickToUser").execute(args, message, databases)
                    console.log(n2)
                    let p2Stats = await databases[8].findOne({
                        where: {
                            discordName: n2
                        }
                    });
                    if (p2Stats) {
                        const myEmbed = new Discord.MessageEmbed()
                            .setTitle('Dungeon Stats: ' + name + " vs. " + name2)
                            .setColor(message.member.displayHexColor)
                            .setFooter("All values are based on cached data, updated each time a user runs the `-dungeons` command. Use reactions T and C to toggle between time and overall completitons.")
                            .addFields({
                                name: 'Prophecy Completions',
                                value: p1Stats['proph'].toString() + " vs. " + p2Stats['proph'].toString(),
                                inline: true
                            }, {
                                name: 'Zero Hour Completions',
                                value: p1Stats['zero'].toString() + " vs. " + p2Stats['zero'].toString(),
                                inline: true
                            }, {
                                name: 'Shattered Throne Completions',
                                value: p1Stats['throne'].toString() + " vs. " + p2Stats['throne'].toString(),
                                inline: true
                            }, {
                                name: 'Pit of Heresey Completions',
                                value: p1Stats['pit'].toString() + " vs. " + p2Stats['pit'].toString(),
                                inline: true
                            }, {
                                name: 'Whisper Completions',
                                value: p1Stats['whisper'].toString() + " vs. " + p2Stats['whisper'].toString(),
                                inline: true
                            }, );
                        const myEmbed2 = new Discord.MessageEmbed()
                            .setTitle('Dungeon Stats: ' + name + " vs. " + name2)
                            .setColor(message.member.displayHexColor)
                            .setFooter("All values are based on cached data, updated each time a user runs the `-dungeons` command. Use reactions T and C to toggle between time and overall completitons.")
                            .addFields({
                                name: 'Fastest Prophecy',
                                value: p1Stats['prophTime'] + " vs. " + p2Stats['prophTime'],
                                inline: true
                            }, {
                                name: 'Fastest Zero Hour',
                                value: p1Stats['zeroTime'] + " vs. " + p2Stats['zeroTime'],
                                inline: true
                            }, {
                                name: 'Fastest Shattered Throne',
                                value: p1Stats['throneTime'] + " vs. " + p2Stats['throneTime'],
                                inline: true
                            }, {
                                name: 'Fastest Pit of Heresey',
                                value: p1Stats['pitTime'] + " vs. " + p2Stats['pitTime'],
                                inline: true
                            }, {
                                name: 'Fastest Whisper',
                                value: p1Stats['whisperTime'] + " vs. " + p2Stats['whisperTime'],
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
                        message.channel.send("Could not find user's cached stats. Please tell them to try running `-dungeons`.")
                    }
                }
                else {
                    message.channel.send("That user is not registed in the system. Tell them to try `-help register` for more information!");
                }
            }
            else {
                message.channel.send("Could not find cached stats. Please try running `-dungeons`.")
            }
        }
        else {
            message.channel.send("You aren't registed in the system. Try `-help register` for more information!");
        }
    },
};