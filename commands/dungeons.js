module.exports = {
	name: 'dungeons',
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
                    raids = ['Propechy', 'Pit of Heresay', 'Zero Hour', 'Shattered Throne', 'The Whisper']
                    const myEmbed = new Discord.MessageEmbed()
                            .setTitle('Raid Stats')
                            .setColor(message.member.displayHexColor);
                    counter = 0;
                    for (let i = 0; i < results.length; i = i + 2) {
                        myEmbed.addFields(
                            { name: raids[counter], value: "Clears: " + results[i] + "\nBest Time: " + results[i + 1], inline: true },
                        )
                        counter++;
                    }


                    try {
                        const tag = await databases[8].create({
                            discordName: rest,
                            throne: int(results[6]),
                            zero: int(results[4]), 
                            pit: int(results[2]),
                            proph: int(results[0]),
                            whisper: int(results[8]),
                            throneI: int(results[6]),
                            zeroI: int(results[4]), 
                            pitI: int(results[2]),
                            prophI: int(results[0]),
                            whisperI: int(results[8]),
                            throneTime: results[7],
                            zeroTime: results[5], 
                            pitTime: results[3],
                            prophTime: results[1],
                            whisperTime: results[9],
                        });
                    }
                    catch (e) {
                        if (e.name == 'SequelizeUniqueConstraintError') {
                            const upd = await databases[8].update({
                                throne: int(results[6]),
                                zero: int(results[4]), 
                                pit: int(results[2]),
                                proph: int(results[0]),
                                whisper: int(results[8]),
                                throneTime: results[7],
                                zeroTime: results[5], 
                                pitTime: results[3],
                                prophTime: results[1],
                                whisperTime: results[9],
                            }, {
                                where: {
                                    discordName: rest
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

                PythonShell.run('dungeons.py', options, async function (err, results) {
                    if (err) {
                        console.log(err)
                        message.channel.send("Error occured... Try again later.")
                        myMessage.delete();
                        return ;
                    }
                    raids = ['Propechy', 'Pit of Heresy', 'Zero Hour', 'Shattered Throne', 'The Whisper']
                    const myEmbed = new Discord.MessageEmbed()
                            .setTitle('Dungeon Stats for ' + name)
                            .setColor(message.member.displayHexColor);
                    counter = 0;
                    console.log(results)
                    for (let i = 0; i < results.length; i = i + 2) {
                        myEmbed.addFields(
                            { name: raids[counter], value: "Clears: " + results[i] + "\nBest Time: " + results[i + 1], inline: true },
                        )
                        counter++;
                    }

                    console.log('igh')

                    let p1Stats = await databases[8].findOne({
                        where: {
                            discordName: message.author.username
                        }
                    });
                    if (p1Stats) {
                        const upd = await databases[8].update({
                            throne: parseInt(results[6]),
                            zero: parseInt(results[4]), 
                            pit: parseInt(results[2]),
                            proph: parseInt(results[0]),
                            whisper: parseInt(results[8]),
                            throneTime: results[7],
                            zeroTime: results[5], 
                            pitTime: results[3],
                            prophTime: results[1],
                            whisperTime: results[9],
                        }, {
                            where: {
                                discordName: message.author.username
                            }
                        })
                        console.log(upd)
                    } 
                    else {
                        const tag = await databases[8].create({
                            discordName: message.author.username,
                            throne: parseInt(results[6]),
                            zero: parseInt(results[4]), 
                            pit: parseInt(results[2]),
                            proph: parseInt(results[0]),
                            whisper: parseInt(results[8]),
                            throneI: parseInt(results[6]),
                            zeroI: parseInt(results[4]), 
                            pitI: parseInt(results[2]),
                            prophI: parseInt(results[0]),
                            whisperI: parseInt(results[8]),
                            throneTime: results[7],
                            zeroTime: results[5], 
                            pitTime: results[3],
                            prophTime: results[1],
                            whisperTime: results[9],
                        });
                        console.log(tag)
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