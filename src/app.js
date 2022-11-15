const express = require('express');
const route = require('./routes/route.js');
const app = express();


app.use(express.json());
  
app.use('/', route);
  
app.listen(3000, () => console.log(`App listening on port 3000!`));