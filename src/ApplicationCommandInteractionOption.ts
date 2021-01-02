import {Channel, Client, Collection, Role, User} from "discord.js";
import ApplicationCommandInteraction from "./ApplicationCommandInteraction";
import OptionType from "./OptionType";

class ApplicationCommandInteractionOption {
    client: Client;
    interaction: ApplicationCommandInteraction;
    name: string;
    value: string | number | boolean | User | Channel | Role | null;
    options: Collection<string, ApplicationCommandInteractionOption> | null;
    type: OptionType;

    constructor(client: Client, interaction: ApplicationCommandInteraction, data: any) {
        this.client = client;
        this.name = data.name;
        this.interaction = interaction;

        if (data.value) {
            if (typeof data.value === "string") {
                this.value = data.value;
                this.type = OptionType.STRING;
            } else if (typeof data.value === "number") {
                this.value = data.value;
                this.type = OptionType.INTEGER;
            } else if (typeof data.value === "boolean") {
                this.value = data.value;
                this.type = OptionType.BOOLEAN;
            } else if (data.value.username) {
                this.value = this.client.users.resolve(data.value.id);
                this.type = OptionType.USER;
            } else if (data.value.topic) {
                this.value = this.client.channels.resolve(data.value.id);
                this.type = OptionType.CHANNEL;
            } else if (data.value.permissions) {
                this.value = this.interaction.guild.roles.resolve(data.value.id);
                this.type = OptionType.ROLE;
            }
        }

        if (data.options) data.options.map(option => new ApplicationCommandInteractionOption(this.client, this.interaction, option)).forEach(option => this.options.set(option.nane, option));

    }
}

export default ApplicationCommandInteractionOption;