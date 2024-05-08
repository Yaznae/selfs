module.exports = {
    name: 'messageReactionRemove',
    async execute(reaction, user) {
        let bot = reaction.client;
        if (reaction.partial) reaction = await reaction.fetch();
        if (user.bot) return;
        if (user == bot.user) return;

        let reactSnipes = bot.reactsnipes.get(reaction.message.channel.id) || [];
        const currDate = new Date().getTime();
        let message = reaction.message;
        reactSnipes.unshift({
            react: reaction.emoji,
            usr: user,
            time: currDate,
            message: message
        });
        reactSnipes.splice(5);
        bot.reactsnipes.set(reaction.message.channel.id, reactSnipes);
    }
}