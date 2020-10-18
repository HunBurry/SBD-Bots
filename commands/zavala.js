module.exports = {
	name: 'zavala',
	description: 'Used by admins to say anything they want in a channel, given a channel id.',
	execute(args, message, client, databases) {
        const embed = {
            "description": "Whether we wanted it or not, we've stepped into a war with the Cabal on Mars. So let's get to taking out their command, one by one. Valus Ta'aurc. From what I can gather he commands the Siege Dancers from an Imperial Land Tank outside of Rubicon. He's well protected, but with the right team, we can punch through those defenses, take this beast out, and break their grip on Freehold.",
            "image": {
                "url": "https://pbs.twimg.com/media/DejWY2nV4AA_S2A?format=jpg&name=small"
            }
        };
        message.channel.send({
            embed
        });
        message.delete();
    },
};