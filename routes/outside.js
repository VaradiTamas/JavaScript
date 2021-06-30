var logoutMW = require('../middleware/admin/auth/logoutMW');
var checkPasswordMW = require('../middleware/admin/auth/checkPasswordMW');
var renderMW = require('../middleware/generic/renderMW');

module.exports = function (app) {
    var objectRepository = {};

    /**
     * Kijelentkezés
     */

    app.use('/admin/logout',
        logoutMW(objectRepository)
    );

    /**
     * Bejelentkező oldal
     */

    app.use('/admin',
        checkPasswordMW(objectRepository),
        renderMW(objectRepository, 'admin')
    );
}
