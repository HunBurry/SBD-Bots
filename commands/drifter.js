module.exports = {
	name: 'ding',
	description: 'Used by admins to say anything they want in a channel, given a channel id.',
	execute(args, message, client) {
        exampleMemes = [
            'https://i.redd.it/djmmpkhlmna21.png',
            'https://external-preview.redd.it/vpQq5-Gu7-EAs_ZliQVTsIT_H6Ir4DgeDsYSovIDqdA.jpg?auto=webp&s=f6900324f4021b6b12ae35e2f9d97d5d4780a195',
            'https://i.redd.it/ababvsmyxiv21.jpg',
            'https://i.redd.it/h3287zj4txz11.jpg',
            'https://cdn.discordapp.com/attachments/723261724223996014/732649721121996850/ArzfMPm_d.png',
            'https://i.imgflip.com/43y72h.jpg',
            'https://i.redd.it/3m0c10gtl6b21.jpg',
            'https://i.redd.it/gdq8qwvu96o21.png',
            'https://i.redd.it/l71375970zn11.png',
            'https://external-preview.redd.it/AsURSiON5bhL16Kc_mZ5JbFN8xdgC9D8L1L6LC11Xks.jpg?auto=webp&s=8a4976bd358c40f6991ba3e2aa65d95c06efdb00',
            'https://i.imgur.com/hH7sv5D.jpg',
            'https://i.imgflip.com/42q82j.jpg',
            'https://i.pinimg.com/736x/0d/ad/ee/0dadee65084cdbd181bac082de145ca8.jpg'
        ]
        myUrl = exampleMemes[Math.floor(Math.random() * exampleMemes.length)]
        const embed = {
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