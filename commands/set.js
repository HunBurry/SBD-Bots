module.exports = {
	name: 'set',
	description: 'Used by admins to say anything they want in a channel, given a channel id.',
	async execute(args, message, client, databases) {

        if (message.channel.type != 'dm') {
            message.author.send("Sorry, the set command can only be ran in DMs. Let's try it here instead!")
            return;
        }

        setable = [
            'steamcode', 
            'psgt',
            'timezone',
            'bio',
            'twitch',
            'stadiagt',
            'xboxgt',
        ]

        selectedAttribute = '';
        value = '';

        const profile = await databases[11].findOne({
            where: {
                player: message.author.username
            }
        })

        if (args[0]) {
            if (setable.includes(args[0])) {
                const filter = response => {
                    //console.log(response.author.username)
                    //console.log(message.author.username)
                    //console.log(response.author.username == message.author.username)
                    //console.log(response.author.username === message.author.username)
                    //console.log('-----------------------------')
                    return response.author.username == message.author.username;
                };
                message.author.send("Please provide the information you'd like the attribute set to.").then(() => {
                    message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
                        .then(collected => {
                            console.log("Collected!")
                            value = collected.first().content;
                            selectedAttribute = args[0];

                            if (profile) {
                                if (selectedAttribute == 'psgt') {
                                    const upd =  databases[11].update({
                                        psID: value
                                    }, {
                                        where: {
                                            player: message.author.username
                                        }
                                    })
                                }
                                else if (selectedAttribute == 'steamcode') {
                                    const upd =  databases[11].update({
                                        steamCode: value
                                    }, {
                                        where: {
                                            player: message.author.username
                                        }
                                    })
                                }
                                /*else if (selectedAttribute == 'location') {
                                    const upd =  databases[11].update({
                                        location: value
                                    }, {
                                        where: {
                                            player: message.author.username
                                        }
                                    })
                                }*/
                                else if (selectedAttribute == 'bio') {
                                    const upd =  databases[11].update({
                                        bio: value
                                    }, {
                                        where: {
                                            player: message.author.username
                                        }
                                    })
                                }
                                /*else if (selectedAttribute == 'birthdate') {
                                    const upd =  databases[11].update({
                                        birth_date: value
                                    }, {
                                        where: {
                                            player: message.author.username
                                        }
                                    })
                                }*/
                                else if (selectedAttribute == 'twitch') {
                                    const upd =  databases[11].update({
                                        twitchURL: value
                                    }, {
                                        where: {
                                            player: message.author.username
                                        }
                                    })
                                }
                                else if (selectedAttribute == 'stadiagt') {
                                    const upd =  databases[11].update({
                                        stadiaGT: value
                                    }, {
                                        where: {
                                            player: message.author.username
                                        }
                                    })
                                }
                                else if (selectedAttribute == 'xboxgt') {
                                    const upd =  databases[11].update({
                                        xboxGT: value
                                    }, {
                                        where: {
                                            player: message.author.username
                                        }
                                    })
                                }
                                else if (selectedAttribute == 'timezone') {
                                    const upd =  databases[11].update({
                                        timezone: value
                                    }, {
                                        where: {
                                            player: message.author.username
                                        }
                                    })
                                }
                                message.author.send("Profile updated.")
                            }
                            else {
                                let guild = client.guilds.cache.find(guild => guild.name === 'Six Beers Deep');
                                let member = guild.members.cache.find(member => member.user.username === message.author.username);
                                dateJoined = new Date(member.joinedTimestamp).toDateString();
                                if (selectedAttribute == 'psgt') {
                                    const prof2 =  databases[11].create({
                                        player: message.author.username,
                                        clanDate: dateJoined,
                                        psID: value
                                    });
                                }
                                else if (selectedAttribute == 'steamcode') {
                                    const prof2 =  databases[11].create({
                                        player: message.author.username,
                                        clanDate: dateJoined,
                                        steamCode: value
                                    });
                                }
                                /*else if (selectedAttribute == 'location') {
                                    const prof2 =  databases[11].create({
                                        player: message.author.username,
                                        clanDate: message.member.joinedTimestamp.toDateString(),
                                        location: value
                                    });
                                }*/
                                else if (selectedAttribute == 'bio') {
                                    const prof2 =  databases[11].create({
                                        player: message.author.username,
                                        clanDate: dateJoined,
                                        bio: value
                                    });
                                }
                                /*else if (selectedAttribute == 'birthdate') {
                                    const prof2 =  databases[11].create({
                                        player: message.author.username,
                                        clanDate: message.member.joinedTimestamp.toDateString(),
                                        birth_date: value
                                    });
                                }*/
                                else if (selectedAttribute == 'twitch') {
                                    const prof2 =  databases[11].create({
                                        player: message.author.username,
                                        clanDate: dateJoined,
                                        twitchURL: value
                                    });
                                }
                                else if (selectedAttribute == 'stadiagt') {
                                    const prof2 =  databases[11].create({
                                        player: message.author.username,
                                        clanDate: dateJoined,
                                        stadiaGT: value
                                    });
                                }
                                else if (selectedAttribute == 'xboxgt') {
                                    const prof2 =  databases[11].create({
                                        player: message.author.username,
                                        clanDate: dateJoined,
                                        xboxGT: value
                                    });
                                }
                                else if (selectedAttribute == 'timezone') {
                                    const prof2 =  databases[11].create({
                                        player: message.author.username,
                                        clanDate: dateJoined,
                                        timezone: value
                                    });
                                }
                                message.author.send("Profile created and first attribute set.")
                            }
                        })
                        .catch(collected => {
                            console.log(collected)
                            message.author.send('Timed out, or an error has occured. Please retry.');
                            return; 
                        });
                });
            }
            else {
                message.author.send("That is not a valid parameter. Please use `-set` followed by " + setable.join(', ') + ". You will then be prompted to enter your information.");
                return;
            }
        }
        else {
            message.author.send("You must provide a parameter/attribute to set. Your choices are " + setable.join(', ') + ".");
            return;
        }
    },
};