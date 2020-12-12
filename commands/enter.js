module.exports = {
	name: 'enter',
	description: 'Used by admins to say anything they want in a channel, given a channel id.',
	async execute(args, message, client, databases) {
        const { GoogleSpreadsheet } = require('google-spreadsheet');
        const doc = new GoogleSpreadsheet('1Hex1F3awJ1A99-kcqy62twZ-WFd__q9uUUjDlVi57Ro');
        ///const creds = require('./creds.json');
        const creds = require('../creds.json');
        const Discord = require('discord.js')
        const axios = require('axios');
        const eventIQ = await databases[5].findOne({
            where: {
                id: parseInt(args[0])
            }
        });
        if (parseInt(args[1]) <= 0) {
            message.channel.send("Nice try, but I've been programmed not to accept that. -_-")
            return '';
        }
        if (eventIQ) {
            disName = ''
            x = message.guild.members.cache.filter(member => member.user.username == message.author.username)
            if (x.first() != undefined) {
                disName = x.first().displayName
            }
            await doc.useServiceAccountAuth(creds);
            await doc.loadInfo();
            const sheet = doc.sheetsByIndex[1];
            const rows = await sheet.getRows({offset: 0, limit: 650});
            await sheet.loadCells('A1:Q660');
            didLoad = false;
            for (let i = 0; i < rows.length; i++) {
                name = await sheet.getCellByA1("A" + rows[i].rowNumber).value;
                if (name.toLowerCase() == disName.toLowerCase()) {
                    const points = await sheet.getCellByA1("P" + rows[i].rowNumber).value;
                    console.log(points);
                    const wagers = await sheet.getCellByA1("Q" + rows[i].rowNumber)
                    console.log(wagers)
                    console.log(parseFloat(points))
                    console.log(parseInt(wagers.value))
                    console.log(parseInt(args[1]))
                    if ((parseFloat(points) - parseInt(wagers.value)) >= parseInt(args[1])) {
                            wager = await databases[6].create({
                                for: parseInt(args[0]),
                                bidAmount: parseInt(args[1]),
                                username: message.author.id,
                            });    
                            wagers.value = parseInt(wagers.value) + parseInt(args[1])
                            await sheet.saveUpdatedCells();
                            ///subtract wager
                            message.reply("your wager and name have been added to giveaway #" + args[0] + ".")
                    }
                    else {
                        message.reply("you don't have enough bottle caps to wager that amount. You only have " + (parseFloat(points) - parseFloat(wagers.value)).toString() + ".")
                    }
                    didLoad = true;
                    break;
                }
            }
            if (!didLoad) {
                const embed = {
                    "title": "Error",
                    "description": "I couldn't find your bottlecap score, sorry! Check [the spreadsheet](https://docs.google.com/spreadsheets/d/1Hex1F3awJ1A99-kcqy62twZ-WFd__q9uUUjDlVi57Ro/edit#gid=575464729) manually, and contact HunBurry if you see them on there but this command didn't work."
                }
                message.channel.send({
                    embed
                });
            }
        }
        else {
            message.channel.send("The giveaway in question could not be found. Make sure you're using the right ID, or it is possible the giveaway has ended.")
        }
    },
};