/*module.exports = {
	name: 'gmnflb',
	description: 'Used by admins to say anything they want in a channel, given a channel id.',
	async execute(args, message, client, databases) {
        const Discord = require('discord.js');
        raids = ['Garden of Salvation', 'Crown of Sorrows', 'Scourge of the Past', 'Last Wish', 'Spire of Stars', 'Eater of Worlds', 'Leviathan']         
        holdKeys = {
            'Garden of Salvation': "garden",
            'Crown of Sorrows': "cos",
             'Scourge of the Past': "sotp", 
             'Last Wish': 'lw',
             'Spire of Stars': 'sos', 
             'Eater of Worlds': 'eow', 
             'Leviathan': 'levi'
        }
        myDict = {};
        ke = Object.keys(holdKeys);
        const allEach = await databases[9].findAll()

        for (let i = 0; i < Object.keys(holdKeys).length; i++) {
            comps = {};
            for (let x = 0; x < allEach.length; x++) {
                comps[allEach[x]['discordName']] = (allEach[x][ke[i] + "I"] - allEach[x][ke[i]]);
            }

            items = Object.keys(comps).map(function(key) {
                return [key, comps[key]];
            });

            items.sort(function(first, second) {
                return second[1] - first[1];
            });

            myCommand = client.commands.get("checkName")
            name = await myCommand.execute(message.author.username, databases);

            if (items.length < 26) {
                myString = '';
                myString2 = '';
                for (let i = 1; i < items.length + 1; i++) {
                    if (name.toLowerCase() == items[i - 1][0].toLowerCase()) {
                        shouldAdd = false
                        myString = myString + "**" + i.toString() + ".\t" + items[i - 1][0] + " (" + items[i - 1][1] + ")**\n"
                        myString2 = myString2 + "**" + i.toString() + ".\t" + items2[i - 1][0] + " (" + items2[i - 1][2] + ")**\n"
                    }
                    else {
                        myString = myString + i.toString() + ".\t" + items[i - 1][0] + " (" + items[i - 1][1] + ")\n"
                        myString2 = myString2 + i.toString() + ".\t" + items2[i - 1][0] + " (" + items2[i - 1][2] + ")\n"
                    }
                }
                myDict[raids[i]] = myString2;
            }
            else {
                myString2 = '';
                myString = '';
                for (let i = 1; i < 26; i++) {
                    if (name.toLowerCase() == items[i - 1][0].toLowerCase()) {
                        shouldAdd = false
                        myString2 = myString2 + "**" + i.toString() + ".\t" + items2[i - 1][0] + " (" + items2[i - 1][2] + ")**\n"
                        myString = myString + "**" + i.toString() + ".\t" + items[i - 1][0] + " (" + items[i - 1][1] + ")**\n"
                    }
                    else { 
                        myString2 = myString2 + i.toString() + ".\t" + items2[i - 1][0] + " (" + items2[i - 1][2] + ")\n"
                        myString = myString + i.toString() + ".\t" + items[i - 1][0] + " (" + items[i - 1][1] + ")\n"
                    }
                }
        
                ranking = '';
                if (shouldAdd) {
                    for (let i = 1; i < items.length; i++) {
                        if (items[i][0].toLowerCase() == name.toLowerCase()) {
                            myString = myString + "...\n" + i.toString() + ".\t" + items[i][0] + " (" + items[i][1] + ")"
                            myString2 = myString2 + "...\n" + i.toString() + ".\t" + items2[i][0] + " (" + items2[i][2] + ")"
                        }
                    }
                }
            }
            myDict[gmnfs[i]] = myString2;
            }
        }
    }

        const myEmbed = new Discord.MessageEmbed()
            .setTitle('GMNF Leaderboards')
            .setColor(message.member.displayHexColor)
            .addFields(
                { name: "Festering Core", value: "🇫", inline: true },
                { name: "Lake of Shadows", value: "🇱", inline: true },
                { name: "Exodus Crash", value: "🇪", inline: true },
                { name: "Insight Terminus", value: "🇮", inline: true },
                { name: "Arms Dealer", value: "🇦", inline: true },
                { name: "Savathun's Song", value: "🇸", inline: true },
                { name: "Corrupted", value: "🇨", inline: true },
                { name: "Tree of Probabilities", value: "🇹", inline: true },
                { name: "Warden of Nothing", value: "🇼", inline: true },
                { name: "Broodhold", value: "🇧", inline: true },
                { name: "Strange Terrain", value: "🇷", inline: true },
                { name: "Garden World", value: "🇬", inline: true },
            )
            .setFooter("Use the corresponding reaction to select the GMNF you'd like to see leaderboards for. Please note, reactions only work for the user who initiated the command.");

        myMes = await message.channel.send(myEmbed);

        myMes.react('🇫')
            .then(() => myMes.react('🇱'))
            .then(() => myMes.react('🇪'))
            .then(() => myMes.react('🇮'))
            .then(() => myMes.react('🇦'))
            .then(() => myMes.react('🇸'))
            .then(() => myMes.react('🇨'))
            .then(() => myMes.react('🇹'))
            .then(() => myMes.react('🇼'))
            .then(() => myMes.react('🇧'))
            .then(() => myMes.react('🇷'))
            .then(() => myMes.react('🇬'))
            .catch(() => console.error('One of the emojis failed to react.'));

        userIDIQ = message.author.id

        const filter = (reaction, user) => {
            myArr = ['🇱', '🇫', '🇪', '🇮', '🇦', '🇸', '🇨', '🇹', '🇼', '🇧', '🇷', '🇬']
            return (myArr.includes(reaction.emoji.name) && (user.id === userIDIQ))
        };

        const collector = myMes.createReactionCollector(filter, { time: 300000 });

        collector.on('collect', (reaction, user) => {
            console.log('collect')
            if (reaction.emoji.name == '🇱') {
                console.log('hello there')
                const first = new Discord.MessageEmbed()
                    .setColor(message.member.displayHexColor)
                    .setFooter("Please note, reactions only work for the user who initiated the command.")
                    .setTitle('Lake of Shadows Leaderboards')
                    .addFields(
                        { name: "Completions", value: myDict['Lake of Shadows']['clears'], inline: true },
                        { name: "Times", value: myDict['Lake of Shadows']['time'], inline: true },
                    );
                myMes.edit(first).then(msg => console.log(`Updated the content of a message to ${myMes.content}`))
                .catch(console.error);
            }
            else if (reaction.emoji.name == '🇪') {
                console.log('hello there')
                const first = new Discord.MessageEmbed()
                    .setColor(message.member.displayHexColor)
                    .setTitle('Exodus Crash Leaderboards')
                    .setFooter("Please note, reactions only work for the user who initiated the command.")
                    .addFields(
                        { name: "Completions", value: myDict['Exodus Crash']['clears'], inline: true },
                        { name: "Times", value: myDict['Exodus Crash']['time'], inline: true },
                    );
                myMes.edit(first).then(msg => console.log(`Updated the content of a message to ${myMes.content}`))
                .catch(console.error);
            }
            else if (reaction.emoji.name == '🇫') {
                console.log('hello there')
                const first = new Discord.MessageEmbed()
                    .setColor(message.member.displayHexColor)
                    .setTitle('Festering Core Leaderboards')
                    .setFooter("Please note, reactions only work for the user who initiated the command.")
                    .addFields(
                        { name: "Completions", value: myDict['Festering Core']['clears'], inline: true },
                        { name: "Times", value: myDict['Festering Core']['time'], inline: true },
                    );
                myMes.edit(first).then(msg => console.log(`Updated the content of a message to ${myMes.content}`))
                .catch(console.error);
            }
            else if (reaction.emoji.name == '🇮') {
                console.log('hello there')
                const first = new Discord.MessageEmbed()
                    .setColor(message.member.displayHexColor)
                    .setTitle('Insight Terminus Leaderboards')
                    .setFooter("Please note, reactions only work for the user who initiated the command.")
                    .addFields(
                        { name: "Completions", value: myDict['Insight Terminus']['clears'], inline: true },
                        { name: "Times", value: myDict['Insight Terminus']['time'], inline: true },
                    );
                myMes.edit(first).then(msg => console.log(`Updated the content of a message to ${myMes.content}`))
                .catch(console.error);
            }
            else if (reaction.emoji.name == '🇸') {
                console.log('hello there')
                const first = new Discord.MessageEmbed()
                    .setColor(message.member.displayHexColor)
                    .setTitle("Savathun's Song Leaderboards")
                    .setFooter("Please note, reactions only work for the user who initiated the command.")
                    .addFields(
                        { name: "Completions", value: myDict["Savathun's Song"]['clears'], inline: true },
                        { name: "Times", value: myDict["Savathun's Song"]['time'], inline: true },
                    );
                myMes.edit(first).then(msg => console.log(`Updated the content of a message to ${myMes.content}`))
                .catch(console.error);
            }
            else if (reaction.emoji.name == '🇹') {
                console.log('hello there')
                const first = new Discord.MessageEmbed()
                    .setColor(message.member.displayHexColor)
                    .setTitle('Tree of Probabilities Leaderboards')
                    .setFooter("Please note, reactions only work for the user who initiated the command.")
                    .addFields(
                        { name: "Completions", value: myDict['Tree of Probabilities']['clears'], inline: true },
                        { name: "Times", value: myDict['Tree of Probabilities']['time'], inline: true },
                    );
                myMes.edit(first).then(msg => console.log(`Updated the content of a message to ${myMes.content}`))
                .catch(console.error);
            }
            else if (reaction.emoji.name == '🇬') {
                console.log('hello there')
                const first = new Discord.MessageEmbed()
                    .setColor(message.member.displayHexColor)
                    .setTitle('Garden World Leaderboards')
                    .setFooter("Please note, reactions only work for the user who initiated the command.")
                    .addFields(
                        { name: "Completions", value: myDict['Garden World']['clears'], inline: true },
                        { name: "Times", value: myDict['Garden World']['time'], inline: true },
                    );
                myMes.edit(first).then(msg => console.log(`Updated the content of a message to ${myMes.content}`))
                .catch(console.error);
            }
            else if (reaction.emoji.name == '🇷') {
                console.log('hello there')
                const first = new Discord.MessageEmbed()
                    .setColor(message.member.displayHexColor)
                    .setFooter("Please note, reactions only work for the user who initiated the command.")
                    .setTitle('Strange Terrain Leaderboards')
                    .addFields(
                        { name: "Completions", value: myDict['Strange Terrain']['clears'], inline: true },
                        { name: "Times", value: myDict['Strange Terrain']['time'], inline: true },
                    );
                myMes.edit(first).then(msg => console.log(`Updated the content of a message to ${myMes.content}`))
                .catch(console.error);
            }
            else if (reaction.emoji.name == '🇧') {
                console.log('hello there')
                const first = new Discord.MessageEmbed()
                    .setColor(message.member.displayHexColor)
                    .setTitle('Broodhold Leaderboards')
                    .setFooter("Please note, reactions only work for the user who initiated the command.")
                    .addFields(
                        { name: "Completions", value: myDict['Broodhold']['clears'], inline: true },
                        { name: "Times", value: myDict['Broodhold']['time'], inline: true },
                    );
                myMes.edit(first).then(msg => console.log(`Updated the content of a message to ${myMes.content}`))
                .catch(console.error);
            }
            else if (reaction.emoji.name == '🇦') {
                console.log('hello there')
                const first = new Discord.MessageEmbed()
                    .setColor(message.member.displayHexColor)
                    .setTitle('Arms Dealer Leaderboards')
                    .setFooter("Please note, reactions only work for the user who initiated the command.")
                    .addFields(
                        { name: "Completions", value: myDict["Arms Dealer"]['clears'], inline: true },
                        { name: "Times", value: myDict["Arms Dealer"]['time'], inline: true },
                    );
                myMes.edit(first).then(msg => console.log(`Updated the content of a message to ${myMes.content}`))
                .catch(console.error);
            }
            else if (reaction.emoji.name == '🇨') {
                console.log('Corrupted')
                const first = new Discord.MessageEmbed()
                    .setColor(message.member.displayHexColor)
                    .setTitle('Corrupted Leaderboards')
                    .setFooter("Please note, reactions only work for the user who initiated the command.")
                    .addFields(
                        { name: "Completions", value: myDict["Corrupted"]['clears'], inline: true },
                        { name: "Times", value: myDict["Corrupted"]['time'], inline: true },
                    );
                myMes.edit(first).then(msg => console.log(`Updated the content of a message to ${myMes.content}`))
                .catch(console.error);
            }
            else if (reaction.emoji.name == '🇼') {
                console.log('Warden of Nothing')
                const first = new Discord.MessageEmbed()
                    .setColor(message.member.displayHexColor)
                    .setTitle('Warden of Nothing Leaderboards')
                    .setFooter("Please note, reactions only work for the user who initiated the command.")
                    .addFields(
                        { name: "Completions", value: myDict["Warden of Nothing"]['clears'], inline: true },
                        { name: "Times", value: myDict["Warden of Nothing"]['time'], inline: true },
                    );
                myMes.edit(first).then(msg => console.log(`Updated the content of a message to ${myMes.content}`))
                .catch(console.error);
            }
        })
    },
};*/

