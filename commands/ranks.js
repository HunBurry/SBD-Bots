module.exports = {
	name: 'ranks',
	description: 'Used by admins to say anything they want in a channel, given a channel id.',
	execute(args, message, client, databases) {
        myString = '';
        roles = ['354023669389066252', '352249386631299074', '352249342192517120', '352249252833001473', '352249186927771651', '352249126513016835', '352191764167131136', '708689934806024272', '708690018348171314', '708692558779252776', '510261152345751552', '683149102275756171']
        for (let i = 0; i < roles.length; i++) {
            role = message.guild.roles.cache.find(role => role.id == roles[i])
            ///console.log(role)
            myString = myString + role.name + ": " + role.members.array().length + '\n'
            console.log(role.members)
            console.log(role.members.array().length)
        }
        const embed = {
            "title": "Rank Breakdown",
            "description": myString
        }
        message.channel.send({
            embed
        });
    },
};