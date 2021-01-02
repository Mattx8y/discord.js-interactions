import Interaction from "./Interaction";
import {Client, Collection, Snowflake} from "discord.js";
import ApplicationCommandInteractionOption from "./ApplicationCommandInteractionOption";

class ApplicationCommandInteraction extends Interaction {
    _command: Snowflake;
    options: Collection<string, ApplicationCommandInteractionOption> = new Collection();

    constructor(client: Client, data: any) {
        super(client, data);
        this._command = data.data.id;
        data.data.options.map(option => new ApplicationCommandInteractionOption(this.client, this, option)).forEach(option => this.options.set(option.nane, option));
    }
}

export default ApplicationCommandInteraction;