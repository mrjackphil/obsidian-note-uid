import { App, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

interface MyPluginSettings {
	idField: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	idField: 'id'
}

export default class ObsidianPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		console.log('loading Obsidian note UID plugin');

		await this.loadSettings();

		this.addSettingTab(new SettingTab(this.app, this));
		this.registerObsidianProtocolHandler("open-by-uid", async (e) => {
		    const openUID = decodeURIComponent(e.uid || '');

			if (e.uid) {
			    const files = this.app.vault.getFiles();

				for (const file of files) {
					const idKey = this.settings.idField;
					const frontmatterId = String(this.app.metadataCache.getFileCache(file)?.frontmatter?.[idKey] || '');

					if (frontmatterId && openUID === frontmatterId) {
					    this.app.workspace.activeLeaf.openFile(file).then(e => console.log(e));
					}
				}

			}
		})
	}

	onunload() {
		console.log('unloading plugin');
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		let {contentEl} = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		let {contentEl} = this;
		contentEl.empty();
	}
}

class SettingTab extends PluginSettingTab {
	plugin: ObsidianPlugin;

	constructor(app: App, plugin: ObsidianPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		let {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Settings for UID link plugin'});

		new Setting(containerEl)
			.setName('Frontmatter id field')
			.setDesc('Field which used to generate and identify UID')
			.addText(text => text
				.setPlaceholder('UID field')
				.setValue(this.plugin.settings.idField)
				.onChange(async (value) => {
					this.plugin.settings.idField = value;
					await this.plugin.saveSettings();
				}));
	}
}
