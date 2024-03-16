module.exports = {
    name: 'emoji',
    aliases: ['e'],
    async execute(msg, args) {
        const hasEmoteRegex = /<a?:.+:\d+>/gm
        const emoteRegex = /<:.+:(\d+)>/gm
        const animatedEmoteRegex = /<a:.+:(\d+)>/gm

        if(!msg.content.match(hasEmoteRegex)) return;

        if (emoji = emoteRegex.exec(msg)) {
            const url = "https://cdn.discordapp.com/emojis/" + emoji[1] + ".png?size=2048&quality=lossless"
            msg.channel.send(url)
        }
        else if (emoji = animatedEmoteRegex.exec(msg)) {
            const url = "https://cdn.discordapp.com/emojis/" + emoji[1] + ".gif?size=128&quality=lossless"
            msg.channel.send(url)
        }
        else {
            return;
        }
    }
}