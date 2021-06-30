/**
 *amennyiben nem undefined a req.body megfelelő mezői, elmenti a foglalást
 */

const requireOption = require('../generic/requireOptionMW');

module.exports = function (objectrepository) {

    const ReservationModel = requireOption(objectrepository, 'ReservationModel');

    return function (req, res, next) {
        if (
            typeof req.body.firstName === 'undefined' ||
            typeof req.body.lastName === 'undefined'
        ) {
            return next();
        }

        res.locals.reservation = new ReservationModel();

        res.locals.reservation.firstName = req.body.firstName;
        res.locals.reservation.lastName = req.body.lastName;
        res.locals.reservation.email = req.body.email;
        res.locals.reservation.tel = req.body.tel;
        res.locals.reservation.from = res.locals.from;
        res.locals.reservation.to = res.locals.to;
        res.locals.reservation._room = req.body._room;

        res.locals.reservation.save(err => {
            if (err) {
                return next(err);
            }

            return res.redirect('/booking1');
        });
    };

};
