const mongoose = require('mongoose');
 
mongoose.connect("mongodb://localhost/earthquakes", {

    useUnifiedTopology: true,

    useNewUrlParser: true,

}).then(console.log('Connect success to mongodb'))

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function() {
    console.log('Connected to Database :: MongoDB');
});

module.exports = db;
