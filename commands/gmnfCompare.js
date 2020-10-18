const {
    strict
} = require("assert");

module.exports = {
    name: 'gmnfcompare',
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
            let p1Stats = await databases[9].findAll({
                where: {
                    discordName: message.author.username
                }
            });
            console.log(p1Stats)
            if (p1Stats) {
                if (name2) {
                    n2 = await client.commands.get("nickToUser").execute(args, message, databases)
                    console.log(n2)
                    let p2Stats = await databases[9].findAll({
                        where: {
                            discordName: n2
                        }
                    });
                    console.log(p1Stats)
                    console.log(p2Stats)
                    if (p2Stats) {
                        const myEmbed = new Discord.MessageEmbed()
                            .setTitle('GMNF Stats: ' + name + " vs. " + name2)
                            .setColor(message.member.displayHexColor)
                            .setFooter("All values are based on cached data, updated each time a user runs the `-gmnf` command. Use reactions T and C to toggle between time and overall completitons.")
                        
                        const myEmbed2 = new Discord.MessageEmbed()
                            .setTitle('GMNF Stats: ' + name + " vs. " + name2)
                            .setColor(message.member.displayHexColor)
                            .setFooter("All values are based on cached data, updated each time a user runs the `-gmnf` command. Use reactions T and C to toggle between time and overall completitons.")
                        
                        for (let i = 0; i < p1Stats.length; i++) {
                            myEmbed.addFields({
                                name: p1Stats[i]['nfName'] + " Completions",
                                value: p1Stats[i]['clears'].toString() + " vs. " + p2Stats[i]['clears'].toString(),
                                inline: true
                            });

                            myEmbed2.addFields({
                                name: "Fastest " + p1Stats[i]['nfName'],
                                value: p1Stats[i]['bestTime'].toString() + " vs. " + p2Stats[i]['bestTime'].toString(),
                                inline: true
                            });
                        }
                            
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
                        message.channel.send("Could not find user's cached stats. Please tell them to try running `-gmnf`.")
                    }
                }
                else {
                    message.channel.send("That user is not registed in the system. Tell them to try `-help register` for more information!");
                }
            }
            else {
                message.channel.send("Could not find cached stats. Please try running `-gmnf`.")
            }
        }
        else {
            message.channel.send("You aren't registed in the system. Try `-help register` for more information!");
        }
    },
};