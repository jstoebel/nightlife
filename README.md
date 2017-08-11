# Nightlife app, by Jacob Stoebel

This is a nightlife app created as part of the [freeCodeCamp curriculum](https://www.freecodecamp.org/challenges/build-a-nightlife-coordination-app). It is built using React, Express and MongoDB (MERN). 

### User Stories

The following user stories are fulfilled:

 - User Story: As an unauthenticated user, I can view all bars in my area.
 - User Story: As an authenticated user, I can add myself to a bar to indicate I am going there tonight.
 - User Story: As an authenticated user, I can remove myself from a bar if I no longer want to go there.
 - User Story: As an unauthenticated user, when I login I should not have to search again.

### Other Technologies of Note

**Json Web Tokens**: Authentication is handled with JSON web tokens. When the user first logs in, they are given a JWT, stored in their cookie. Each time a user makes a request to a protected endpoint, their jwt is sent in the header and used to authenticate the user. 

**Redux** is used to make this page a single page app. For example when a user searches for results, those results once returned from the server are sent to the store thereby allowing us to simply re-render the right React components rather than sending a whole new page.

**Leaflet** is a tool for creating and drawing maps. It provides a number of useful tools such as popups and markers that come basically for free. Best of all there are react wrapper components. For the most part these work without any additional trouble but since the underlying library is not using react (i.e. it wants to manipulate the DOM itself) there are a few gotchas.

**Mocks/Stubs** Since this project makes use of a number of external services such as Yelp and a local database, it was useful to mock or stub out those services in tests. Essentially this means creating a new object that pretends to be the service in question but is much simpler and has a predictable behavior.

### Deploying to Heroku

 - create the app: `heroku git:remote -a app-name`
 - spin up MongoLab instance: `heroku addons:create mongolab`. This also sets up the env variable `MONGODB_URI`
 - add the secret

