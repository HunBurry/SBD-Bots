module.exports = {
	name: 'say',
	description: 'Used by admins to say anything they want in a channel, given a channel id.',
	execute(args, message, client, databases) {
        let holdS = "";
        channelID = args[0]
        for (let i = 1; i < args.length; i++) {
            holdS = holdS + args[i] + " ";
        }
        holdS = holdS.trim();
        let t = client.channels.cache.get(channelID);
        t.send(holdS);
        
        message.delete();
	},
};