const fs = require('fs');
const {google} = require('googleapis');
const authorize = require('./auth.js');

module.exports = function programDataFetcher(options) {
  return (files, metalsmith, done) => {
    const writeProgramData = data => {
      files['program-data.json'] = { contents: JSON.stringify(data) };
      done();
    };

    // Load client secrets from a local file.
    fs.readFile('credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      // Authorize a client with credentials, then call the Google Sheets API.
      authorize(JSON.parse(content), auth => fetchProgramData(auth, options.process.env, writeProgramData));
    });
  }
};

// fetches program data from the google sheet
const fetchProgramData = (auth, env, callback) => {
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    spreadsheetId: env.PROGRAM_DATA_GOOGLE_SHEET_ID,
    range: 'Sheet1!A2:E'
  }, (err, response) => {
    if (err) {
      return console.log('The API returned an error: ' + err);
    }

    callback(parseJSON(response));
  });
};

const parseJSON = response => {
  const rows = response.data.values;
  if (!rows || rows.size === 0) return console.log('Data was empty.');

  return rows.map(row => ({
    startTime: row[0],
    endTime: row[1],
    title: row[2],
    description: row[3],
    image: row[4]
  }))
};
