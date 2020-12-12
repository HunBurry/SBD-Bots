module.exports = {
	name: 'triumphs',
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
        const rows = await sheet.getRows({offset: 0, limit: 550});
        await sheet.loadCells('A1:Q560');
        console.log(sheet.getCellByA1("C1").value)
        nas = [sheet.getCellByA1("C1").value, sheet.getCellByA1("D1").value, sheet.getCellByA1("E1").value, sheet.getCellByA1("F1").value, sheet.getCellByA1("G1").value, sheet.getCellByA1("H1").value, sheet.getCellByA1("I1").value, sheet.getCellByA1("J1").value, sheet.getCellByA1("K1").value, sheet.getCellByA1("L1").value, sheet.getCellByA1("M1").value, sheet.getCellByA1("N1").value]
        didLoad = false;
        triumphs = {}
        for (let x = 0; x < nas.length; x++) {
            if (nas[x] != null) {
                triumphs[nas[x]] = {
                    'free': 0,
                    'real': 0
                };
            }
        }
        for (let i = 0; i < rows.length; i++) {
            name = sheet.getCellByA1("A" + rows[i].rowNumber).value;
            ///myName2 = message.author.username;
            if (name != null) {
                ///points = sheet.getCellByA1("P" + rows[i].rowNumber).value;
                ///wagered = sheet.getCellByA1("Q" + rows[i].rowNumber).value;
                ///const embed = {
                //    "title": "Event Points for " + disName,
                //    "description": "You have " + points + " [event points](https://docs.google.com/spreadsheets/d/1Hex1F3awJ1A99-kcqy62twZ-WFd__q9uUUjDlVi57Ro/edit#gid=575464729)."
                //}
                for (let x = 0; x < Object.keys(triumphs).length; x++) {
                    lets = ['C', 'D', 'E', 'F', 'G', 'H', "I", 'J', 'K', 'L', "M", 'N']
                    if (sheet.getCellByA1(lets[x] + rows[i].rowNumber).value != null) {
                        ///console.log(triumphs[Object.keys(triumphs)[x]])
                        ///console.log(sheet.getCellByA1(lets[x] + rows[i].rowNumber).value)
                        ///console.log("--------------------------------")
                        color = sheet.getCellByA1(lets[x] + rows[i].rowNumber).effectiveFormat.backgroundColor;
                        if (color.red == 1 && color.blue == 1 && color.green == 1){
                            triumphs[Object.keys(triumphs)[x]]['real'] = triumphs[Object.keys(triumphs)[x]]['real'] + 1
                        }
                        else {
                            triumphs[Object.keys(triumphs)[x]]['free'] = triumphs[Object.keys(triumphs)[x]]['free'] + 1
                        }
                    }
                    ///console.log('_______________________________________________________________')
                }
                ///console.log(triumphs)
                ///const first = new Discord.MessageEmbed()
                ///.setTitle("Event Points for " + disName)
                ///.setDescription("You have earned " + Math.floor(parseFloat(points)).toString() + " [bottlecaps](https://docs.google.com/spreadsheets/d/1Hex1F3awJ1A99-kcqy62twZ-WFd__q9uUUjDlVi57Ro/edit#gid=575464729) this season, and wagered " +
                ///wagered + ". You have " + Math.floor((parseFloat(points) - parseFloat(wagered))).toString() + " bottlecaps remaining.")
                ///.setColor(message.member.displayHexColor);
                ///message.channel.send(first);
                didLoad = true;
            }
        }
        const first = new Discord.MessageEmbed()
            .setTitle("Triumph Breakdown by # of Completions")
            .setColor(message.member.displayHexColor);
        
        for (let i = 0; i < Object.keys(triumphs).length; i++) {
            first.addFields({
                name: Object.keys(triumphs)[i], value: (triumphs[Object.keys(triumphs)[i]]['free'] + triumphs[Object.keys(triumphs)[i]]['real']).toString() + " (" + triumphs[Object.keys(triumphs)[i]]['free'].toString() + " of " + (triumphs[Object.keys(triumphs)[i]]['free'] + triumphs[Object.keys(triumphs)[i]]['real']).toString() + " Free)", inline: true
            })
        }

        message.channel.send(first)
    },
};