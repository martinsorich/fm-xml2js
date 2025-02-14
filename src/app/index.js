import { config } from "dotenv";
config({ path: "./config/.env" });

import { authDataAPI, logoutDataAPI } from "./auth.js";
import { fetchXML } from "./save-xml-from-fmp.js";
import { processXML } from "./process-XML.js";

const server = process.env.FMSERVER;
const database = process.env.DATABASE;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;

console.log(
  `Server: ${server} Database: ${database} Username: ${username} Password: ${password}`
);

(async () => {
  try {
    // can't use const and let on token (variable declaration) because it is locally scoped to the try block, var allows us to use token in catch and finally because it makes the variable hoisted
    var token = await authDataAPI(server, database, username, password);

    await fetchXML(token);
    const XMLresult = await processXML();
    console.log("This is XMLResult: ", XMLresult);
  } catch (e) {
    if (token) {
      logoutDataAPI(server, database, token);
    }
    console.log("This is exception caught: ", e.message);
  } finally {
    logoutDataAPI(server, database, token);
  }
})();
