let characters;

export default class CharactersDAO {
    static async injectDB(conn) {
        if (characters) {
            return;
        }
        try {
            characters = await conn.db(process.env.MCP_NS).collection("Characters");
        } catch (err) {
            console.error(
                `Unable to establish a collection handle in charactersDAO: ${err}`,
            )
        }
    }

    static async getCharacters({
        filters = null,
        //page = 0,
        //charactersPerPage = 21,
    } = {}) {
        let query
        if (filters) {
            if ("name" in filters) {
                query = { $text: { $search: filters["name"]}}
            } else if ("alias" in filters) {
                query = { $text: { $search: filters["alias"]}}
            } else if ("threat" in filters) {
                query = { "threat": { $eq: parseInt(filters["threat"])}}
            } else if ("affiliation" in filters) {
                query = { $text: { $search: filters["affiliation"]}}
            }
        }

        let cursor

        try {
            cursor = await characters.find(query);
        } catch(err) {
            console.error(`Unable to issue find command, ${err}`)
            return { charactersList: [], totalNumCharacters: 0 }
        }

        const displayCursor = cursor //.limit(charactersPerPage).skip(charactersPerPage * page);

        try {
            const charactersList = await displayCursor.toArray();
            const totalNumCharacters = await characters.countDocuments(query);
            
            return { charactersList, totalNumCharacters }
        } catch (e) {
            console.error(
                `Unable to convert cursor to array or problem counting documents, ${e}`,
            )
            return { charactersList: [], totalNumCharacters: 0};
        }
    }
}