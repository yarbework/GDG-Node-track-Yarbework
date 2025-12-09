const http = require('http');

const server = http.createServer((req, res) =>{
if(req.method === 'GET'){
        if (req.url === '/'){
            res.end('Welcome to the Home Page')
        }
        else if(req.url==='/info'){
            res.end('This is the information page')
        }
        else{
            res.end('Page not Found');
        }
}
if(req.method === 'POST'){
    if(req.url === '/submit'){
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            res.end(`Data: ${body}`);
        });
    }
    else{
        res.end('Page not Found');
    }
}
})

server.listen(3000, ()=> {
    console.log('Server is running on port 3000')
})