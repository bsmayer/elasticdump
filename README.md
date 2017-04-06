# Elasticdump

Simple application to copy data between two instances of Elasticsearch

## How to use it

1. Clone it to your project folder

2. Run the command
```
npm install
```

3. Start copying (example)
```
node app.js --hf http://hostfrom --if IndexFrom --tf TypeFrom --ht http://hostto --it IndexTo --tt TypeTo -s 50
```

## Parameters

- hf: host from
- if: index from
- tf: type from
- ht: host to
- it: index to
- tt: type to
- s: amount of data per bulk insert (default: 50)

## !Important

Modify the file worker/connection.js to pass user name and password if necessary

## Contribute

Contact: bs.mayer@hotmail.com

Cheers!
