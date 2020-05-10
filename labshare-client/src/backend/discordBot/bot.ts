import Discord, { TextChannel } from "discord.js"
import { UserRoles } from '../../lib/userRoles';
import { CONF, OPT } from '../options';

const client = new Discord.Client();
let monChannel: TextChannel | null = null;
let disabled = true;

let users = {
    "Kavakuo": "<@312968104550596608>"
}

if (!OPT.DISABLE_DISCORD_BOT) {
    disabled = false;
    client.login(CONF.DISCORD_BOT_TOKEN);
}

client.on('ready', async () => {
    console.log(`Logged in as ${client.user?.tag}!`);

    try {
        monChannel = <TextChannel>client.channels.cache.get('709130098099355708')
    }
    catch(e) {
        console.error(e)
    }
});

function sendMsg(msg: string) {
    if (!disabled && monChannel) {
        monChannel.send(msg)
    }
}


export class BotMsg {
    static error(msg: string) {
        sendMsg(`${users.Kavakuo} ${msg}!`)
    }

    static newUser(role: string) {
        if (role === UserRoles.VOLUNTEER) {
            sendMsg(`New volunteer just registered!`)
        }
        else if (role === UserRoles.LAB_DIAG) {
            sendMsg(`@everyone New diagnostic center just registered, let's verify it!`)
        }
        else {
            sendMsg(`@everyone New research lab just registered, let's verify it!`)
        }
    }
}
