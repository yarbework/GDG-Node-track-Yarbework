const http = require('http');

const students = [];
const nextId = 1;

const server = http.createServer((req, res) => {
  if (req.method === 'GET' ) {
    if(req.url === '/students'){
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(students));
    }else{
        console.log("Page not found")
    }
  }

  else if (req.method === 'POST') {
    if(req.url === '/students'){
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
            });

        req.on('end', () => {
            const data = JSON.parse(body);
            const newStudent = { id: nextId++, name: data.name };
            students.push(newStudent);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newStudent));
    });
    }

  }

  else if (req.method === 'PUT') {
        if(req.url.startsWith('/students/')){

            const id = parseInt(req.url.split('/')[2]);
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
                });
            req.on('end', () => {
                const data = JSON.parse(body);
                const student = students.find(s => s.id === id);
              if (student) {
                    student.name = data.name;
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(student));
                } 
              else {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Student not found' }));
                }
                });
        }
  }

  else if (req.method === 'DELETE') {
        if(req.url.startsWith('/students/')){
            const id = parseInt(req.url.split('/')[2]);
            const index = students.findIndex(s => s.id === id);
              if (index !== -1) {
                students.splice(index, 1);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: `Student with id ${id} deleted` }));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Student not found' }));
            }
        }


  }

  else {
    res.end('Page not Found');
  }
});

server.listen(4000, () => {
  console.log('Server running on port 4000');
});
