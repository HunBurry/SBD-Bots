module.exports = {
	name: 'gmnf',
	description: 'Used by admins to say anything they want in a channel, given a channel id.',
	async execute(args, message, client, databases) {
        const Discord = require('discord.js');
        const {PythonShell} = require('python-shell');

        if (args[0]) {
            myCommand = client.commands.get("checkName")
            name = await myCommand.execute(message.author.username, databases);
            const axios = require('axios');
            url = 'https://sixbeersdeep.net/wp-content/plugins/D2ClanScore/api/Roster/'
            const response = await axios.get(url);
            const data = response.data;
            user = '';
            data2 = JSON.parse(data);
            members = data2["Response"]["members"];
            for (let i = 0; i < members.length; i++) {
                if (members[i]['username'].toLowerCase() == name.toLowerCase()) {
                    user = members[i]['destinyID']
                    break;
                }
            }
            if (user) {
                var options = {
                    mode: 'text',
                    args: [user],
                    scriptPath: __dirname
                };
                PythonShell.run('grandmaster.py', options, async function (err, results) {
                    if (err) {
                        console.log(err)
                        throw err;
                    }
                    console.log(results)
                    strikes = ['Corrupted', 'Festering Core', 'Lake of Shadows', 'Garden World',
                        "Savathun's Song", 'Strange Terrain', 'Exodus Crash', 'Broodhold', 'Warden of Nothing',
                        'Tree of Probabilities', 'Insight Terminus', 'Arms Dealer']
                    const myEmbed = new Discord.MessageEmbed()
                            .setTitle('GMNF Stats for ' + name)
                            .setColor(message.member.displayHexColor);
                    counter = 0;
                    console.log(results)
                    for (let i = 0; i < results.length; i = i + 2) {
                        myEmbed.addFields(
                            { name: strikes[counter], value: results[i] + "\n" + results[i + 1], inline: true },
                        )
                        tot = results[i].split(". ");

                        nf = await databases[9].findOne({
                            where: {
                                discordName: rest,
                                nfName: strikes[counter]
                            }
                        })

                        if (nf) {
                            if(tot.length > 2) { ///we have a time
                                if (nf['bestTime'] < tot[2].split(": ")[1]) {
                                    const upd = await databases[9].update({
                                        clears: parseInt(tot[0].split(": ")[1])
                                    }, {
                                        where: {
                                            discordName: rest,
                                            nfName: strikes[counter]
                                        }
                                    })
                                }
                                else {
                                    const upd = await databases[9].update({
                                        clears: parseInt(tot[0].split(": ")[1]),
                                        bestTime: tot[2].split(": ")[1]
                                    }, {
                                        where: {
                                            discordName: rest,
                                            nfName: strikes[counter]
                                        }
                                    })
                                }
                            }
                        }
                        else {
                            if (tot.length > 2) {
                                const cre = await databases[9].create({
                                    discordName: rest,
                                    clears: parseInt(tot[0].split(": ")[1]),
                                    bestTime: tot[2].split(": ")[1],
                                    nfName: strikes[counter]
                                });
                            }
                            else {
                                const cre = await databases[9].create({
                                    discordName: rest,
                                    clears: 0,
                                    bestTime: "N/A",
                                    nfName: strikes[counter]
                                });   
                            }
                        }
                        counter++;
                    }
                    message.channel.send(myEmbed);
                });
            }
            else {
                message.channel.send("That user has not registered. Tell them to use the `-help register` command.");
            }
        }
        else {
            myCommand = client.commands.get("checkName")
            name = await myCommand.execute(message.author.username, databases);
            const axios = require('axios');
            url = 'https://sixbeersdeep.net/wp-content/plugins/D2ClanScore/api/Roster/'
            const response = await axios.get(url);
            const data = response.data;
            user = '';
            data2 = JSON.parse(data);
            members = data2["Response"]["members"];
            for (let i = 0; i < members.length; i++) {
                if (members[i]['username'].toLowerCase() == name.toLowerCase()) {
                    user = members[i]['destinyID']
                    break;
                }
            }
            if (user) {
                myMessage = await message.channel.send("Processing request...")
                var options = {
                    mode: 'text',
                    args: [user],
                    scriptPath: __dirname
                };

                PythonShell.run('grandmaster.py', options, async function (err, results) {
                    if (err) {
                        console.log(err)
                        message.channel.send("Error occured... Try again later.")
                        myMessage.delete();
                        return ;
                    }
                    strikes = ['Corrupted', 'Festering Core', 'Lake of Shadows', 'Garden World',
                        "Savathun's Song", 'Strange Terrain', 'Exodus Crash', 'Broodhold', 'Warden of Nothing',
                        'Tree of Probabilities', 'Insight Terminus', 'Arms Dealer']
                    const myEmbed = new Discord.MessageEmbed()
                            .setTitle('GMNF Stats for ' + name)
                            .setColor(message.member.displayHexColor);
                    counter = 0;
                    console.log(results)
                    for (let i = 0; i < results.length; i++) {
                        myEmbed.addFields(
                            { name: strikes[counter], value: results[i], inline: true },
                        )
                        console.log(results[i])

                        tot = results[i].split(". ");

                        nf = await databases[9].findOne({
                            where: {
                                discordName: message.author.username,
                                nfName: strikes[counter]
                            }
                        })

                        if (nf) {
                            if(tot.length > 2) { ///we have a time
                                if (nf['bestTime'] < tot[2].split(": ")[1]) {
                                    const upd = await databases[9].update({
                                        clears: parseInt(tot[0].split(": ")[1])
                                    }, {
                                        where: {
                                            discordName: message.author.username,
                                            nfName: strikes[counter]
                                        }
                                    })
                                }
                                else {
                                    const upd = await databases[9].update({
                                        clears: parseInt(tot[0].split(": ")[1]),
                                        bestTime: tot[2].split(": ")[1]
                                    }, {
                                        where: {
                                            discordName: message.author.username,
                                            nfName: strikes[counter]
                                        }
                                    })
                                }
                            }
                        }
                        else {
                            if (tot.length > 2) {
                                const cre = await databases[9].create({
                                    discordName: message.author.username,
                                    clears: parseInt(tot[0].split(": ")[1]),
                                    bestTime: tot[2].split(": ")[1],
                                    nfName: strikes[counter]
                                });
                            }
                            else {
                                const cre = await databases[9].create({
                                    discordName: message.author.username,
                                    clears: 0,
                                    bestTime: "N/A",
                                    nfName: strikes[counter]
                                });   
                            }
                        }
                        counter++;
                    }

                    message.channel.send(myEmbed);
                    myMessage.delete();
                });
            }
            else {
                message.channel.send("You have not registered. Please use the `-help register` command.");
            }
        }
    },
};