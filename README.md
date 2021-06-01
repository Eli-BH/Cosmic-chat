<<<<<<< HEAD
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
=======
<p align="center">
  <a href="https://cosmic-chatcord.herokuapp.com/" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/aQ8DOs3.jpg" alt="Project logo"></a>
</p>

<h3 align="center">Cosmic Chat App</h3>

<a href="https://github.com/Eli-BH/cosmic-chat-server"><h6>Server repo</h6></a>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> A chat application that allows the user to make new rooms and send messages with images.
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Built Using](#built_using)
- [TODO](./TODO.md)
- [Authors](#authors)

## 🧐 About <a name = "about"></a>

The purpose of this project was to practice deploying a chat application that uses socket.io. I goal was also to be
able to do that while having the ability to send image messages. I was able to implement this by connecting the application to an AWS S3. When the users want to send an image, they are able to attach an image file. That file gets handled through the backend by stripping the file from the message, and sending it to AWS, and have the S3 bucket return a link that can be used publicly.

The user also has the ability to delete a room that they create, the gives the room creating user, basic admin abilities.

The chat conversations are also stored in MongoDB, so they can pick up where they left off next time they return to the chatroom.

I wanted to add a way for users to see the current users, I was able to come up with a working solution using socket.io and a simple Object. This means that When someone is in the room, their username will be added to the sidebar, and when they leave, the username will disappear with them.

## 🏁 Getting Started <a name = "getting_started"></a>

To get started with the project on a local system, you need to create a new mongoDB cluster, an AWS with credentials to manipulate a S3 bucket. And a new S3 bucket that is set to public.

All api keys should be set into a .env file.

After connecting the mongodb cluster and the S3 bucket, all that is needed is to start the server and client as normally. The code for the server is [here](https://github.com/Eli-BH/cosmic-chat-server). This is a normal node express server, this is also where all the api key are connected to.

To start the client, all that is needed is to use npm install and npm start.

### Prerequisites

You need an updated version of node installed on your system.

### Installing

Just clone the repository in to a new directory.

```
npm install
```

```
npm start
```

The server needs to be cloned into a separate folder
[server](https://github.com/Eli-BH/cosmic-chat-server)

the api keys and mongo URI needs to be added to a .env file on the root of the server directory

```
npm install
```

```
npm start
```

## 🎈 Usage <a name="usage"></a>

One needs to create a new account with a username, email, and a password.
If there are no rooms, one should be created in order to start chatting.
When the room is created, you can enter it and start chatting.

## ⛏️ Built Using <a name = "built_using"></a>

- [MongoDB](https://www.mongodb.com/) - Database
- [Express](https://expressjs.com/) - Server Framework
- [ReactJS](https://reactjs.org/) - Web Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment
- [AWS](https://aws.amazon.com/) - Cloud Storage
- [Socket.io](https://socket.io/) - Bidirectional data communication

## ✍️ Authors <a name = "authors"></a>

- [@Eli-BH](https://github.com/Eli-BH) - Idea & Initial work
>>>>>>> c0962216d30659d52a7eaadda296bbc5bdda0065
