        
module.exports = {
	name: 'nickname',
	description: 'Used by admins to say anything they want in a channel, given a channel id.',
	execute(args, message, client, databases) {
        holdN = '';
        if (args.length > 1) {
            for (let i = 0; i < args.length; i++) {
                holdN = holdN + args[i] + " "
            }
        }
        else {
            holdN = args[0]
        }
        holdN = holdN.trim();
        client.user.setUsername(holdN);
    },
};