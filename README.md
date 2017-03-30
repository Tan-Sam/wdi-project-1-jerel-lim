[How to write readme - Markdown CheatSheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)  
[How to write a good readme for github repo!](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)

# BlackJack game

This application is a scaled down version of the BlackJack games played in most casinos, where only one player is playing against the dealer(computer AI), with reduced betting functionalities.


## Getting Started

Clone the Repo
Open index.html
Have fun exploring the application.

## How to play
### Summary
This game allows player to play with a virtual player. Player bets any desired amount and starts the play. The player can draw as many cards as he/she wish but the aim of the game is to accumulate a higher point total than the dealer, but without going over 21.

### Rules

1) The cards 2 through 10 have their face value, J, Q, and K are worth 10 points each, and the Ace is worth either 1 or 11 points (player's choice).

2) Two cards are dealt for both the player and dealer upon placing of bet. A blackjack happens when the point total of the initial two cards dealt adds to 21, without any additional cards. When this happens, the winner is the side that obtains a blackjack, and the round is over.

3) The player plays moves first before the dealer(drawing additional cards or passing). If player card point total exceeds 21 upon additional draw of cards, player loses the game immediately. Upon passing by player, the dealer will then play his moves(drawing additional cards or passing). When both sides end their moves, all hands are opened and the winner is then determined by the by the side that has a higher point total, but without going over 21.


## Live Version

This app is deployed on [https://wdi-sg.github.io/wdi-project-1-jerel-lim/](https://wdi-sg.github.io/wdi-project-1-jerel-lim/)


## Built With
* jQuery
* JavaScript
* CSS
* HTML


## Development
### The Approach
Object-Oriented Programming methodology is used in the development. Each card drawn is an object, and is a value of it's parent player's properties, another object. The player object is then given a score based on the calculated total points of the cards objects as part of their properties. This approach allows me to encapsulate specific method to an object and hence made my code cleaner and readable.

### The Virtual Player

The virtual player aims to model the casino's decision making process in the game, where casino has fixed rules of when an additional card needs to be drawn.

### Calculation of score
As Ace has a variable score depending on the situation, the code is designed such that Ace always counts as 11, and only counts as 1 point when the score exceeds 21. This assumption is based on a rational player gameplay logic where the player is intending to achieve the highest score possible.

### Betting chips
Visuals for stacking of the chips to reflect amount player bets is inspired by yisheng90. Each additional bet of value 10 adds an image at a slight displacement from the previous, creating a vision of a stack of chips.

### Process flow
[Process flow](https://www.draw.io/?lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1&title=Untitled%20Diagram.xml#Uhttps%3A%2F%2Fraw.githubusercontent.com%2Fjerel-lim%2Fgit-test-2%2Fmaster%2FUntitled%2520Diagram.xml)

## Authors

Jerel Lim - jerel-lim

## Acknowledgments
This application is built for programming practice purposes only. Code structure and game flow logic was inspired by Lee Yi Sheng - yisheng90

Images of poker cards were obtained from Howard Yeh-hayeah
