const google = require('googlethis');

module.exports = {
    name: 'google',
    aliases: ['search', 'lookup'],
    async execute(msg, args) {
        await msg.delete();
        if (!args.length) return;

        const query = args.join(' ');
        const options = {
            page: 0,
            safe: true,
            parse_ads: false,
            additional_params: {
                hl: 'en'
            }
        }

        const res = await google.search(query, options);

        if (res.knowledge_panel.title !== null) {
            let response = `**[${res.knowledge_panel.title.toLowerCase()}](${res.knowledge_panel.url}) ([image](${res.knowledge_panel.images[0].url}))\n*${res.knowledge_panel.type.toLowerCase()}*\n\n${res.knowledge_panel.description.toLowerCase()}\n`
            res.knowledge_panel.metadata.forEach(data => {
                response += `\n${data.title.toLowerCase()}: ${data.value.toLowerCase()}`
            });
            let reply = await msg.channel.send(response);
            return reply.suppressEmbeds(true);
        } else if (res.translation.source_language !== null) {
            let response = `translation from **${res.translation.source_language}** to **${res.translation.target_language}** :\n\`${res.translation.source_text}\`   ::   \`${res.translation.target_text}\``;
            let reply = await msg.channel.send(response);
            return reply.suppressEmbeds(true);
        } else if (res.dictionary.word !== null) {
            let response = `**${res.dictionary.word}** : ${res.dictionary.phonetic}\n${res.dictionary.definitions[0]}\n*${res.dictionary.examples[0]}*`
            let reply = await msg.channel.send(response);
            return reply.suppressEmbeds(true);
        } else {
            return msg.channel.send(`no **results** found .`).then(message => {
                setTimeout(() => message.delete(), 5_000);
            }).catch(err => console.error(err));
        }
    }
}