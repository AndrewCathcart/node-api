# node-api

A RESTful API built using Node.js & Express.js

## What I've learned in this project

Basic & Advanced REST API Features
- Constructing API endpoints for a social media-esque web app (CRUD operations for posts & users)

Authentication in a REST API
- REST API server doesn't care about the client (requests are handled in isolation = no sessions)
- Authentication works differently - JSON Web Tokens used to store auth information on the client which prove auth status
- JWT are signed by the server and can only be validated by the server

Async-await
- Refactored our code to use this (cleaner in my opinion)

Websockets & Socket.io

GraphQL
