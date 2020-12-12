module.exports = {
	name: 'register',
	description: 'Used by admins to say anything they want in a channel, given a channel id.',
	async execute(args, message, client, databases) {
        ////re-do to just get their bungieID
        holdN = '';
        if (args.length > 1) {
            for (let i = 0; i < args.length; i++) {
                holdN = holdN + args[i] + " "
            }
            holdN = holdN.trim();
        }
        else if (args.length == 1) {
            holdN = args[0]
        }
        else {
            message.reply("You must provide a parameter (i.e. your username.)")
            return;
        }
        try {

            const axios = require('axios');
            url = 'https://sixbeersdeep.net/wp-content/plugins/D2ClanScore/api/Roster/'
            const response = await axios.get(url);
            const data = response.data;
            user = '';
            data2 = JSON.parse(data);
            members = data2["Response"]["members"]
            for (let i = 0; i < members.length; i++) {
                if (members[i]['username'].toLowerCase() == holdN.toLowerCase()) {
                    user = members[i];
                    break;
                }
            }

            if (user == '') {
                message.reply("Username could not be located on the website. Please ensure you're using the correct information.")
                return;
            }

            const tag = await databases[0].create({
                discordName: message.author.username,
                websiteName: user['bungieID']
            });
            const embed = {
                "title": "Registration",
                "description": "You have been registered as " + holdN + "."
            }
            message.channel.send({
                embed
            });

        }
        catch (e) {
            if (e.name == 'SequelizeUniqueConstraintError') {
                const upd = await databases[0].update({
                    websiteName: user['bungieID']
                }, {
                    where: {
                        discordName: message.author.username
                    }
                })
                const embed = {
                    "title": "Registration",
                    "description": "You have been re-registered as " + holdN + "."
                }
                message.channel.send({
                    embed
                });
            }
            else {
                return message.reply('Something went wrong with registering. Contact HunBurry.');
            }
        }
    },
};