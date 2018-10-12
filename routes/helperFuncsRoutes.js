'use strict';

module.exports = function(app) {
    let helper = require('../node/helperFuncs');
    //let userHandlers = require('../controllers/userController');

    // Helper Funcs Routes
    app.route('/image/retrieve/:fileName')
        .get(helper.retrieve_a_image);
};