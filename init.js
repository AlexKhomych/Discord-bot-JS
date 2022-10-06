const fs = require("node:fs");
const path = require("node:path");
const { Client, GatewayIntentBits, Collection } = require("discord.js");
require("dotenv").config();

const TOKEN = process.env.TOKEN;
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
client.buttons = new Collection();
client.menus = new Collection();
client.autocompletes = new Collection();
client.modals = new Collection();

//  While no db/cache
client.bans = new Collection();
client.tnttag = new Map();
//

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

const buttonsPath = path.join(__dirname, "buttons");
const buttonFiles = fs
  .readdirSync(buttonsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of buttonFiles) {
  const filePath = path.join(buttonsPath, file);
  const button = require(filePath);
  const { button_data } = button;
  const { data } = button_data;
  const { custom_id } = data;
  client.buttons.set(custom_id, button);
}

const menusPath = path.join(__dirname, "select_menus");
const menusFiles = fs
  .readdirSync(menusPath)
  .filter((file) => file.endsWith(".js"));

for (const file of menusFiles) {
  const filePath = path.join(menusPath, file);
  const menu = require(filePath);
  const { menu_data } = menu;
  const { data } = menu_data;
  const { custom_id } = data;
  client.menus.set(custom_id, menu);
}

const autocompletePath = path.join(__dirname, "autocomplete");
const autocompleteFiles = fs
  .readdirSync(autocompletePath)
  .filter((file) => file.endsWith(".js"));

for (const file of autocompleteFiles) {
  const filePath = path.join(autocompletePath, file);
  const autocomplete = require(filePath);
  client.autocompletes.set(autocomplete.name, autocomplete);
}

const modalsPath = path.join(__dirname, "modals");
const modalsFiles = fs
  .readdirSync(modalsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of modalsFiles) {
  const filePath = path.join(modalsPath, file);
  const modal = require(filePath);
  const { modal_data } = modal;
  const { data } = modal_data;
  const { custom_id } = data;
  client.modals.set(custom_id, modal);
}

const contextsPath = path.join(__dirname, "commands", "contexts");
const contextsFiles = fs
  .readdirSync(contextsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of contextsFiles) {
  const filePath = path.join(contextsPath, file);
  const context = require(filePath);
  const { data } = context;
  const { name } = data;
  client.commands.set(name, context);
}

client.login(TOKEN);
