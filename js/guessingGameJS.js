
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

