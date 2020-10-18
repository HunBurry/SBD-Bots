module.exports = {
	name: 'dd',
	description: 'Used by admins to say anything they want in a channel, given a channel id.',
	execute(args, message, client, databases) {
        if (args.length == 0) {
            message.channel.send("Argument needed. Please use either PvE or PvP.")
        }
        else if (args[0].toLowerCase() == 'pve') {
            myMessage = '@Gorzooth: Titan main, specialty: Anything and everything PVE.' + '\n' + 
            '@Atlas: Hunter main, specialty: Low-mans, challenges, and getting lost in the underbelly.' + '\n' + 
            '@SithLrdVad: Hunter main, specialty: Raid triumphs/sherpa/PvE addict/Low-mans' + '\n' + 
            '@Evi1 Abed: Warlock main, specialty: Raids, dungeons, mechanical PvE, and 1 to 5 sherpas.' + '\n' + 
            '@Farmicy: Warlock main, specialty: Raid sherpa, seal chaser, and got strats for everything PvE.' + '\n' + 
            '@JackedUp Jonesy Titan main, specialty: Everything PvE and PvP medium - long range engagements.' + '\n' +
            '@ghostscout BEN1: Warlock main, specialty: Raids, zero hour, hidden mission stuff, and all other PvE stuff.' + '\n' + 
            '@HunBurry: Warlock Main, Titan Secondary. Specialty: Low-mans, challenges, raids, and dungeons. I also enjoy weird challenges, like X weapon only.'
            const embed = {
                "title": "PvE Sherpas",
                "description": myMessage
            }
            message.channel.send({
                embed
            });
        }
        else if (args[0].toLowerCase() == 'pvp') {
            myMessage = '@AlaskaLostCauze: Titan main, specialty: Call-outs, missiles, and special weapon abuse.' + '\n' + 
            '@Beeftastic1: Titan main, specialty: Shoulder charging and being a distraction.' + '\n' + 
            '@CMEagles: Titan main, specialty: Arbalest.' + '\n' + 
            '@E x I G e N T: Titan main, specialty: Call-outs, sniping, map knowledge, and aggressive play.' + '\n' + 
            '@Saint LXIX: Titan main, specialty: PvP "bitch tactics."' + '\n' + 
            '@biznatt: Titan main, specialty, Call-outs, sniping, playing your life.  Getting zero kills with a super.' + '\n' + 
            '@Marcolepsy120: Hunter main, specialty: Self-improvement, practice, hunter movement, and game-flow.' + '\n' + 
            '@scoooterrr: Hunter main, maintaining map control, and a breachlight specialist.' + '\n' + 
            '@ayIac- Warlock Main, Specialty - Top Tree Dawnblade mobility.'+ '\n' + 
            '@Murdereus: Hunter main, specialty: Sniping, flanking, and movement.' + '\n' + 
            '@xWeekday Nachos: Hunter main, specialty: Sniping, call-outs, flanking, and death metal.' + '\n' + 
            '@Kitsune Tenko 9: Warlock main, specialty: Aggressive play and unusual loadouts.' + '\n' + 
            '@Riot Kittens: Warlock main, specialty: Varied forms of sniping, self-improvement, play-style adaptation, and call-outs.' + '\n' + 
            '@ShujinkoOfTime: Warlock main, specialty: Playing your life.' + '\n' + 
            '@JackedUp Jonesy Titan main, specialty: Everything PvE and PvP medium - long range engagements.' + '\n' + 
            '@InvaIue: All classes, specialty: All forms of aggressive play.' + '\n' + 
            '@xTheorize5191: Hunter main, specialty: cheesy and toxic ways to kill people. I.E Skips and MT. Also "FAIRLY" decent at sniping.'
            const embed = {
                "title": "PvP Sherpas",
                "description": myMessage
            }
            message.channel.send({
                embed
            });
        }
    },
};