const crypto = require('crypto');
const http =require('http');
const query= require('querystring');
const {ServerDH,ClientDH} = require('./23-01m2');
const fs=require('fs');
const decipherFile = require('./23-01m').decipherFile;
let options= {
    host: 'localhost',
    path: '/',
    port: 8000,
	method:'GET',
	headers:
    {
        'content-type':'application/json'
    }
}
let parms;

var clientDH;
const req = http.request(options,(res)=> {
    let data = '';
    res.on('data',(chunk) =>
    {
       data+=chunk.toString('utf-8');
    });
    res.on('end',()=>{ 
		let serverContext = JSON.parse(data);
		clientDH= new ClientDH(serverContext);
		let clientContext=clientDH.getContext();
		parms=JSON.stringify(clientContext);
		let options2= {
			host: 'localhost',
			path: '/setKey',
			port: 8000,
			method:'POST'
		}
		const req2 = http.request(options2,(res)=> {
			console.log('http.request: statusCode: ',res.statusCode);
			let data = '';
			res.on('data',(chunk) =>
			{
				data+=chunk.toString('utf-8');
			});
			res.on('end',()=>{ console.log('http.request: end: body=', data);
			if(res.statusCode!=409)
			{
				console.log('Success');
				let options3= {
					host: 'localhost',
					path: '/resource',
					port: 8000,
					method:'GET'
				}
				const file=fs.createWriteStream('./filesServer/decipher.txt');
				const req3 = http.request(options3,(res)=> {
					console.log('http.request: statusCode: ',res.statusCode);
					if(res.statusCode!=409)
					{
						var buf=new Buffer(32);
						let clientSecret =clientDH.getSecret(serverContext);
						clientSecret.copy(buf,0,0,32)
						decipherFile(res,file,buf);
					}
				});
				req3.on('error', (e)=> {console.log('http.request: error:', e.message);
				});
				req3.end();
			}
			}); 
		});
		req2.on('error', (e)=> {console.log('http.request: error:', e.message);
		});
		console.log(parms);
		req2.write(parms);
		req2.end();
    }); 
});
req.on('error', (e)=> {console.log('http.request: error:', e.message);
});
req.end();

