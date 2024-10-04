const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS for remote testing
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve the static HTML page (index.html)
app.use(express.static('public'));

// Main route for serving the static file
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// API route for timestamps
app.get("/api/:date?", (req, res) => {
  let dateString = req.params.date;

  // If no date is provided, return the current timestamp
  if (!dateString) {
    const currentDate = new Date();
    return res.json({
      unix: currentDate.getTime(),
      utc: currentDate.toUTCString()
    });
  }

  // Check if the date string is a valid Unix timestamp (number)
  if (!isNaN(dateString)) {
    const unixTimestamp = parseInt(dateString);
    const date = new Date(unixTimestamp);
    return res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }

  // Try to parse a standard date string
  const date = new Date(dateString);
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Start the server on port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
