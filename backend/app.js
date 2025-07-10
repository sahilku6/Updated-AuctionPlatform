import express from "express";
import dotenv from "dotenv";

// Load env variables from custom file
dotenv.config({ path: "./config/config.env" });

const app = express();

app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;
