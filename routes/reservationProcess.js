var startReservationProcessMW = require('../middleware/reservation-process/startReservationProcessMW');
var setDataMW = require('../middleware/reservation-process/setDataMW');
var forwardReservationMW = require('../middleware/reservation-process/forwardReservationMW');
var saveReservationProcessMW = require('../middleware/reservation-process/saveReservationProcessMW');
var getRooms = require('../middleware/admin/room/getRoomsMW');
var renderMW = require('../middleware/generic/renderMW');

const RoomModel = require('../models/room');
const ReservationModel = require('../models/reservation');


module.exports = function (app) {
    const objectRepository = {
        RoomModel: RoomModel,
        ReservationModel: ReservationModel
    };

    /**
     * Reservation process phase 1 (from, to, num of people)
     */

    app.use('/booking1',
        forwardReservationMW(objectRepository),
        renderMW(objectRepository, 'booking1')
    );

    /**
     * Reservation process phase 2
     */

    app.use('/booking2',
        setDataMW(objectRepository),
        getRooms(objectRepository),
        saveReservationProcessMW(objectRepository),
        renderMW(objectRepository, 'booking2')
    );

    /**
     * Redirect to reservation process
     */

    app.use('/',
        startReservationProcessMW(objectRepository)
    );
}
