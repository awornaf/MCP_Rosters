let crises;

export default class CrisesDAO {
    static async injectDB(conn) {
        if (crises) {
            return;
        }
        try {
            crises = await conn.db(process.env.MCP_NS).collection("Crises");
        } catch (err) {
            console.error(
                `Unable to establish a collection handle in crisisDAO: ${err}`,
            )
        }
    }

    static async getCrises({
        filters = null,
        page = 0,
        crisesPerPage = 21,
    } = {}) {
        let query
        if (filters) {
            if ("name" in filters) {
                query = { $text: { $search: filters["name"]}}
            } else if ("banned" in filters) {
                query = { "banned": { $eq: filters["true"]}}
            } else if ("restricted" in filters) {
                query = { "restricted": { $eq: filters["true"]}}
            } else if ("threat" in filters) {
                query = { "threat": { $eq: filters["threat"]}}
            } else if ("deploy" in filters) {
                query = { "deploy": { $eq: filters["deploy"]}}
            } else if ("extract" in filters) {
                query = { "extract": { $eq: filters["true"]}}
            } else if ("secure" in filters) {
                query = { "extract": { $eq: filters["false"]}}
            }

        }

        let cursor

        try {
            cursor = await crises.find(query);
        } catch(err) {
            console.error(`Unable to issue find command, ${err}`)
            return { crisesList: [], totalNumCrises: 0 }
        }

        const displayCursor = cursor.limit(crisesPerPage).skip(crisesPerPage * page);

        try {
            const crisesList = await displayCursor.toArray();
            const totalNumCrises = await crises.countDocuments(query);
            
            return { crisesList, totalNumCrises }
        } catch (e) {
            console.error(
                `Unable to convert cursor to array or problem counting documents, ${e}`,
            )
            return { crisesList: [], totalNumCrises: 0};
        }
    }
}