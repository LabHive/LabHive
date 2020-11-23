import Discord, { TextChannel } from "discord.js"
import { UserRoles } from '../../lib/userRoles';
import { CONF, OPT } from './config';
import { IUserCommon } from '../lib/database/schemas/IUserCommon';

const client = new Discord.Client();
let monChannel: TextChannel | null = null;
let disabled = true;
let channelId = "709130098099355708"



if (!OPT.DISABLE_DISCORD_BOT) {
    disabled = false;
    client.login(CONF.DISCORD_BOT_TOKEN);
}

if (OPT.STAGING) {
    channelId = "709513390674018317"
}


client.on('ready', async () => {
    console.log(`Logged in as ${client.user?.tag}!`);

    try {
        monChannel = <TextChannel>client.channels.cache.get(channelId)
    }
    catch(e) {
        console.error(e)
    }
});

function sendMsg(msg: string) {
    if (!disabled && monChannel) {
        try {
            monChannel.send(msg)
        } catch(err) {
            console.log(err)
        }
    }
}


