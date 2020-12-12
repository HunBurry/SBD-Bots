const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite',
});

const views = sequelize.define('views', {
    twitchName: Sequelize.STRING,
    channel: Sequelize.STRING,
    startTime: Sequelize.DATE,
    chats: Sequelize.INTEGER
});

views.sync();

testing();

async function testing() {
    myViews = await views.findAll();

    for (let i = 0; i < myViews.length; i++) {
        await myViews[i].destroy();
    }

    console.log(myViews);
    console.log("Complete.")
}