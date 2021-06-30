var authMW = require('../middleware/admin/auth/authMW');
var getRoomsMW = require('../middleware/admin/room/getRoomsMW');
var getRoomMW = require('../middleware/admin/room/getRoomMW');
var deleteRoomMW = require('../middleware/admin/room/deleteRoomMW');
var saveRoomMW = require('../middleware/admin/room/saveRoomMW');
var renderMW = require('../middleware/generic/renderMW');

const RoomModel = require('../models/room');
const ReservationModel = require('../models/reservation');

module.exports = function (app) {
    const objectRepository = {
        RoomModel: RoomModel,
        ReservationModel: ReservationModel
    };


    /**
     * Create new room
     */

    app.use('/admin/rooms/new',
        authMW(objectRepository),
        saveRoomMW(objectRepository),
        renderMW(objectRepository, 'add-room')
    );


    /**
     * Delete room
     */

    app.use('/admin/rooms/delete/:id',
        authMW(objectRepository),
        getRoomMW(objectRepository),
        deleteRoomMW(objectRepository)
    );

    /**
     * List all rooms
     */

    app.use('/admin/rooms',
        authMW(objectRepository),
        getRoomsMW(objectRepository),
        renderMW(objectRepository, 'rooms')
    );
}
