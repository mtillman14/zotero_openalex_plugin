// Entry point for the plugin
Zotero.OpenAlexPlugin = {
    async processSelectedItems() {
        const items = ZoteroPane.getSelectedItems();

        if (!items.length) {
            Zotero.alert("OpenAlex Plugin", "No items selected.");
            return;
        }

        for (const item of items) {
            // Extract metadata
            const doi = ZoteroDOI.extractDOI(item);
            const metadata = ZoteroMetadata.extractMetadata(item);    
            let workID = null;        
            if (doi) {
                // Query OpenAlex API
                workID = await OpenAlexQuery.fetchWorkIDFromDOI(doi);                
            } else {
                workID = await OpenAlexQuery.fetchWorkID(metadata)             
            }
            if (workID) {
                // Update Zotero item
                ZoteroUpdater.updateItem(item, workID);
            } else {
                Zotero.debug(`No OpenAlex ID found for item: ${item.title}`);
            }
        }
    }
};