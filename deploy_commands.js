const fs = require("node:fs");
const path = require("node:path");
const { Routes } = require("discord.js");
const { REST } = require("@discordjs/rest");
require("dotenv").config();
const [TOKEN, CLIENT_ID, GUILD_ID] = [
  process.env.TOKEN,
  process.env.CLIENT_ID,
  process.env.GUILD_ID,
];

const commands = [];

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  commands.push(command.data.toJSON());
}

const contextsPath = path.join(__dirname, "commands", "contexts");
const contextsFiles = fs
  .readdirSync(contextsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of contextsFiles) {
  const filePath = path.join(contextsPath, file);
  const context = require(filePath);
  commands.push(context.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(TOKEN);

const isDelete = false;

if (isDelete) {
  rest
    .put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: [] })
    .then(() => console.log("Successfully deleted application commands."))
    .catch(console.error);
} else {
  rest
    .put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    })
    .then(() => console.log("Successfully registered application commands."))
    .catch(console.error);
}
