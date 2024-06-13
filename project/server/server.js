const express = require('express');
const axios = require('axios');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Копаться в чужом коде не хороший тон :3
app.use(express.json());


const keywords = JSON.parse(fs.readFileSync('./data/keywords.json', 'utf-8'));


app.post('/get-urls', (req, res) => {
  const { keyword } = req.body;
  const urls = keywords[keyword];
  if (urls) {
    res.json({ urls });
  } else {
    res.status(404).json({ error: 'Keyword not found' });
  }
});


app.post('/download-content', async (req, res) => {
  const { url } = req.body;
  try {
    const response = await axios.get(url);
    res.json({ content: response.data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to download content' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
