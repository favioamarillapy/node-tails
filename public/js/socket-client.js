
// Referencias del HTML
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMessage = document.querySelector('#txtMessage');
const btnSend = document.querySelector('#btnSend');


const socket = io();


socket.on('connect', () => {
    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
});

socket.on('disconnect', () => {
    lblOnline.style.display = 'none';
    lblOffline.style.display = '';
});


socket.on('tail-socket', (payload) => {
    console.log('payload received', payload)
})


btnSend.addEventListener('click', () => {
    const payload = {
        id: 123456789,
        mensaje: txtMessage.value,
        fecha: new Date().getTime()
    }

    socket.emit('tail-socket', payload, (id) => {
        console.log('Send message from client', id);
    });

});