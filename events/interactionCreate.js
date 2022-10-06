const { InteractionType } = require("discord.js");


module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (interaction.isChatInputCommand()) {
      const { commands } = interaction.client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return;

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: `Something went wrong while executing this command...`,
          ephemeral: true,
        });
      }
    } else if (interaction.isButton()) {
      const { buttons } = interaction.client;
      const { customId } = interaction;
      const button = buttons.get(customId);
      if (!button) return;
      try {
        await button.execute(interaction);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: `Something went wrong while executing this button...`,
          ephemeral: true,
        });
      }
    } else if (interaction.isSelectMenu()) {
      const { menus } = interaction.client;
      const { customId } = interaction;
      const menu = menus.get(customId);
      if (!menu) return;
      try {
        await menu.execute(interaction);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: `Something went wrong while executing this menu...`,
          ephemeral: true,
        });
      }
    } else if (
      interaction.type === InteractionType.ApplicationCommandAutocomplete
    ) {
      const { autocompletes } = interaction.client;
      const { commandName } = interaction;
      const autocomplete = autocompletes.get(commandName);
      if (!autocomplete) return;
      try {
        const focusedValue = interaction.options.getFocused();
        let { choices } = autocomplete;
        if (choices === null){
          await autocomplete.execute(interaction);
          choices = autocomplete.choices;
        }
        const filtered = choices.filter((choice) =>
          choice.startsWith(focusedValue)
        );
        await interaction.respond(
          filtered.map((choice) => ({ name: choice, value: choice }))
        );
      } catch (error) {
        console.error(error);
      }
    } else if (interaction.type === InteractionType.ModalSubmit) {
      const { modals } = interaction.client;
      const { customId } = interaction;
      const modal = modals.get(customId);
      if (!modal) return;
      try {
        await modal.execute(interaction);
      } catch (error) {
        console.error(error);
      }
    } else if (interaction.isContextMenuCommand()) {
      const { commands } = interaction.client;
      const { commandName } = interaction;
      const context = commands.get(commandName);
      if (!context) return;
      try {
        await context.execute(interaction);
      } catch (error) {
        console.error(error);
      }
    }
  },
};
