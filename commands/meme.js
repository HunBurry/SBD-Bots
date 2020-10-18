module.exports = {
	name: 'meme',
	description: 'Used by admins to say anything they want in a channel, given a channel id.',
	execute(args, message, client, databases) {
        exampleMemes = [
            'https://images3.memedroid.com/images/UPLOADED288/5db0ecd093135.jpeg',
            'https://i.imgflip.com/3wwgb6.jpg',
            'https://i.kym-cdn.com/photos/images/original/001/703/196/3b1.jpg',
            'https://images3.memedroid.com/images/UPLOADED974/5de64ffd4986e.jpeg',
            'https://memestatic.fjcdn.com/pictures/Destiny+memes+i+found_321194_7035770.jpg',
            'https://i.imgflip.com/3rpbbc.jpg',
            'https://i.imgur.com/qt9PQrO.jpg',
            'https://preview.redd.it/s7wiugflhba51.jpg?width=640&crop=smart&auto=webp&s=a860d36d08d2fef8fe15ef7b9ffa8a7bf13b6316',
            'https://preview.redd.it/lnfisza1m9a51.jpg?width=640&crop=smart&auto=webp&s=7109b2bd89baaebd8bd8fbb21e65badbcc74b4c5',
            'https://preview.redd.it/q0cx74xlj9a51.jpg?width=640&crop=smart&auto=webp&s=d7a11a0f5af0c4a313102c0281e0e423e73a899c',
            'https://i.redd.it/4uzd566ck8a51.png',
            'https://i.redd.it/oulwhdwcc9a51.png',
            'https://preview.redd.it/0l3eh08nc8a51.jpg?width=640&crop=smart&auto=webp&s=9fdf03a009037b982807e3ba631d9e55ce00d700',
            'https://preview.redd.it/2s713rp1caa51.jpg?width=640&crop=smart&auto=webp&s=c7ffc3a696b7246d2eb3743dce3a3aa2f300a69e',
            'https://preview.redd.it/eypllg02qaa51.jpg?width=640&crop=smart&auto=webp&s=4f1bc5944de1d7bd2cccf7564716e219c2bed86d',
            'https://pm1.narvii.com/6723/3b3f6589b0ed3e6fcd13660bdc99b9aa18ab799cv2_hq.jpg',
            'https://preview.redd.it/de6hi1gk49a51.jpg?width=640&crop=smart&auto=webp&s=3ed84cc256ca6aa70f90b1b880d063b598c3f609',
            'https://i.pinimg.com/736x/1c/ae/9b/1cae9b3060e8725707a9570aaa39764d--destiny-game-memes-destiny-memes-funny.jpg',
            'https://i.redd.it/q3znxvg1kb021.jpg'
        ]
        myUrl = exampleMemes[Math.floor(Math.random() * exampleMemes.length)]
        const embed = {
            "description": "Your meme, guardian.",
            "image": {
                "url": myUrl
            }
        };
        message.channel.send({
            embed
        });
        message.delete();
	},
};