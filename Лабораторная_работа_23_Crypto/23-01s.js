const crypto = require('crypto');
const {ServerDH,ClientDH} = require('./23-01m2');
const fs=require('fs');
const express=require('express');
const http=require('http');
const app = require('express')();
const bodyParser = require("body-parser");
const cipherFile = require('./23-01m').cipherFile;
var serverDH;
var serverSecret;
app.set('port',8000);
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/',(req,res,next)=>
{
	serverDH = new ServerDH(1024,3);
	console.log(serverDH);
	const serverContext = serverDH.getContext();
	res.writeHead(200,{'Content-Type': 'application/json'});
	res.end(JSON.stringify(serverContext));
});
app.post('/setKey',(req,res,next)=>
{
	let body='';
			req.on('data',chunk=>{body+=chunk.toString();});
			req.on('end',()=>{
	const clientContext=JSON.parse(body);
	if(clientContext.key_hex!=undefined)
	{
		serverSecret=serverDH.getSecret(clientContext);
		console.log('serverSecret:',serverSecret);
		res.writeHead(200,{'Content-Type': 'text/plain'});
		var buf=new Buffer(32);
		console.log('buf:',serverSecret.copy(buf,0,0,32));
		const rs = fs.createReadStream('./filesServer/in23-01.txt');
		const ws = fs.createWriteStream('./filesServer/ch23-01.txt');
		cipherFile(rs,ws,buf);
		res.end('Success');
	}
	else
	{
		res.statusCode=409;
		res.end('Failure');
	}
	});
});
app.get('/resource',(req,res,next)=>
{
	if(serverSecret!=undefined)
	{

		res.statusCode=200;
		let rs2=fs.createReadStream('./filesServer/ch23-01.txt');
		rs2.pipe(res);
		rs2.on('close',()=>
		{console.log(rs2.bytesRead);
		res.end();
		});
	}
	else
	{
		res.statusCode=409;
		res.end('Set key');
	}
});
var server=app.listen(app.get('port'),()=>
{
    console.log('Start server, port:',app.get('port'));
});