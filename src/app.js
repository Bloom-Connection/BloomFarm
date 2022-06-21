const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json()); // for parsing application/json

const farms = JSON.parse(
  fs.readFileSync(`${__dirname}/data/farms.json`, "utf-8")
);
app.get("/", (req, res) => {
  res.send("Hello from the Bloomfarm Server!");
});

// Route for the farms
app.get("/api/v1/farms", (req, res) => {
  res.status(200).json({
    status: "success",
    results: farms.length,
    data: {
      farms,
    },
  });
});

// Creating a new farm route
app.post("/api/v1/farms", (req, res) => {
  const newId = farms[farms.length - 1].id + 1;
  const newFarm = {
    id: newId,
    ...req.body,
  };
  farms.push(newFarm);
  fs.writeFile(`${__dirname}/data/farms.json`, JSON.stringify(farms), (err) => {
    res.status(201).json({
      status: "success",
      data: {
        farms: newFarm,
      },
    });
  });
});

const port = 8000;
app.listen(port, () => console.log(`App running on port ${port}...`));
