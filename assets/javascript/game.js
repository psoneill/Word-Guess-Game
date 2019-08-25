var pickedWord;
var randomIndex;

var topTVObject = {
    name:["Planet Earth II", "Planet Earth", "Chernobyl", "Band of Brothers", "Breaking Bad", "Game of Thrones", "Blue Planet II", "The Wire"
    ,"Our Planet", "Cosmos II", "Cosmos", "Rick and Morty", "The Sopranos", "Avatar The Last Airbender", "The World at War", "Life", "Sherlock"
    ,"The Vietnam War", "The Beatles Anthology","Fullmetal Alchemist Brotherhood","Pew News", "The Twilight Zone", "Human Planet"
    ,"The Blue Planet", "Firefly"],
    imgSource:["assets/images/PlanetEarthII.jpg", "assets/images/PlanetEarth.jpg", "assets/images/Chernobyl.jpg", "assets/images/BandofBrothers.jpg"
    ,"assets/images/BreakingBad.jpg", "assets/images/GameofThrones.jpg", "assets/images/BluePlanetII.jpg", "assets/images/TheWire.jpg"
    ,"assets/images/OurPlanet.jpg","assets/images/CosmosII.jpg", "assets/images/Cosmos.jpg", "assets/images/RickandMorty.jpg"
    ,"assets/images/TheSopranos.jpg","assets/images/AvatarTheLastAirbender.jpg", "assets/images/TheWorldatWar.jpg","assets/images/Life.jpg"
    ,"assets/images/Sherlock.jpg","assets/images/TheVietnamWar.jpg", "assets/images/TheBeatlesAnthology.jpg"
    ,"assets/images/FullmetalAlchemistBrotherhood.jpg","assets/images/PewNews.jpg","assets/images/TheTwilightZone.jpg"
    , "assets/images/HumanPlanet.jpg", "assets/images/TheBluePlanet.jpg", "assets/images/Firefly.jpg"],
    detail:["#1 - 9.5 (2016)", "#2 - 9.4 (2006)", "#3 - 9.4 (2019)", "#4 - 9.5 (2001)", "#5 - 9.4 (2008)", "#6 - 9.3 (2011)", "#7 - 9.3 (2017)"
    ,"#8 - 9.3 (2002)","#9 - 9.3 (2019)", "#10 - 9.2 (2014)", "#11 - 9.2 (1980)", "#12 - 9.2 (2013)", "#13 - 9.2 (1999)", "#14 - 9.1 (2005)"
    ,"#15 - 9.1 (1973)", "#16 - 9.1 (2009)", "#17 - 9.1 (2010)","#18 - 9.1 (2017)", "#19 - 9.1 (1995)","#20 - 9.0 (2009)","#21 - 9.0 (2018)"
    ,"#22 - 9.0 (1959)", "#23 - 9.0 (2011)","#24 - 9.0 (2001)", "#25 - 9.0 (2002)"],
    link:["https://www.imdb.com/title/tt5491994/", "https://www.imdb.com/title/tt0795176/", "https://www.imdb.com/title/tt7366338/"
    ,"https://www.imdb.com/title/tt0185906/", "https://www.imdb.com/title/tt0903747/", "https://www.imdb.com/title/tt0944947/", "https://www.imdb.com/title/tt6769208/"
    ,"https://www.imdb.com/title/tt0306414/","https://www.imdb.com/title/tt9253866/", "https://www.imdb.com/title/tt2395695/", "https://www.imdb.com/title/tt0081846/"
    ,"https://www.imdb.com/title/tt2861424/", "https://www.imdb.com/title/tt0141842/", "https://www.imdb.com/title/tt0417299/", "https://www.imdb.com/title/tt0071075/"
    ,"https://www.imdb.com/title/tt5442430/", "https://www.imdb.com/title/tt1475582/","https://www.imdb.com/title/tt1877514/", "https://www.imdb.com/title/tt0111893/"
    ,"https://www.imdb.com/title/tt1355642/","https://www.imdb.com/title/tt9566030/", "https://www.imdb.com/title/tt0052520/", "https://www.imdb.com/title/tt1806234/"
    ,"https://www.imdb.com/title/tt0296310/", "https://www.imdb.com/title/tt0303461/"]
}    

window.onload = function() {
    pickRandomWord();
};

document.onkeyup = function(e) {
    var guessesRemaining = document.getElementById("guessesRemaining");

    // Determines which key was pressed.
    var userGuess = e.key;
    var letterString = "letter" + userGuess.toUpperCase();
    var letter = document.getElementById(letterString);

    if(!letter.classList.contains("letterPicked")) {
        letter.classList.add("letterPicked");
        guessesRemaining.textContent = parseInt(guessesRemaining.textContent) - 1;

        if(pickedWord.toLowerCase().indexOf(userGuess) != -1) {
            document.getElementById("rightSound").play();
            var userGuessIndex = [];
            for(var i=0; i<pickedWord.length;i++) {
                if (pickedWord[i].toLowerCase() === userGuess) userGuessIndex.push(i);
            }

            userGuessIndex.forEach(function(element) {
                var currentGuess = document.getElementById("gameWord").textContent; 
                currentGuess = currentGuess.substr(0, element) + pickedWord[element] + currentGuess.substr(element + 1);
                document.getElementById("gameWord").textContent = currentGuess;
            });
        } else {
            document.getElementById("wrongSound").play();
        }

        
    }

    if(document.getElementById("gameWord").textContent === pickedWord.replace(/ /g,"+")) 
    {  
        document.getElementById("winSound").play();
        alert("You Win!");
        document.getElementById("winsTotal").textContent = parseInt(document.getElementById("winsTotal").textContent) + 1;
        document.getElementById("tvImage").src = topTVObject.imgSource[randomIndex];
        document.getElementById("tvName").textContent = topTVObject.name[randomIndex];
        document.getElementById("tvDetail").textContent = topTVObject.detail[randomIndex];
        document.getElementById("tvLink").href = topTVObject.link[randomIndex];
        gameReset();
    }

    if(guessesRemaining.textContent === "0")
    {
        document.getElementById("loseSound").play();
        alert("You Lose!");
        gameReset();
    }
  }

  function pickRandomWord(){
    randomIndex = Math.floor(Math.random() * topTVObject.name.length);
    var randomTopTV = topTVObject.name[randomIndex];
    pickedWord = randomTopTV.replace(/ /g, "+");
    document.getElementById("gameWord").textContent = pickedWord.replace(/[^+ ]/g, "_");
  }

  function gameReset() {
    var pickedLetters = document.getElementsByClassName('letterPicked');    
       
    while(pickedLetters.length > 0){
        pickedLetters[0].classList.remove('letterPicked');
    }

    guessesRemaining.textContent = "15";
    pickRandomWord();
  }