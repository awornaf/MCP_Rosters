import express from "express"
import CrisesCtrl from "./crises.controller.js"

const router = express.Router();

router.route("/").get(CrisesCtrl.apiGetCrises);

export default router