const express = require('express'); 
const app = express(); 
const bodyParser = require('body-parser'); 
const port = 3000;
const mongoose = require('mongoose'); 
const zoaRoutes = require('./routes/zoa');

//Connect to mongoDB
mongoose.connect('mongodb://localhost/zoala', { useNewUrlParser: true });
mongoose.set('useFindAndModify', false); 
mongoose.Promise = global.Promise; 

//Imports static files for directory
app.use(express.static('public'));

//Parses data before request hits express routes handlers (Middleware) 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

//Initialize routes
app.use("/zoas", zoaRoutes);

//Error handling middleware
app.use(function(err, req, res, next){
    console.log(err); 
    res.status(422).send({error: err.message}); 
});

//Listen for requests
app.listen(port || process.env.port, function(){
    console.log('Server is listening on port ' + port + '...............'); 
});

module.exports = app; 