const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

// Endpoint to get all data
app.get('/fish', (req, res) => {
  fs.readFile('data_info.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(JSON.parse(data));
  });
});

// Endpoint to get specific fish by name
app.get('/fish/:name', (req, res) => {
  const fishName = req.params.name;
  fs.readFile('data_info.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    const fishData = JSON.parse(data);
    const fish = fishData.find(fish => fish.name.toLowerCase() === fishName.toLowerCase());
    if (fish) {
      res.json(fish);
    } else {
      res.status(404).send('Fish not found');
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
