const fs = require('fs');
const { google } = require('googleapis');
const D = require('date-fns');
const DTZ = require('date-fns-timezone');
const { auth } = require('google-auth-library');
const sheetsApi = google.sheets('v4');

const SCOPES = ['https://www.googleapis.com/auth/cloud-platform', 'https://www.googleapis.com/auth/spreadsheets.readonly'];

async function authenticate() {
  const keysEnvVar = process.env.GOOGLE_AUTH;
  if (!keysEnvVar) {
    throw new Error('Auth env is missing.');
  }
  const keys = JSON.parse(keysEnvVar);
  const client = auth.fromJSON(keys);
  client.scopes = SCOPES;
  const url = `https://www.googleapis.com/dns/v1/projects/${keys.project_id}`;
  const res = await client.request({url});
  console.log(res.data);
}


function fetchData() {
  return authenticate()
    .then((auth) => {
      sheetsApi.spreadsheets.values.get({
        auth: auth,
        spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
        range: "Sheet1!A1:H88",
        key: process.env.GOOGLE_API_KEY
      }, function (err, response) {
        if (err) {
          console.log('The API returned an error: ' + err);
          return console.log(err);
        }
        const data = response.data.values; 
        const parsedData = parseJSON(data);
        fs.writeFileSync('./src/assets/program_data.json', JSON.stringify(parsedData));
        });
      })
    .catch((err) => {
      console.log('auth error', err);
    });
}

module.exports = function programDataFetcher(options) {
  return (files, metalsmith, done) => {
    fetchData();
    done();
  }
};

function fixedDatetime(datetime) {
  return DTZ.parseFromTimeZone(D.format(datetime, 'YYYY-MM-DD HH:mm:ss.SSS'), {
    timeZone: 'Europe/Helsinki'
  });
}

const parseJSON = response => {
  const rows = response;
  if (!rows || rows.size === 0) return console.log('Data was empty.');

  return rows.map((row, idx) => ({
    id: idx,
    startDatetime: fixedDatetime(row[0]),
    endDatetime: fixedDatetime(row[1]),
    title: row[2],
    description: row[3] || 'Ohjelman kuvaus on tulossa, malta vielä hetki.',
    hosts: row[4] || 'Haamujuontaja',
    producers: row[5] || 'Toimitus',
    imgSrc: row[6],
    color: row[7]
  }))
};

fetchData();