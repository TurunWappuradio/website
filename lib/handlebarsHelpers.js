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

function getBuildTime(suffix) {
  return new Date().getTime().toString() + suffix;
}

function setEnvironment(environment) {
  console.log(environment);
  return function(key) {
    return environment[key];
  }
}

module.exports = function(options){
  const setEnv = setEnvironment(options.process.env);
  return (file) => {
    handlebars.registerHelper('simpleDate', simpleDate);
    handlebars.registerHelper('simpleTime', simpleTime);
    handlebars.registerHelper('simpleDateTime', simpleDateTime);
    handlebars.registerHelper('buildTime', getBuildTime);
    handlebars.registerHelper('setEnv', setEnv);
  }
};