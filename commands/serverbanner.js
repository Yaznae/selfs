const https = require('https');

module.exports = {
    name: 'serverbanner',
    aliases: ['sbanner', 'sb'],
    async execute(msg, args) {
        await msg.delete();
        if (!msg.guild) return;

        let user;

        if (!msg.mentions.members.size) {
            user = msg.author
        } else {
            user = msg.mentions.members.first();
        };

        let url = `https://discord.com/api/v9/users/${user.id}/profile?guild_id=${msg.guild.id}`;
        let headers = {
            'Authorization': process.env.TOKEN
        };

        https.get(url, { headers: headers }, (res) => {
            let body = "";

            res.on('data', (chunk) => {
                body += chunk
            });

            res.on('end', async () => {
                try {
                    let json = JSON.parse(body);
                    let banner = json.guild_member_profile.banner;
                    
                    if (!banner) {
                        return;
                    } else {
                        let format = banner.startsWith('a_') ? '.gif' : '.png';
                        return msg.channel.send(`https://cdn.discordapp.com/guilds/${msg.guild.id}/users/${user.id}/banners/${banner}${format}?size=2048`);
                    }

                } catch (error) {
                    console.log(error);
                };
            });
        }).on('error', (error) => {
            console.log(error);
        });
    }
}