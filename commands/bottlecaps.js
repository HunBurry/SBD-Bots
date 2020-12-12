module.exports = {
	name: 'bottlecaps',
	description: 'Used by admins to say anything they want in a channel, given a channel id.',
	async execute(args, message, client, databases) {
        const { GoogleSpreadsheet } = require('google-spreadsheet');
        ///const creds = require('./creds.json');
        const doc = new GoogleSpreadsheet('1Hex1F3awJ1A99-kcqy62twZ-WFd__q9uUUjDlVi57Ro');
        const Discord = require('discord.js')
        disName = ''
        x = message.guild.members.cache.filter(member => member.user.username == message.author.username)
        if (x.first() != undefined) {
            disName = x.first().displayName
        }
        doc.useApiKey('API_KEY_HERE');
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[1];
        const rows = await sheet.getRows({offset: 0, limit: 650});
        await sheet.loadCells('A1:Q660');
        didLoad = false;
        for (let i = 0; i < rows.length; i++) {
            name = sheet.getCellByA1("A" + rows[i].rowNumber).value;
            myName2 = message.author.username;
            if (name != null && ((name.toLowerCase() == disName.toLowerCase()) || (name.toLowerCase() == myName2.toLowerCase()))) {
                points = sheet.getCellByA1("P" + rows[i].rowNumber).value;
                wagered = sheet.getCellByA1("Q" + rows[i].rowNumber).value;
                const embed = {
                    "title": "Event Points for " + disName,
                    "description": "You have " + points + " [event points](https://docs.google.com/spreadsheets/d/1Hex1F3awJ1A99-kcqy62twZ-WFd__q9uUUjDlVi57Ro/edit#gid=575464729)."
                }
                const first = new Discord.MessageEmbed()
                .setTitle("Event Points for " + disName)
                .setDescription("You have earned " + Math.floor(parseFloat(points)).toString() + " [bottlecaps](https://docs.google.com/spreadsheets/d/1Hex1F3awJ1A99-kcqy62twZ-WFd__q9uUUjDlVi57Ro/edit#gid=575464729) this season, and wagered " +
                wagered + ". You have " + Math.floor((parseFloat(points) - parseFloat(wagered))).toString() + " bottlecaps remaining.")
                .setColor(message.member.displayHexColor);
                message.channel.send(first);
                didLoad = true;
                break;
            }
        }
        if (!didLoad) {
            const first = new Discord.MessageEmbed()
            .setTitle("Error")
            .setDescription("I couldn't find your event points, sorry! Check [the spreadsheet](https://docs.google.com/spreadsheets/d/1Hex1F3awJ1A99-kcqy62twZ-WFd__q9uUUjDlVi57Ro/edit#gid=575464729) manually, and contact HunBurry if you see them on there but this command didn't work.")
            .setColor(message.member.displayHexColor);
            message.channel.send(first);
        }
    },
};