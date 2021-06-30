/**
 *az adatbázisból lekérdezi a szobákat
 */

const requireOption = require('../../generic/requireOptionMW');

module.exports = function (objectrepository) {

    const RoomModel = requireOption(objectrepository, 'RoomModel');

    return function (req, res, next) {
        RoomModel.find({}, (err, rooms) => {
            if(err){
                return next(err);
            }
            res.locals.rooms = rooms;
            return next();
        })
    };
};
