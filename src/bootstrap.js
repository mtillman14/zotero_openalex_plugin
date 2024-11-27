var OpenAlex;

function log(msg) {
	Zotero.debug("Open Alex: " + msg);
}

function install() {
	log("Installed 1.0");
}

async function startup({ id, version, rootURI }) {
	log("Starting 1.0");
	
	Zotero.PreferencePanes.register({
		pluginID: 'openalex@gmail.com',
		src: rootURI + 'preferences.xhtml',
		scripts: [rootURI + 'preferences.js']
	});
	
	Services.scriptloader.loadSubScript(rootURI + 'main.js');
	OpenAlex.init({ id, version, rootURI });
	OpenAlex.addToAllWindows();
	await OpenAlex.main();
}

function onMainWindowLoad({ window }) {
	OpenAlex.addToWindow(window);
}

function onMainWindowUnload({ window }) {
	OpenAlex.removeFromWindow(window);
}

function shutdown() {
	log("Shutting down 1.0");
	OpenAlex.removeFromAllWindows();
	OpenAlex = undefined;
}

function uninstall() {
	log("Uninstalled 1.0");
}