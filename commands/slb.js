module.exports = {
	name: 'slb',
	description: 'Used by admins to say anything they want in a channel, given a channel id.',
	async execute(args, message, client, databases) {
        const axios = require('axios');
        const Discord = require('discord.js')
        url = 'https://sixbeersdeep.net/wp-content/plugins/D2ClanScore/api/Roster/'
        const response = await axios.get(url);
        const data = response.data;
        data2 = JSON.parse(data);
        members = data2["Response"]["members"]
        myDicts = {}
        myCommand = client.commands.get("checkName")
        id = await myCommand.execute(message.author.username, databases);
        name = ''
        if (args.length == 0) {
            for (let i = 0; i < members.length; i++) {
                let un = members[i]['username']
                let totalVal = parseInt(members[i]['seasonScores'][1]['points']) + (10 * parseInt(members[i]['seasonScores'][1]['tabs'])) + (5 * parseInt(members[i]['seasonScores'][1]['tags']))
                myDicts[un] = totalVal;
                if (members[i]['bungieID'] == id) {
                    name = un;
                }
            }

            items = Object.keys(myDicts).map(function(key) {
                return [key, myDicts[key]];
            });

            items.sort(function(first, second) {
                return second[1] - first[1];
            });

            myString = '';

            shouldAdd = true
            ///myCommand = client.commands.get("checkName")
            ///name = await myCommand.execute(message.author.username, databases);
            for (let i = 1; i < 26; i++) {
                if (name.toLowerCase() == items[i - 1][0].toLowerCase()) {
                    shouldAdd = false
                    myString = myString + "**" + i.toString() + ".\t" + items[i - 1][0] + " (" + items[i - 1][1] + ")**\n"
                }
                else {
                    myString = myString + i.toString() + ".\t" + items[i - 1][0] + " (" + items[i - 1][1] + ")\n"
                }
            }

            ranking = '';
            if (shouldAdd) {
                for (let i = 1; i < items.length; i++) {
                    if (items[i][0].toLowerCase() == name.toLowerCase()) {
                        myString = myString + "...\n" + i.toString() + ".\t" + items[i][0] + " (" + items[i][1] + ")"
                    }
                }
            }

            const first = new Discord.MessageEmbed()
            .setTitle("Seasonal Leaderboards")
            .setDescription(myString)
            .setColor(message.member.displayHexColor)
            .setFooter("Leaderboards are calculated such as Points + (Tags * 5) + (Tabs * 10)");
            message.channel.send(first);

        }
        else {
            if (args[0] == 'points') {
                for (let i = 0; i < members.length; i++) {
                    let un = members[i]['username']
                    let totalVal = parseInt(members[i]['seasonScores'][1]['points'])
                    myDicts[un] = totalVal;
                    if (members[i]['bungieID'] == id) {
                        name = un;
                    }
                }
            }
            else if (args[0] == 'tags') {
                for (let i = 0; i < members.length; i++) {
                    let un = members[i]['username']
                    let totalVal = parseInt(members[i]['seasonScores'][1]['tags'])
                    myDicts[un] = totalVal;
                    if (members[i]['bungieID'] == id) {
                        name = un;
                    }
                }
            }
            else if (args[0] == 'tabs') {
                for (let i = 0; i < members.length; i++) {
                    let un = members[i]['username']
                    let totalVal = parseInt(members[i]['seasonScores'][1]['tabs'])
                    myDicts[un] = totalVal;
                    if (members[i]['bungieID'] == id) {
                        name = un;
                    }
                }
            }
            else {
                message.channel.send("Invalid sorting type. Types are points, tabs, and tabs.")
                return null;
            }
            
            let tOf = args[0]
            tOf = tOf.charAt(0).toUpperCase() + tOf.slice(1);

            items = Object.keys(myDicts).map(function(key) {
                return [key, myDicts[key]];
            });

            items.sort(function(first, second) {
                return second[1] - first[1];
            });

            myString = '';

            shouldAdd = true
            for (let i = 1; i < 26; i++) {
                if (name.toLowerCase() == items[i - 1][0].toLowerCase()) {
                    shouldAdd = false
                    myString = myString + "**" + i.toString() + ".\t" + items[i - 1][0] + " (" + items[i - 1][1] + ")**\n"
                }
                else {
                    myString = myString + i.toString() + ".\t" + items[i - 1][0] + " (" + items[i - 1][1] + ")\n"
                }
            }

            ranking = '';
            if (shouldAdd) {
                for (let i = 1; i < items.length; i++) {
                    if (items[i][0].toLowerCase() == name.toLowerCase()) {
                        myString = myString + "...\n" + i.toString() + ".\t" + items[i][0] + " (" + items[i][1] + ")"
                    }
                }
            }

            const first = new Discord.MessageEmbed()
            .setTitle("Seasonal Leaderboards for " + tOf)
            .setDescription(myString)
            .setColor(message.member.displayHexColor)
            message.channel.send(first);
        }
    },
};