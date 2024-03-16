const fetch = require('node-fetch');

module.exports = {
    name: 'urbandictionary',
    aliases: ['urban', 'ud'],
    async execute(message, args) {
        if (!args.length) return;
        const query = args.join(' ');
        const res = await fetch(`https://api.urbandictionary.com/v0/define?term=${query}`)
        const { list } = res.json();

        if (!list.length) {
            return msg.channel.send(`no **results** found .`).then(message => {
                setTimeout(() => message.delete(), 5_000);
            }).catch(err => console.error(err));
        } else {

            let defs = []
            let links = []
            let tups = []
            let tdowns = []
            let words = []
            let x = 0;
            for (let i in list) {
                defs.push('definition');
                links.push('permalink');
                tups.push('thumbs_up');
                tdowns.push('thumbs_down');
                words.push('word');
            };

            response_content = `:: **[${words[x]}](${links[x]})** ::\n${defs[x]}\n👍 : \`${tups[x]}\`   👎 : \`${tdowns[x]}\``

            if (list.length > 1) {
                response_content += "\n`type 'next' or 'back' to scroll through definitions`"
                let response = await msg.channel.send(response_content)

                const filter = (message, user) => (message.content.toLowerCase().includes('next') || message.content.toLowerCase().includes('back')) && user.id == '931514266815725599';
                const collector = msg.channel.createMessageCollector({ filter, time: 20_000 });
                collector.on('collect', async m => {
                    if (m.content.toLowerCase().includes('next')) {
                        if (x == list.length-1) return;
                        x += 1
                        response_content = `:: **[${words[x]}](${links[x]})** ::\n${defs[x]}\n👍 : \`${tups[x]}\`   👎 : \`${tdowns[x]}\`\n\`type 'next' or 'back' to scroll through definitions\``
                        await response.edit(response_content)
                    } else if (m.content.toLowerCase().includes('back')) {
                        if (x == 0) return;
                        x -= 1
                        response_content = `:: **[${words[x]}](${links[x]})** ::\n${defs[x]}\n👍 : \`${tups[x]}\`   👎 : \`${tdowns[x]}\`\n\`type 'next' or 'back' to scroll through definitions\``
                        await response.edit(response_content)
                    }
                });
                collector.on('end', c => {
                    return msg.channel.send("**urban dictionary command** timed out .");
                });
            }
        }
    }
}