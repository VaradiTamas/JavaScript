/**
 *ha get kéréssel érkezünk ide akkor semmit nem csinál, egyébként pedig frissíti az adatokat adatbázisban (és redirectel),
 * ha pedig nem sikerül neki akkor a res.localsba leteszi, hogy mi volt a hiba és nextet hív
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {
        if (
            typeof req.body.firstName === 'undefined' ||
            typeof req.body.lastName === 'undefined'
        ) {
            return next();
        }

        res.locals.reservation.firstName = req.body.firstName;
        res.locals.reservation.lastName = req.body.lastName;
        res.locals.reservation.email = req.body.email;
        res.locals.reservation.tel = req.body.tel;
        res.locals.reservation.from = req.body.from;
        res.locals.reservation.to = req.body.to;
        res.locals.reservation._room = req.body._room;

        res.locals.reservation.save(err => {
            if (err) {
                return next(err);
            }

            return res.redirect('/admin/reservations');
        });
    };
};
