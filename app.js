const http = require('http');
const express = require('express');
const fs = require('fs')
const csv2json = require('csvjson-csv2json/csv2json');

const app = express()
const hostname = '127.0.0.1';
const port = 3000;


fs.readFile('census_2009b.csv', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(data);

  const csv = data;
  const json = csv2json(csv);
  //console.log(json);

  app.get('/api/bedford', (req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
    //
    res.json(json);
  })

})

// respond with "hello world" when a GET request is made to the homepage
app.get('/about', function (req, res) {
  res.send('about')
})

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
