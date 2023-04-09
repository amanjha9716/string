<<<<<<< HEAD
const io= require('socket.io')(3000);
=======

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;

const user = {};

io.on('connection', socket => {
  socket.on('new-user', name => {
    console.log('hi', name);
    user[socket.id] = name;
    socket.broadcast.emit('user-joined', name);
  });

  socket.on('send', message => {
    socket.broadcast.emit('recieve', {
      message: message,
      name: user[socket.id],

const port = process.env.PORT;
const io= require('socket.io')(port);
>>>>>>> a56b61bad4f1cfb22d6aec99c56d4a61ce817531
const user={};

io.on('connection', socket=>{
    socket.on('new-user', name=>{
        console.log("hi",name);
        user[socket.id]=name;
        socket.broadcast.emit('user-joined',name);

    });
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('left', user[socket.id]);
    delete user[socket.id];
    console.log('user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
