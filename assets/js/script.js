document.addEventListener('DOMContentLoaded', function () {



  function Game () {
    this.currentPlayer = 0
    this.isGameOver = false
    this.player = []
    this.knownCards = []
  }

  Game.prototype.newGame = function () { // 2 player game with 1 AI
    this.player.push(new Player(), new Player())
    console.log(game.player[0].cards)
      console.log(game.player[0].cardscore)
    console.log(game.player[1].cards)
    console.log(game.player[1].cardscore)
    this.blackJack()
  }

  Game.prototype.switchPlayer = function () {
    if (this.currentPlayer === 0 && this.player[0].pass === 'false') {
      this.currentPlayer = 0
    } else {
      this.currentPlayer = 1
      computerAI()
    }
  }

  Game.prototype.restart = function () {
    this.currentPlayer = 0
    this.isGameOver = false
    this.player = []
    this.knownCards = []
    this.newGame()
  }

  Game.prototype.whoWon = function () {

    if (this.player[0].cardscore > 21) {
      alert('Computer Won!')
    } else if (this.player[1].cardscore > 21) {
      alert('You Won!')
    } else if (this.player[1].cardscore > this.player[0].cardscore) {
      alert('Computer Won!')
    } else if (this.player[0].cardscore > this.player[1].cardscore) {
      alert('You Won!')
    } else {
      alert('It\'s a tie')
    }
      game.restart()

  }

Game.prototype.blackJack = function(){
  if (this.player[0].cards.length === 2 && this.player[0].cardscore === 21) {
    alert('You Won!')
    game.restart()
  } else if (this.player[1].cards.length === 2 && this.player[1].cardscore === 21) {
    alert('Computer Won!')
    game.restart()
  }

}
  //
  // Game.prototype.checkGameOver = function () {
  //   if (this.player[game.currentPlayer].cards.length === 0 ) {
  //     this.isGameOver = true
  //   }
  //   return this.isGameOver
  // }

  function Card (suit, rank) {
    this.suit = suit // 1-clubs, 2-diamonds,3-hearts,4-spades
    this.rank = rank  // 1-13, ace = 1, j = 11, q = 12, k = 13
  }

  function Player (name) {
    this.name = name
    this.cards = [deal(), deal()]
    this.pass = false
    this.cardscore = this.score()

  }
  var deal = function() { //general action of dealing
    var card = Math.floor(Math.random() * 52 + 1)
    var rank = card % 13 + 1
    var suit = card % 4 + 1
    return new Card(suit, rank)
  }
  Player.prototype.pass = function() {
    this.pass = true
    return this.pass
  }
  Player.prototype.hit = function () {
    this.cards.push(deal())
    this.score()
    console.log(this)
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
      console.log(this + arrayValue)
    }

  function value (rank) {
    if (rank === 11 || rank === 12 || rank === 13) {
      return 10
    } else if (rank === 1) {
      return 11
    } else {
      return rank
    }
  }

  function addCard(){
    console.log('clicked addcard')
    var newCard = document.createElement('div')
    var player1Div = document.querySelector('.player1')
    newCard.classList += "cards"
    player1Div.appendChild(newCard)
    game.player[game.currentPlayer].hit()
    }

    function pass(){
      console.log('clicked pass')
      game.player[game.currentPlayer].pass = true
      game.switchPlayer()
      console.log(game)
      }
  //
  // var computer = new Player('Computer')
  // var player1 = new Player('Joe') // have to link new player function to button
  var buttonAdd = document.querySelector(".add")
  var buttonPass = document.querySelector(".pass")
  var game = new Game()

  // console.log(game)
  game.newGame()
    console.log(game)
  //
  //
  //
  buttonAdd.addEventListener('click', addCard)
  buttonPass.addEventListener('click', pass)




  function computerAI () {
    while (game.currentPlayer !== 0) {
      if (game.player[game.currentPlayer].cardscore < 16) {
        game.player[game.currentPlayer].hit()
        }
      else {
        game.whoWon()
        game.isGameOver = true
        return game.isGameOver
        console.log(game)
        }
      }

  }

  console.log(game.player[0].cards)
    console.log(game.player[0].cardscore)
  console.log(game.player[1].cards)
  console.log(game.player[1].cardscore)


  //
  //

  // }
//
//
//
// var player1Score = value1 + value2
// console.log(player1Score)
//

//
//   var totalMoves = [0, 0, 0, 0, 0, 0, 0, 0, 0]
//   var player = 1
//
//   function restart () {
//     totalMoves = [0, 0, 0, 0, 0, 0, 0, 0, 0]
//     player = 1
//     $('.box').html('')
//   }
//
//   function isGameOver () {
//     console.log('gameover was called')
//     if (whoWon()) {
//       restart()
//       return true
//     }
//     return false
//   }
//
//   function whoWon () {
//     console.log('whoWon was called')
//     if (totalMoves[0] === totalMoves[1] && totalMoves[0] === totalMoves[2] && totalMoves[0]) {
//       alert(totalMoves[0] + 'won')
//       return totalMoves[0]
//     } else if (totalMoves[3] === totalMoves[4] && totalMoves[3] === totalMoves[5] && totalMoves[3]) {
//       alert(totalMoves[3] + 'won')
//       return totalMoves[3]
//     } else if (totalMoves[6] === totalMoves[7] && totalMoves[6] === totalMoves[8] && totalMoves[6]) {
//       alert(totalMoves[6] + 'won')
//       return totalMoves[6]
//     } else if (totalMoves[0] === totalMoves[3] && totalMoves[0] === totalMoves[6] && totalMoves[0]) {
//       alert(totalMoves[0] + 'won')
//       return totalMoves[0]
//     } else if (totalMoves[1] === totalMoves[4] && totalMoves[1] === totalMoves[7] && totalMoves[1]) {
//       alert(totalMoves[1] + 'won')
//       return totalMoves[1]
//     } else if (totalMoves[2] === totalMoves[5] && totalMoves[2] === totalMoves[8] && totalMoves[2]) {
//       alert(totalMoves[2] + 'won')
//       return totalMoves[2]
//     } else if (totalMoves[0] === totalMoves[4] && totalMoves[0] === totalMoves[8] && totalMoves[0]) {
//       alert(totalMoves[0] + 'won')
//       return totalMoves[0]
//     } else if (totalMoves[2] === totalMoves[4] && totalMoves[2] === totalMoves[6] && totalMoves[2]) {
//       alert(totalMoves[2] + 'won')
//       return totalMoves[2]
//     } else if (totalMoves[0] !== 0 && totalMoves[1] !== 0 && totalMoves[2] !== 0 && totalMoves[3] !== 0 && totalMoves[4] !== 0 &&
//     totalMoves[5] !== 0 && totalMoves[6] !== 0 && totalMoves[7] !== 0 && totalMoves[8] !== 0) {
//       alert('it is a draw')
//       return 3
//     } else return 0
//   }
//
//   function playTurn (moves) {
//     if (totalMoves[moves] !== 0 || isGameOver() && moves > totalMoves.length) {
//       return false
//     } else {
//       totalMoves[moves] = player
//       if (player === 1) { player = 2 } else { player = 1 }
//       return true
//     }
//   }
//
//   function changeTurnText () {
//     $('h2').toggle()
//   }
// })
})
