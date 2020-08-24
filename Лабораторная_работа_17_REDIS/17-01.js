//тестир.соед.с БД
const redis=require('redis');
const client=redis.createClient('//redis-19453.c85.us-east-1-2.ec2.cloud.redislabs.com:19453',
                                {password:'5A1IL9IdK1OG7QY5pkyzo0K1XFGrsCR7'});
client.on('ready',()=>{console.log('ready')});
client.on('error',(err)=>{console.log('error '+err)});
client.on('connect',()=>{console.log('connect')});
client.on('end',()=>{console.log('end')});
client.quit();