const metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const filter = require('metalsmith-filter');
const layouts = require('metalsmith-layouts');
const handlebarsHelpers = require('./lib/handlebarsHelpers');


metalsmith(__dirname)
  .source('./src/content/')
  .destination('dist/')
  .use(markdown())
  .use(handlebarsHelpers())
  .use(layouts({
    'engine':'handlebars', 
    'directory':'src/layouts',
    'partials': 'src/partials'
  }))
  .use(filter(['!*.scss', '!dist/*', '*.md', '*.html']))
  .build(function(err){
    if(err) { throw err; }
    else console.log('Metalsmith build successfull!');
  });