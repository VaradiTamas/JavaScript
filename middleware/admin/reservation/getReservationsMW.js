/**
 *az adatbázisból lekérdezi a foglalásokat
 */

const requireOption = require('../../generic/requireOptionMW');

module.exports = function (objectrepository) {

    const ReservationModel = requireOption(objectrepository, 'ReservationModel');

    return function (req, res, next) {
        ReservationModel.find({}, (err, reservations) => {
            if(err){
                return next(err);
            }
            res.locals.reservations = reservations;
            return next();
        })
    };

};
