module.exports = {
	name: 'tags',
	description: 'Used by admins to say anything they want in a channel, given a channel id.',
	async execute(args, message, client, databases) {
        const Discord = require('discord.js')
        const axios = require('axios');
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
            if (args[0]) {
                rest = await client.commands.get("nickToUser").execute(args, message, databases)
                name2 = await client.commands.get("checkName").execute(rest, databases)
                console.log(name2)
                if (name2) {
                    url2 = "https://sixbeersdeep.net/wp-content/plugins/D2ClanScore/api/MemberActivities/?member=" + user['destinyID']
                    const response2 = await axios.get(url2);
                    const data2 = response2.data;
                    data3 = JSON.parse(data2);
                    seasonAll = data3['Response']['seasonActivities'][0]['membersSharedActivities']
                    seasonCur = data3['Response']['seasonActivities'][1]['membersSharedActivities']
                    seasonCP = ''
                    seasonAP = ''
                    activList = []
                    for (let i = 0; i < seasonCur.length; i++) {
                        if (seasonCur[i]['username'].toLowerCase() == name2.toLowerCase()) {
                            seasonCP = seasonCur[i]['tags']
                            activs = seasonCur[i]['activities']
                            for (let x = 0; x < activs.length; x++) {
                                activName = Object.keys(activs[x]);
                                val = activs[x][activName]
                                if (val != '0') {
                                    activList.push(activName);
                                }
                            }
                            break;
                        }
                    }
                    complActiv = " Your tags this season include "
                    for (let i = 0; i < activList.length; i++) {
                        if (i == activList.length - 2) {
                            complActiv = complActiv + activList[i] + ", and ";
                        }
                        else if (i == activList.length - 1) {
                            complActiv = complActiv + activList[i] + ".";
                        }
                        else {
                            complActiv = complActiv + activList[i] + ", ";
                        }
                    }
                    for (let i = 0; i < seasonAll.length; i++) {
                        if (seasonAll[i]['username'].toLowerCase() == name2.toLowerCase()) {
                            seasonAP = seasonAll[i]['tags']
                            break;
                        }
                    }
                    if (activList.length == 0) {
                        complActiv = '';
                    }
                    const embed = {
                        "title": "Tags with " + name2,
                        "description": "You have " + seasonCP + " tags with " + name2 + " this season and " + seasonAP + " tags with them overall." + complActiv
                    }
                    const first = new Discord.MessageEmbed()
                    .setTitle('Tags with ' + name2)
                    .setDescription("You have " + seasonCP + " tags with " + name2 + " this season and " + seasonAP + " tags with them overall." + complActiv)
                    .setColor(message.member.displayHexColor);
                    message.channel.send(first)
                }
                else {
                    message.channel.send("That user is not registered in the system :( Tell them to use `-help register` to learn how!")
                }
            }
            else {
                seasonPoints = user['seasonScores'][1]['tags']
                overallPoints = user['seasonScores'][0]['tags']
                const embed = {
                    "title": "Tags for " + name,
                    "description": "You have " + seasonPoints + " tags [this season](https://sixbeersdeep.net/clan-roster/?member=" + user['destinyID'] + "&season=Arrival), and " + overallPoints +
                        " [total tags](https://sixbeersdeep.net/clan-roster/?member=" + user['destinyID'] + "&dcs-page=1&season=all&sort=tags&search=)."
                }
                const first = new Discord.MessageEmbed()
                .setTitle("Tags for " + name)
                .setDescription("You have " + seasonPoints + " tags [this season](https://sixbeersdeep.net/clan-roster/?member=" + user['destinyID'] + "&season=Arrival), and " + overallPoints +
                " [total tags](https://sixbeersdeep.net/clan-roster/?member=" + user['destinyID'] + "&dcs-page=1&season=all&sort=tags&search=).")
                .setColor(message.member.displayHexColor);
                message.channel.send(first)
            }
        }
        else {
            message.channel.send("You have not registered. Please use the `-help register` command.");
        }
    },
};