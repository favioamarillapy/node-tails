const TicketControl = require('../models/ticket-control');
const ticketControl = new TicketControl();


const socketController = (socket) => {

    socket.emit('latest-ticket', ticketControl.latest);

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

