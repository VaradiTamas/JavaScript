var authMW = require('../middleware/admin/auth/authMW');
var getReservationsMW = require('../middleware/admin/reservation/getReservationsMW');
var getReservationMW = require('../middleware/admin/reservation/getReservationMW');
var deleteReservationMW = require('../middleware/admin/reservation/deleteReservationMW');
var saveReservationMW = require('../middleware/admin/reservation/saveReservationMW');
var updateReservationMW = require('../middleware/admin/reservation/updateReservationMW');
var getRoomsMW = require('../middleware/admin/room/getRoomsMW');
var renderMW = require('../middleware/generic/renderMW');

const RoomModel = require('../models/room');
const ReservationModel = require('../models/reservation');

module.exports = function (app) {
    const objectRepository = {
        RoomModel: RoomModel,
        ReservationModel: ReservationModel
    };

    /**
     * Update reservation
     */

    app.use('/admin/reservations/edit/:id',
        authMW(objectRepository),
        getReservationMW(objectRepository),
        getRoomsMW(objectRepository),
        updateReservationMW(objectRepository),
        renderMW(objectRepository, 'modify-reservation')
    );

    /**
     * Delete reservation
     */

    app.use('/admin/reservations/delete/:id',
        authMW(objectRepository),
        getReservationMW(objectRepository),
        deleteReservationMW(objectRepository)
    );

    /**
     * Create new reservation
     */

    app.use('/admin/reservations/new',
        authMW(objectRepository),
        getRoomsMW(objectRepository),
        saveReservationMW(objectRepository),
        renderMW(objectRepository, 'add-reservation')
    );
    
    /**
     * List all reservationos
     */

    app.use('/admin/reservations',
        authMW(objectRepository),
        getRoomsMW(objectRepository),
        getReservationsMW(objectRepository),
        renderMW(objectRepository, 'reservations')
    );
}
