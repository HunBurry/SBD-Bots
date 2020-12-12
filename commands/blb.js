module.exports = {
	name: 'blb',
	description: 'Used by admins to say anything they want in a channel, given a channel id.',
	async execute(args, message, client, databases) {
        const { GoogleSpreadsheet } = require('google-spreadsheet');
        ///const creds = require('./creds.json');
        const doc = new GoogleSpreadsheet('1Hex1F3awJ1A99-kcqy62twZ-WFd__q9uUUjDlVi57Ro');
        name = message.member.displayName
        myDicts = {}

        doc.useApiKey('API_KEY_HERE');
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[1];
        const rows = await sheet.getRows({offset: 0, limit: 450});
        await sheet.loadCells('A1:P460');
        didLoad = false;
        for (let i = 0; i < rows.length; i++) {
            namee = sheet.getCellByA1("A" + rows[i].rowNumber).value;
            points = sheet.getCellByA1("P" + rows[i].rowNumber).value;
            if (namee != null) {
                if (points != null) {
                    myDicts[namee] = Math.round(points);
                }
                else {
                    myDicts[namee] = 0;
                }
            }
        }


        items = Object.keys(myDicts).map(function(key) {
            return [key, myDicts[key]];
        });

        items.sort(function(first, second) {
            return second[1] - first[1];
        });

        myString = '';

        shouldAdd = true
        for (let i = 1; i < 26; i++) {
            if (name.toLowerCase() == items[i - 1][0].toLowerCase()) {
                shouldAdd = false
                myString = myString + "**" + i.toString() + ".\t" + items[i - 1][0] + " (" + items[i - 1][1] + ")**\n"
            }
            else {
                myString = myString + i.toString() + ".\t" + items[i - 1][0] + " (" + items[i - 1][1] + ")\n"
            }
        }

        ranking = '';
        if (shouldAdd) {
            for (let i = 25; i < items.length; i++) {
                if (items[i][0].toLowerCase() == name.toLowerCase()) {
                    myString = myString + "...\n" + (i + 1).toString() + ".\t" + items[i][0] + " (" + items[i][1] + ")"
                }
            }
        }

        const embed = {
            "title": "Event Point Leaderboards",
            "description": myString
        }
        message.channel.send({
            embed
        });
    },
};