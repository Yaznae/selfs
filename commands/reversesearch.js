const sagiri = require('sagiri');

module.exports = {
    name: 'reversesearch',
    aliases: ['ri', 'sauce', 'reverseimage', 'reverseimagesearch'],
    async execute(msg, args) {
        await msg.delete();
        if (!args.length) return;

        const sn = sagiri(process.env['SAUCENAO_API'], { results: 5 });
        let url;
        if (msg.attachments.size) {
            url = msg.attachments.first().proxyURL;
        } else {
            url = args[0];
        }

        try {
            const results = await sn(url);
            let response = `**results for *${url}* :**`;

            results.forEach(result => {
                response += `\n-   [${result.title}](${result.urls[0]}) (${result.similarity}% similar)`;
            });

            return msg.channel.send(response);
        } catch (err) {
            console.log(err)
            return msg.channel.send(`invalid **url** .`).then(message => {
                setTimeout(() => message.delete(), 5_000);
            }).catch(err => console.error(err));
        }
    }
}