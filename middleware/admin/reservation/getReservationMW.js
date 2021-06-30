/**
 *az adatbázisból lekérdezi az adott id-jű foglalást, ha nincs ilyen redirect
 */

const requireOption = require('../../generic/requireOptionMW');

module.exports = function (objectrepository) {

    const ReservationModel = requireOption(objectrepository, 'ReservationModel');

    return function (req, res, next) {
        ReservationModel.findOne({_id: req.params.id}, (err, reservation) => {
            if(err){
                return next(err || !reservation);
            }
            res.locals.reservation = reservation;
            return next();
        })
    };

};
