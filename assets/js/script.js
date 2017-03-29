document.addEventListener('DOMContentLoaded', function () {
  var buttonAdd = document.querySelector('.add')
  var buttonPass = document.querySelector('.pass')
  var buttonBet = document.querySelector('.bet')
  var game = new Game()
  var player1Cards = document.querySelectorAll('.player1 .cards')
  var computerCards = document.querySelectorAll('.computer .cards')
  var creditsLeft = document.querySelector('h1')

  console.log(creditsLeft)
  function Game () {
    this.currentPlayer = 0
    this.isGameOver = false
    this.player = []
    this.credits = 1000
  }

  function displayCards (player, num, div) {
    buttonAdd.disabled = false
    for (var j = 1; j < 53; j++) {
      if (game.player[player].cards[num].card === j) {
            // div[num].setAttribute('style', "background-color: white")
              // div[num].style.backgroundColor = 'white';
            div[num].setAttribute('style', "background-image: url('./assets/cards-img/" + j + '.png')

      }
    }
  }

  function removeDisplay (player, num, div) {
    buttonAdd.disabled = true
    player1Cards[0].removeAttribute('style')
    player1Cards[1].removeAttribute('style')
    computerCards[0].removeAttribute('style')
    computerCards[1].removeAttribute('style')
  }

  Game.prototype.newGame = function () {
    buttonAdd.disabled = true
    buttonPass.disabled = true
    this.player.push(new Player(), new Player())
    // this.player[this.currentPlayer].bet()
    displayCards(0, 1, player1Cards)
    displayCards(0, 0, player1Cards)
    displayCards(1, 0, computerCards)
    this.blackJack()
  }

  Game.prototype.switchPlayer = function () {
    buttonAdd.disabled = true
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
    setTimeout(function () {
      if (confirm('Play again?')) {
        removeDisplay()
        this.currentPlayer = 0
        this.isGameOver = false
        this.player = []
        this.knownCards = []
        this.betAmount = 0

        computerCards[1].setAttribute('id', 'hide')
        var newCards = document.querySelectorAll('.newCards')
        for (var i = 0; i < newCards.length; i++) {
          newCards[i].parentNode.removeChild(newCards[i])
        }
        alert('New game started, please enter your bet.')
      } else {
        alert('Have a good day!')
      }
    }.bind(this), 1300)
  }

  Game.prototype.whoWon = function () {
    buttonAdd.disabled = false
    if (this.player[1].cardscore > 21) {
      setTimeout(function () { alert('You Won!') }, 1300)
      game.credits = game.credits + game.betAmount
      updateCredits()
      game.restart()
      console.log(game.credits, game.betAmount)
      return game.credits
    } else if (this.player[1].cardscore > this.player[0].cardscore) {
      setTimeout(function () { alert('Computer Won!') }, 1300)
      game.credits = game.credits - game.betAmount
      updateCredits()
      game.restart()
      console.log(game.credits, game.betAmount)
      return game.credits
    } else if (this.player[0].cardscore > this.player[1].cardscore) {
      setTimeout(function () { alert('You Won!') }, 1300)
      game.credits = game.credits + game.betAmount
      updateCredits()
      game.restart()
      console.log(game.credits, game.betAmount)
      return game.credits
    } else {
      setTimeout(function () { alert('It\'s a tie!') }, 1300)
      updateCredits()
      game.credits = game.credits
      game.restart()
      console.log(game.credits)
      return game.credits
    }
  }

  Game.prototype.blackJack = function () {
    buttonAdd.disabled = false
    if (this.player[0].cards.length === 2 && this.player[0].cardscore === 21 && this.player[1].cards.length === 2 && this.player[1].cardscore === 21) {
      setTimeout(function () { alert('It\'s a tie!') }, 1300)
      displayCards(1, 1, computerCards)
      computerCards[1].removeAttribute('id')
      updateCredits()
      game.restart()
      game.credits = game.credits
      console.log(game.credits)
      return game.credits
    } else if (this.player[0].cards.length === 2 && this.player[0].cardscore === 21) {
      setTimeout(function () { alert('You Won!') }, 1300)
      displayCards(1, 1, computerCards)
      computerCards[1].removeAttribute('id')
      game.credits = game.credits + game.betAmount
      updateCredits()
      game.restart()
      console.log(game.credits, game.betAmount)
      return game.credits
    } else if (this.player[1].cards.length === 2 && this.player[1].cardscore === 21) {
      setTimeout(function () { alert('Computer Won!') }, 1300)
      displayCards(1, 1, computerCards)
      computerCards[1].removeAttribute('id')
      game.credits = game.credits - game.betAmount
      updateCredits()
      game.restart()
      console.log(game.credits, game.betAmount)
      return game.credits
    }
  }

  function Card (card, suit, rank) {
    this.card = card // random number from 1-52
    this.suit = suit // 1-clubs, 2-diamonds,3-hearts,4-spades
    this.rank = rank  // 1-13, ace = 1, j = 11, q = 12, k = 13
  }

  function Player (name) {
    this.name = name
    this.cards = [deal(), deal()]
    this.pass = false
    this.cardscore = this.score()
  }
  var deal = function () {
    buttonAdd.disabled = false // general action of dealing
    var card = Math.floor(Math.random() * 52 + 1)
    var rank = card % 13
    var suit = card % 4
    return new Card(card, suit, rank)
  }

  Player.prototype.pass = function () {
    this.pass = true
    return this.pass
  }
  Player.prototype.hit = function () {
    this.cards.push(deal())
    this.score()
    this.cards.forEach(function (card) {
      console.log(this.cardscore)
      if (card.rank === 1 && this.cardscore > 21) {
        console.log(card.rank)
        console.log(this.cardscore)
        this.cardscore = this.cardscore - 10
        console.log(this.cardscore)
      }
    }.bind(this))
    if (this.cardscore > 21) {
      setTimeout(function () { alert('Computer Won!') }, 300)
      game.credits = game.credits - game.betAmount
      updateCredits()
      game.restart()
      console.log(game.credits)
      return game.credits
    }
  }

  function bet () {
    game.betAmount = parseInt(document.querySelector('input').value)
    if (game.betAmount < game.credits && game.betAmount) {
      console.log('game start')
      game.newGame()
      updateCredits()
      console.log(game.betAmount)
      buttonAdd.disabled = false
      buttonPass.disabled = false
      return game.betAmount
    } else {
      alert("Bet amount is invalid. What's your bet? You have " + game.credits + ' credits currently')
    }

    console.log('play game')
  }

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

  function value (rank) {
    if (rank === 11 || rank === 12 || rank === 0) {
      return 10
    } else if (rank === 1) {
      return 11
    } else {
      return rank
    }
  }

  function computerAI () {
    buttonAdd.disabled = true
    displayCards(1, 1, computerCards)
    computerCards[1].removeAttribute('id')
    while (game.currentPlayer !== 0) {
      if (game.player[game.currentPlayer].cardscore < 16) {
        addCard()
      } else {
        game.whoWon()
        game.isGameOver = true
        return game.isGameOver
      }
    }
  }

  var addCard = function () {
    buttonAdd.disabled = false
    buttonPass.disabled = false
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

  function pass () {
    buttonAdd.disabled = true
    game.player[game.currentPlayer].pass = true
    game.switchPlayer()
  }

  function updateCredits () {
    creditsLeft.innerHTML = 'Credits Left: ' + game.credits
  }

  // game.newGame()
  alert("What's your bet? You have " + game.credits + ' credits currently')
  buttonAdd.addEventListener('click', addCard)
  buttonPass.addEventListener('click', pass)
  buttonBet.addEventListener('click', bet)

  // console.log(game)
  // console.log(game.player[0].cards)
  // console.log(game.player[0].cardscore)
  // console.log(game.player[1].cards)
  // console.log(game.player[1].cardscore)

  //
  //

  // }
//
})
