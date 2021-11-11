import CharactersDAO from "../dao/charactersDAO.js";

export default class CharactersController {
    static async apiGetCharacters(req, res, next) {
        //const charactersPerPage = req.query.charactersPerPage ? parseInt(req.query.charactersPerPage, 10) : 21;
        //const page = req.query.page ? parseInt(req.query.page, 10) : 0;

        let filters = {};
        if (req.query.threat) {
            filters.threat = req.query.threat;
        } else if (req.query.affiliation) {
            filters.affiliation = req.query.affiliation;
        } else if (req.query.name) {
            filters.name = req.query.name;
        } else if (req.query.alias) {
            filters.alias = req.query.alias;
        }
        const { charactersList, totalNumCharacters } = await CharactersDAO.getCharacters({
            filters,
            //page,
           // charactersPerPage,
        })

        let response = {
            characters: charactersList,
           // page: page,
            filters: filters,
           // entries_per_page: charactersPerPage,
            total_results: totalNumCharacters,
        }
        res.json(response);
    }

}