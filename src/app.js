const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const routerPrincipal = require('./routers/routerPrincipal');

const app = express();
  
app.use(bodyParser.json({ limit: '10mb' }));

app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(express.json());

app.use(cors())

app.use(routerPrincipal);

module.exports = app;