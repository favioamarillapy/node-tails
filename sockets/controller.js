const TicketControl = require('../models/ticket-control');
const ticketControl = new TicketControl();


const socketController = (socket) => {

    socket.emit('latest-ticket', ticketControl.latest);
    socket.emit('current-state', ticketControl.fourLatest);
    socket.emit('tickets-pending', ticketControl.tickets.length);

    socket.on('next-ticket', (payload, callback) => {
        const next = ticketControl.next();
        callback(next);
    });

    socket.on('attend-ticket', ({ desktop }, callback) => {
        if (!desktop) {
            callback({
                ok: false,
                message: 'Desktop is required'
            });
        }

        const ticket = ticketControl.attend(desktop);
        socket.broadcast.emit('current-state', ticketControl.fourLatest);
        socket.broadcast.emit('tickets-pending', ticketControl.tickets.length);

        if (ticket == null) {
            callback({
                ok: false,
                message: 'Desktop is required'
            });
        } else {
            callback({
                ok: true,
                ticket
            });
        }
    });
}


module.exports = {
    socketController
}

