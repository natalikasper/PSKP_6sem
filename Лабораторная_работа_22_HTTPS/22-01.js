let app = require('express')();
let https = require('https');
let fs = require('fs');

let options = {
	key: fs.readFileSync('LAB.key').toString(),
	cert: fs.readFileSync('LAB.crt').toString()
};
https.createServer(options,app).listen(3000, ()=>{console.log('port 3000')});

app.get('/',(req,res,next)=>
{
    console.log('hello from https');
	res.end('Laboratornaya rabota 22 - HTTPS');
});
