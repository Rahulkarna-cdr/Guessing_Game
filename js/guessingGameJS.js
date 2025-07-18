
function generateWinningNumber(){
    return Math.ceil(Math.random()*100)
}

function shuffle(arr){
    for(let i=arr.length-1;i>=0;i--){
        let randIdx = Math.floor(Math.random()*(i+1));
        [arr[i],arr[randIdx]] = [arr[randIdx],arr[i]]
    }
    return arr;
}

function newGame(){
    return new Game();
}

class Game{
    constructor(){
        this.playersGuess = null;
        this.pastGuesses = [];
        this.winningNumber = generateWinningNumber();
        }

        difference(){
            return (Math.abs(this.playersGuess - this.winningNumber))
        }

        isLower(){
            if(this.playersGuess<this.winningNumber){
                return true
            }
            else{
                return false
            }
        }

        playersGuessSubmission(num){
            if(typeof num !== 'number' || num<1 || num>100){
                throw "That is an invalid guess."
            }
            this.playersGuess=num;
            return this.checkGuess();
        }

        checkGuess(){
           const guess = this.playersGuess
           if(guess === this.winningNumber){
            return 'You Win!';
           }
           if(this.pastGuesses.includes(guess)){
            return 'You have already guessed that number.'
           }
           this.pastGuesses.push(guess);

           if(this.pastGuesses.length===5){
            return 'You Lose.'
           }

           if(this.difference()<10){
            return "You're burning up!"
           }
           else if(this.difference()<25){
            return "You're lukewarm."
           }
           else if(this.difference()<50){
            return "You're a bit chilly." 
           }
           else{
            return "You're ice cold!" 
           }
        }
        provideHint(){
            const hintArray = [this.winningNumber];
            hintArray.push(generateWinningNumber());
            hintArray.push(generateWinningNumber());
            
        return shuffle(hintArray);
        }
}

//UI logic
let game = new Game();

let hintUsed = false;

let button1 = document.getElementById('submittingNum');
const input = document.getElementById('numip');
button1.addEventListener('click',() => {
    const feedback = document.getElementById('feedback');
    const guess = parseInt(input.value);

    if (isNaN(guess) || guess>100 || guess<1) {
        feedback.innerText = 'Please enter a valid number.';
        return;
    }

    const result = game.playersGuessSubmission(guess);
    feedback.innerText = result;

    // Show guess count
    document.getElementById('AttemptCount').innerText = `Attempt: ${game.pastGuesses.length}/5`;

    // Show current guess
    document.getElementById('currentGuess').innerText = `You guessed: ${game.playersGuess}`;

    // input.value = '';
});

input.addEventListener('keydown', (event) => {
    if(event.key === 'Enter'){
        button1.click();
    }
})

// Hint button
let button2 = document.getElementById('hint');
button2.addEventListener('click', () => {
    if (!hintUsed) {
        const hints = game.provideHint();
        document.getElementById('hntDisArea').innerText = `Hint: One of these is the correct number: ${hints.join(', ')}`;
        hintUsed = true;
    }
});

// New game button
let newGameButton = document.getElementById('newGameBtn');
newGameButton.addEventListener('click', () => {
    game = new Game();
    hintUsed = false;
    document.getElementById('feedback').innerText = 'Make your first guess!';
    document.getElementById('feedback').className = 'feedback';
    document.getElementById('AttemptCount').innerText = '';
    document.getElementById('currentGuess').innerText = '';
    document.getElementById('hntDisArea').innerText = '';
    document.getElementById('numip').disabled = false;
    document.getElementById('submittingNum').disabled = false;
});

// Utility to stop game input on win/lose
function disableGame() {
    document.getElementById('numip').disabled = true;
    document.getElementById('submittingNum').disabled = true;
}