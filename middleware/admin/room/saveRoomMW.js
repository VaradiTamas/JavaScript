/**
 *ha get kéréssel érkezünk ide akkor semmit nem csinál, egyébként pedig elmenti az adatokat adatbázisba (és redirectel),
 * ha pedig nem sikerül neki akkor a res.localsba leteszi, hogy mi volt a hiba és nextet hív
 */

const requireOption = require('../../generic/requireOptionMW');

module.exports = function (objectrepository) {

    const RoomModel = requireOption(objectrepository, 'RoomModel');

    return function (req, res, next) {
        if (
            typeof req.body.name === 'undefined' ||
            typeof req.body.capacity === 'undefined'
        ) {
            return next();
        }

        res.locals.room = new RoomModel();

        res.locals.room.name = req.body.name;
        res.locals.room.capacity = req.body.capacity;

        res.locals.room.save(err => {
            if (err) {
                return next(err);
            }

            return res.redirect('/admin/rooms');
        });
    };

};
