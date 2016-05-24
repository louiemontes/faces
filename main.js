var meshblu = require('meshblu');
console.log("hello");

var conn = meshblu.createConnection({});

conn.on('ready', function(data){
  console.log("ready", data);
  conn.subscribe({ uuid: "c8397dbe-aa11-463a-832b-4c6e5d81bbfc", types: ['broadcast']}, function(err){
    console.log('subscribed', err);
  });
});

conn.on('message', function(data){
  console.log('message', data);
});
