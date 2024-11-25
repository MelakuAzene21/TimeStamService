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
  let dateParam = req.params.date;

  // If no date is provided, use the current date
  let date;
  if (!dateParam) {
    date = new Date();
  } else {
    // Check if dateParam is a Unix timestamp or a string
    if (!isNaN(dateParam)) {
      // If it's a number (timestamp in milliseconds), convert it to an integer
      dateParam = parseInt(dateParam);
    }
    // Attempt to parse the dateParam using the JavaScript Date constructor
    date = new Date(dateParam);
  }

  // Check for invalid date
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Return the Unix and UTC time formats
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Start the server and listen on the environment's port or 3000
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
