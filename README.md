# Cosmic Chat App

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Contributing](../CONTRIBUTING.md)

## About <a name = "about"></a>

This is a chat application that uses MongoDB to store the conversation history, React for the front end framework and, NodeJS and ExpressJS for the backend server.

The application uses Amazons S3 Buckets to store and serve images in messages. 

## Getting Started <a name = "getting_started"></a>

To start the application, you will need to clone this repo and the [server repo](https://github.com/Eli-BH/cosmic-chat-server) to your system. 

Create a .env file in the servers base directory, and enter the environment variables.

### Prerequisites

You will need an updated version of node, a mongodb cluster or localdb, an a AWS S3 Bucket setup to have access to your ip.

### Installing

Clone the client director and server directory and enter
`npm install`
in both with your command line.

In the server directory, create a .env file with the following environment variables and their respective keys.

- MONGO_URI
  
- ACCESS_TOKEN_SECRET
  
- S3_REGION
  
- S3_NAME
  
- AWS_ACCESS_SECRET
  
- AWS_ACCESS_KEY
  
## Usage <a name = "usage"></a>

You can create a new user with the auth form, 
then create a room to enter, then enter the room and start chatting. 


Auth
<img src="https://i.imgur.com/uurj3G4.jpg" alt="auth">

New Room
<img src="https://i.imgur.com/SuE7KOg.jpg" alt="new Room">

Sending a message
<img src="https://i.imgur.com/j4zxods.jpg" alt="sending a message">

Sending an Image
<img src="https://i.imgur.com/LUDo7xX.jpg" alt="">
