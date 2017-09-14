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
let stars = $('.fa.fa-star');
let starCount = 3;
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
    if($('.match').length == 16){
        displayResult();
    }
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
$('.restart').click(function(e){
    init();
});
function adjustStars(){
    if(counter<25){
        starcount = 3;
    }else if(counter<35){
        $('#star3').css({'color':'#2B2727'});
        starCount = 2;
    }else{
        $('#star2').css({'color':'#2B2727'});
        starCount = 1;
    }
}
function displayResult(){
    $('.container').hide();
    let result = $('<div id="result-container" align="center"></div>');
    $('body').append(result);
    $('#result-container').append('<h3>Congratulations! You have won!</h3>');
    $('#result-container').append(`with ${counter} moves and ${starCount} stars.</br>`);
    $('#result-container').append('<input type="button" id="play-again" value="Play again!">');
    $('#play-again').click(function(e){
        $('#result-container').remove();
        $('.container').show();
        init();
    });
}
function init(){
    openCards = [];
    counter = 0;
    $('#star1').css({'color':'#CEA120'})
    $('#star2').css({'color':'#CEA120'})
    $('#star3').css({'color':'#CEA120'})
    $('.moves').text(counter);
    $('.card').each(function(index){
        $(this).remove();
    });
    shuffledItems.forEach(function(element) {
        deck.append(`<li class="card"><i class="fa fa-${element}"></i></li>`);
    });
    $('.card').each(function(index){
        this.addEventListener('click',function(e){
            if($(this).hasClass('match')==false && $(this).hasClass('open show')==false){
                countMoves();
                adjustStars();
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
}
init();