const fs = require('fs');
const https = require('https');

function fetchFile(uri) {
  if (!uri) {
    throw Error('Invalid url');
  }
  const file = fs.createWriteStream('data.csv');
  
  https.get(uri, response => {
    const stream = response.pipe(file);
  
    stream.on('finish', () => {
      console.log('File written, reading data');
      return readFile('data.csv')
        .then((jsonData) => {
          console.log('Data parsed.', jsonData);
          fs.writeFileSync('./src/assets/program_data.json', JSON.stringify(jsonData));
        })
        .then(() => {
          fs.unlink('data.csv', () => {
            console.log('Data removed');
          });
        })
    });
  });
}

function readFile(path) {
  return new Promise(function(resolve) {
    const fileContent = fs.readFileSync(path, {encoding: 'utf8'});
    const splitByLines = fileContent.split(/\r\n/);
    const cleanedData = splitByLines.map((item, idx) => {
      const cleaned = item
        .replace(/\n/, ' ')
        .replace(/\"/, '')
        .replace(/\n/, ' ')
      const split = cleaned.split(',');
      return {
        id: idx,
        startDatetime: new Date(split[0]),
        endDatetime: new Date(split[1]),
        title: split[2],
        description: split[3] || 'Shown kuvaus on matkalla',
        hosts: split[4] || 'Haamujuontaja',
        producers: split [5] || 'Haamutuottaja'
      }
    });
    return resolve(cleanedData);
  });
}

module.exports = function(options) {
  return () => {
    const data = fetchFile(process.env.SHEET_URI)
  };
}