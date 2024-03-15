const gis = require('async-g-i-s');

module.exports = {
    name: 'image',
    aliases: ['img'],
    async execute(msg, args) {
        await msg.delete();
        if (!args.length) return;
        let keywords = args.join(' ');

        results = await gis(keywords);

        if (!results.length) {
            return msg.channel.send(`no **results** found .`).then(message => {
                setTimeout(() => message.delete(), 5_000);
            }).catch(err => console.error(err));
        } else {
            return msg.channel.send(results[0].url);
        };

    }
}