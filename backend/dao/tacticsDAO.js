let tactics;

export default class TacticsDAO {
    static async injectDB(conn) {
        if (tactics) {
            return;
        }
        try {
            tactics = await conn.db(process.env.MCP_NS).collection("Tactics");
        } catch (err) {
            console.error(
                `Unable to establish a collection handle in tacticsDAO: ${err}`,
            )
        }
    }

    static async getTactics({
        filters = null,
        page = 0,
        tacticsPerPage = 21,
    } = {}) {
        let query
        if (filters) {
            if ("name" in filters) {
                query = { $text: { $search: filters["name"]}}
            } else if ("banned" in filters) {
                query = { "banned": { $eq: filters["true"]}}
            } else if ("restricted" in filters) {
                query = { "restricted": { $eq: filters["true"]}}
            } else if ("affiliation" in filters) {
                query = { "affiliation": { $in: filters["affiliation"]}}
            } else if ("characters" in filters) {
                query = { "characters": { $in: filters["characters"]}}
            }
        }

        let cursor

        try {
            cursor = await tactics.find(query);
        } catch(err) {
            console.error(`Unable to issue find command, ${err}`)
            return { tacticsList: [], totalNumTactics: 0 }
        }

        const displayCursor = cursor.limit(tacticsPerPage).skip(tacticsPerPage * page);

        try {
            const tacticsList = await displayCursor.toArray();
            const totalNumTactics = await tactics.countDocuments(query);
            
            return { tacticsList, totalNumTactics }
        } catch (e) {
            console.error(
                `Unable to convert cursor to array or problem counting documents, ${e}`,
            )
            return { tacticsList: [], totalNumTactics: 0};
        }
    }
}