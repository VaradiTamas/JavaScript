/**
 *elmenti a GET (query) paraméterben utazó adatokat (from, to)
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {
        if (
            typeof req.query.from === 'undefined' ||
            typeof req.query.to === 'undefined'
        ) {
            return next();
        }

        res.locals.from = req.query.from;
        res.locals.to = req.query.to;

        return next();
    };

};
