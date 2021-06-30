const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Reservation = db.model('Reservation', {
    firstName: String,
    lastName: String,
    email: String,
    tel: String,
    from: Date,
    to: Date,
    _room: {
        type: Schema.Types.ObjectId,
        ref: 'Room'
    }
});

module.exports = Reservation;
