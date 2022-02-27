const lblNewTicket = document.querySelector('#lblNewTicket');
const btnNewTicket = document.querySelector('#btnNewTicket');

const socket = io();

socket.on('connect', () => {
    btnNewTicket.disabled = false;
});

socket.on('disconnect', () => {
    btnNewTicket.disabled = true
});

socket.on('latest-ticket', (latest) => {
    lblNewTicket.innerText = 'Ticket ' + latest;
});

socket.on('next-ticket', (payload) => {
    console.log('payload received', payload)
});

btnNewTicket.addEventListener('click', () => {
    socket.emit('next-ticket', null, (ticket) => {
        lblNewTicket.innerText = ticket
    });
});