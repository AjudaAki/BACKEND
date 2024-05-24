const express = require('express');

const routerPrincipal = require('./routers/routerPrincipal');

const app = express();
  
app.use(express.json());

app.use(routerPrincipal);

module.exports = app;