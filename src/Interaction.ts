import {Base, Channel, Client, Guild, GuildMember, Snowflake} from "discord.js";
import InteractionType from "./InteractionType";

export default class Interaction extends Base {
    id: Snowflake;
    type: InteractionType;
    _guild: Snowflake;
    _channel: Snowflake;
    _member: Snowflake;
    token: string;
    version: number;

    constructor(client: Client, data: any) {
        super(client);
        this.id = data.id;
        this.type = data.type;
        this._guild = data.guild_id;
        this._channel = data.channel_id;
        this._member = data.member.id;
        this.token = data.token;
        this.version = data.version;
    }

    get guild(): Guild {
        return this.client.guilds.resolve(this._guild);
    }

    get channel(): Channel {
        return this.client.channels.resolve(this._channel);
    }

    get member(): GuildMember {
        return this.guild.member(this._member);
    }
}