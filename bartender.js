//const { prefix, token } = require('./config.json');
const Discord = require('discord.js')
const client = new Discord.Client()
const axios = require('axios');
const Canvas = require('canvas');
const Sequelize = require('sequelize');
const { GoogleSpreadsheet } = require('google-spreadsheet');
///const creds = require('./creds.json');
const doc = new GoogleSpreadsheet('1Hex1F3awJ1A99-kcqy62twZ-WFd__q9uUUjDlVi57Ro');
const fs = require('fs');
var http = require('http');
const tmi = require('tmi.js');
const { setUncaughtExceptionCaptureCallback } = require('process');

const tessConfig = {
    lang: "eng",
    oem: 1,
    psm: 3,
  }

///Sequelization Database Info

const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite',
});

const Names = sequelize.define('names', {
    discordName: {
        type: Sequelize.STRING,
        unique: true,
    },
    websiteName: Sequelize.STRING,
});

const Raids = sequelize.define('raids', {
    discordName: {
        type: Sequelize.STRING,
        unique: true,
    },
    levi: Sequelize.INTEGER,
    eow: Sequelize.INTEGER, 
    sos: Sequelize.INTEGER,
    sotp: Sequelize.INTEGER,
    garden: Sequelize.INTEGER,
    lw: Sequelize.INTEGER,
    cos: Sequelize.INTEGER,
    leviI: Sequelize.INTEGER,
    eowI: Sequelize.INTEGER, 
    sosI: Sequelize.INTEGER,
    sotpI: Sequelize.INTEGER,
    gardenI: Sequelize.INTEGER,
    lwI: Sequelize.INTEGER,
    cosI: Sequelize.INTEGER,
    leviTime: Sequelize.STRING,
    eowTime: Sequelize.STRING, 
    sosTime: Sequelize.STRING,
    sotpTime: Sequelize.STRING,
    gardenTime: Sequelize.STRING,
    lwTime: Sequelize.STRING,
    cosTime: Sequelize.STRING,
});

const Dungeons = sequelize.define('dungeons', {
    discordName: {
        type: Sequelize.STRING,
        unique: true,
    },
    throne: Sequelize.INTEGER,
    zero: Sequelize.INTEGER, 
    pit: Sequelize.INTEGER,
    proph: Sequelize.INTEGER,
    whisper: Sequelize.INTEGER,
    throneI: Sequelize.INTEGER,
    zeroI: Sequelize.INTEGER, 
    pitI: Sequelize.INTEGER,
    prophI: Sequelize.INTEGER,
    whisperI: Sequelize.INTEGER,
    throneTime: Sequelize.STRING,
    zeroTime: Sequelize.STRING, 
    pitTime: Sequelize.STRING,
    prophTime: Sequelize.STRING,
    whisperTime: Sequelize.STRING,
});

const GMNF = sequelize.define('GMNF', {
    discordName: Sequelize.STRING,
    nfName: Sequelize.STRING,
    clears: Sequelize.INTEGER,
    bestTime: Sequelize.STRING
});

const Beers = sequelize.define("beers", {
    player: Sequelize.STRING,
    numberOfBeers: Sequelize.INTEGER
})

const Solstice = sequelize.define('solstice', {
    player: Sequelize.STRING,
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
})

const Profiles = sequelize.define('profilea', {
    player: Sequelize.STRING,
    steamCode: Sequelize.STRING,
    xboxGT: Sequelize.STRING, 
    psID: Sequelize.STRING,
    clanDate: Sequelize.STRING,
    location: Sequelize.STRING,
    birth_date: Sequelize.STRING, 
    stadiaGT: Sequelize.STRING,
    twitchURL: Sequelize.STRING,
    bio: Sequelize.STRING,
    timezone: Sequelize.STRING
})

const Attributes = sequelize.define('attributes', {
    player: Sequelize.STRING,
    title: Sequelize.STRING,
    description: Sequelize.STRING,
})

const Challenges = sequelize.define('newChallenges', {
    player1: Sequelize.STRING,
    player2: Sequelize.STRING,
    description: Sequelize.STRING,
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
});

const Wins = sequelize.define('wins', {
    player: Sequelize.STRING,
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

const SteamReg = sequelize.define('se-reg', {
    discordName: {
        type: Sequelize.STRING,
        unique: true,
    },
    gamerTag: Sequelize.STRING,
})

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
    Names.sync();
    Challenges.sync();
    Wins.sync();
    Beers.sync();
    Solstice.sync();
    Events.sync();
    Bids.sync();
    Raids.sync();
    Dungeons.sync();
    GMNF.sync();
    SteamReg.sync();
    Profiles.sync();
    Attributes.sync();
	client.user.setActivity('-help for... help', { type: 'PLAYING' })
  .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
  .catch(console.error);
});


client.on('message', message => {
    if (!message.content.startsWith("-") || message.author.bot) {
        return;
    }
    else {
        const args = message.content.slice(1).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        if (!client.commands.has(commandName)) {
            console.log('not a commands')
            return;
        }
        else {
            const command = client.commands.get(commandName);
            ///console.log(command)
            ///console.log(client.commands)
            try {
                myList = [Names, Challenges, Wins, Beers, Solstice, Events, Bids, Raids, Dungeons, GMNF, SteamReg, Profiles, Attributes]
                console.log(command)
                command.execute(args, message, client, myList);
            }
            catch (error) {
                console.error(error);
                message.reply('there was an error trying to execute that command!');
            }
        }
    }
});

client.login("INSERT_DATA_HERE");
