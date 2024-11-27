const ZoteroMetadata = {
    extractMetadata(item) {
        try {
            return {
                title: item.getField("title"),
                authors: item.getCreators().map((creator) => creator.lastName).join(", "),
                year: item.getField("date")?.slice(0, 4), // Extract year from date
            };
        } catch (error) {
            Zotero.debug(`Error extracting metadata: ${error}`);
            return null;
        }
    },
};

const ZoteroDOI = {
    extractDOI(item) {
        try {
            return {
                doi: item.getField("doi")
            };
        } catch (error) {
            Zotero.debug(`Error extracting DOI: ${error}`);
            return null;
        }
    },
};
