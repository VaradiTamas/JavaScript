var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const session = require('express-session');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
    session({
        secret: 'secret'
    })
);

app.use(express.static('static'));

require('./routes/reservationList')(app);
require('./routes/roomList')(app);
require('./routes/outside')(app);
require('./routes/reservationProcess')(app);

app.use((err,req,res,next) => {
    res.end('Valami hiba tortent!!!!');
    console.log(err);
})

var server = app.listen(3000, function () {
    console.log("On :3000");
});
