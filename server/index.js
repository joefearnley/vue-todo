const express = require('express');
const app = express();

app.use('/static', express.static(__dirname + '/static'))

app.get('/', (req, res) => {
  //res.sendFile('index.html')
  res.sendFile('index.html', { root: '../dist' });
});



app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}`));