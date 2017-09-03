/*
 * Create a list that holds all of your cards
 */
var cardLists = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];

// to store number of moves and matches found
var moves = 0;
var match_found = 0;

// reference to reset button
$('#reset-button').click(resetGame);


// create and append card html
function createCard(card) {
    $('#deck').append(`<li class="card animated"><i class="fa ${card}"></i></li>`);
}

// generate random cards on the deck
function generateCards() {
    for (var i = 0;i < 2; i++){
        cardLists = shuffle(cardLists);
        cardLists.forEach(createCard);    
    }
    
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Array to keep track of open cards
openCards = [];


// card functionality
function toggleCard() {
    if (openCards.length === 0) {   
        $(this).toggleClass("show open").animateCss('flipInY');
        openCards.push($(this));
        disableCLick();
    }
    else if (openCards.length === 1) {
        // increment moves
        updateMoves();
        $(this).toggleClass("show open").animateCss('flipInY');
        openCards.push($(this));
        setTimeout(matchOpenCards,1100);
    }    
}

// Disable click of the open Cards
function disableCLick() {
    openCards.forEach(function(card) {
        card.off('click');
    });
}

// enable click on the open card
function enableClick() {
   openCards[0].click(toggleCard);
}

// check openCards if they match or not
function matchOpenCards() {
    if (openCards[0][0].firstChild.className == openCards[1][0].firstChild.className) {
        console.log("matchCard");
        openCards[0].addClass("match").animateCss('pulse');
        openCards[1].addClass("match").animateCss('pulse');
        disableCLick();
        removeOpenCards();
        setTimeout(checkWin,1000);
    }
    else {
        openCards[0].toggleClass("show open").animateCss('flipInY');
        openCards[1].toggleClass("show open").animateCss('flipInY');
        enableClick();
        removeOpenCards();
    }
}


// function to remove openCards
function removeOpenCards() {
    openCards = [];
}


// function to add animations
$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass(animationName).one(animationEnd, function() {
            $(this).removeClass(animationName);
        });
        return this;
    }
});

// update moves
function updateMoves() {
    moves += 1;
    $('#moves').html(moves);
    if (moves == 24) {
        $('#stars').children()[0].remove();
        addBlankStar();
    }
    else if (moves == 15) {
        $('#stars').children()[0].remove();
        addBlankStar();
    }
}

// check whether the game is finished or not 
function checkWin() {
    match_found += 1;
    if (match_found == 8) {
        alert("Game Over");
    }
}

// add blank stars
function addBlankStar() {
    $('#stars').append('<li><i class="fa fa-star-o"></i></li>');
}

// add initial stars
function addStars() {
    for (var i = 0; i < 3; i++) {
        $('#stars').append('<li><i class="fa fa-star"></i></li>');
    }
}

// reset the game
function resetGame() {
    moves = 0;
    match_found = 0;
    $('#deck').empty();
    $('#stars').empty();
    playGame();
}

// Init function
function playGame() {
 generateCards();
 $('.card').click(toggleCard);
 $('#moves').html(moves);
 addStars(3);    
}


// start the game
playGame();