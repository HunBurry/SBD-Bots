module.exports = {
	name: 'websiteToDiscord',
	description: 'Used by admins to say anything they want in a channel, given a channel id.',
	async execute(name, databases) {
        const user = await databases[0].findOne({
            where: {
                websiteName: name
            }
        });
        if (user) {
            userName = user.get('discordName')
            return userName
        }
        else {
            return ''
        }
    },
};