const http = require('http');
const url = require('url');
const router = require('./routes/router');

// const options = {
//   key: fs.readFileSync('src/rootCA.key'),
//   cert: fs.readFileSync('src/rootCA.pem')
// }

const startServer = port => {

  const server = http.createServer((request, response) => {

    const parsedUrl = url.parse(request.url);
    request.parsedPath = parsedUrl.path.split('/')
    const func = router[request.parsedPath[1]] || router.default;
    console.log(func)
    func(request, response);
  });

  server.listen(port, (err) => {
    if (err) {
      return  err
    }
    console.log(`server is listening on ${port}`)
  });
};

module.exports = startServer;