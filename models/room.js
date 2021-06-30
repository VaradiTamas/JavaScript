const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Room = db.model('Room', {
    name: String,
    capacity: Number
});

module.exports = Room;
