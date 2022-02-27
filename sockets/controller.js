const socketController = (socket) => {

    socket.on('disconnect', () => {
        console.log('Client disconected', socket.id);
    });

    socket.on('tail-socket', (payload, callback) => {
        console.log('payload', payload);
        const id = 123456789;
        callback(id);

        socket.broadcast.emit('tail-socket', payload);
    });

}



module.exports = {
    socketController
}

