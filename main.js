var meshblu = require('meshblu');
console.log("hello");
var MAX_SENTIMENT = 30;
var MIN_SENTIMENT = 0;
var currentSentiment = 15;
var page = document.getElementById("page");

page.addEventListener("click", function() {
  page.webkitRequestFullscreen()
}, false);

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
  if (inputScore > 1) {
    document.getElementById("text").className="textBox " + "ecstatic";
  }
  else if(inputScore < -1) {
    document.getElementById("text").className="textBox " + "angry";
  }
  else {
    document.getElementById("text").className="textBox " + "mellow";
  }

 if(currentSentiment + inputScore <= MAX_SENTIMENT
    && currentSentiment + inputScore >= MIN_SENTIMENT) {
        currentSentiment += inputScore;
 }
 else if(currentSentiment + inputScore > MAX_SENTIMENT) {
    currentSentiment = 30;
 }
 else if(currentSentiment + inputScore < MIN_SENTIMENT) {
    currentSentiment = 0;
 }
};

function decideFace() {
  if (currentSentiment >= 0 && currentSentiment <= 6) {
    return 'angry';
  }
  else if (currentSentiment >= 7 && currentSentiment <= 13) {
    return 'upset';
  }
  else if (currentSentiment >= 14 && currentSentiment <= 16) {
    return 'mellow';
  }
  else if (currentSentiment >= 17 && currentSentiment <= 23) {
    return 'happy';
  }
  else if (currentSentiment >= 24 && currentSentiment <= 30) {
    return 'ecstatic';
  }
};

function showCurrentSentimentInConsole() {
  console.log(currentSentiment);
};

function inputText(text) {
  if(text){
    if(text.length > 30) {
      document.getElementById("text").innerHTML = text.replace(/</g,'').replace(/>/g, '').substring(0, 30) + '…';
    } else {
      document.getElementById("text").innerHTML = text.replace(/</g,'').replace(/>/g, '');
    }
  }
};


// function textColorDecider()

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
  inputText(data.payload);
  showCurrentSentimentInConsole();
});
