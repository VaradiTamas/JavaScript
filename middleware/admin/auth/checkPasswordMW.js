/**
 *megnézi, hogy beérkezik-e a jelszó post paraméter és ha igen összehasonlítja egy sztringgel,
 * ha megegyezik akkor session segítségével beloginolja a felhasználót, ha nem akkor átirányítja
 */

module.exports = function(objectrepository) {

    return function(req, res, next) {
        if (typeof req.body.password === 'undefined') {
            return next();
        }

       if (req.body.password === 'admin') {
            req.session.belepve = true;
            return res.redirect('/admin/reservations');
       }

        res.locals.error = 'Hibás jelszó!';
        return next();
    };

};
