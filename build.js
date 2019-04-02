const metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const filter = require('metalsmith-filter');
const layouts = require('metalsmith-layouts');
const handlebarsHelpers = require('./lib/handlebarsHelpers');
const programDataFetcher = require('./lib/programDataFetcher/csvParser');

metalsmith(__dirname)
  .source('./src/content/')
  .destination('dist/')
  .use(markdown())
  .use(handlebarsHelpers({'process': process}))
  .use(programDataFetcher({'process': process}))
  .use(layouts({
    'engine':'handlebars',
    'directory':'src/layouts',
    'partials': 'src/partials'
  }))
  .use(filter(['!*.scss', '!dist/*', '*.md', '*.html', 'program-data.json']))
  .build(function(err){
    if(err) { throw err; }
    console.log('Process', process.env)
    console.log('Metalsmith build successfull!');
  });
