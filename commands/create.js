module.exports = {
	name: 'create',
	description: 'Used by admins to say anything they want in a channel, given a channel id.',
	async execute(args, message, client, databases) {
        const Discord = require('discord.js')
        if (message.member.roles.cache.find(r => r.name === "Bartenders") || message.member.roles.cache.find(r => r.name === "Designated Drivers") || message.author.username === "HunBurry") {

            desc = '';
            for (let i = 1; i < args.length; i++) {
                desc = desc + args[i] + " "; ///compiles args (split during pre-processing) into a description that can be used
            }
    
            timePeriod = args[0];
    
            ///Create the event in Sequilize. 
            const myEvent = await databases[5].create({
                host: message.author.username,
                description: desc,
                duration: timePeriod
            });
    
            id = myEvent.id;
    
            giveaways = client.channels.cache.get('610621085297278986')
    
            const embed = {
                "title": "New Giveaway/Event #" + id + "(Hosted by " + message.author.username + ")",
                'description': 'Provided Description: ' + desc + "\nUse `-enter " + id + "` followed by the amount of bottlecaps you'd like to wager to join the giveaway. Giveaway ends in " + timePeriod + " minutes. See the Administration section under -help for more questions."
            }
    
            const exampleEmbed = new Discord.MessageEmbed()
                .setColor(message.member.displayHexColor)
                .setTitle('New Giveaway/Event')
                .addFields(
                    { name: 'Hosted By:', value: message.member.displayName, inline: true },
                    { name: 'Remaining Time:', value: args[0] + " Minutes", inline: true },
                    { name: 'Entry ID:', value: id, inline: true },
                    { name: 'Description:', value: desc + "\n\nUse `-enter " + id + "` followed by the amount of bottlecaps you'd like to wager to join the giveaway. Giveaway ends in " + timePeriod + " minutes. See the Administration section under -help for more questions."},
                );

                myMessage = await giveaways.send(exampleEmbed);

                timeLeft = parseInt(args[0])
            
                let myInterval = setInterval(function() {
                    console.log("HIiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
                    timeLeft--;
                    console.log(timeLeft)
                    if (timeLeft == 1) {
                        const newEmbed = new Discord.MessageEmbed()
                    .setColor(message.member.displayHexColor)
                    .setTitle('New Giveaway/Event')
                    .addFields(
                        { name: 'Hosted By:', value: message.member.displayName, inline: true },
                        { name: 'Remaining Time:', value: timeLeft + " Minute", inline: true },
                        { name: 'Entry ID:', value: id, inline: true },
                        { name: 'Description:', value: desc + "\n\nUse `-enter " + id + "` followed by the amount of bottlecaps you'd like to wager to join the giveaway. Giveaway ends in " + timeLeft + " minute. See the Administration section under -help for more questions."},
                    );
                    myMessage.edit(newEmbed)
                    }
                    else {
                    const newEmbed = new Discord.MessageEmbed()
                    .setColor(message.member.displayHexColor)
                    .setTitle('New Giveaway/Event')
                    .addFields(
                        { name: 'Hosted By:', value: message.member.displayName, inline: true },
                        { name: 'Remaining Time:', value: timeLeft + " Minutes", inline: true },
                        { name: 'Entry ID:', value: id, inline: true },
                        { name: 'Description:', value: desc + "\n\nUse `-enter " + id + "` followed by the amount of bottlecaps you'd like to wager to join the giveaway. Giveaway ends in " + timeLeft + " minutes. See the Administration section under -help for more questions."},
                    );
                    myMessage.edit(newEmbed)
                    }
                }, 60000);

            setTimeout(function() {
                const command = client.commands.get('determinewinner');
                const finalEmbed = new Discord.MessageEmbed()
                    .setColor(message.member.displayHexColor)
                    .setTitle('Giveaway/Event')
                    .addFields(
                        { name: 'Hosted By:', value: message.member.displayName, inline: true },
                        { name: 'Remaining Time:', value: "Time Up!", inline: true },
                        { name: 'Entry ID:', value: id, inline: true },
                        { name: 'Description:', value: desc + "\n\nGiveaway is now over."},
                    );
                myMessage.edit(finalEmbed)
                command.execute(id, client, databases);
                clearInterval(myInterval);
            }, 60000 * parseInt(timePeriod), id);
        }
        else {
            message.channel.send("You do not have sufficent permissions to run this command.")
        }
    },
};