import express from "express"
import TacticsCtrl from "./tactics.controller.js"

const router = express.Router();

router.route("/").get(TacticsCtrl.apiGetTactics);

export default router