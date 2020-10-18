module.exports = {
	name: 'compare',
	description: 'Used by admins to say anything they want in a channel, given a channel id.',
	async execute(args, message, client, databases) {
        const axios = require('axios');
        const Discord = require('discord.js')
        if (args[0]) {
            myCommand = client.commands.get("checkName")
            name = await myCommand.execute(message.author.username, databases);
            hold2 = await client.commands.get("nickToUser").execute(args, message, databases);
            id = await client.commands.get("nickToUserID").execute(args, message, databases);
            name2 = await client.commands.get("checkName").execute(hold2, databases);
            if (name) {
                if (name2) {
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
                        }
                        if (members[i]['username'].toLowerCase() == name2.toLowerCase()) {
                            user2 = members[i];
                        }
                    }
                    u1s = user['seasonScores'][1]
                    u1a = user['seasonScores'][0]
                    u2s = user2['seasonScores'][1]
                    u2a = user2['seasonScores'][0]
                    const embed = {
                        "title": message.author.username + " vs. " + name2,
                        "description": "Points (Overall): " + u1a['points'] + " vs. " + u2a['points'] + "\n" +
                            "Tags (Overall): " + u1a['tags'] + " vs. " + u2a['tags'] + "\n" +
                            "Tabs (Overall): " + u1a['tabs'] + " vs. " + u2a['tabs'] + "\n" +
                            "Points (Seasonal): " + u1s['points'] + " vs. " + u2s['points'] + "\n" +
                            "Tags (Seasonal): " + u1s['tags'] + " vs. " + u2s['tags'] + "\n" +
                            "Tabs (Seasonal): " + u1s['tabs'] + " vs. " + u2s['tabs'] + "\n"
                    }
                    const first = new Discord.MessageEmbed()
                    .setTitle(message.author.username + " vs. " + name2)
                    .setDescription("Points (Overall): " + u1a['points'] + " vs. " + u2a['points'] + "\n" +
                    "Tags (Overall): " + u1a['tags'] + " vs. " + u2a['tags'] + "\n" +
                    "Tabs (Overall): " + u1a['tabs'] + " vs. " + u2a['tabs'] + "\n" +
                    "Points (Seasonal): " + u1s['points'] + " vs. " + u2s['points'] + "\n" +
                    "Tags (Seasonal): " + u1s['tags'] + " vs. " + u2s['tags'] + "\n" +
                    "Tabs (Seasonal): " + u1s['tabs'] + " vs. " + u2s['tabs'] + "\n")
                    .setColor(message.member.displayHexColor);
                    message.channel.send(first);
                }
                else {
                    message.channel.send("That user is not registered in the system :( Tell them to use `-help register` to learn how!")
                }
            }
            else {
                message.channel.send("You have not registered. Please use the -register command.");
            }
        }
        else {
            message.reply("You have to give us a user to compare yourself to. Since you did not, we will compare you to Zavala. He is trash. You win. Simple.")
        }
    },
};