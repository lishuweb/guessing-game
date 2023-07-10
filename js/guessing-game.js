/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/
class Game
{
    constructor()
    {
        this.playersGuess = null;
        this.pastGuesses = [];
        this.winningNumber = generateWinningNumber();
    };
}
    Game.prototype.difference = function()
    {
        return Math.abs(this.playersGuess - this.winningNumber);
    }
    Game.prototype.isLower = function()
    {
        if(this.playersGuess < this.winningNumber)
        {
            return true;
        }
        else 
        {
            return false;
        }
    }
    Game.prototype.playersGuessSubmission= function(num)
    {
        this.playersGuess = num;
        if(typeof num !== 'number' || num < 1 || num > 100)
        {
            throw 'That is an invalid guess.';
        }
        
        return this.checkGuess();
    }
    Game.prototype.checkGuess = function()
    {
        let str = '';
        if(this.playersGuess === this.winningNumber)
        {
            str = "You Win!";
        }
        else if(this.pastGuesses.includes(this.playersGuess))
        {
            str = "You have already guessed that number.";
        }
        else
        {
            this.pastGuesses.push(this.playersGuess);
            document.getElementsByClassName("guess")[
                `${this.pastGuesses.length}` - 1
              ].innerHTML = this.playersGuess;
            if(this.pastGuesses.length === 5)
            {
                str = "You Lose.";
                document.querySelector("#subtitle").innerHTML = "Please! reset the game";
            }
            else 
            {
                // let diff = 0;
                let diff = this.difference();
                if(diff < 10)
                {
                    str = "You're burning up!";
                }
                else if(diff < 25)
                {
                    str = "You\'re lukewarm.";
                }
                else if(diff < 50)
                {
                    str = "You\'re a bit chilly.";
                }
                else 
                {
                    str = "You\'re ice cold!";
                }
            }
            document.querySelector('#guess-feedback > h4').innerHTML = str;
            document.querySelector(`#guess-list li:nth-child(${this.pastGuesses.length})`).innerHTML = this.playersGuess
        }
        return str;
    }
    
    Game.prototype.provideHint = function()
    {
        let arr = [
            this.winningNumber,
            generateWinningNumber(),
            generateWinningNumber(),
        ];
        return shuffle(arr);
    }


function generateWinningNumber()
{
    let num = Math.random() * 100;
    return Math.ceil(num);
}

function newGame()
{
    return new Game();
}

function shuffle(arr)
{
    let n = arr.length;
    let temp, i;

    while(n)
    {
        i = Math.floor(Math.random() * n--);
        temp = arr[n];
        arr[n] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

function playGame()
{
    let game = newGame();
    let button = document.querySelector('button');
    button.addEventListener('click', function()
    {
        let playersGuess =+document.querySelector('input').value;
        game.playersGuessSubmission(playersGuess);
    });

    let resetButton = document.getElementById('btn1');
    resetButton.addEventListener('click', function()
    {
        location.reload();
    });

    let hintButton = document.querySelector('btn2');
    hintButton.addEventListener('click', function()
    {
        let val = game.provideHint();
        document.querySelector(
            "#subtitle"
        ).innerHTML = `Your number may be ${val[0]},${val[1]} or ${val[2]}.`;
    })
}
playGame();



