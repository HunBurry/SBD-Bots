module.exports = {
	name: 'rlb',
	description: 'Used by admins to say anything they want in a channel, given a channel id.',
	async execute(args, message, client, databases) {
        const raidStats = await databases[7].findAll();
        overall = {}
        sotp = {}
        ///all other raids
        for (let i = 0; i < raidStats.length; i++) {
            overallNum = raidStats[i]['sotp'] + raidStats[i]['lw'] + raidStats[i]['levi'] + raidStats[i]['eow'] + raidStats[i]['sos'] + raidStats[i]['garden'] + raidStats[i]['cos']
            myDicts[raidStats[i]] = {
                "overall": overallNum,
                "sotp": raidStats[i]['sotp'],
                'sotpTime': raidStats[i]['sotpTime'],
                'lw': raidStats[i]['lw'], 
                'lwTime': raidStats[i]['lwTime'],
            }
            ///add all to same dict maybe?
        }
        num = Math.min(26, raidStats.length);

        sotpClears = Object.keys(myDicts).map(function(key) {
            return [key, myDicts[key]['sotp']];
        });

        sotpClears.sort(function(first, second) {
            return second[1] - first[1];
        });

        myString = '';

        shouldAdd = true
        name = await checkName(message.author.username);
        for (let i = 1; i < num; i++) {
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
            for (let i = 1; i < items.length; i++) {
                if (items[i][0].toLowerCase() == name.toLowerCase()) {
                    myString = myString + "...\n" + i.toString() + ".\t" + items[i][0] + " (" + items[i][1] + ")"
                }
            }
        }
    },
};