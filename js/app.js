let items = [
    'diamond',
    'paper-plane-o',
    'anchor',
    'bolt',
    'cube',
    'anchor',
    'leaf',
    'bicycle',
    'diamond',
    'bomb',
    'leaf',
    'bomb',
    'bolt',
    'bicycle',
    'paper-plane-o',
    'cube'
];
let openCards = [];
let counter = 0;
$('.moves').text(counter);
let shuffledItems = shuffle(items);
let deck = $('.deck');
let starCount = 3;
let min = 0;
let sec = 0;
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

setInterval(function countTime(){
    sec++;
    if(sec == 60){
        min++;
        sec = 0;
        $('#minutes').text(`${min} min`);
        $('#seconds').text(`${sec} sec`);
    }else{
        $('#seconds').text(`${sec} sec`);
    }
},1000);
/**
 * @description show the cars, stores the element in openCards array
 * @param {web element} element 
 */
function displayCard(element) {
    element.addClass('open show');
    openCards.push(element);
}

/**
 * @description freeze cards when two cards matched
 */
function freezCards() {
    openCards.forEach(function(element) {
        element.removeClass('open show');
        element.addClass('match');
    });
    openCards = [];
    if ($('.match').length == 16) {
        displayResult();
    }
}

/**
 * @description close the cards if the cards do not match
 */
function closeCards() {
    openCards.forEach(function(element) {
        element.addClass('incorrect');
        setTimeout(function() {
            element.removeClass('open show incorrect');
        }, 800);
    });
    openCards = [];
}

/**
 * @description count the moves and update moves to html
 */
function countMoves() {
    counter++;
    $('.moves').text(counter);
}

/**
 * call the init function for click on restart.
 */
$('.restart').click(function(e) {
    init();
});

/**
 * @description adjusting stars depends on moves
 */
function adjustStars() {
    if (counter < 25) {
        starcount = 3;
    } else if (counter < 35) {
        $('#star3').css({
            'color': '#2B2727'
        });
        starCount = 2;
    } else {
        $('#star2').css({
            'color': '#2B2727'
        });
        starCount = 1;
    }
}

/**
 * @description display the results after the game won. call init function for click on play again
 */
function displayResult() {
    $('.container').hide();
    let result = $('<div id="result-container" align="center"></div>');
    $('body').append(result);
    $('#result-container').append('<h3>Congratulations! You have won!</h3>');
    $('#result-container').append(`with ${counter} moves and ${starCount} stars.</br>`);
    $('#result-container').append('<input type="button" id="play-again" value="Play again!">');
    $('#play-again').click(function(e) {
        $('#result-container').remove();
        $('.container').show();
        init();
    });
}

/**
 * @description adding listeners to the cards and calling different functions.
 */
function init() {
    openCards = [];
    counter = 0;
    min = 0;
    sec = 0;
    $('#star1').css({
        'color': '#CEA120'
    });
    $('#star2').css({
        'color': '#CEA120'
    });
    $('#star3').css({
        'color': '#CEA120'
    });
    $('.moves').text(counter);
    $('.card').each(function(index) {
        $(this).remove();
    });
    $("#minutes").text(`${min} min`);
    $("#seconds").text(`${sec} sec`);
    shuffledItems.forEach(function(element) {
        deck.append(`<li class="card"><i class="fa fa-${element}"></i></li>`);
    });
    $('.card').each(function(index) {
        this.addEventListener('click', function(e) {
            if ($(this).hasClass('match') == false && $(this).hasClass('open show') == false) {
                countMoves();
                adjustStars();
                displayCard($(this));
                if (openCards.length > 1) {
                    if (openCards[0].children().attr("class") === openCards[1].children().attr("class")) {
                        freezCards();
                    } else {
                        closeCards();
                    }
                }
            }
        });
    });
}
init();