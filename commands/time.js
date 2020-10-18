const lb = require('./lb');

module.exports = {
	name: 'time',
	description: 'Used by admins to say anything they want in a channel, given a channel id.',
	async execute(args, message, client, databases) {
        const Discord = require('discord.js');
        members = message.guild.members.cache;
        lbDict = {};
        members.map(member => lbDict[member.displayName] = new Date(member.joinedTimestamp))

        var items = Object.keys(lbDict).map(function(key) {
            return [key, lbDict[key]];
        });
          
          // Sort the array based on the second element
        items.sort(function(first, second) {
            return first[1] - second[1] ;
        });

        myString = '';
        name = message.member.displayName
        shouldAdd = true
        for (let i = 1; i < 26; i++) {
            if (name.toLowerCase() == items[i - 1][0].toLowerCase()) {
                shouldAdd = false
                myString = myString + "**" + i.toString() + ".\t" + items[i - 1][0] + " (" + items[i - 1][1].toDateString() + ")**\n"
            }
            else { 
                myString = myString + i.toString() + ".\t" + items[i - 1][0] + " (" + items[i - 1][1].toDateString() + ")\n"
            }
        }

        ranking = '';
        if (shouldAdd) {
            for (let i = 1; i < items.length; i++) {
                if (items[i][0].toLowerCase() == name.toLowerCase()) {
                    myString = myString + "...\n" + i.toString() + ".\t" + items[i][0] + " (" + items[i][1].toDateString() + ")"
                }
            }
        }

        console.log(myString)

        const myEmbed = new Discord.MessageEmbed()
            .setTitle('Membership Time Leaderboards')
            .setColor(message.member.displayHexColor)
            .setDescription(myString);
          
        message.channel.send(myEmbed)
    },
};