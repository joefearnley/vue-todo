const express = require('express');
const app = express();
const serveStatic = require('serve-static');
const axios = require('axios');

app.use(serveStatic(__dirname + '/dist'));
const apiUrl = 'http://5a0c4a196c25030012c335c9.mockapi.io';
let resource = 'todos';

app.get('/todos', (req, res) => {
  axios.get(`${apiUrl}/${resource}`)
    .then(response => {
      res.json(response.data);
    });
});

setResource = (r) => {
  resource = r;
};


module.exports = app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}.`));