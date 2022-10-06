const {
  ContextMenuCommandBuilder,
  ApplicationCommandType,
  PermissionsBitField,
} = require("discord.js");

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("Ban")
    .setType(ApplicationCommandType.User),
  async execute(interaction) {
    const isValid = interaction.memberPermissions.has([
      PermissionsBitField.Flags.BanMembers,
    ]);
    if (!isValid) {
      await interaction.reply({
        content: `You don't have BanMembers permission to execute this command.`,
        ephemeral: true,
      });
      return;
    }

    const { guild, client } = interaction;
    const target = interaction.targetUser;
    const { bans } = client;

    guild.members.ban(target.id);
    bans.get(guild.id).set(target.tag, target.id);

    const logs_channel = client.channels.cache.get("1009681549811261551");

    logs_channel.send(
      `<@${target.id}> was successfuly banned from the server.`
    );

    await interaction.reply({
      content: `<@${target.id}> was successfuly banned from the server.`,
      ephemeral: true,
    });
  },
};
