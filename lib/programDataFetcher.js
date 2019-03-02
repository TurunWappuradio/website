module.exports = function programDataFetcher(options) {
  return (files) => {
    files['program-data.json'] = {
      contents: 'This data gets written into the file "program-data.json"\n'
    }
  }
};
