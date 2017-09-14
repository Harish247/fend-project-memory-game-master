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
shuffledItems.forEach(function(element) {
    deck.append(`<li class="card"><i class="fa fa-${element}"></i></li>`);
});

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

let cards = $('.card');
cards.each(function(index){
    this.addEventListener('click',function(e){
        if($(this).hasClass('match')==false && $(this).hasClass('open show')==false){
            countMoves();
            displayCard($(this));
            if(openCards.length>1){
                if(openCards[0].children().attr("class") === openCards[1].children().attr("class")){
                    freezCards();
                }else{
                    closeCards();
                }
            }
        }
    });
});

function displayCard(element){
    element.addClass('open show');
    openCards.push(element);
}
function freezCards(){
    openCards.forEach(function(element) {
        element.removeClass('open show');
        element.addClass('match');   
    });
    openCards = [];
}
function closeCards(){
    openCards.forEach(function(element) {
        element.addClass('incorrect');
        setTimeout(function(){
            element.removeClass('open show incorrect');
        },800);
    });
    openCards = [];
}
function countMoves(){
    counter++;
    $('.moves').text(counter);
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
