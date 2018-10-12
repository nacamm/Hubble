//===================================================//
//     --- Initialize Packages and Routers ---       //
//===================================================//
//Declare Packages
const createError = require('http-errors');
const express = require('express');
let morgan = require('morgan');

let port = process.env.PORT || process.argv[2];
let ip = process.env.IP || process.argv[3];
let mongourl = process.env.MONGOURL || process.argv[4];

//Declare App
const app = express();
app.set('view engine', 'ejs');

//Routers

app.use(morgan('combined'));
app.use('/static', express.static(process.cwd() + '/static'));
app.use('/master', express.static(process.cwd() + '/master'));

//End of Initialize Packages and Routers - - - - - - - -


//===================================================//
//        --- Page Specific Routes/Logic ---         //
//===================================================//

//Admin
app.get('/', function(req, res, next) {
    res.render('homePage.ejs', { title: 'Home' , IP: ip })
});
app.get('/reference', function(req, res, next) {
    res.render('reference.ejs', { title: 'Reference' })
});

let helper = require('./routes/helperFuncsRoutes');
helper(app);

//let classes = require('./routes/classesRoutes');
//classes(app);

//End of Page Specific Routes/Logic - - - - - - - - - -


//===================================================//
//              --- Error Handlers ---               //
//===================================================//

//404 - Send to Error Handler
app.use(function(req, res, next) {
    next(createError(404));
});

// Error Handler Logic
app.use(function(err, req, res, next) {
    //Determine Message
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    //Render Error Page
    res.status(err.status || 500);
    res.render('error.pug', { title: 'ERROR'});
});

//End of Error Handler - - - - - - - - - - - - - - - - -


//===================================================//
//               --- Port Listen ---                 //
//===================================================//
app.listen(port, function () {
    console.log('App Starting');
});

//End of Port Listen - - - - - - - - - - - - - - - - -

module.exports = app;
