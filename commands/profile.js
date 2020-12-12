const { PRIORITY_ABOVE_NORMAL } = require("constants")
const { userInfo } = require("os")

module.exports = {
	name: 'profile',
	description: 'Used by admins to say anything they want in a channel, given a channel id.',
	async execute(args, message, client, databases) {
        const Discord = require('discord.js');
        if (args[0]) {
            hold2 = await client.commands.get("nickToUser").execute(args, message, databases);
            const profile = await databases[11].findOne({
                where: {
                    player: hold2
                }
            })

            if (profile) {
                let userInfo = {
                    'Twitch Username/URL': profile.twitchURL,
                    'Steam Code': profile.steamCode,
                    'Xbox GT': profile.xboxGT,
                    'Playstation ID': profile.psID,
                    'Stadia GT': profile.stadiaGT,
                    'Timezone': profile.timezone,
                    'Clan Join Date': profile.clanDate,
                    ///'Location': profile.location,
                    ///"Birthday": profile.birth_date,
                    'Bio': profile.bio
                }

                ///console.log(message.guild)

                const finalEmbed = new Discord.MessageEmbed()
                .setColor(message.guild.members.cache.find(member => member.user.username === hold2).displayHexColor)
                .setFooter("To create and edit your own profile, use the `-set` command in a PM with me!")
                .setTitle(hold2 + "'s Profile");

                keys = Object.keys(userInfo)

                for (let i = 0; i < keys.length; i++) {
                    if (keys[i] == 'Bio') {
                        if (userInfo[keys[i]] == null) {
                            //finalEmbed.addFields(
                            //    { name: keys[i], value: "N/A" }
                            //)
                        }
                        else {
                            finalEmbed.addFields(
                                { name: keys[i], value: userInfo[keys[i]] }
                            )
                        }
                    }
                    else {
                        if (userInfo[keys[i]] == null) {
                            //finalEmbed.addFields(
                            //    { name: keys[i], value: "N/A", inline: true }
                            //)
                        }
                        else {
                            finalEmbed.addFields(
                                { name: keys[i], value: userInfo[keys[i]], inline: true}
                            )
                        }
                    }
                }
                message.channel.send(finalEmbed);
            }
            else {
                message.reply("that user has not created a profile yet.")
            }
        }
        else {
            const profile = await databases[11].findOne({
                where: {
                    player: message.author.username
                }
            })

            if (profile) {
                let userInfo = {
                    'Twitch Username/URL': profile.twitchURL,
                    'Steam Code': profile.steamCode,
                    'Xbox GT': profile.xboxGT,
                    'Playstation ID': profile.psID,
                    'Stadia GT': profile.stadiaGT,
                    'Timezone': profile.timezone,
                    'Clan Join Date': profile.clanDate,
                    ///'Location': profile.location,
                    ///"Birthday": profile.birth_date,
                    'Bio': profile.bio
                }

                const finalEmbed = new Discord.MessageEmbed()
                .setColor(message.member.displayHexColor)
                .setFooter("To create and edit your own profile, use the `-set` command in a PM with me!")
                .setTitle(message.author.username + "'s Profile");

                keys = Object.keys(userInfo)

                for (let i = 0; i < keys.length; i++) {
                    if (keys[i] == 'Bio') {
                        if (userInfo[keys[i]] == null) {
                            ///finalEmbed.addFields(
                             ///   { name: keys[i], value: "N/A" }
                           /// )
                        }
                        else {
                            finalEmbed.addFields(
                                { name: keys[i], value: userInfo[keys[i]] }
                            )
                        }
                    }
                    else {
                        if (userInfo[keys[i]] == null) {
                        ///    finalEmbed.addFields(
                           ///     { name: keys[i], value: "N/A", inline: true }
                            ///)
                        }
                        else {
                            finalEmbed.addFields(
                                { name: keys[i], value: userInfo[keys[i]], inline: true}
                            )
                        }
                    }
                }
                message.channel.send(finalEmbed);
            }
            else {
                message.reply("you don't have a profile. Trying using the -set command to begin creating one.")
            }
        }
    },
}