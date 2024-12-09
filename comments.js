// Create web server
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var comments = [];

http.createServer(function(request, response) {
    var urlObj = url.parse(request.url, true);
    var pathname = urlObj.pathname;
    if (pathname === '/') {
        pathname = '/index.html';
    }
    if (pathname === '/index.html') {
        fs.readFile(path.join(__dirname, pathname), 'utf-8', function(err, data) {
            if (err) {
                console.log(err);
                response.writeHead(404, 'Not Found');
                response.end('404 Not Found');
            } else {
                response.writeHead(200, 'OK');
                response.end(data);
            }
        });
    } else if (pathname === '/addComment') {
        var comment = urlObj.query;
        comments.push(comment);
        response.writeHead(200, 'OK');
        response.end('Comment added successfully!');
    } else if (pathname === '/getComments') {
        var str = JSON.stringify(comments);
        response.writeHead(200, 'OK');
        response.end(str);
    } else {
        fs.readFile(path.join(__dirname, pathname), 'utf-8', function(err, data) {
            if (err) {
                console.log(err);
                response.writeHead(404, 'Not Found');
                response.end('404 Not Found');
            } else {
                response.writeHead(200, 'OK');
                response.end(data);
            }
        });
    }
}).listen(3000, function() {
    console.log('Server is running at http://