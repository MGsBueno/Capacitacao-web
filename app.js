const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');

let tasks = [];

// Função para servir o arquivo HTML
function serveHTML(res) {
    fs.readFile('src/index.html', 'utf8', (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.write('Internal Server Error');
            res.end();
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        }
    });
}

// Função para servir arquivos CSS
function serveCSS(res) {
    fs.readFile('src/styles.css', 'utf8', (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.write('Internal Server Error');
            res.end();
        } else {
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.write(data);
            res.end();
        }
    });
}

// Função para servir arquivos JS
function serveJS(res) {
    fs.readFile('src/lista.js', 'utf8', (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.write('Internal Server Error');
            res.end();
        } else {
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.write(data);
            res.end();
        }
    });
}

// Função para servir arquivos estáticos (como imagens)
function serveStatic(res, pathname) {
    const filePath = `src${pathname}`;
    const ext = pathname.split('.').pop();
    const contentTypes = {
        png: 'image/png',
        jpeg: 'image/jpeg',
        jpg: 'image/jpeg',
        css: 'text/css',
        js: 'application/javascript',
    };

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.write('File not found');
            res.end();
        } else {
            res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'application/octet-stream' });
            res.end(data);
        }
    });
}

// Criar o servidor HTTP
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url);
  
    if (req.method === 'GET' && parsedUrl.pathname === '/') {
        serveHTML(res);
    } else if (req.method === 'POST' && parsedUrl.pathname === '/') {
        let body = '';
        
        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const parsedBody = querystring.parse(body);
            tasks.push(parsedBody.task);
            
            res.writeHead(302, { Location: '/' });
            res.end();
        });
    } else if (req.method === 'GET' && parsedUrl.pathname === '/styles.css') {
        serveCSS(res);
    } else if (req.method === 'GET' && parsedUrl.pathname === '/lista.js') {
        serveJS(res);
    } else if (req.method === 'GET' && parsedUrl.pathname.startsWith('/icons/')) {
        serveStatic(res, parsedUrl.pathname); // Serve ícones
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('Page not found');
        res.end();
    }
});

// Iniciar o servidor
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
