/**
 *az adatbázisból lekérdezi az adott id-jű szobát, ha nincs ilyen redirect
 */

const requireOption = require('../../generic/requireOptionMW');

module.exports = function (objectrepository) {

    const RoomModel = requireOption(objectrepository, 'RoomModel');

    return function (req, res, next) {
        RoomModel.findOne({_id: req.params.id}, (err, room) => {
            if(err || !room){
                return next(err);
            }
            res.locals.room = room;
            return next();
        })
    };
};
