const express = require('express');
const app = express();
const serveStatic = require('serve-static');
const axios = require('axios');

app.use(serveStatic(__dirname + '/dist'));

app.get('/todos', (req, res) => {
  axios.get('http://5a0c4a196c25030012c335c9.mockapi.io/todos')
    .then(response => {
         res.json(response.data);
    });
});

module.exports = app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}.`));