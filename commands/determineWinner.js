module.exports = {
    name: 'determinewinner',
	description: 'Used by admins to say anything they want in a channel, given a channel id.',
	async execute(id, client, databases) {
        const Discord = require('discord.js')
        const tmi = require('tmi.js');
        giveaways = client.channels.cache.get('610621085297278986')
        myMes = await giveaways.send('Giveaway is now over.')
    
        console.log("entered into determination state")
        console.log("id is " + id)
        const myEV = await databases[6].findAll({
            where: {
                for: parseInt(id)
            }
        });
    
        console.log(myEV)
    
        console.log('located events');
        
        myChoices = []
    
        for (let i = 0; i < myEV.length; i++) {
            for (let x = 0; x < myEV[i].bidAmount; x++) {
                myChoices.push(myEV[i].username);
            }
        }
    
        myChoice = myChoices[Math.floor(Math.random() * myChoices.length)]
    
        const eventIQ = await databases[5].findOne({
            where: {
                id: parseInt(id)
            }
        });
        
        const embed = {
            "title": eventIQ.host + "'s Giveaway (#" + eventIQ.id + ") Winner",
            'description': "With a total of " + myChoices.length.toString() + " entries, the giveaway winner is... <@" + myChoice + ">!"
        }
    
        giveaways.send({
            embed
        });
    
        un = client.users.cache.get(myChoice).username
    
        const opts = {
            identity: {
                username: "SBD_Bartender",
                password: "oauth:lcehyzu0e1brhdbrvwhycyebxfd6a2"
            },
            channels: [
                "HunBurry",
                "jackedupjonesy",
                'liiguardlii',
                'Ninjarabi1',
                'clerkgames',
                'theocratical',
                'BestNinjaNW',
                'Acemo74',
                'kinggummylive',
                'futureishere',
                'ghostscout_ben',
                'cptncr3d1ble',
                'Sp1der05',
                'wokeology',
                'blackbuc911',
                'CrankyGuardian',
                'lipidquadcab',
                'saintlxix',
                'alaskalostcauze',
                'm9aviator1'
            ]
          };
        const client2 = new tmi.client(opts);
        client2.connect();
        
        client2.on('connected', function() {
            myChans = [
                "HunBurry",
                "jackedupjonesy",
                'liiguardlii',
                'clerkgames',
                'theocratical',
                'BestNinjaNW',
                'Acemo74',
                'kinggummylive',
                'futureishere',
                'ghostscout_ben',
                'cptncr3d1ble',
                'Sp1der05',
                'Ninjarabi1',
                'wokeology',
                'blackbuc911',
                'CrankyGuardian',
                'lipidquadcab',
                'saintlxix',
                'alaskalostcauze',
                'm9aviator1'
            ]
            for (let i = 0; i < myChans.length; i++) {
                client2.say(myChans[i], "With a total of " + myChoices.length.toString() + " entries, the giveaway winner is... " + un + "!");
            } 
            client2.disconnect();
        });
    
        await eventIQ.destroy();
        myMes.delete();
    },
};