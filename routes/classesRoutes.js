'use strict';

module.exports = function(app) {
    let classes = require('../node/classesFuncs');
    //let userHandlers = require('../controllers/userController');

    // Classes Funcs Routes
    app.route('/classes')
        .get(classes.list_all_classes);
};