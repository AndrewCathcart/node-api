# node-api

A RESTful API built using Node.js & Express.js

## What I've learned in this project
- Constructing API endpoints for a social media-esque web app (CRUD operations for posts & users)
- REST API server doesn't care about the client (requests are handled in isolation = no sessions)
- Authentication works differently - JSON Web Tokens used to store auth information on the client which prove auth status
- JWT are signed by the server and can only be validated by the server
