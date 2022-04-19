/* Array of Rank */
let ranks = ['A', 'K', 'Q', 'J',
  'T', '9', '8', '7', '6',
  '5', '4', '3', '2'
];

/* Array of Suit */
let suits = ['H', 'C', 'D', 'S'];


let textArea = document.getElementById('text-area');
let newGame = document.getElementById('nw-game');
let hitBtn = document.getElementById('hitMe');
let standBtn = document.getElementById('stand');

hitBtn.style.display = 'none';
standBtn.style.display = 'none';

let gameStart = false,
  gameOver = false,
  playWon = false,
  dealerCards = [],
  playerCards = [],
  dealerScore = 0,
  playerScore = 0,
  deck = [];

/* Start New Game */
newGame.addEventListener('click', () => {
  gameStarted = true;
  gameOver = false;
  playerWon = false;

  deck = createDeck();
  shuffleDeck(deck);
  dealerCards = [getCard(), getCard()]; /** An array of cards representing the Deck. */
  playerCards = [getCard(), getCard()]; /** An array of cards representing the Deck. */
  newGame.style.display = 'none';
  hitBtn.style.display = 'inline';
  standBtn.style.display = 'inline';
  showStatus();
})

/** Creates a new set of cards. */
let createDeck = () => {
  let deck = [];
  for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
    for (let rankIdx = 0; rankIdx < ranks.length; rankIdx++) {
      let card = {
        suit: suits[suitIdx],
        rank: ranks[rankIdx]
      }
      deck.push(card);
    }
  }
  return deck;
}


/* An array of Cards representing the shuffled version of the deck.*/
let shuffleDeck = deck => {
  for(let i=0; i<deck.length; i++)
  {
    let swapIdx = Math.trunc(Math.random() *deck.length);
    let tmp = deck[swapIdx];
    deck[swapIdx] = deck[i];
    deck[i] = tmp; 
  }
}

/* Hit Button */
hitBtn.addEventListener('click', () => {
  playerCards.push(getCard());
  checkForEndOfGame();
  showStatus();
});

/* Stand Button */
standBtn.addEventListener('click', () => {
  gameOver = true;
  checkForEndOfGame();
  showStatus();
});


/* Checking th final Result*/
let checkForEndOfGame = () => {
  updateScores();
  
  if(gameOver){
    while(dealerScore < playerScore && playerScore <=21 && dealerScore <=21)
    {
      if (dealerCards.length == 21 && dealerCards.length == -1) {
        console.log(dealerCards);
        break;
        console.log(dealerCards);
      }

      dealerCards.push(getCard());
      updateScores();

    }
  }
    
    if(playerScore>21){
      playerWon=false;
      gameOver = true;
    }
    
    else if(dealerScore>21){
      playerWon = true;
      gameOver = true;
    }
    
    else if(gameOver){
      if(playerScore>dealerScore){
        playerWon = true;
      }
      else{
        playerWon = false;
      }
    }
}

let getCardString = card => {
  return card.rank + " of " + card.suit;
}

/** @returns {Number} The value of the card for scoring. */
let getCardNumericRank = card => {
  switch(card.rank){
    case 'A':
      return 1;
    case '2':
      return 2;
    case '3':
      return 3;
    case '4':
      return 4;
    case '5':
      return 5;
    case '6':
      return 6;
    case '7':
      return 7;
    case '8':
      return 8;
    case '9':
      return 9;
    default:
      return 10; 
  }
}

let showStatus = () => {
  if(!gameStarted)
  {
    textArea.innerText = 'Welcome to Pontoon!';
    return; 
  }
  
  let dealerCardString = '';
  for(let i=0; i<dealerCards.length; i++)
  {
    dealerCardString += getCardString(dealerCards[i]) + '\n';
  }
  let playerCardString='';
  for(let i=0; i<playerCards.length; i++)
  {
    playerCardString += getCardString(playerCards[i]) + '\n';
  }
  
  updateScores();

  let dealer = dealerCards.map(function(dealerCard) {
    return dealerCard['rank']+dealerCard['suit'];
  });

  let player = playerCards.map(function(playerCard) {
    return playerCard['rank']+playerCard['suit'];
  });

  console.log(dealer);
  console.log(player);
  /* Output the result of the round. */
  textArea.innerText = 'Dealer has:\n' +
                        dealerCardString +
                        '(score: ' + dealerScore + ')\n\n' +
                        
                        'Player has:\n' +
                        playerCardString + 
                        '(score: ' + playerScore + ')\n\n';
                        
  if(gameOver){
    if(playerScore <= 21 && playerCards.length >= 5)
    {
      textArea.innerText += "YOU WIN! with 5 Card Trick";
      console.log("YOU WIN! with 5 Card Trick");
    }
    else if(playerScore > 21)
    {
      textArea.innerText += "YOU Busted! DEALER WINS";
      console.log("YOU Busted! DEALER WINS");
    }
    else if(dealerScore > 21)
    {
      textArea.innerText += "DEALER Busted! YOU WINS";
      console.log("DEALER Busted! YOU WINS");
    }
    else if(playerWon)
    {
      textArea.innerText += "YOU WIN!";
      console.log("YOU WIN!");
    }
    else{
      textArea.innerText += "DEALER WINS";
      console.log("DEALER WINS");
    }

    newGame.style.display = 'inline';
    hitBtn.style.display = 'none';
    standBtn.style.display = 'none';
    
  }
}

/** @returns {Number} The score. */
let getScore = cardArray => {
  let score = 0;
  let hasAce = false;
  for(let i=0; i<cardArray.length; i++){
    let card = cardArray[i];
    score += getCardNumericRank(card);
    /* Check to see if Aces should be 1 or 11 */
    if(card.rank == 'Ace'){
      hasAce = true;
    }
    if(hasAce && score+10<=21){
      return score+10;
    }
  }
   return score; 
}


/** Update your score and card display. */
let updateScores = () => {
  dealerScore = getScore(dealerCards);
  playerScore = getScore(playerCards); 
}


let getCard = () => {
  return deck.shift();
}
