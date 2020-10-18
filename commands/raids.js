module.exports = {
	name: 'raids',
	description: 'Used by admins to say anything they want in a channel, given a channel id.',
	async execute(args, message, client, databases) {
        const Discord = require('discord.js');
        const {PythonShell} = require('python-shell');

        if (args[0]) {
            rest = await client.commands.get("nickToUser").execute(args, message, databases)
            name = await client.commands.get("checkName").execute(rest, databases)
            if (name) {
                var options = {
                    mode: 'text',
                    args: [name],
                    scriptPath: __dirname
                };
                PythonShell.run('raids.py', options, async function (err, results) {
                    if (err) {
                        console.log(err)
                        throw err;
                    }
                    console.log(results)
                    raids = ['Garden of Salvation', 'Crown of Sorrows', 'Scourge of the Past', 'Last Wish', 'Spire of Stars', 'Eater of Worlds', 'Leviathan']
                    const myEmbed = new Discord.MessageEmbed()
                            .setTitle('Raid Stats for ' + name)
                            .setColor(message.member.displayHexColor);
                    counter = 0;
                    for (let i = 0; i < results.length; i = i + 2) {
                        myEmbed.addFields(
                            { name: raids[counter], value: "Clears: " + results[i] + "\nBest Time: " + results[i + 1], inline: true },
                        )
                        counter++;
                    }

                    j = await client.commands.get("nickToUser").execute(args, message, databases)


                    try {
                        const tag = await databases[7].create({
                            discordName: j,
                            levi: parseInt(results[12]),
                            eow: parseInt(results[10]), 
                            sos: parseInt(results[8]),
                            sotp: parseInt(results[4]),
                            garden: parseInt(results[0]),
                            lw: parseInt(results[6]),
                            cos: parseInt(results[2]),
                            leviI: parseInt(results[12]),
                            eowI: parseInt(results[10]), 
                            sosI: parseInt(results[8]),
                            sotpI: parseInt(results[4]),
                            gardenI: parseInt(results[0]),
                            lwI: parseInt(results[6]),
                            cosI: parseInt(results[2]),
                            leviTime: results[13],
                            eowTime: results[11], 
                            sosTime: results[9],
                            sotpTime: results[5],
                            gardenTime: results[1],
                            lwTime: results[7],
                            cosTime: results[3],
                        });
                    }
                    catch (e) {
                        if (e.name == 'SequelizeUniqueConstraintError') {
                            const upd = await databases[7].update({
                                levi: parseInt(results[12]),
                                eow: parseInt(results[10]), 
                                sos: parseInt(results[8]),
                                sotp: parseInt(results[4]),
                                garden: parseInt(results[0]),
                                lw: parseInt(results[6]),
                                cos: parseInt(results[2]),
                                leviTime: results[13],
                                eowTime: results[11], 
                                sosTime: results[9],
                                sotpTime: results[5],
                                gardenTime: results[1],
                                lwTime: results[7],
                                cosTime: results[3]
                            }, {
                                where: {
                                    discordName: j
                                }
                            })
                        }
                    }
                    message.channel.send(myEmbed);
                });
            }
            else {
                message.channel.send("That user has not registered. Tell them to use the `-help register` command.");
            }
        }
        else {
            const holding = await databases[10].findOne({
                where: {
                    discordName: message.author.username
                }
            });
            if (holding) {
                name = holding['gamerTag']
            }
            else {
                myCommand = client.commands.get("checkName")
                name = await myCommand.execute(message.author.username, databases);
            }
            if (name) {
                myMessage = await message.channel.send("Processing request...")
                var options = {
                    mode: 'text',
                    args: [name],
                    scriptPath: __dirname
                };
                ugh = '';
                

                PythonShell.run('raids.py', options, async function (err, results) {
                    if (err) {
                        console.log(err)
                        message.channel.send("Error occured... Try again later.")
                        myMessage.delete();
                        return ;
                    }
                    raids = ['Garden of Salvation', 'Crown of Sorrows', 'Scourge of the Past', 'Last Wish', 'Spire of Stars', 'Eater of Worlds', 'Leviathan']
                    const myEmbed = new Discord.MessageEmbed()
                            .setTitle('Raid Stats for ' + name)
                            .setColor(message.member.displayHexColor);
                    counter = 0;
                    console.log(results)
                    for (let i = 0; i < results.length; i = i + 2) {
                        myEmbed.addFields(
                            { name: raids[counter], value: "Clears: " + results[i] + "\nBest Time: " + results[i + 1], inline: true },
                        )
                        counter++;
                    }

                    try {
                        const tag = await databases[7].create({
                            discordName: message.author.username,
                            levi: parseInt(results[12]),
                            eow: parseInt(results[10]), 
                            sos: parseInt(results[8]),
                            sotp: parseInt(results[4]),
                            garden: parseInt(results[0]),
                            lw: parseInt(results[6]),
                            cos: parseInt(results[2]),
                            leviI: parseInt(results[12]),
                            eowI: parseInt(results[10]), 
                            sosI: parseInt(results[8]),
                            sotpI: parseInt(results[4]),
                            gardenI: parseInt(results[0]),
                            lwI: parseInt(results[6]),
                            cosI: parseInt(results[2]),
                            leviTime: results[13],
                            eowTime: results[11], 
                            sosTime: results[9],
                            sotpTime: results[5],
                            gardenTime: results[1],
                            lwTime: results[7],
                            cosTime: results[3],
                        });
                        console.log(tag)
                    }
                    catch (e) {
                        if (e.name == 'SequelizeUniqueConstraintError') {
                            const upd = await databases[7].update({
                                levi: parseInt(results[12]),
                                eow: parseInt(results[10]), 
                                sos: parseInt(results[8]),
                                sotp: parseInt(results[4]),
                                garden: parseInt(results[0]),
                                lw: parseInt(results[6]),
                                cos: parseInt(results[2]),
                                leviTime: results[13],
                                eowTime: results[11], 
                                sosTime: results[9],
                                sotpTime: results[5],
                                gardenTime: results[1],
                                lwTime: results[7],
                                cosTime: results[3]
                            }, {
                                where: {
                                    discordName: message.author.username
                                }
                            })
                            console.log(upd)
                        }
                        else {
                            console.log(e)
                        }
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