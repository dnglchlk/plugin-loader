const { Plugin } = require("powercord/entities");

module.exports = class PluginLoader extends Plugin {
  startPlugin() {
    powercord.api.settings.registerSettings("plugin-loader", {
      category: this.entityID,
      label: "Load Plugins",
    });
    powercord.api.commands.registerCommand({
      command: "loadplugins",
      description: "loads those smelly plugins",
      usage: "{c}",
      executor: this.loadMissingPlugins.bind()
    });
    powercord.api.commands.registerCommand({
      command: "loadthemes",
      description: "loads those smelly themes",
      usage: "{c}",
      executor: this.loadMissingThemes.bind()  
    });
  }

  loadMissingThemes() {
    powercord.pluginManager.get('pc-moduleManager')._fetchEntities('themes');
  }
  loadMissingPlugins() {
  powercord.pluginManager.get('pc-moduleManager')._fetchEntities('plugins');
  }

  pluginWillUnload() {
    powercord.api.settings.unregisterSettings("plugin-loader");
    powercord.api.commands.unregisterCommand("loadplugins");
  }
};
