/**
 *törli az adott reservation-t és átirányít
 */

const requireOption = require('../../generic/requireOptionMW');

module.exports = function (objectrepository) {

    const ReservationModel = requireOption(objectrepository, 'ReservationModel');

    return function (req, res, next) {
        if(typeof res.locals.reservation === 'undefined'){
            return next();
        }
        res.locals.reservation.remove((err) => {
            if(err){
                return next(err);
            }
            return res.redirect('/admin/reservations');
        })
    };

};
