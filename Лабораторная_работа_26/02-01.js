const express = require('express');
const app = express();

app.use((req, res, next)=>{console.log('task2'); next();});
app.use('/', express.static('public'));
app.listen(3000, () => {
  console.log('The server started');
});
