var meshblu = require('meshblu');
console.log("hello");

var conn = meshblu.createConnection({});

function setMood(mood) {
  document.getElementById("face").className="face " + mood;
  document.getElementById("lefteye").className="eyes lefteye " + mood;
  document.getElementById("righteye").className="eyes righteye " + mood;
  document.getElementById("mouth").className="mouth " + mood;

};

conn.on('ready', function(data){
  console.log("ready", data);
  conn.subscribe({ uuid: "c8397dbe-aa11-463a-832b-4c6e5d81bbfc", types: ['broadcast']}, function(err){
    console.log('subscribed', err);
  });
});

conn.on('message', function(data){
  console.log('message', data);
  setMood(data.payload);
});
