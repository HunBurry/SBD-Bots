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

const views = sequelize.define('views', {
    twitchName: Sequelize.STRING,
    channel: Sequelize.STRING,
    startTime: Sequelize.DATE,
    chats: Sequelize.INTEGER
});

// Define configuration options
const opts = {
    identity: {
        username: "SBD_Bartender",
        password: "OAuth_Password_Here"
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
        'jbmatty25',
        'futureishere',
        'unciad',
        'ghostscout_ben',
        'Verumiii',
        'Mwmissile',
        'cptncr3d1ble',
		'Sp1der05',
        'wokeology',
        'blackbuc911',
        'marcolepsy120',
        'CrankyGuardian',
        'pooopsy',
        'lipidquadcab',
        'huttyj',
		'Ninjarabi1',
        'saintlxix',
        'KineticRandy',
        'Lazychronic',
        'Dirtyhyperion',
        'Evi1_Abed',
        'pennington56',
        'Map_bot',
        'mwmissile',
        'blitzred1',
        'casual_blue',
        'drmac1',
        'exi_gent',
        'kotogotoku',
        'alaskalostcauze',
        'm9aviator1',
        'riotkittens',
        'Sunnyontherocks',
        'thunderapollyon',
        'the_11_atheists',
        'w0rmyy'
    ]
};

const client = new tmi.client(opts);

client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);
client.on("join", onJoin);
client.on("part", onPart);

async function onJoin(channel, username, self) {
    target = channel;

    const view = await views.findOne({
        where: {
            twitchName: username,
            channel: target
        }
    })

    if (view) {
        return;
    }
    else {
        const newView = await views.create({
            twitchName: username,
            channel: target,
            startTime: new Date(),
            chats: 0
        });
        console.log(username + " has joined " + channel + ".");
        console.log("Channel initilized.")
    }
}

async function onPart(channel, username, self) {
    target = channel;
    const userIsReg = await twitch_names.findOne({
        where: {
            twitchName: username
        }
    });

    const view = await views.findOne({
        where: {
            twitchName: username,
            channel: target
        }
    })

    if (userIsReg) {
        if (view) {
            console.log("Successfully located " + username + "'s entry into " + target + ".")
            let current = new Date();
            let diff = (current.getTime() - view['startTime'].getTime()) / 1000
            diff /= 60;
            num = Math.abs(Math.round(diff));
            chats = view['chats'];
            bottlecaps_earned = (Math.floor(num/10) * .25) + (.05 * chats)
            console.log("By watching for " + diff + " minutes, and chatting "  + chats + " times, " + username + " earned " + bottlecaps_earned + " bottlecaps.");
            ///client.say(target, "By watching for " + diff + " minutes, and chatting "  + chats + " times, " + username + " earned " + bottlecaps_earned + " bottlecaps.")
            
            await doc.useServiceAccountAuth(creds);
            await doc.loadInfo();
            const sheet = doc.sheetsByIndex[1];
            const rows = await sheet.getRows({offset: 0, limit: 650});
            await sheet.loadCells('A1:S660');
            disName = userIsReg['discordName'];

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
                    ///client.say(target, "Points have been updated for " + username + ". They had " + val + " and now have " + (parseFloat(val) + bottlecaps_earned).toFixed(2).toString() + ".");
                    console.log("Updated " + username + "'s points successfully.")
                    console.log("--------------------------------------------------------")
                    await view.destroy();
                    return;
                }
            }
            ///client.say(target, "Unable to locate " + username + " on spreadsheet. Please ensure your registration is correct, or contact a Bartender.")
            console.log("Unable to locate " + username + " on spreadsheet in onPart.")
            console.log("--------------------------------------------------------")
        }
        else {
            ///client.say(target, "Could not locate log of user logging into this channel.")
            console.log("Could not locate log of " + username + " logging into this channel in onPart.")
        }
    }
    else {
        ///client.say(target, "Could not locate user's registration. Please ensure you've used the -register command.")
        console.log("Could not locate registration for " + username + " in onPart.")
    }
}

// Called every time a message comes in
async function onMessageHandler (target, context, msg, self) {
    if (self) { 
        return; // Ignore messages from the bot
    }

    commandName = msg.trim();
    commandName = commandName.split(" ")[0]
    username = context['username']

    if (commandName === '-register') {
        await register(target, context, msg, self);
    }
    else if (commandName === '-bottlecaps') {
        await ePoints(target, context, msg, self);
    }
    else if (commandName === '-join') {
        const view = await views.create({
            twitchName: username,
            channel: target,
            startTime: new Date(),
            chats: 0
        });
        client.say(target, "View times and comments are now being tracked for " + username + " in this channel.");
        console.log("View object created for " + username + " in " + target + ".")
    }
    else if (commandName === '-leave') {
        const userIsReg = await twitch_names.findOne({
            where: {
                twitchName: username
            }
        });

        const view = await views.findOne({
            where: {
                twitchName: username,
                channel: target
            }
        })

        if (userIsReg) {
            if (view) {
                console.log("Successfully located " + username + "'s entry into " + target + ".")
                let current = new Date();
                let diff = (current.getTime() - view['startTime'].getTime()) / 1000
                diff /= 60;
                num = Math.abs(Math.round(diff));
                chats = view['chats'];
                bottlecaps_earned = (Math.floor(num/10) * .25) + (.05 * chats)
                console.log("By watching for " + diff + " minutes, and chatting "  + chats + " times, " + username + " earned " + bottlecaps_earned + " bottlecaps.");
                client.say(target, "By watching for " + diff + " minutes, and chatting "  + chats + " times, " + username + " earned " + bottlecaps_earned + " bottlecaps.")
                
                await doc.useServiceAccountAuth(creds);
                await doc.loadInfo();
                const sheet = doc.sheetsByIndex[1];
                const rows = await sheet.getRows({offset: 0, limit: 650});
                await sheet.loadCells('A1:S660');
                disName = userIsReg['discordName'];

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
                        client.say(target, "Points have been updated for " + username + ". They had " + val + " and now have " + (parseFloat(val) + bottlecaps_earned).toFixed(2).toString() + ".");
                        console.log("Updated " + username + "'s points successfully.")
                        console.log("--------------------------------------------------------")
                        await view.destroy();
                        return;
                    }
                }
                client.say(target, "Unable to locate " + username + " on spreadsheet. Please ensure your registration is correct, or contact a Bartender.")
                console.log("Unable to locate " + username + " on spreadsheet.")
                console.log("--------------------------------------------------------")
            }
            else {
                client.say(target, "Could not locate log of user logging into this channel.")
                console.log("Could not locate log of " + username + " logging into this channel.")
            }
        }
        else {
            client.say(target, "Could not locate user's registration. Please ensure you've used the -register command.")
            console.log("Could not locate registration for " + username + ".")
        }
    }
    else {
        const view = await views.findOne({
            where: {
                twitchName: username,
                channel: target
            }
        })

        if (view) {
            view.chats = view.chats + 1;
            await view.save();
            console.log("Chat updated for " + username + ".")
        }
        else {
            const newView = await views.create({
                twitchName: username,
                channel: target,
                startTime: new Date(),
                chats: 1
            });
            console.log("View object created via chat for " + username + ".")
        }
    }
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
    doc.useApiKey('API_KEY_HERE');
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

function onConnectedHandler(addr, port) {
    twitch_names.sync();
    views.sync();
    console.log(`* Connected to ${addr}:${port}`);
}

// Connect to Twitch:
client.connect();