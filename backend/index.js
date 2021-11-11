import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import CharactersDAO from "./dao/charactersDAO.js"
import CrisisDAO from "./dao/crisesDAO.js"
import TacticsDAO from "./dao/tacticsDAO.js"
dotenv.config();
const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 8000;

MongoClient.connect(
    process.env.MCP_DB_URI,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
    })
    .catch(err => {
        console.error(err.stack);
        process.exit(1)
    })
    .then(async client => {
        await CharactersDAO.injectDB(client);
        await CrisisDAO.injectDB(client);
        await TacticsDAO.injectDB(client);
        app.listen(port, () => {
            console.log(`listening on port ${port}`);
        })
    })