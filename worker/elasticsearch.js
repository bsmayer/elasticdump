var elasticsearch = require('elasticsearch');
var {clientFrom, clientTo} = require('./connection');
var {log} = require('./../helpers/helper');
var {INDEX_FROM, TYPE_FROM, INDEX_TO, TYPE_TO} = require('./../config/config');

var dump = (size, callback) => {

  var scroll_id;
  clientFrom().search({
    index: INDEX_FROM(),
    type: TYPE_FROM(),
    from: 0,
    size,
    scroll: '1m',
    body: {
      query: {
        match_all: {}
      }
    }
  }).then((docs) => {
    scroll_id = docs._scroll_id;
    log(`Taken: ${docs.hits.hits.length}`);

    return bulkAdd(docs.hits.hits);
  }).then((docs) => {
    log(`Added/Updated: ${docs.items.length}`);
    return processar(scroll_id, size);
  }).then((status) => {
    if (status)
      log('Processo finalizado');
  }).catch((e) => {
    log(`um erro ocorreu. Reiniciando processo...`);
    processar(e, size);
  });

};

var processar = (scroll_id, size) => {
  return new Promise((resolve, reject) => {
    if (size <= 0) {
      reject('Size deve ser maior que zero');
    } else {

      clientFrom().scroll({
        scroll: '5m',
        scroll_id
      }).then((docs) => {
        log(`Taken: ${docs.hits.hits.length}`);
        if (docs.hits.hits.length == 0) {
          resolve(true);
        }

        scroll_id = docs._scroll_id;
        return bulkAdd(docs.hits.hits);
      }).then((docs) => {
        log(`Added/Updated: ${docs.items.length}`);
        processar(scroll_id, size);
      }).catch((e) => {
        reject(scroll_id);
      });
    }

  });

};

var bulkAdd = (docs) => {

  var body = [];
  docs.forEach((item) => {
    var objIndex = {
      index: {
        _index: INDEX_TO(),
        _type: TYPE_TO(),
        _id: item._id,
        parent: item._parent
      }
    };

    body.push(objIndex);
    body.push(item._source);
  });

  return clientTo().bulk({
    body
  });
};

module.exports = {
  dump
}
