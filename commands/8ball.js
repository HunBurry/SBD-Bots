module.exports = {
	name: 'say',
	description: 'Used by admins to say anything they want in a channel, given a channel id.',
	execute(args, message, client, databases) {
        exampleMemes = [
            "Heeyyy you're a Dredgen, fight like one!",
            "Go look em' in the eyes!",
            "You're a horrible person.",
            "Back to action hotshot! Be notorius!",
            "Looks like the executioners come to town!",
            "Hey hey, easy there, I think you got em'!",
            "Alright, alright, alright!",
            "Bring a sword!",
            "Shut up, I can't take the sass right now.",
            "Get me those motes and I'll make you rich, brother!",
            "The things I've killed you wouldn't believe.",
            "You're wrong. How's that suit ya, Snitch?",
            "You're crushing them!",
            "I've seen the best, Guardian.",
            "Who's better than you? Nobody!",
            "Enough foolin' around.",
            "Woo! You havin' fun yet? I am!"
        ]
        myQuote = exampleMemes[Math.floor(Math.random() * exampleMemes.length)]
        const embed = {
            "title": "The Drifter says...",
            "description": myQuote,
        };
        message.channel.send({
            embed
        });
    },
};