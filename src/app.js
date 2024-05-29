const express = require('express');
const cors = require('cors')
const routerPrincipal = require('./routers/routerPrincipal');

const app = express();
  
app.use(express.json());

app.use(cors())

app.use(routerPrincipal);

module.exports = app;