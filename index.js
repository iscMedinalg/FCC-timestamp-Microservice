// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

//call path with the middleware
//Test 1
app.get('/api/:date?', (request, response) => {
  //Create object for add the unix and utc times
  let responseObject = {}
  //get the date
  let date = request.params.date

  //if the date is empty return utc and unix time
  if(!date){
      //Test 7
      responseObject['unix'] = new Date().getTime()
      //Test 8
      responseObject['utc'] = new Date().toUTCString()
  
      response.json(responseObject)
    }
  if(date.includes('-') || date.includes(' ')){
    //Test 1
    responseObject['unix'] = new Date(date).getTime()
    //Test 2
    responseObject['utc'] = new Date(date).toUTCString()
  }else{
    //Test 3
    date = parseInt(date)
    responseObject['unix'] = new Date(date).getTime()
    responseObject['utc'] = new Date(date).toUTCString()
  }
  //Test 4
  if(!responseObject['unix'] || !responseObject['utc']){
    response.json({error: 'Invalid Date'})
  }
  
  response.json(responseObject)
})
