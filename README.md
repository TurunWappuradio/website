# Static site template

This is a static website generator setup built for crafting simple website projects.

The generator uses markdown and handlebars to produce html-files using metalsmith. Each markdown-file should contain a header linking it to the desired layout-file. Check out src/index.md and src/layout/index.html for reference.

## Project stack
- Metalsmith for building
- ES6 for javascript via browserify
- Handlebars for HTML templating
- SASS for styling

## Project structure
```
lib/            # Javascript used at buildtime.
src/            # Files under src will be built into dist folder.
src/content/    # Pages as markdown files. See index.md example.
src/layouts/    # Html-page templates go here.
src/partials/   # Handlebars partials go here.
src/assets/     # Static assets used by your page or application.
src/scripts/    # Suggestion for storing javascript files.
```

## Running:
You need nodejs to get the build running smoothly. After the project has been build, dist can be served via any http-server. The start-script of this repo also starts a http-server that serves the files from dist.

1. `$ npm install` Installs dependencies
2. `$ npm run dev` Starts development server and builds project
3. Navigate to `http://localhost:8080` on your browser

## License

MIT 2018 Julius Rajala
