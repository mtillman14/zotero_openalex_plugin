const OpenAlexQuery = {
    BASE_URL: "https://api.openalex.org/works",

    /**
     * General method to query OpenAlex API
     * @param {URLSearchParams} searchParams - Search parameters for the API
     * @returns {Promise<string|null>} - The OpenAlex Work ID or null if not found
     */
    async fetchWorkIDFromAPI(searchParams) {
        try {
            const response = await fetch(`${this.BASE_URL}?${searchParams.toString()}`);
            if (response.ok) {
                const data = await response.json();
                return data?.results?.[0]?.id || null;
            } else {
                Zotero.debug(`OpenAlex API error: ${response.status}`);
            }
        } catch (error) {
            Zotero.debug(`Error querying OpenAlex API: ${error}`);
        }
        return null;
    },

    /**
     * Fetch OpenAlex Work ID using a DOI
     * @param {string} doi - DOI to search for
     * @returns {Promise<string|null>} - The OpenAlex Work ID or null if not found
     */
    async fetchWorkIDFromDOI(doi) {
        const searchParams = new URLSearchParams({
            search: doi,
            per_page: 1,
        });
        return this.fetchWorkIDFromAPI(searchParams);
    },

    /**
     * Fetch OpenAlex Work ID using metadata (e.g., title and year)
     * @param {Object} metadata - Metadata containing title and optionally year
     * @param {string} metadata.title - Title of the work
     * @param {number} [metadata.year] - Optional publication year
     * @returns {Promise<string|null>} - The OpenAlex Work ID or null if not found
     */
    async fetchWorkID(metadata) {
        const searchParams = new URLSearchParams({
            search: metadata.title,
            per_page: 1,
        });
        if (metadata.year) {
            searchParams.set("filter", `publication_year:${metadata.year}`);
        }
        return this.fetchWorkIDFromAPI(searchParams);
    },
};
