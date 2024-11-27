OpenAlexPlugin = {
	id: null,
	version: null,
	rootURI: null,
	initialized: false,

	init({ id, version, rootURI }) {
		if (this.initialized) return;
		this.id = id;
		this.version = version;
		this.rootURI = rootURI;
		this.initialized = true;
	},

    addToWindow(window) {
        let doc = window.document;
    
        // Add menu option
        let menuitem = doc.createXULElement('menuitem');
        menuitem.id = 'openalex-fetch-id';
        menuitem.setAttribute('label', 'Fetch OpenAlex Work ID');
        menuitem.addEventListener('command', () => {
            this.fetchOpenAlexIDForSelectedItems(window);
        });
        doc.getElementById('menu-tools').appendChild(menuitem);
    },

    async fetchOpenAlexIDForSelectedItems(window) {
        const items = ZoteroPane.getSelectedItems();
        if (!items.length) {
            Zotero.alert("OpenAlex Plugin", "No items selected.");
            return;
        }
        for (let item of items) {
            const metadata = ZoteroMetadata.extractMetadata(item);
            if (metadata) {
                const workID = await OpenAlexQuery.fetchWorkID(metadata);
                if (workID) {
                    ZoteroUpdater.updateItem(item, workID);
                }
            }
        }
    }
    
};
