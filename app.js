var yargs = require('yargs');
var elasticsearch = require('./worker/elasticsearch');
var {DEFAULT_SIZE} = require('./config/config');

var argv = yargs.options({
    hf: {
      demand: true,
      alias: 'hostFrom',
      describe: 'endpoint elasticsearch (from)',
      type: 'string'
    },
    if: {
      demand: true,
      alias: 'indexFrom',
      describe: 'Index from Endpoint',
      type: 'string'
    },
    tf: {
      demand: true,
      alias: 'typeFrom',
      describe: 'Type from Endpoint',
      type: 'string'
    },
    ht: {
      demand: true,
      alias: 'hostTo',
      describe: 'endpoint elasticsearch (to)',
      string: true,
      type: 'string'
    },
    it: {
      demand: true,
      alias: 'indexTo',
      describe: 'Index to Endpoint',
      type: 'string'
    },
    tt: {
      demand: true,
      alias: 'typeTo',
      describe: 'Type to Endpoint',
      type: 'string'
    },
    p: {
      alias: 'parent',
      describe: 'parent of documents',
      type: 'number'
    },
    s: {
      alias: 'size',
      describe: 'size of documents',
      type: 'number',
      default: DEFAULT_SIZE
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

process.env.HOST_FROM = argv.hf;
process.env.INDEX_FROM = argv.if;
process.env.TYPE_FROM = argv.tf;
process.env.HOST_TO = argv.ht;
process.env.INDEX_TO = argv.it;
process.env.TYPE_TO = argv.tt;

elasticsearch.dump(argv.s, (status, obj) => {
  if (!status)
    return console.log(obj);
  else {
    console.log(JSON.stringify(obj, null, 2));
  }
});
