const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/eazp1m',{useNewUrlParser: true});

module.exports = mongoose;
