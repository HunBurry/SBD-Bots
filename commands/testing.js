module.exports = {
	name: 'testing',
	description: 'Used by admins to say anything they want in a channel, given a channel id.',
	async execute(args, message, client, databases) {
        /*
            for each reigstration {
                connect to site
                find user
                find bunieID
                log as new
            }

            const axios = require('axios');
            url = 'https://sixbeersdeep.net/wp-content/plugins/D2ClanScore/api/Roster/'
            const response = await axios.get(url);
            const data = response.data;
            user = '';
            data2 = JSON.parse(data);
            members = data2["Response"]["members"]
            for (let i = 0; i < members.length; i++) {
                if (members[i]['username'].toLowerCase() == name.toLowerCase()) {
                    bungieID = members[i]['bungieID']
                    break;
                }
            }
        */
    },
};