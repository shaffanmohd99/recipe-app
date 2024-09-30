import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Create __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: `${__dirname}/../.env` });

const PORT = 8000;

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const BASE_URL = process.env.BASE_URL;

const API_KEY = process.env.API_KEY;

const request = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  },
});

app.get("/", (req, res) => res.send("your backend is working"));

app.get("/recipe", async (req, res) => {
  const limit = req.query.limit;
  try {
    const response = await request.get(`/recipes/random?number=${limit}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
  }
});
app.get("/search-recipe", async (req, res) => {
  const search = req.query.search;
  try {
    const response = await request.get(
      `/recipes/complexSearch?query=${search}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
  }
});
app.get("/recipe/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await request.get(`/recipes/${id}/information`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
  }
});

app.listen(8000, () => console.log(`server is running on port ${PORT}`));
