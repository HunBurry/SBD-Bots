module.exports = {
	name: 'challenge',
	description: 'Used by admins to say anything they want in a channel, given a channel id.',
	async execute(args, message, client, databases) {
        myCommand = client.commands.get("checkName")
        n1 = await myCommand.execute(message.author.username, databases);
        hold2 = await client.commands.get("nickToUser").execute(args, message, databases);
        id = await client.commands.get("nickToUserID").execute(args, message, databases);
        n2 = await client.commands.get("checkName").execute(hold2, databases);
        try {
            let possibles = [
                "Play as a Hunter for 1000 hours.",
                "Complete a crucible game with at least two other clan members where no fireteam member dies.",
                "Complete a raid with only clanmates.",
                "Complete a raid lair without using a special ammo weapon.",
                "Complete a new triumph.",
                "Take a selfie with an important Destiny character.",
                "Collect 10 new tags, 5 new tabs, or 25 points.",
                "Participate in a Tower dance party.",
                "Complete any D2Y1 raid, or any D1 raid.",
                "Win a 3v3 clan private match.",
                "With a full clan fireteam, summon your primevil while at least fifty motes ahead of the opponent.",
                "Win a Gambit match without anyone dying.",
                "Complete 3 Heroic Contact Events, With At Least 2 Clanmates, Without a Ball Dupe.",
                "Get a maxed out season pass, or gain three new season pass levels.",
                "Post a pic with you and your favorite Destiny merch.",
                "Take a selfie after summoning the Traveler in the tower.",
                "In a 3v3 clan Soccer Match, get five goals without letting the other team score.",
                "Post about an achievement the clan helped you get (i.e. flawless trials, flawless raid, low-man raid, first-ever raid, 5500, etc.).",
                "Show off your guardian wearing your favorite gear.",
                "Run 3 Strikes With Clanmates without anyone dying.",
                "With a clan fireteam, complete any time trial (dungeon, NMH, ascendant challenges, strike/NF, etc.)",
                "With at least one clanmate, play a round of any game OTHER than Destiny.",
                "Post (or update) your Member Bio.",
                "Redeem a new clan triumph, or have completed at least at least three seasonal clan triumphs.",
                "Win a crucible match with a full SBD fireteam using only primary weapons.",
                "Win a crucible match with a full SBD fireteam using only supers, melees, and gernades.",
                "Obtain any seal from Y3, or any two seals from Y2.",
                "Complete a perfect tire game.",
                "Post any funny/cool video of something you've done in Destiny or with the clan.",
                "Complete any pinacle drop with a full clan fireteam."
            ]

            myChoiceR = Math.floor(Math.random() * possibles.length);
            myChoice = possibles[myChoiceR]
            const tag = await databases[1].create({
                player1: n1,
                player2: n2, 
                description: myChoice
            });
            const embed = {
                "title": "Challenge " + tag.id + ": " + n1 + " vs. " + n2,
                "description": "You have created a challenge for <@" + id + ">. Your challenge is: " + myChoice + " To claim the win, type -claim followed by the bounty number."
            }
            message.channel.send({
                embed
            });
        }
        catch (e) {
            console.log(e);
        }
    },
};