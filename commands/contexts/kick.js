const {
  ContextMenuCommandBuilder,
  ApplicationCommandType,
  PermissionsBitField,
} = require("discord.js");

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("Kick")
    .setType(ApplicationCommandType.User),
  async execute(interaction) {
    const isValid = interaction.memberPermissions.has([
      PermissionsBitField.Flags.KickMembers,
    ]);
    if (!isValid) {
      interaction.reply({
        content: `You don't have KickMembers permission to execute this command.`,
        ephemeral: true,
      });
      return;
    }

    const { client, guild } = interaction;
    const target = interaction.targetUser;
    guild.members.kick(target);

    const logs_channel = client.channels.cache.get("1009681549811261551");
    logs_channel.send(
      `<@${target.id}> was successfuly kicked from the server.`
    );

    interaction.reply({
      content: `<@${target.id}> was successfuly kicked from the server.`,
      ephemeral: true,
    });
  },
};
