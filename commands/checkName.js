module.exports = {
	name: 'checkName',
	description: 'Used by admins to say anything they want in a channel, given a channel id.',
	async execute(myName, databases) {
        const user = await databases[0].findOne({
            where: {
                discordName: myName
            }
        });
        if (user) {
            userName = user.get('websiteName')
            return userName
        }
        else {
            return ''
        }
    },
};