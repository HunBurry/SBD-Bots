module.exports = {
	name: 'nickToUserID',
	description: 'Used by admins to say anything they want in a channel, given a channel id.',
	async execute(args, message, databases) {        
        nameIQ = ''
        if (args.length > 1) {
            for (let i = 0; i < args.length; i++) {
                nameIQ = nameIQ + " " + args[i]
            }
        }
        else {
            nameIQ = args[0]
        }
        nameIQ = nameIQ.trim();
        x = message.guild.members.cache.filter(member => member.displayName.toLowerCase() == nameIQ.toLowerCase())
        if (x.first() != undefined) {
            return (x.first().user['id'])
        }
        else {
            return false
        }
    },
};