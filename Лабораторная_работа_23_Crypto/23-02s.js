const crypto = require('crypto');
const {ServerSign,ClientVerify} = require('./23-02m');
const fs=require('fs');
const express=require('express');
const http=require('http');
const app = require('express')();
let rs=fs.createReadStream('./filesServer/in23-01.txt');
app.set('port',8000);
app.get('/',(req,res,next)=>
{
	let ss= new ServerSign();
    ss.getSignContext(rs,(signcontext)=>
    {
        res.writeHead(200,{'Content-Type': 'application/json'});
	    res.end(JSON.stringify(signcontext));
    });
});
app.get('/resource',(req,res,next)=>
{
		res.statusCode=200;
		let rs2=fs.createReadStream('./filesServer/in23-01.txt');
		rs2.pipe(res);
		rs2.on('close',()=>
		{console.log(rs2.bytesRead);
		res.end();
		});
});
var server=app.listen(app.get('port'),()=>
{
    console.log('Start server, port:',app.get('port'));
});