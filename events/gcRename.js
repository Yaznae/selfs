const colors = require('colors');

module.exports = {
    name: 'channelUpdate',
    async execute(oc, nc) {
        if (nc.type !== 'DM') return;
        if (oc.partial) await oc.fetch();
        let ids = nc.client.lockedGCs.get('IDs');
        if (!ids) return;
        if (ids.includes(nc.id)) {
            await oc.setName(oc.name)
        } else return;
    }
}