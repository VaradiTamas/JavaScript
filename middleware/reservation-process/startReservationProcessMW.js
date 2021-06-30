/**
 *átirányít a /reservation-process routera (ez akkor kell amikor a felhasználó megnyitja az oldalt '/' routot és innen
 * már el is akarjuk kezdeni a foglalási procedúrát, így egyből átirányítjuk)
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {
        return res.redirect('/booking1');
    };

};
