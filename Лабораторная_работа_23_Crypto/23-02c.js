const crypto = require('crypto');
const http =require('http');
const fs=require('fs');
const {ServerSign,ClientVerify} = require('./23-02m');
let options3= {
    host: 'localhost',
    path: '/resource',
    port: 8000,
    method:'GET'
}
const file=fs.createWriteStream('./23-02in.txt');
const req3 = http.request(options3,(res)=> {
    console.log('http.request1: statusCode: ',res.statusCode);
    res.pipe(file);
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
    const req = http.request(options,(res)=> {
        let data = '';
        res.on('data',(chunk) =>
        {
           data+=chunk.toString('utf-8');
        });
        res.on('end',()=>{ 
            let signcontext = JSON.parse(data);
            var x = new ClientVerify(signcontext);
            const rs=fs.createReadStream('./23-02in.txt');
            x.verify(rs,(result)=>
            {
                console.log('result:',result);
            })
        });
    });
    req.on('error', (e)=> {console.log('http.request: error:', e.message);
    });
    req.end();
});
req3.on('error', (e)=> {console.log('http.request: error:', e.message);
});
req3.end();