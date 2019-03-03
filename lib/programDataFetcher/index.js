const {google} = require('googleapis');
const authorizeWithCredentials = require('./auth.js');

module.exports = function programDataFetcher(options) {
  return (files, metalsmith, done) => {
    const { GOOGLE_SHEETS_CREDENTIALS, GOOGLE_SHEETS_TOKEN, PROGRAM_DATA_GOOGLE_SHEETS_ID } = options.process.env;

    const writeProgramData = data => {
      files['program-data.json'] = { contents: JSON.stringify(data) };
      setImmediate(done);
    };

    authorizeWithCredentials(
      GOOGLE_SHEETS_CREDENTIALS,
      GOOGLE_SHEETS_TOKEN,
      auth => fetchProgramData(auth, PROGRAM_DATA_GOOGLE_SHEETS_ID, writeProgramData)
    )
  }
};

// fetches program data from the google sheet
const fetchProgramData = (auth, spreadsheetId, callback) => {
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    spreadsheetId,
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
