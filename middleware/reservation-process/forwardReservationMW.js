/**
 *ha post-tal jutunk ide, akkor átirányít a booking2 oldalra a megfelelő query paraméterekkel (melynek tartalma az, hogy mettől meddig
 * foglalják le a szobát)
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {
        if (
            typeof req.body.from === 'undefined' ||
            typeof req.body.to === 'undefined'
        ) {
            return next();
        }else{
            res.redirect('/booking2?from=' + req.body.from + '&to=' + req.body.to);
        }
    };

};
