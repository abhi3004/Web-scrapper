const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://dbdb:dbdb@cluster0-xlkfg.mongodb.net/test?retryWrites=true', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected')
});
mongoose.Promise = global.Promise;

var scraper = require('./main');

scraper.scrap();  
// Use to update data list

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/api');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/api', routes);
  
app.use((err, req, res, next) => {
    console.log(err);
    next();
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  });