const colors = require('colors');
/*
module.exports = {
    name: 'channelRecipientRemove',
    async execute(c, u) {
        console.log('here')
        let ids = c.client.lockedGCs.get('IDs');
        if (!ids) return;
        if (ids.includes(c.id)) {
            try {
                await c.addMember(u);
            } catch (err) {
                console.error(`# no perms at ${c.name}`)
            }
        } else return;
    }
}
*/