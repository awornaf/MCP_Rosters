import express from "express"
import cors from "cors"
import characters from "./api/characters.route.js"
import crisis from "./api/crises.route.js"
import tactics from "./api/tactics.route.js"

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/characters", characters);
app.use("/api/v1/tactics", tactics);
app.use("/api/v1/crisis", crisis);

app.use("*", (req, res) => res.status(404).json({error: "request not found"}));

export default app;