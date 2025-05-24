# DRONE DELIGHT

This project was built with React & json-server

## Available Scripts FE

In the project directory, you can run:

### `npm start`

Runs the application with PUBLIC_ENV

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\

## Available Scripts BE

The project's backend is build with json-server `src/db.json`
To start the server I recommend to use the --port 3001

Recommended
### `npx json-server <path-to-json> --port 3001`

Default port 3000
### `npx json-server <path-to-json>`


## Deploy to github 
I choose to deploy to github with gh-pages
change url in package.json "homepage": <your-url-to-github-pages>,

### `npm run deploy`
The deploy script runs a predeploy to build the projet `npm run build` then runs the deploy `gh-pages -d build`.


