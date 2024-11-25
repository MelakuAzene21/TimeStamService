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
app.get("/api/:date_string?", (req, res) => {
  let date;
  const dateString = req.params.date_string;

  if (!dateString) {
    date = new Date();
  } else {
    // Check if the dateString is a Unix timestamp or an ISO date string
    if (!isNaN(dateString)) {
      date = new Date(parseInt(dateString));
    } else {
      date = new Date(dateString);
    }
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
