const socket = io();

const lblTicket1 = document.querySelector('#lblTicket1');
const lblDesktop1 = document.querySelector('#lblDesktop1');
const lblTicket2 = document.querySelector('#lblTicket2');
const lblDesktop2 = document.querySelector('#lblDesktop2');
const lblTicket3 = document.querySelector('#lblTicket3');
const lblDesktop3 = document.querySelector('#lblDesktop3');
const lblTicket4 = document.querySelector('#lblTicket4');
const lblDesktop4 = document.querySelector('#lblDesktop4');


socket.on('current-state', (fourLatest) => {

    const audio = new Audio('../audio/new-ticket.mp3');
    audio.play();

    const [ticket1, ticket2, ticket3, ticket4] = fourLatest;

    lblTicket1.innerText = (ticket1 != undefined) ? ticket1.number : "";
    lblDesktop1.innerText = (ticket1 != undefined) ? ticket1.desktop : "";

    lblTicket2.innerText = (ticket2 != undefined) ? ticket2.number : "";
    lblDesktop2.innerText = (ticket2 != undefined) ? ticket2.desktop : "";

    lblTicket3.innerText = (ticket3 != undefined) ? ticket3.number : "";
    lblDesktop3.innerText = (ticket3 != undefined) ? ticket3.desktop : "";

    lblTicket4.innerText = (ticket4 != undefined) ? ticket4.number : "";
    lblDesktop4.innerText = (ticket4 != undefined) ? ticket4.desktop : "";

});