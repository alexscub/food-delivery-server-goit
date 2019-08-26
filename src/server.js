const http = require('http');
const url = require('url');
const router = require('./routes/router');
// const fs = require('fs');

// const options = {
//   key: fs.readFileSync('server.key'),
//   cert: fs.readFileSync('server.crt')
// }

const startServer = port => {

  const server = http.createServer((request, response) => {
    const parsedUrl = url.parse(request.url);
    request.parsedPath = parsedUrl.path.split('/')
    const func = router[request.parsedPath[1]] || router.default;
    func(request, response);
  });

  server.listen(port, (err) => {
    if (err) {
      throw  err
    }
    console.log(`server is listening on ${port}`)
  });
};

module.exports = startServer;