# GraphQL Basics

### To Run This App

* `$ git clone` this repo
* `$ cd graphql-basics` and run `$ npm install`
* `$ npm run start` to initialize server
* Visit `http://localhost:4000/` on your preferred browser and start interacting with the GraphQL Playground

### Steps I Took To Configure Babel **[OPTIONAL]**: 

#### NPM Modules Used:
* `babel-cli`:
    * Used to pass our code through Babel, for it to be compiled
* `babel-preset-env`:
    * Used to process import/exports - telling Babel exactly what it should change

#### Config:
* `$ touch .babelrc` on the root dir of the project to create the Babel config file
* Paste the following config on `.babelrc`: 
    ```javascript 
    {
        "presets": [
            "env"
        ]
    }
    ```
#### To Run Babel:
* Create script on `package.json` to run `Babel` on the app's entry point:
    ```javascript 
    "start": "babel-node src/index.js"
    ```
### Steps I Took To Set Up GraphQL:

* `$ npm install --save graphql-yoga` to be able to access to all `GraphQL` features on your project
* `import { graphQLServer } from 'graphql-yoga'` on the app's entry point
* Define your `typeDefs`/`schema` & `resolvers`
* Create a new `GraphQLServer` like so:
    ```javascript 
        const server = new GraphQLServer({
            typeDefs,
            resolvers,
        });
    ```
* Start the server:
    ```javascript
        server.start(_ => {
            console.log('Running...')
        });
    ```