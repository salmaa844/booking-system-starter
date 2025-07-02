import express from "express";
import "dotenv/config.js";

// TODO: After completing the DB connection, uncomment the next line to import it
import connectToDB from "./Database/connection.js";

import { init } from "./src/routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

init(express, app);

// TODO: Uncomment this block to connect to the database before starting the server
await connectToDB().then(() => {
  console.log("connected to DB");
});

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
