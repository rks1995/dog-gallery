const http = require('http');
const fs = require('fs');
const port = 8000;

function requestHandler(req, res) {
  res.writeHead(200, { 'content-type': 'text/html' });

  console.log(req.url);
  fs.readFile('./index.html', function (err, data) {
    if (err) {
      console.log('error', err);
      return;
    }
    return res.end(data);
  });
  fs.readFile('./script.js', function (err, data) {
    if (err) {
      console.log('error', err);
      return;
    }
    return res.end(data);
  });
}

const server = http.createServer(requestHandler);

server.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('server is running at port', port);
});
