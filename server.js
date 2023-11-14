const express = require('express');
const path = require('path');
const logger = require('morgan');



const app = express();

require('dotenv').config()
require('./config/database.js')

app.use(logger('dev'));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'build')));

app.use('/api/users', require('./routes/api/users'));
app.use(require('./config/auth'));

//app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

