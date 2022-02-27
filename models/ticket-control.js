const path = require('path');
const fs = require('fs');

class Ticket {
    constructor(number, desktop) {
        this.number = number;
        this.desktop = desktop;
    }
}


class TicketControl {

    constructor() {
        this.latest = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.fourLatest = [];

        this.init();
    }

    get toJson() {
        return {
            latest: this.latest,
            today: this.today,
            tickets: this.tickets,
            fourLatest: this.fourLatest
        }
    }

    init() {
        const { latest, today, tickets, fourLatest } = require('../db/data.json');

        if (today === this.today) {
            this.latest = latest
            this.tickets = tickets;
            this.fourLatest = fourLatest;
        } else {
            this.saveDB();
        }
    }

    saveDB() {
        const dbPath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
    }

    next() {
        this.latest += 1;

        const ticket = new Ticket(this.latest, null);
        this.tickets.push(ticket);

        this.saveDB();
        return 'Ticket ' + ticket.number;
    }

    attend(desktop) {
        if (this.tickets === 0) {
            return null;
        }

        const ticket = this.tickets.shift();
        ticket.desktop = desktop;
        this.fourLatest.unshift(ticket);

        if (this.fourLatest.length > 4) {
            this.fourLatest.splice(-1, 1);
        }

        this.saveDB();

        return ticket;
    }

}

module.exports = TicketControl;