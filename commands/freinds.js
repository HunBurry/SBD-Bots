module.exports = {
	name: 'friends',
	description: 'Used by admins to say anything they want in a channel, given a channel id.',
	async execute(args, message, client, databases) {
        myCommand = client.commands.get("checkName")
        const Discord = require('discord.js');
        name = await myCommand.execute(message.author.username, databases);
        const axios = require('axios');
        if (name) {
            url = 'https://sixbeersdeep.net/wp-content/plugins/D2ClanScore/api/Roster/'
            const response = await axios.get(url);
            const data = response.data;
            user = '';
            datak = JSON.parse(data);
            members = datak["Response"]["members"]
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
    
            url2 = "https://sixbeersdeep.net/wp-content/plugins/D2ClanScore/api/MemberActivities/?member=" + user['destinyID']
            const response2 = await axios.get(url2);
            const data2 = response2.data;
            data3 = JSON.parse(data2);
            seasonAll = data3['Response']['seasonActivities'][0]['membersSharedActivities']
            seasonCur = data3['Response']['seasonActivities'][1]['membersSharedActivities']
            myDicts = {};
            myDicts2 = {};
    
            for (let i = 0; i < seasonCur.length; i++) {
                if (seasonCur[i]['username'] == 'scoooterrr') {
                    console.log(seasonCur[i])
                }
                myDicts[seasonCur[i]['username']] = parseInt(seasonCur[i]['points']) + (parseInt(seasonCur[i]['tags']) * 5) + (parseInt(seasonCur[i]['tab']) * 10)
                myDicts2[seasonAll[i]['username']] = parseInt(seasonAll[i]['points']) + (parseInt(seasonAll[i]['tags']) * 5) + (parseInt(seasonAll[i]['tab']) * 10)
            }
    
            items = Object.keys(myDicts).map(function(key) {
                return [key, myDicts[key]];
            });
    
            items.sort(function(first, second) {
                return second[1] - first[1];
            });
    
            items2 = Object.keys(myDicts2).map(function(key) {
                return [key, myDicts2[key]];
            });
    
            items2.sort(function(first, second) {
                return second[1] - first[1];
            });
    
            myString = '';
            myString2 = ''
    
            for (let i = 1; i < 26; i++) {
                myString = myString + i.toString() + ".\t" + items[i - 1][0] + " (" + items[i - 1][1] + ")\n"
                myString2 = myString2 + i.toString() + ".\t" + items2[i - 1][0] + " (" + items2[i - 1][1] + ")\n"
            }
            const first = new Discord.MessageEmbed()
                .setTitle('Top Friends of ' + name)
                .addFields(
                    { name: 'Seasonal:', value: myString, inline: true}, 
                    { name: "Overall:", value: myString2, inline: true}
                )
                .setColor(message.member.displayHexColor)
                .setFooter("Calculations Based On (Points + (5 * Tags) + (10 * Tab))");
                message.channel.send(first);
        }
        else {
            message.channel.send("You have not registered. Please use the `-help register` command.");
        }
    },
};