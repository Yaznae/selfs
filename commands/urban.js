module.exports = {
    name: 'urbandictionary',
    aliases: ['urban', 'ud'],
    async execute(msg, args) {
        await msg.delete();
        if (!args.length) return;
        const query = args.join(' ');
        let list;
        await fetch(`https://api.urbandictionary.com/v0/define?term=${query}`).then((rs) => rs.text()).then(data => {
            list = JSON.parse(data)['list']
        });
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

            list.forEach(item => {
                defs.push(item.definition);
                links.push(item.permalink);
                tups.push(item.thumbs_up);
                tdowns.push(item.thumbs_down);
                words.push(item.word);
            });

            response_content = `:: **[${words[x]}](${links[x]})** ::\n${defs[x]}\n👍 : \`${tups[x]}\`   👎 : \`${tdowns[x]}\``

            if (list.length > 1) {
                response_content += "\n*type 'next' or 'back' to scroll through definitions*"
                let response = await msg.channel.send(response_content)
                await response.suppressEmbeds(true)

                const filter = (message) => message.author.id === '931514266815725599';
                const collector = msg.channel.createMessageCollector({ filter, time: 20_000 });
                collector.on('collect', async (m) => {
                    if (m.content.toLowerCase() == 'next') {
                        await m.delete()
                        if (x == list.length-1) return;
                        x += 1
                        response_content = `:: **[${words[x]}](${links[x]})** ::\n${defs[x]}\n👍 : \`${tups[x]}\`   👎 : \`${tdowns[x]}\`\n*type 'next' or 'back' to scroll through definitions*`
                        await response.edit(response_content)
                        await response.suppressEmbeds(true);
                    } else if (m.content.toLowerCase() == 'back') {
                        await m.delete()
                        if (x == 0) return;
                        x -= 1
                        response_content = `:: **[${words[x]}](${links[x]})** ::\n${defs[x]}\n👍 : \`${tups[x]}\`   👎 : \`${tdowns[x]}\`\n*type 'next' or 'back' to scroll through definitions*`
                        await response.edit(response_content);
                        await response.suppressEmbeds(true);
                    }
                });
                collector.on('end', c => {
                    return msg.channel.send(`**urban dictionary command** timed out .`).then(message => {
                        setTimeout(() => message.delete(), 5_000);
                    }).catch(err => console.error(err));
                });
            }
        }
    }
}