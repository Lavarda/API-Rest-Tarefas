const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser')

require('./database/connection')
require('events').EventEmitter.defaultMaxListeners = 15;

const PORT = 3333
const HOST = '0.0.0.0'

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)

app.listen(PORT, HOST)