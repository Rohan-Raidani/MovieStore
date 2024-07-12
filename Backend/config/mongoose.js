const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/movie_store',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error' ,console.error.bind(console, 'error connecting to db'));

db.once('open',function(){
    console.log("Successfully connected to database");
})

module.exports = db;