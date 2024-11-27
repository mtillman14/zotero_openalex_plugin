const ZoteroUpdater = {
    updateItem(item, workID) {
        try {
            const note = `OpenAlex ID: ${workID}`;
            item.setNote(note); // Alternatively, use a custom field if available
            item.saveTx(); // Save changes to the database
            Zotero.debug(`Updated item with OpenAlex ID: ${workID}`);
        } catch (error) {
            Zotero.debug(`Error updating Zotero item: ${error}`);
        }
    },
};
