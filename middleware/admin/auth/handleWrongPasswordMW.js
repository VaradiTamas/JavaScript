/**
 *megnézi, hogy a paraméterben a routes mellett ott van-e az '?error=wrong_password', hiszen ha rossz jelszót
 * írunk be akkor nem a sima /admin-ra redirectelünk hanem ide és ennek függvényében tudjuk majd a felhasználónak jelezni
 * valami kis üzenettel, hogy rossz jelszót adott meg.
 */

module.exports = function (objectrepository) {

    return function (req, res, next) {
        return next();
    };

};
