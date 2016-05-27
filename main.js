var meshblu = require('meshblu');
console.log("hello");
var MAX_SENTIMENT = 40;
var MIN_SENTIMENT = 0;
var currentSentiment = 20;
// var currentFace = "mellow";
// var messageScore = msg.sentiment.score;

var conn = meshblu.createConnection({});

function setMood(mood) {
  document.getElementById("face").className="face " + mood;
  document.getElementById("lefteye").className="eyes left " + mood;
  document.getElementById("righteye").className="eyes right " + mood;
  document.getElementById("mouth").className="mouth " + mood;
  document.getElementById("face").className="face " + mood;
  document.getElementById("leftbrow").className="brows left " + mood;
  document.getElementById("rightbrow").className="brows right " + mood;
};

function addSentiment(inputScore){
 if(currentSentiment + inputScore <= MAX_SENTIMENT
    && currentSentiment + inputScore >= MIN_SENTIMENT) {
        currentSentiment += inputScore;
 }
 else if(currentSentiment + inputScore > MAX_SENTIMENT) {
    currentSentiment = 40;
 }
 else if(currentSentiment + inputScore < MIN_SENTIMENT) {
    currentSentiment = 0;
 }
};

function decideFace() {
  if (currentSentiment >= 0 && currentSentiment <= 8) {
    return 'angry';
  }
  else if (currentSentiment >= 9 && currentSentiment <= 16) {
    return 'upset';
  }
  else if (currentSentiment >= 17 && currentSentiment <= 24) {
    return 'mellow';
  }
  else if (currentSentiment >= 25 && currentSentiment <= 32) {
    return 'happy';
  }
  else if (currentSentiment >= 33 && currentSentiment <= 40) {
    return 'ecstatic';
  }
};

function showCurrentSentimentInConsole() {
  console.log(currentSentiment);
};

conn.on('ready', function(data){
  console.log("ready", data);
  conn.subscribe({ uuid: "c8397dbe-aa11-463a-832b-4c6e5d81bbfc", types: ['broadcast']}, function(err){
    console.log('subscribed', err);
  });
});

conn.on('message', function(data){
  console.log('message', data);
  addSentiment(data.sentiment.score);
  decideFace();
  setMood(decideFace());
  showCurrentSentimentInConsole();
});
