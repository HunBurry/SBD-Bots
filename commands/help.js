module.exports = {
	name: 'help',
	description: 'Used by admins to say anything they want in a channel, given a channel id.',
	async execute(args, message, client, databases) {
        const Discord = require('discord.js')
        let clanStats = {
            "points": "`-points <User>`: If called by itself, this command returns the number of points you have. If called with " +
                "an optional username, the command returns the points you have with said user.\nExamples: `-points` OR `-points HunBurry`",
            "tags": "`-tags <User>`: If called by itself, this command returns the number of tags you have. If called with " +
                "an optional username, the command returns the number and types of tags you have with said user.\nExamples: `-tags` OR  `-tags HunBurry`",
            "tabs": "`-tabs <User>`: If called by itself, this command returns the number of tabs you have. If called with " +
                "an optional username, the command returns whether or not you have a tab with the said user.\nExamples: `-tabs` OR `-tabs HunBurry`",
            "compare": "`-compare User`: This command requires a User to be entered as a parameter. This command returns a point, tag, " +
                "and tab comparison between the users.\nExample: `-compare HunBurry`",
            "lb": "`-lb <Type>`: This command returns the top twenty five players in the clan currently, and your position on the leaderboards. If left blank, returns total leaderboards. " +
                "If called with a parameter (tags, tabs, or points), returns the leaderboards for said type.\nExample: `-lb` or `-lb points`",
            "stats": "`-stats <User>`: If called by itself, this command returns all of your stats. If called with " +
                "an optional username, this command returns that person's stats.\nExample: `-stats` or `-stats HunBurry`",
            "bottlecaps": "`-bottlecaps`: See how many event points you currently have, so that you can spend them!\nExample: `-bottlecaps`",
            "slb": "`-slb <Type>`: This command returns the top twenty five players in the clan for this season, and your position on the leaderboards. If left blank, returns total leaderboards. " +
                "If called with a parameter (tags, tabs, or points), returns the leaderboards for said type.\nExample: `-slb` or `-slb points`",
            "blb": "`-eventlb`: This command returns the top twenty five players in the clan for event points, and your place on the leaderboards.\nExample: `-eventlb`",
        }

        let administration = {
            "register": "`-register PrimaryUserName`: This command registers you in the system so all other commands work. THIS IS NECESSARY. Please register " +
                "with whatever username is listed on the website for you.\nExample: `-register HunBurry`",
            "raffle": "`-raffle Time`: This command raffles off a spot in an LFG to anyone who reacts to the message with a 👍. Must be given a time period (in minutes), which serves as the duration the raffle is up for. Command can only be ran be AA, Sherpas, and Bartenders.\Example: `-raffle 5`",
            'create': '`-create TimeLimit Description`: Creates a new event for users to enter into through wagering of bottlecaps. Can only be used by DD and Bartenders\nExample: `-create 30 Trials Carries with Beef and Jonesy`',
            'enter': '`-enter ID Wager`: Enters into a given event per ID, wagering the given amount.\nExample: `-enter 19 200`',
            'steamregister': '`-steamregister Name`: Register your gamertag. ONLY use this command if your Bungie account (and SBD information) is edited by Steam instead of Xbox.\nExample: `-steamregister HunBurry`'
        }

        let stats = {
            'gmnf': "`-gmnf <User>`: Returns your GMNF completions and times, and caches the data for comparsion use. If ran with a name, returns that user's stats.\nExample: `-gmnf` or `-gmnf HunBurry`", 
            'raids': "`-raids <User>`: Returns your raid completions and times, and caches the data for comparsion use. If ran with a name, returns that user's stats.\nExample: `-raids` or `-raids HunBurry`",  
            'dungeons': "`-dungons <User>`: Returns your dungeon completions and times, and caches the data for comparsion use. If ran with a name, returns that user's stats.\nExample: `-dungeons` or `-dungeons HunBurry`", 
            'raidCompare': '`-raidCompare User`: Compares your raid stats to another user.\nExample: `-raidCompare HunBurry',
            'dungeonCompare': '`-dungeonCompare User`: Compares your dungeon stats to another user.\nExample: `-dungeonCompare HunBurry',
            'gmnfCompare': '`-gmnfCompare User`: Compares your GMNF stats to another user.\nExample: `-gmnfCompare HunBurry`',
            'rslb': '`-rslb`: Command In Progress.',
            'gmnflb': '`-gmnflb`: Returns the current GMNF leaderboards. Use reactions to navigate through the different GMNFs.', 
        }

        let misc = {
            "challenge": "`-challenge User:` Creates a random challenge for you and another user to compete to complete first.\nExample: `-challenge HunBurry`",
            "wins": "`-wins`: Returns the number of challenge wins you have.\nExample: `-wins`",
            'clb': '`clb`: Returns the Challenges leaderboards.\nExample: `-clb`',
            "claim": "`-claim BountyNumber`: Claims a challenge that you've won, and updates your win count.\nExample: `-claim 6`",
            "suggest": "`-suggest Idea`: Suggest an idea for a new command new to implemented.\nExample: `-suggest A command that gets me a random user that I don't have a tag with.`",
            'loadout': '`-loadout`: Sends a random loadout for the user to attempt to use.\nExample: `-loadout`',
            'ranks': '`-ranks`: Shows the current number of people with each Beer rank in the clan.\nExample: `-ranks`',
            'dd': '`-dd Type`: Lists all the AA members for a given type (either PvE or PvP) and their gameplay styles.\nExample: `-sherpas PvP`',
            'opentabs': '`-opentabs`: Lists a random member you do not have a tag with this season.\nExample: `-opentabs`',
            'friends': '`-friends`: This command returns the top twenty five friends you have within the clan, based on points/tabs/tags accumulated.\nExample: `-friends`',
            'time': '`-time`: Returns the leaderboards showing the top 25 and your personal ranking, based on how long people have been in the clan/Discord for.'
        }

        let dict = {
            "points": "`-points <User>`: If called by itself, this command returns the number of points you have. If called with " +
                "an optional username, the command returns the points you have with said user.\nExamples: `-points` OR `-points HunBurry`",
            "tags": "`-tags <User>`: If called by itself, this command returns the number of tags you have. If called with " +
                "an optional username, the command returns the number and types of tags you have with said user.\nExamples: `-tags` OR  `-tags HunBurry`",
            "tabs": "`-tabs <User>`: If called by itself, this command returns the number of tabs you have. If called with " +
                "an optional username, the command returns whether or not you have a tab with the said user.\nExamples: `-tabs` OR `-tabs HunBurry`",
            "compare": "`-compare User`: This command requires a User to be entered as a parameter. This command returns a point, tag, " +
                "and tab comparison between the users.\nExample: `-compare HunBurry`",
            "lb": "`-lb <Type>`: This command returns the top twenty five players in the clan currently, and your position on the leaderboards. If left blank, returns total leaderboards. " +
            "If called with a parameter (tags, tabs, or points), returns the leaderboards for said type.\nExample: `-lb` or `-lb points`",
            "register": "`-register PrimaryUserName`: This command registers you in the system so all other commands work. THIS IS NECESSARY. Please register " +
                "with whatever username is listed on the website for you.\nExample: `-register HunBurry`",
            "challenge": "`-challenge User:` Creates a random challenge for you and another user to compete to complete first.\nExample: `-challenge HunBurry`",
            "stats": "`-stats <User>`: If called by itself, this command returns all of your stats. If called with " +
                "an optional username, this command returns that person's stats.\nExample: `-stats` or `-stats HunBurry`",
            "wins": "`-wins`: Returns the number of challenge wins you have.\nExample: `-wins`",
            "claim": "`-claim BountyNumber`: Claims a challenge that you've won, and updates your win count.\nExample: `-claim 6`",
            "suggest": "`-suggest Idea`: Suggest an idea for a new command new to implemented.\nExample: `-suggest A command that gets me a random user that I don't have a tag with.",
            "eventpoints": "`-eventpoints`: See how many event points you currently have, so that you can spend them!\nExample: `-eventpoints`",
            "slb": "`-slb <Type>`: This command returns the top twenty five players in the clan for this season, and your position on the leaderboards. If left blank, returns total leaderboards. " +
            "If called with a parameter (tags, tabs, or points), returns the leaderboards for said type.\nExample: `-slb` or `-slb points`",
            "raffle": "`-raffle Time`: This command raffles off a spot in an LFG to anyone who reacts to the message with a 👍. Must be given a time period (in minutes), which serves as the duration the raffle is up for. Command can only be ran be AA, Sherpas, and Bartenders.\Example: `-raffle 5`",
            "eventlb": "`-eventlb`: This command returns the top twenty five players in the clan for event points, and your place on the leaderboards.\nExample: `-eventlb`",
            'loadout': '`-loadout`: Sends a random loadout for the user to attempt to use.\nExample: -loadout',
            'ranks': '`-ranks: Shows the current number of people with each Beer rank in the clan.\nExample: -ranks',
            'sherpas': '`-sherpas Type: Lists all the AA members for a given type (either PvE or PvP) and their gameplay styles.',
            'create': '`-create TimeLimit Description`: Creates a new event for users to enter into through wagering of bottlecaps. Can only be used by DD and Bartenders\nExample: `-create 30 Trials Carries with Beef and Jonesy`',
            'enter': '`-enter ID Wager`: Enters into a given event per ID, wagering the given amount.\nExample: `-enter 19 200`',
        }

        message.channel.send("Alright guardian, check your postmaster for instructions.");

        let myMes = ''

        if (args[0] == 'register') {
            myString = '';
            mHold = Object.keys(administration);
            for (let i = 0; i < mHold.length; i++) {
                myString = myString + administration[mHold[i]] + '\n'
            }
            myString = myString + "\nTo see additional commands, please react with the corresponding emoji.\nAdministration: 🇦\nStats: 🇸\nMisc: 🇲"
            const ggr = new Discord.MessageEmbed()
                .setColor('#AAA')
                .setTitle('Administration')
                .setDescription(myString);
            myMes = await message.author.send(ggr)
        }
        else {
            let embed = {
                "title": "Commands",
                "description": "To see commands, please react with the corresponding emoji.\nAdministration: 🇦\nStats: 🇸\nMisc: 🇲\nClan Stats: 🇨"
            }

            myMes = await message.author.send({
                embed
            });
        }

        myMes.react('🇦')
            .then(() => myMes.react('🇸'))
            .then(() => myMes.react('🇲'))
            .then(() => myMes.react('🇨'))
            .catch(() => console.error('One of the emojis failed to react.'));

        userIDIQ = message.author.id

        const filter = (reaction, user) => {
            myArr = ['🇸', '🇲', '🇦', '🇨']
            return (myArr.includes(reaction.emoji.name) && (user.id === userIDIQ))
        };

        const collector = myMes.createReactionCollector(filter, { time: 300000 });

        collector.on('collect', (reaction, user) => {
        if (reaction.emoji.name == '🇲') {
            console.log("UGH")
            myString = '';
            mHold = Object.keys(misc);
            for (let i = 0; i < mHold.length; i++) {
                myString = myString + misc[mHold[i]] + '\n'
            }
            myString = myString + "\nTo see additional commands, please react with the corresponding emoji.\nAdministration: 🇦\nStats: 🇸\nMisc: 🇲\nClan Stats: 🇨"
            const first = new Discord.MessageEmbed()
                .setColor('#AAA')
                .setTitle('Misc.')
                .setDescription(myString);
            shouldRepeat = true
            myMes.edit(first).then(msg => console.log(`Updated the content of a message to ${myMes.content}`))
            .catch(console.error);
            ///myMes.reactions.removeAll()
        }
        else if (reaction.emoji.name == '🇸') {
            console.log("hi")
            myString = '';
            mHold = Object.keys(stats);
            for (let i = 0; i < mHold.length; i++) {
                myString = myString + stats[mHold[i]] + '\n'
            }
            myString = myString + "\nTo see additional commands, please react with the corresponding emoji.\nAdministration: 🇦\nStats: 🇸\nMisc: 🇲\nClan Stats: 🇨"
            const first = new Discord.MessageEmbed()
                .setColor('#AAA')
                .setTitle('Stats')
                .setDescription(myString);
            shouldRepeat = true
            myMes.edit(first).then(msg => console.log(`Updated the content of a message to ${myMes.content}`))
            .catch(console.error);
            ///myMes.reactions.removeAll()
        }
        else if (reaction.emoji.name == '🇨') {
            console.log("hi")
            myString = '';
            mHold = Object.keys(clanStats);
            for (let i = 0; i < mHold.length; i++) {
                myString = myString + clanStats[mHold[i]] + '\n'
            }
            myString = myString + "\nTo see additional commands, please react with the corresponding emoji.\nAdministration: 🇦\nStats: 🇸\nMisc: 🇲\nClan Stats: 🇨"
            const first = new Discord.MessageEmbed()
                .setColor('#AAA')
                .setTitle('Clan Stats')
                .setDescription(myString);
            shouldRepeat = true
            myMes.edit(first).then(msg => console.log(`Updated the content of a message to ${myMes.content}`))
            .catch(console.error);
            ///myMes.reactions.removeAll()
        }
        else {
            myString = '';
            mHold = Object.keys(administration);
            for (let i = 0; i < mHold.length; i++) {
                myString = myString + administration[mHold[i]] + '\n'
            }
            myString = myString + "\nTo see additional commands, please react with the corresponding emoji.\nAdministration: 🇦\nStats: 🇸\nMisc: 🇲\nClan Stats: 🇨"
            const first = new Discord.MessageEmbed()
                .setColor('#AAA')
                .setTitle('Administration')
                .setDescription(myString);
            shouldRepeat = true
            myMes.edit(first).then(msg => console.log(`Updated the content of a message to ${myMes.content}`))
            .catch(console.error);
            ///myMes.reactions.removeAll()
        }
        });

        collector.on('end', collected => {
            myMes.delete();
        });
    },
};

