module.exports = {
	name: 'tabs',
	description: 'Return tabs for self, or tabs with other users.',
	async execute(args, message, client, databases) {
        myCommand = client.commands.get("checkName")
        name = await myCommand.execute(message.author.username, databases);
        if (name) {
            const axios = require('axios');
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
                            seasonCP = seasonCur[i]['tab']
                            break;
                        }
                    }
                    for (let i = 0; i < seasonAll.length; i++) {
                        if (seasonAll[i]['username'].toLowerCase() == name2.toLowerCase()) {
                            seasonAP = seasonAll[i]['tab']
                            break;
                        }
                    }
                    doDont = ''
                    if (seasonCP == "1" || seasonAP == "1") {
                        doDont = " have "
                    }
                    else {
                        doDont = " do not have "
                    }
                    const embed = {
                        "title": "Tabs with " + name2,
                        "description": "You" + doDont + "a tab with " + name2 + "!"
                    }
                    const Discord = require('discord.js');
                    const first = new Discord.MessageEmbed()
                    .setTitle("Tabs with " + name2)
                    .setDescription("You" + doDont + "a tab with " + name2 + "!")
                    .setColor(message.member.displayHexColor);
                    message.channel.send(first);
                }
                else {
                    message.channel.send("That user is not registered in the system :( Tell them to use `-help register` to learn how!")
                }
            }
            else {
                seasonPoints = user['seasonScores'][1]['tabs']
                overallPoints = user['seasonScores'][0]['tabs']
                const embed = {
                    "title": "Tabs for " + name,
                    "description": "You have " + seasonPoints + " tabs [this season](https://sixbeersdeep.net/clan-roster/?member=" + user['destinyID'] + "&season=Arrival), and " + overallPoints +
                        " [total tabs](https://sixbeersdeep.net/clan-roster/?member=" + user['destinyID'] + "&dcs-page=1&season=all&sort=tabs&search=)."
                }
                const Discord = require('discord.js')
                const first = new Discord.MessageEmbed()
                .setTitle("Tabs for " + name)
                .setDescription("You have " + seasonPoints + " tabs [this season](https://sixbeersdeep.net/clan-roster/?member=" + user['destinyID'] + "&season=Arrival), and " + overallPoints +
                " [total tabs](https://sixbeersdeep.net/clan-roster/?member=" + user['destinyID'] + "&dcs-page=1&season=all&sort=tabs&search=).")
                .setColor(message.member.displayHexColor);
                message.channel.send(first);
            }
        }
        else {
            message.channel.send("You have not registered. Please use the `-help register` command.");
        }
    },
};