/**
 *törli az adott szobát és átirányít
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {
        if(typeof res.locals.room === 'undefined'){
            return next();
        }
        res.locals.room.remove((err) => {
            if(err){
                return next(err);
            }
            return res.redirect('/admin/rooms');
        })
    };

};
