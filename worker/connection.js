var elasticsearch = require('elasticsearch');

var clientFrom = () => {
  return elasticsearch.Client({
    host: process.env.HOST_FROM,
    requestTimeout: 240000
  });
}

var clientTo = () => {
  return elasticsearch.Client({
    //host: `http://${process.env.USER}:${process.env.PASS}@${process.env.HOST_TO}`,
    host: process.env.HOST_TO,
    requestTimeout: 240000
  });
}

module.exports = {
  clientFrom,
  clientTo
}
