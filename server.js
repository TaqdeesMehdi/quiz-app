const express = require("express");
const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
const app = express();
const PANTRY_ID = process.env.PANTRY_ID;
const PANTRY_API_URL = `https://getpantry.cloud/apiv1/pantry/${PANTRY_ID}/pantry`;
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/:basketName", async (req, res) => {
  const { basketName } = req.params;
  try {
    const response = await axios.get(`${PANTRY_API_URL}/${basketName}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/:basketName", async (req, res) => {
  const { basketName } = req.params;
  const newdata = req.body;
  try {
    const response = await axios.post(
      `${PANTRY_API_URL}/${basketName}`,
      newdata
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/:basketName", async (req, res) => {
  const { basketName } = req.params;
  const newdata = req.body;
  try {
    const response = await axios.put(
      `${PANTRY_API_URL}/${basketName}`,
      newdata
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/:basketName", async (req, res) => {
  const { basketName } = req.params;

  try {
    const response = await axios.post(`${PANTRY_API_URL}/${basketName}`);
    res.json({ message: `basket ${basketName} deleted` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
