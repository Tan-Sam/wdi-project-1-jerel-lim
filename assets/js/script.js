document.addEventListener('DOMContentLoaded', function () {
  var buttonAdd = document.querySelector('.add')
  var buttonPass = document.querySelector('.pass')
  var buttonBet = document.querySelector('.bet')
  var buttonPlay = document.querySelector('.play')
  var player1Cards = document.querySelectorAll('.player1 .cards')
  var computerCards = document.querySelectorAll('.computer .cards')
  var creditsLeft = document.querySelector('.container h1')
  var game = new Game()

// set up game constructor and prototypes
  function Game () {
    this.currentPlayer = 0
    this.player = []
    this.credits = 1000
  }

  Game.prototype.newGame = function () {
    buttonAdd.disabled = true
    buttonPass.disabled = true
    buttonPlay.disabled = true
    buttonBet.disabled = false
    this.player.push(new Player(), new Player())
    displayCards(0, 1, player1Cards)
    displayCards(0, 0, player1Cards)
    displayCards(1, 0, computerCards)
    this.blackJack()
  }

  Game.prototype.switchPlayer = function () {
    buttonAdd.disabled = true
    buttonPass.disabled = true
    buttonBet.disabled = true
    buttonPlay.disabled = true
    if (this.currentPlayer === 0 && this.player[0].pass === 'false') {
      this.currentPlayer = 0
    } else {
      this.currentPlayer = 1
      computerAI()
    }
  }

  Game.prototype.restart = function () {
    buttonAdd.disabled = true
    buttonPass.disabled = true
    buttonBet.disabled = false
    buttonPlay.disabled = true
    setTimeout(function () {
      if (confirm('Play again?')) {
        removeDisplay()
        this.currentPlayer = 0
        this.player = []
        this.knownCards = []
        this.betAmount = 0

        computerCards[1].setAttribute('id', 'hide')
        var newCards = document.querySelectorAll('.newCards')
        for (var i = 0; i < newCards.length; i++) {
          newCards[i].parentNode.removeChild(newCards[i])
        }
        alert('New round started, please enter your bet.')
      } else {
        alert('Have a good day!')
      }
    }.bind(this), 1300)
  }

  Game.prototype.whoWon = function () {
    buttonAdd.disabled = true
    buttonPass.disabled = true
    buttonBet.disabled = true
    buttonPlay.disabled = true
    if (this.player[1].cardscore > 21) {
      setTimeout(function () { alert('You Won!') }, 1300)
      game.credits = game.credits + game.betAmount
      updateCredits()
      game.restart()
      return game.credits
    } else if (this.player[0].cardscore > 21) {
      setTimeout(function () { alert('Computer Won!') }, 1300)
      game.credits = game.credits - game.betAmount
      updateCredits()
      game.restart()
      return game.credits
    } else if (this.player[1].cardscore < 22 && this.player[1].cardscore > this.player[0].cardscore) {
      setTimeout(function () { alert('Computer Won!') }, 1300)
      game.credits = game.credits - game.betAmount
      updateCredits()
      game.restart()
      return game.credits
    } else if (this.player[0].cardscore < 22 && this.player[0].cardscore > this.player[1].cardscore) {
      setTimeout(function () { alert('You Won!') }, 1300)
      game.credits = game.credits + game.betAmount
      updateCredits()
      game.restart()
      return game.credits
    } else {
      setTimeout(function () { alert('It\'s a tie!') }, 1300)
      updateCredits()
      game.credits = game.credits
      game.restart()
      return game.credits
    }
  }

  Game.prototype.blackJack = function () {
    buttonAdd.disabled = true
    buttonPass.disabled = true
    buttonBet.disabled = true
    buttonPlay.disabled = true
    if (this.player[0].cards.length === 2 && this.player[0].cardscore === 21 && this.player[1].cards.length === 2 && this.player[1].cardscore === 21) {
      setTimeout(function () { alert('It\'s a tie!') }, 1300)
      displayCards(1, 1, computerCards)
      computerCards[1].removeAttribute('id')
      updateCredits()
      game.restart()
      game.credits = game.credits
      return game.credits
    } else if (this.player[0].cards.length === 2 && this.player[0].cardscore === 21) {
      setTimeout(function () { alert('You Won!') }, 1300)
      displayCards(1, 1, computerCards)
      computerCards[1].removeAttribute('id')
      game.credits = game.credits + game.betAmount
      updateCredits()
      game.restart()
      return game.credits
    } else if (this.player[1].cards.length === 2 && this.player[1].cardscore === 21) {
      setTimeout(function () { alert('Computer Won!') }, 1300)
      displayCards(1, 1, computerCards)
      computerCards[1].removeAttribute('id')
      game.credits = game.credits - game.betAmount
      updateCredits()
      game.restart()
      return game.credits
    }
  }

// Card constructor
  function Card (card, suit, rank) {
    this.card = card // random number from 1-52
    this.suit = suit // 1-clubs, 2-diamonds,3-hearts,4-spades
    this.rank = rank  // 1-13, ace = 1, j = 11, q = 12, k = 13
  }

// Player Constructor
  function Player (name) {
    this.name = name
    this.cards = [deal(), deal()]
    this.pass = false
    this.cardscore = this.score()
  }
// players passing
  Player.prototype.pass = function () {
    this.pass = true
    return this.pass
  }

  // players getting additional cards
  Player.prototype.hit = function () {
    this.cards.push(deal())
    this.score()
    this.cards.forEach(function (card) {
      if (card.rank === 1 && this.cardscore > 21) {
        this.cardscore = this.cardscore - 10
      }
    }.bind(this))
    if (this.cardscore > 21) {
      return game.whoWon()
    }
  }

  // updating player score
  Player.prototype.score = function () {
    var arrayValue = this.cards.map(function (card) {
      return value(card.rank)
    })
    var score = arrayValue.reduce(function (accu, val) {
      return accu + val
    })
    this.cardscore = score
    return this.cardscore
  }

  // dealing the cards to players
  var deal = function () {
    buttonAdd.disabled = false
    buttonPass.disabled = false
    buttonBet.disabled = true
    buttonPlay.disabled = true
    var card = Math.floor(Math.random() * 52 + 1)
    var rank = card % 13
    var suit = card % 4
    return new Card(card, suit, rank)
  }

  // calculating score from cards dealt
  function value (rank) {
    if (rank === 11 || rank === 12 || rank === 0) {
      return 10
    } else if (rank === 1) {
      return 11
    } else {
      return rank
    }
  }
  // bet amount
  function bet () {
    game.betAmount = parseInt(document.querySelector('input').value)
    if (game.betAmount <= game.credits && game.betAmount) {
      game.newGame()
      updateCredits()
      displayChips()
      buttonAdd.disabled = false
      buttonPass.disabled = false
      buttonBet.disabled = true
      buttonPlay.disabled = true
      return game.betAmount
    } else {
      buttonAdd.disabled = true
      buttonPass.disabled = true
      buttonBet.disabled = false
      buttonPlay.disabled = true

      alert("Bet amount is invalid. What's your bet? You have " + game.credits + ' credits currently')
    }
  }
  // pass turn
  function pass () {
    buttonAdd.disabled = true
    buttonPass.disabled = true
    buttonBet.disabled = true
    buttonPlay.disabled = true
    game.player[game.currentPlayer].pass = true
    game.switchPlayer()
  }
// computer AI actions
  function computerAI () {
    buttonAdd.disabled = true
    buttonPass.disabled = true
    buttonBet.disabled = true
    buttonPlay.disabled = true
    displayCards(1, 1, computerCards)
    computerCards[1].removeAttribute('id')
    while (game.currentPlayer !== 0) {
      if (game.player[game.currentPlayer].cardscore < 16) {
        addCard()
      } else if (game.player[game.currentPlayer].cardscore > 15 && game.player[game.currentPlayer].cardscore < 22) {
        return game.whoWon()
      } else {
        return true
      }
    }
  }

// displaying cards of players
  function displayCards (player, num, div) {
    buttonAdd.disabled = false
    buttonPass.disabled = false
    buttonBet.disabled = true
    buttonPlay.disabled = true
    console.log('displaycard', 'bet', 'play')
    div[num].setAttribute('style', "background-image: url('./assets/cards-img/" + game.player[player].cards[num].card + '.png')
  }

  // removing display of cards
  function removeDisplay (player, num, div) {
    buttonAdd.disabled = true
    buttonPass.disabled = true
    buttonBet.disabled = false
    buttonPlay.disabled = true
    player1Cards[0].removeAttribute('style')
    player1Cards[1].removeAttribute('style')
    computerCards[0].removeAttribute('style')
    computerCards[1].removeAttribute('style')
  }

  // adding card display and calling hit function upon clicking add button
  var addCard = function () {
    buttonAdd.disabled = false
    buttonPass.disabled = false
    buttonBet.disabled = true
    buttonPlay.disabled = true
    if (game.currentPlayer === 0) {
      var player1Div = document.querySelector('.player1')
      var newCard = document.createElement('div')
      newCard.classList.add('cards', 'newCards')
      player1Div.appendChild(newCard)
      game.player[game.currentPlayer].hit()
      var player1Cards = document.querySelectorAll('.player1 .cards')
      displayCards(0, player1Cards.length - 1, player1Cards)
    } else {
      var computerDiv = document.querySelector('.computer')
      var newComputerCard = document.createElement('div')
      newComputerCard.classList.add('cards', 'newCards')
      computerDiv.appendChild(newComputerCard)
      game.player[game.currentPlayer].hit()
      var computerCards = document.querySelectorAll('.computer .cards')
      displayCards(1, computerCards.length - 1, computerCards)
    }
  }
// updating display of credits left
  function updateCredits () {
    creditsLeft.innerHTML = 'Credits Left: ' + game.credits
  }

// updating display of chips bet
  function displayChips () {
    var y = 38
    var x = 44.5
    var z = 0
    for (i = 0; i < game.betAmount / 10; i++) {
      var chiparea = document.querySelector('.chiparea')
      var newChip = document.createElement('div')
      newChip.classList.add('chips', 'newCards')
      chiparea.appendChild(newChip)
      y -= 4
      z += 1
      $('.chips:last-child').css({
        'top': y + '%',
        'left': x + '%',
        'z-index': z
      })
    }
  }

// play game, instructions to game board function
  function play () {
    $('.instructions').hide()
    $('.container').fadeIn()
    setTimeout(function () { alert("What's your bet? You have " + game.credits + ' credits currently') }, 1000)
    buttonAdd.disabled = true
    buttonPass.disabled = true
    buttonPlay.disabled = true
  }

  // buttons
  buttonAdd.addEventListener('click', addCard)
  buttonPass.addEventListener('click', pass)
  buttonBet.addEventListener('click', bet)
  buttonPlay.addEventListener('click', play)
})
