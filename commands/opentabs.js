module.exports = {
	name: 'opentabs',
	description: 'Used by admins to say anything they want in a channel, given a channel id.',
	async execute(args, message, client, databases) {
        const axios = require('axios');
        myMessage = await message.channel.send("Processing request...");
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
                }
            }
            url2 = "https://sixbeersdeep.net/wp-content/plugins/D2ClanScore/api/MemberActivities/?member=" + user['destinyID']
            const response2 = await axios.get(url2);
            const data3 = response2.data;
            data4 = JSON.parse(data3);
            needs = [];
            seasonAll = data4['Response']['seasonActivities'][0]['membersSharedActivities']
            seasonCur = data4['Response']['seasonActivities'][1]['membersSharedActivities']
            for (let i = 0; i < seasonCur.length; i++) {
                if (seasonCur[i]['tab'] == '0') {
                    needs.push(seasonCur[i]['username']);
                }
            }
            myUserI = needs[Math.floor(Math.random() * needs.length)]
            message.channel.send("You don't have a tab with " + myUserI + "!");
        }
        myMessage.delete();
    },
};