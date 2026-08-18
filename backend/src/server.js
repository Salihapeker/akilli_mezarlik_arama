import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { searchRecords } from "./search.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const records = JSON.parse(fs.readFileSync(path.join(root, "data", "records.json"), "utf8"));

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, project: "Akıllı Mezarlık Arama" });
});

app.get("/api/search", (req, res) => {
  const q = String(req.query.q || "");
  const surname = String(req.query.surname || "");
  const limit = Math.min(Math.max(Number(req.query.limit || 10), 1), 50);
  const results = searchRecords(records, q, surname, limit);
  res.json({
    query: { name: q, surname },
    count: results.length,
    results
  });
});

app.use(express.static(path.join(root, "..", "frontend")));
app.get("*", (_req, res) => {
  res.sendFile(path.join(root, "..", "frontend", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Akıllı Mezarlık Arama: http://localhost:${PORT}`);
});
