module.exports = {
	name: 'stats',
	description: 'Used by admins to say anything they want in a channel, given a channel id.',
	async execute(args, message, client, databases) {
        myCommand = client.commands.get("checkName")
        const Discord = require('discord.js')
        const axios = require('axios');
        name = await myCommand.execute(message.author.username, databases);
        if (name) {
            url = 'https://sixbeersdeep.net/wp-content/plugins/D2ClanScore/api/Roster/'
            const response = await axios.get(url);
            const data = response.data;
            user = '';
            user2 = '';
            data2 = JSON.parse(data);
            members = data2["Response"]["members"]
            for (let i = 0; i < members.length; i++) {
                if (members[i]['username'].toLowerCase() == name.toLowerCase()) {
                    user = members[i];
                    break;
                }
            }
            if (user == '') {
                message.channel.send('Cannot locate username on website. Please ensure you are using the correct username.')
                return '';
            }
            if (args[0]) {
                rest = await client.commands.get("nickToUser").execute(args, message, databases)
                name2 = await client.commands.get("checkName").execute(rest, databases)
                if (name2) {
                    for (let i = 0; i < members.length; i++) {
                        if (members[i]['username'].toLowerCase() == name2.toLowerCase()) {
                            user2 = members[i];
                            break;
                        }
                    }
                    if (user2 == '') {
                        message.channel.send("That user is not registered correctly on the website. Tell them to verify their username and re-register.")
                        return '';
                    }   
                    seasonPoints = user2['seasonScores'][1]['points']
                    overallPoints = user2['seasonScores'][0]['points']
                    seasonTags = user2['seasonScores'][1]['tags']
                    overallTags = user2['seasonScores'][0]['tags']
                    seasonTabs = user2['seasonScores'][1]['tabs']
                    overallTabs = user2['seasonScores'][0]['tabs']
                    const embed = {
                        "title": "Stats for " + name2,
                        "description": "This season, " + name2 + " has " + seasonPoints + " points, " + seasonTags + " tags, and " + seasonTabs + " tabs. Overall, they have " +
                            overallPoints + " points, " + overallTags + " tags, and " + overallTabs + " tabs."
                    }
                    const first = new Discord.MessageEmbed()
                        .setTitle('Stats for ' + name2)
                        .setDescription("This season, " + name2 + " has " + seasonPoints + " points, " + seasonTags + " tags, and " + seasonTabs + " tabs. Overall, they have " +
                        overallPoints + " points, " + overallTags + " tags, and " + overallTabs + " tabs.")
                        .setColor(message.member.displayHexColor);
                    message.channel.send(first);
                }
                else {
                    message.channel.send("That user is not registered in the system :( Tell them to use `-help register` to learn how!")
                }
            }
            else {
                seasonPoints = user['seasonScores'][1]['points']
                overallPoints = user['seasonScores'][0]['points']
                seasonTags = user['seasonScores'][1]['tags']
                overallTags = user['seasonScores'][0]['tags']
                seasonTabs = user['seasonScores'][1]['tabs']
                overallTabs = user['seasonScores'][0]['tabs']
                let tHER = "This season, you have " + seasonPoints + " points, " + seasonTags + " tags, and " + seasonTabs + " tabs. Overall, you have " +
                overallPoints + " points, " + overallTags + " tags, and " + overallTabs + " tabs."
                const first = new Discord.MessageEmbed()
                .setTitle('Stats for ' + name)
                .setDescription(tHER)
                .setColor(message.member.displayHexColor);
                message.channel.send(first);
                const embed = {
                    "title": "Stats for " + name,
                    "description": "This season, you have " + seasonPoints + " points, " + seasonTags + " tags, and " + seasonTabs + " tabs. Overall, you have " +
                        overallPoints + " points, " + overallTags + " tags, and " + overallTabs + " tabs."
                }
                ///message.channel.send(first);
            }
        }
        else {
            message.channel.send("You have not registered. Please use the `-help register` command.");
        }
    },
};
