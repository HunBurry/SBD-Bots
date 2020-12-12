module.exports = {
    name: 'manualwinner',
	description: 'Used by admins to say anything they want in a channel, given a channel id.',
	async execute(args, message, client, databases) {
        const Discord = require('discord.js')
        id = args[0]
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
    
        await eventIQ.destroy();
        myMes.delete();
    },
};