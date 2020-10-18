module.exports = {
	name: 'clb',
	description: 'Used by admins to say anything they want in a channel, given a channel id.',
	async execute(args, message, client, databases) {
        myDicts = {}
        name = message.author.username

        wins = await databases[2].findAll()

        for (let i = 0; i < wins.length; i++) {
            p = wins[i]['player'];
            if (Object.keys(myDicts).includes(p)) {
                myDicts[p] = myDicts[p] + 1;
            }
            else {
                myDicts[p] = 1;
            }
        }

        len = Object.keys(myDicts).length;
        for (let i = len; i < 26; i++) {
            myDicts["N/A-" + (i + 1).toString()] = 0;
        }

        items = Object.keys(myDicts).map(function(key) {
            return [key, myDicts[key]];
        });

        items.sort(function(first, second) {
            return second[1] - first[1];
        });

        myString = '';
        console.log(items)

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
            "title": "Challenge Leaderboards",
            "description": myString
        }
        message.channel.send({
            embed
        });
    },
};