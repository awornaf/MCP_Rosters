import CrisesDAO from "../dao/crisesDAO.js";

export default class CrisesController {
    static async apiGetCrises(req, res, next) {
        const crisesPerPage = req.query.crisesPerPage ? parseInt(req.query.crisesPerPage, 10) : 21;
        const page = req.query.page ? parseInt(req.query.page, 10) : 0;

        let filters = {};
        if (req.query.name) {
            filters.name = req.query.name;
        } else if (req.query.threat) {
            filters.threat = req.query.threat;
        } else if (req.query.deploy) {
            filters.deploy = req.query.deploy;
        } else if (req.query.extract) {
            filters.extract = req.query.extract;
        } else if (req.query.secure) {
            filters.secure = req.query.secure;
        } else if (req.query.banned) {
            filters.banned = req.query.banned;
        } else if (req.query.restricted) {
            filters.restricted = req.query.restricted;
        }
        const { crisesList, totalNumCrises } = await CrisesDAO.getCrises({
            filters,
            page,
            crisesPerPage,
        })

        let response = {
            crises: crisesList,
            page: page,
            filters: filters,
            entries_per_page: crisesPerPage,
            total_results: totalNumCrises,
        }
        res.json(response);
    }

}