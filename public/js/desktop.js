const searchParam = new URLSearchParams(window.location.search);

if (!searchParam.has('desktop')) {
    window.location = 'index.html';
    throw new Error('Desktop is required');
}

const socket = io();
const desktop = searchParam.get('desktop');

const lblTitle = document.querySelector('#lblTitle');
const lblLatest = document.querySelector('#lblLatest');
const btnAttend = document.querySelector('#btnAttend');
const alertMsg = document.querySelector('#alertMsg');
const alertMsgText = document.querySelector('#alertMsgText');


lblTitle.innerText = desktop;
alertMsg.style.display = 'none';

socket.on('connect', () => {
    btnAttend.disabled = false;
});

socket.on('disconnect', () => {
    btnAttend.disabled = true
});

socket.on('next-ticket', (payload) => {
    console.log('payload received', payload)
});

btnAttend.addEventListener('click', () => {

    socket.emit('attend-ticket', { desktop }, ({ ok, ticket, message }) => {
        console.log(ok, ticket, message);
        if (!ok) {
            alertMsgText.innerText = message;
            alertMsg.style.display = 'block';
            return;
        } else {
            lblLatest.innerText = 'Ticket ' + ticket.number;
        }
    });
});