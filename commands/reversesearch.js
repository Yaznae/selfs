const google = require('googlethis');

module.exports = {
    name: 'reversesearch',
    aliases: ['ri', 'reverseimage', 'reverseimagesearch'],
    async execute(msg, args) {
        await msg.delete();
        if (!args.length) return;

        let url;
        if (msg.attachments.size) {
            url = msg.attachments.first().proxyURL;
        } else {
            url = args[0];
        }

        try {
            const results = await google.search(url, { ris: true });
            let response = `**results for *${url}* :**`;

            results.forEach(result => {
                response += `\n-   [${result.title}](${result.url})`;
            });

            let res = await msg.channel.send(response);
            return res.supressEmbeds(true);
        } catch (err) {
            console.log(err)
            return msg.channel.send(`invalid **url** .`).then(message => {
                setTimeout(() => message.delete(), 5_000);
            }).catch(err => console.error(err));
        }
    }
}