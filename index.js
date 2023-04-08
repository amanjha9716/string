const io= require('socket.io')(3000);
const user={};

io.on('connection', socket=>{
    socket.on('new-user', name=>{
        console.log("hi",name);
        user[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });
    socket.on('send',message=>{
        socket.broadcast.emit('recieve',{message:message,name:user[socket.id]});
    });
    socket.on('disconnect',name=>{
        socket.broadcast.emit('left',user[socket.id]);
        delete user[socket.id];
        console.log(name);
        console.log('abc');
    });
}); 
