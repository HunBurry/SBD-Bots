const tmi = require('tmi.js');
const Discord = require('discord.js')
const client2 = new Discord.Client()
const Sequelize = require('sequelize');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('./creds.json');
const doc = new GoogleSpreadsheet('1Hex1F3awJ1A99-kcqy62twZ-WFd__q9uUUjDlVi57Ro');

const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite',
});

const twitch_names = sequelize.define('twitch', {
    twitchName: {
        type: Sequelize.STRING,
        unique: true,
    },
    discordName: Sequelize.STRING,
});

const Events = sequelize.define('events', {
    host: Sequelize.STRING,
    description: Sequelize.STRING,
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    duration: Sequelize.INTEGER
});

const Bids = sequelize.define('bids', {
    for: Sequelize.INTEGER,
    bidAmount: Sequelize.INTEGER,
    username: Sequelize.STRING
})

// Define configuration options
const opts = {
    identity: {
        username: "SBD_Bartender",
        password: "oauth:lcehyzu0e1brhdbrvwhycyebxfd6a2"
    },
    connection: {
        reconnect: true
    },
    channels: [
        "HunBurry",
        "jackedupjonesy",
        'liiguardlii',
        'clerkgames',
        'inline_1',
        'theocratical',
        'BestNinjaNW',
        'Acemo74',
        'kinggummylive',
        'futureishere',
        'unciad',
        'ghostscout_ben',
        'Verumiii',
        'cptncr3d1ble',
		'Sp1der05',
        'wokeology',
        'blackbuc911',
        'CrankyGuardian',
        'pooopsy',
		'lipidquadcab',
		'Ninjarabi1',
        'saintlxix',
        'casual_blue',
        'alaskalostcauze',
        'm9aviator1',
        'hunderapollyon',
        'the_11_atheists',
        'w0rmyy'
    ]
};
allTheUsers = {};
// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);
client.on("join", (channel, username, self) => {
    console.log(username + " has joined " + channel + ".");
    if (!Object.keys(allTheUsers).includes(username)) {
        allTheUsers[username] = {}////{loginTime: new Date(), chats: 0};
        allTheUsers[username][channel] = {loginTime: new Date(), chats: 0};
        console.log('User initilized and channel started.')
    }
    else{
        if (!Object.keys(allTheUsers[username]).includes(channel)) {
            allTheUsers[username][channel] = {loginTime: new Date(), chats: 0};
            console.log("Channel initilized.")
        }
    }
});
client.on("part", onPart);

async function onPart(channel, username, self) {
    console.log("--------------------------------------------------------")
    console.log(username + " has parted " + channel + ".");
    const userIsReg = await twitch_names.findOne({
        where: {
            twitchName: username
        }
    });
    if (userIsReg && Object.keys(allTheUsers).includes(username)) {
        if (Object.keys(allTheUsers[username]).includes(channel)) {
            disName = userIsReg['discordName']
            console.log(username + " is registered as " + disName + ".");
            let d2 = new Date();
            let d1 = allTheUsers[username][channel]['loginTime']
            var diff =(d2.getTime() - d1.getTime()) / 1000;
            diff /= 60;
            num = Math.abs(Math.round(diff));
            chats = allTheUsers[username][channel]['chats'];
    
            bottlecaps_earned = ((Math.round(num/10) * .25) + (.05 * allTheUsers[username][channel]['chats']))
            console.log("By watching for " + diff + " minutes, and chatting "  + allTheUsers[username][channel]['chats'] + " times, " + username + " earned " + bottlecaps_earned + " bottlecaps.");
            await doc.useServiceAccountAuth(creds);
            await doc.loadInfo();
            const sheet = doc.sheetsByIndex[1];
            const rows = await sheet.getRows({offset: 0, limit: 550});
            await sheet.loadCells('A1:S560');
            for (let i = 0; i < rows.length; i++) {
                name = await sheet.getCellByA1("A" + rows[i].rowNumber).value;
                if (name.toLowerCase() == disName.toLowerCase()) {
                    console.log('Located ' + username + ' on spreadsheet...')
                    const points = await sheet.getCellByA1("P" + rows[i].rowNumber)
                    const wagers = await sheet.getCellByA1("Q" + rows[i].rowNumber)
                    hold = await sheet.getCellByA1("S" + rows[i].rowNumber);
                    hold.value = parseFloat(hold.value) + bottlecaps_earned;
                    await sheet.saveUpdatedCells();
                    console.log("Updated " + username + "'s points successfully.")
                    console.log("--------------------------------------------------------")
                    console.log(allTheUsers[username][channel])
                    delete allTheUsers[username][channel];
                    console.log(allTheUsers[username][channel])
                    return;
                }
            }
            console.log("Unable to locate " + username + " on spreadsheet.")
            console.log("--------------------------------------------------------")
        }
        else {
            console.log(username + " wasn't in channel on initilization.")
            console.log("--------------------------------------------------------")
        }
    }
    else {
        console.log(username + " is not registered in system.");
        console.log("--------------------------------------------------------")
    }
}

// Connect to Twitch:
client.connect();

// Called every time a message comes in
async function onMessageHandler (target, context, msg, self) {
    if (self) { 
        return; // Ignore messages from the bot
    }

    commandName = msg.trim();
    commandName = commandName.split(" ")[0]
    username = context['username']

  // If the command is known, let's execute it
    if (commandName === '-create') {
        await create(target, context, msg, self);
    } 
    else if (commandName === '-register') {
        await register(target, context, msg, self);
    }
    else if (commandName === '-bottlecaps') {
        await ePoints(target, context, msg, self);
    }
    else if (commandName === '-enter') {
        await createEntry(target, context, msg, self);
    }
    else if (commandName === '-join') {
        if (Object.keys(allTheUsers).includes(username)) {
            if (Object.keys(allTheUsers[username]).includes(target)) {
                allTheUsers[username][target]['chats'] = allTheUsers[username][target]['chats'] + 1;
            }
            else {
                allTheUsers[username][target] = {loginTime: new Date(), chats: 1}
            }
        }
        else {
            allTheUsers[username] = {}
            allTheUsers[username][target] = {loginTime: new Date(), chats: 1}
        }
        client.say(target, "View times and comments are now being tracked for " + username + ".");
    }
    else if (commandName === '-leave') {
        const userIsReg = await twitch_names.findOne({
            where: {
                twitchName: username
            }
        });
        if (userIsReg && Object.keys(allTheUsers).includes(username)) {
            channel = target
            console.log(target)
            if (Object.keys(allTheUsers[username]).includes(target)) {
                disName = userIsReg['discordName']
                console.log(username + " is registered as " + disName + ".");
                let d2 = new Date();
                let d1 = allTheUsers[username][channel]['loginTime']
                console.log(d1)
                console.log(d2);
                var diff =(d2.getTime() - d1.getTime()) / 1000;
                diff /= 60;
                num = Math.abs(Math.round(diff));
                chats = allTheUsers[username][channel]['chats'];
                
        
                bottlecaps_earned = ((Math.floor(num/10) * .25) + (.05 * allTheUsers[username][channel]['chats']))
                console.log("By watching for " + diff + " minutes, and chatting "  + allTheUsers[username][channel]['chats'] + " times, " + username + " earned " + bottlecaps_earned + " bottlecaps.");
                client.say(target, "By watching for " + diff + " minutes, and chatting "  + allTheUsers[username][channel]['chats'] + " times, " + username + " earned " + bottlecaps_earned + " bottlecaps.")
                await doc.useServiceAccountAuth(creds);
                await doc.loadInfo();
                const sheet = doc.sheetsByIndex[1];
                const rows = await sheet.getRows({offset: 0, limit: 550});
                await sheet.loadCells('A1:S560');
                for (let i = 0; i < rows.length; i++) {
                    name = await sheet.getCellByA1("A" + rows[i].rowNumber).value;
                    if (name.toLowerCase() == disName.toLowerCase()) {
                        console.log('Located ' + username + ' on spreadsheet...')
                        const points = await sheet.getCellByA1("P" + rows[i].rowNumber)
                        val = points.value;
                        const wagers = await sheet.getCellByA1("Q" + rows[i].rowNumber)
                        hold = await sheet.getCellByA1("S" + rows[i].rowNumber)
                        hold.value = parseFloat(hold.value) + bottlecaps_earned;
                        await sheet.saveUpdatedCells();
                        client.say(target, "Points have been updated for " + username + ". They had " + val + " and now have " + (parseFloat(val) + bottlecaps_earned).toFixed(2).toString());
                        console.log("Updated " + username + "'s points successfully.")
                        console.log("--------------------------------------------------------")
                        delete allTheUsers[username][channel];
                        return;
                    }
                }
                console.log("Unable to locate " + username + " on spreadsheet.")
                console.log("--------------------------------------------------------")
            }
            else {
                console.log(username + " wasn't in channel on initilization.")
                console.log("--------------------------------------------------------")
            }
        }
        else {
            console.log(username + " is not registered in system.");
            console.log("--------------------------------------------------------")
        }
    }
    else {
        if (Object.keys(allTheUsers).includes(username)) {
            if (Object.keys(allTheUsers[username]).includes(target)) {
                allTheUsers[username][target]['chats'] = allTheUsers[username][target]['chats'] + 1;
            }
            else {
                allTheUsers[username][target] = {loginTime: new Date(), chats: 1}
            }
        }
        else {
            allTheUsers[username] = {}
            allTheUsers[username][target] = {loginTime: new Date(), chats: 1}
        }
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function create(target, context, msg, self) {
    entireMessage = msg.split(" ");
    timePeriod = entireMessage[1];

    channelName = target.substring(1, target.length);
    username = context['username']

    if (username != channelName) {
        ///client2.guilds.cache.get('207976039882686465').members.cache.find(user => user.displayName.toLowerCase() === user['discordName'].toLowerCase())
        client.say(target, "Sorry " + username + ", you do not have permissions to run that command in this channel.")
        return; 
    }

    desc = '';
    for (let i = 2; i < entireMessage.length; i++) {
        desc = desc + entireMessage[i] + " "; ///compiles args (split during pre-processing) into a description that can be used
    }

    const myEvent = await Events.create({
        host: username,
        description: desc,
        duration: timePeriod
    });

    id = myEvent.id;

    chans = client.getChannels();
    for (let i = 0; i < chans.length; i++) {
        client.say(chans[i], username + " has started a new giveaway. Provided description: "  + desc)
        client.say(chans[i], "Use -enter " + id + " followed by the amount of bottlecaps you'd like to wager to join the giveaway. Giveaway ends in " + timePeriod + " minutes. See the Administration section under -help (in Discord) for more questions.")
    }


    client2.once('ready', () => {
        giveaways = client2.channels.cache.get('610621085297278986')
        const exampleEmbed = new Discord.MessageEmbed()
        .setTitle('New Giveaway/Event')
        .addFields(
            { name: 'Hosted By:', value: username, inline: true },
            { name: 'Giveaway Duration:', value: timePeriod + " Minutes", inline: true },
            { name: 'Entry ID:', value: id, inline: true },
            { name: 'Description:', value: desc + "\n\nUse `-enter " + id + "` followed by the amount of bottlecaps you'd like to wager to join the giveaway. Giveaway ends in " + timePeriod + " minutes. See the Administration section under -help for more questions."},
        );

        giveaways.send(exampleEmbed);

    });

    client2.login("NzIzMDMzMDYyOTE2NDg5Mjk3.XurvPg.iOoWnM-2Vpq9rut3L_ZjsjchfPY")

    setTimeout(determineWinner, 60000 * parseInt(timePeriod), id);
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function determineWinner(id) {
    console.log('we made it here')
    const myEV = await Bids.findAll({
        where: {
            for: parseInt(id)
        }
    });
    
    myChoices = []

    for (let i = 0; i < myEV.length; i++) {
        for (let x = 0; x < myEV[i].bidAmount; x++) {
            myChoices.push(myEV[i].username);
        }
    }

    myChoice = myChoices[Math.floor(Math.random() * myChoices.length)]

    const eventIQ = await Events.findOne({
        where: {
            id: parseInt(id)
        }
    });

    myUser = client2.users.cache.get(myChoice).username

    chans = client.getChannels();
    for (let i = 0; i < chans.length; i++) {
        client.say(chans[i], "With a total of " + myChoices.length.toString() + " entries, the winner of giveaway #" + id + " is... " + myUser + "!")
    }

    giveaways = client2.channels.cache.get('610621085297278986')

    const embed = {
        "title": eventIQ.host + "'s Giveaway (#" + eventIQ.id + ") Winner",
        'description': "With a total of " + myChoices.length.toString() + " entries, the giveaway winner is... <@" + myChoice + ">!"
    }

    giveaways.send({
        embed
    });

    await eventIQ.destroy();
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function register(target, context, msg, self) {
    holdN = '';
    totalMessage = msg.split(" ")
    if (totalMessage.length > 1) {
        for (let i = 1; i < totalMessage.length; i++) {
            holdN = holdN + totalMessage[i] + " "
        }
        holdN = holdN.trim();
    }
    try {
        const tag = await twitch_names.create({
            twitchName: context['username'],
            discordName: holdN
        });
        client.say(target, context['username'] + ", you have been registered as " + holdN + ".");
    }
    catch (e) {
        if (e.name == 'SequelizeUniqueConstraintError') {
            const upd = twitch_names.update({
                discordName: holdN
            }, {
                where: {
                    twitchName: context['username']
                }
            })
            client.say(target, context['username'] + ", you have been re-registered as " + holdN + ".");
        }
        else {
            console.log(e)
            return client.say(target, 'Something went wrong with registering. Contact HunBurry.');
        }
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function ePoints(target, context, msg, self) {
    disName = ''
    const user = await twitch_names.findOne({
        where: {
            twitchName: context['username']
        }
    });
    disName = user['discordName']
    ///sent = message.channel.send("Loading data... Please wait.")
    doc.useApiKey('AIzaSyCdMrWC9YMt66aXuUma_k682WUv7GnfYog');
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[1];
    const rows = await sheet.getRows({offset: 0, limit: 450});
    await sheet.loadCells('A1:S460');
    didLoad = false;
    for (let i = 0; i < rows.length; i++) {
        name = sheet.getCellByA1("A" + rows[i].rowNumber).value;
        if (name != null && (name.toLowerCase() == disName.toLowerCase())) {
            points = sheet.getCellByA1("P" + rows[i].rowNumber).value;
            wagered = sheet.getCellByA1("Q" + rows[i].rowNumber).value;
            client.say(target, disName + ", you have earned " + points + " bottlecaps this season, and wagered " +
            wagered + ". You have " + (parseFloat(points) - parseInt(wagered)).toString() + " bottlecaps remaining.")
            didLoad = true;
            break;
        }
    }
    if (!didLoad) {
        client.say(target, "Sorry " + disName + ", but I couldn't find your event points! Check the spreadsheet manually, and contact HunBurry if you see them on there but this command didn't work.")
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function createEntry(target, context, msg, self) {
    entireMessage = msg.split(" ");
    const eventIQ = await Events.findOne({
        where: {
            id: parseInt(entireMessage[1])
        }
    });
    if (parseInt(entireMessage[2]) <= 0) {
        client.say("Nice try, but I've been programmed not to accept that. -_-")
        return '';
    }
    if (eventIQ) {
        disName = ''
        const user = await twitch_names.findOne({
            where: {
                twitchName: context['username']
            }
        });
        disName = user['discordName']
        await doc.useServiceAccountAuth(creds);
        ///doc.useApiKey('AIzaSyCdMrWC9YMt66aXuUma_k682WUv7GnfYog');
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[1];
        const rows = await sheet.getRows({offset: 0, limit: 450});
        await sheet.loadCells('A1:S460');
        didLoad = false;
        for (let i = 0; i < rows.length; i++) {
            name = await sheet.getCellByA1("A" + rows[i].rowNumber).value;
            if (name.toLowerCase() == disName.toLowerCase()) {
                const points = await sheet.getCellByA1("P" + rows[i].rowNumber).value;
                const wagers = await sheet.getCellByA1("Q" + rows[i].rowNumber)
                if ((parseFloat(points) - parseInt(wagers.value)) >= parseInt(entireMessage[2])) {
                        myUser = client2.guilds.cache.get('207976039882686465').members.cache.find(user => user.displayName.toLowerCase() === user['discordName'].toLowerCase()).id;
                        wager = await Bids.create({
                            for: parseInt(entireMessage[1]),
                            bidAmount: parseInt(entireMessage[2]),
                            username: myUser,
                        });    
                        wagers.value = parseInt(wagers.value) + parseInt(entireMessage[2])
                        await sheet.saveUpdatedCells();
                        ///subtract wager
                        client.say(target, context['username'] + ", your wager and name have been added to giveaway #" + entireMessage[1] + ".")
                }
                else {
                    client.say(target, context['username'] + ", you don't have enough bottle caps to wager that amount. You only have " + (parseFloat(points) - parseInt(wagers.value)).toString() + ".")
                }
                didLoad = true;
                break;
            }
        }
        if (!didLoad) {
            client.say(target, "Sorry " + context['username'] + ", but I couldn't find your bottlecap score! Check the spreadsheet manually, and contact HunBurry if you see them on there but this command didn't work.")
        }
    }
    else {
        client.say(target, "The giveaway in question could not be found. Make sure you're using the right ID, or it is possible the giveaway has ended.")
    }
}



// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
    twitch_names.sync();
    Events.sync();
    Bids.sync();
    console.log(`* Connected to ${addr}:${port}`);
}