module.exports = {
	name: 'suggest',
	description: 'Send a description back to HunBurry.',
	execute(args, message, client, databases) {
        holdN = '';
        if (args.length > 1) {
            for (let i = 0; i < args.length; i++) {
                holdN = holdN + args[i] + " "
            }
            holdN = holdN.trim();
        }
        else {
            holdN = args[0]
        }
        message.channel.send("Your suggestion has been sent!");
        channel = client.channels.cache.get('723261724223996014');
        channel.send("Suggestion from " + message.author.username + ": " + holdN);
    },
};