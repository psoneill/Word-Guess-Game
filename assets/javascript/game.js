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
    ,"https://www.imdb.com/title/tt0296310/", "https://www.imdb.com/title/tt0303461/"],
    pickRandomWord: function() {
        randomIndex = Math.floor(Math.random() * topTVObject.name.length);
        var randomTopTV = topTVObject.name[randomIndex];
        pickedWord = randomTopTV.replace(/ /g, "+");
        document.getElementById("gameWord").textContent = pickedWord.replace(/[^+ ]/g, "_");
    }
}    

window.onload = function() {
    //when the window loads pick a random word
    topTVObject.pickRandomWord();
};

document.onkeyup = function(e) {
    //sets the document span element "guessesRemaining" to the variable guessesRemaining
    var guessesRemaining = document.getElementById("guessesRemaining");

    // Determines which key was pressed.
    var userGuess = e.key;
    
    //dynamically gets letter elementID on html page and sets element to var letter
    var letterString = "letter" + userGuess.toUpperCase();
    var letter = document.getElementById(letterString);

    //check if letter has already been picked    
    if(!letter.classList.contains("letterPicked")) {
        //add class letterPicked which highlights the letter on page
        letter.classList.add("letterPicked");
        //remove one guess from guessesRemaining
        guessesRemaining.textContent = parseInt(guessesRemaining.textContent) - 1;

        //checks if letter was in the answer string
        if(pickedWord.toLowerCase().indexOf(userGuess) != -1) {
            //plays correct sound when letter is correct
            document.getElementById("rightSound").play();

            //sets userGuessIndex array
            var userGuessIndex = [];
            //loops through correct word to find all indexes of userGuess
            for(var i=0; i<pickedWord.length;i++) {
                if (pickedWord[i].toLowerCase() === userGuess) userGuessIndex.push(i);
            }

            //loops through userGuessIndex array and replaces currentGuess on screen with correct letters
            userGuessIndex.forEach(function(element) {
                var currentGuess = document.getElementById("gameWord").textContent; 
                currentGuess = currentGuess.substr(0, element) + pickedWord[element] + currentGuess.substr(element + 1);
                document.getElementById("gameWord").textContent = currentGuess;
            });
        } else {
            //plays the wrong Sound on a wrong answer
            document.getElementById("wrongSound").play();
        }
    }

    //checks if user Won the game
    if(document.getElementById("gameWord").textContent === pickedWord.replace(/ /g,"+")) 
    {  
        //plays winning Sound when pickedword matches gameWord
        document.getElementById("winSound").play();
        alert("You Win!");
        //adds one Win to total
        document.getElementById("winsTotal").textContent = parseInt(document.getElementById("winsTotal").textContent) + 1;
        //changes the Image, Name, Detail, and Link 
        document.getElementById("tvImage").src = topTVObject.imgSource[randomIndex];
        document.getElementById("tvName").textContent = topTVObject.name[randomIndex];
        document.getElementById("tvDetail").textContent = topTVObject.detail[randomIndex];
        document.getElementById("tvLink").href = topTVObject.link[randomIndex];
        //resets the game
        gameReset();
    }

    if(guessesRemaining.textContent === "0")
    {
        //if guessesRemaining equal zero then play game Lose sound and reset the game
        document.getElementById("loseSound").play();
        alert("You Lose!");
        gameReset();
    }
  }

  function gameReset() {
    var pickedLetters = document.getElementsByClassName('letterPicked');    
    //removed letterPicked CSS class from each element with class letterPicked
    while(pickedLetters.length > 0){
        pickedLetters[0].classList.remove('letterPicked');
    }
    //reset guessesRemaining to 13
    guessesRemaining.textContent = "13";
    //pick a new random word
    topTVObject.pickRandomWord();
  }