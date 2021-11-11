import TacticsDAO from "../dao/tacticsDAO.js";

export default class TacticsController {
    static async apiGetTactics(req, res, next) {
        const tacticsPerPage = req.query.tacticsPerPage ? parseInt(req.query.tacticsPerPage, 10) : 21;
        const page = req.query.page ? parseInt(req.query.page, 10) : 0;

        let filters = {};
        if (req.query.name) {
            filters.name = req.query.name;
        } else if (req.query.affiliation) {
            filters.affiliation = req.query.affiliation;
        } else if (req.query.characters) {
            filters.characters = req.query.characters;
        } else if (req.query.banned) {
            filters.banned = req.query.banned;
        } else if (req.query.restricted) {
            filters.restricted = req.query.restricted;
        }
        const { tacticsList, totalNumTactics } = await TacticsDAO.getTactics({
            filters,
            page,
            tacticsPerPage,
        })

        let response = {
            tactics: tacticsList,
            page: page,
            filters: filters,
            entries_per_page: tacticsPerPage,
            total_results: totalNumTactics,
        }
        res.json(response);
    }

}