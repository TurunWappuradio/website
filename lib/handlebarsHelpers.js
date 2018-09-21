const handlebars = require('handlebars');

function simpleDate(timestamp){
  const dateTime = new Date(timestamp);
  return `${dateTime.getDate()}.${dateTime.getMonth() + 1}.${dateTime.getFullYear()}`
}

function simpleTime(timestamp) {
  const dateTime = new Date(timestamp);
  return `${dateTime.getUTCHours()}.${dateTime.getMinutes()}`
}

function simpleDateTime(timestamp) {
  return `${simpleDate(timestamp)} at ${simpleTime(timestamp)}`
}

function getBuildTime(something) {
  return new Date().getTime().toString() + something;
}

module.exports = function(options){
  return (file) => {
    handlebars.registerHelper('simpleDate', simpleDate);
    handlebars.registerHelper('simpleTime', simpleTime);
    handlebars.registerHelper('simpleDateTime', simpleDateTime);
    handlebars.registerHelper('buildTime', getBuildTime);
  }
};