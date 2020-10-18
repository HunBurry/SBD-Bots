module.exports = {
	name: 'points',
	description: 'Used by admins to say anything they want in a channel, given a channel id.',
	async execute(args, message, client, databases) {
        const axios = require('axios');
        const Discord = require('discord.js')
        myCommand = client.commands.get("checkName")
        name = await myCommand.execute(message.author.username, databases);
        if (name) {
            url = 'https://sixbeersdeep.net/wp-content/plugins/D2ClanScore/api/Roster/'
            const response = await axios.get(url);
            const data = response.data;
            user = '';
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
                    url2 = "https://sixbeersdeep.net/wp-content/plugins/D2ClanScore/api/MemberActivities/?member=" + user['destinyID']
                    const response2 = await axios.get(url2);
                    const data2 = response2.data;
                    data3 = JSON.parse(data2);
                    seasonAll = data3['Response']['seasonActivities'][0]['membersSharedActivities']
                    seasonCur = data3['Response']['seasonActivities'][1]['membersSharedActivities']
                    seasonCP = ''
                    seasonAP = ''
                    for (let i = 0; i < seasonCur.length; i++) {
                        if (seasonCur[i]['username'].toLowerCase() == name2.toLowerCase()) {
                            seasonCP = seasonCur[i]['points']
                            break;
                        }
                    }
                    for (let i = 0; i < seasonAll.length; i++) {
                        if (seasonAll[i]['username'].toLowerCase() == name2.toLowerCase()) {
                            seasonAP = seasonAll[i]['points']
                            break;
                        }
                    }
                    const embed = {
                        "title": "Points with " + name2,
                        "description": "You have " + seasonCP + " points with " + name2 + " this season and " + seasonAP + " points with them overall."
                    }
                    const first = new Discord.MessageEmbed()
                    .setTitle("Points with " + name2)
                    .setDescription("You have " + seasonCP + " points with " + name2 + " this season and " + seasonAP + " points with them overall.")
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
                const embed = {
                    "title": "Points for " + name,
                    "description": "You have " + seasonPoints + " points [this season](https://sixbeersdeep.net/clan-roster/?member=" + user['destinyID'] + "&season=Arrival), and " + overallPoints +
                        " [total points](https://sixbeersdeep.net/clan-roster/?member=" + user['destinyID'] + "&dcs-page=1&season=all&sort=points&search=)."
                }
                const first = new Discord.MessageEmbed()
                .setTitle("Points for " + name)
                .setDescription("You have " + seasonPoints + " points [this season](https://sixbeersdeep.net/clan-roster/?member=" + user['destinyID'] + "&season=Arrival), and " + overallPoints +
                " [total points](https://sixbeersdeep.net/clan-roster/?member=" + user['destinyID'] + "&dcs-page=1&season=all&sort=points&search=).")
                .setColor(message.member.displayHexColor);
                message.channel.send(first);
            }
        }
        else {
            message.channel.send("You have not registered. Please use the `-help register` command.");
        }
    },
};