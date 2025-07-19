
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
            if(typeof num !== 'number' ||isNaN(num) || num<1 || num>100){
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

           if(this.pastGuesses.length === 5){
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
let game=newGame()

let input=document.getElementById('numip')
let message=document.getElementById('feedback')
let attemptsLeft = document.getElementById('AttemptCount')
let past=document.getElementById('currentGuess')
let btn1 =document.getElementById('submittingNum')

btn1.addEventListener('click',()=>{
    let guess=parseInt(input.value);
    try{
    const result=game.playersGuessSubmission(guess)
    message.textContent=result  
    if(result.includes('You Win!')){
        message.style.color = '#FAB12F';
    }
    else if(result.includes('You Lose.')){
      message.style.color = '#ff6b6b'  
    }
    else{
        message.style.color = '';
    }

    if (result === 'You Win!' || result === 'You Lose.') {
        input.disabled = true;
        btn1.disabled = true;
    }

       if (game.pastGuesses.length<5){
        past.textContent= `Past Guess: ${game.pastGuesses[game.pastGuesses.length-1]}`
        }
        else{
            past.style.color = '#ff6b6b'
                past.textContent= `😢 Oops! It was ${game.winningNumber}. Want to try your luck again?`                
        }
            
    }catch (err){
        message.innerText = err;
        message.style.color= '#ff6b6b';
    }

    input.value=''

    if (game.pastGuesses.length <5) {
        attemptsLeft.innerText = `Attempt: ${game.pastGuesses.length}/5`;
    } else {
        attemptsLeft.innerText = `Attempt: 5/5`;
    }
    
})
input.addEventListener('keydown', (event) => {
    if(event.key === "Enter"){
        btn1.click();
    }


})
document.getElementById('hint').addEventListener('click',()=>{
if(game.pastGuesses.length>2){
    const hints=game.provideHint()
    document.getElementById('hntDisArea').innerText=`💡 Hints : ${hints.join(', ')} (One of these is correct!)`;    
    
}
    else{
        alert(`Hint is available after 3 attempts only..`)
    }
})

document.getElementById('newGameBtn').addEventListener('click', () => {
    game = newGame();
    message.textContent = 'Game is Reset! Start your Game';
    document.getElementById('hntDisArea').textContent = '';
    input.value = '';
    past.textContent = '';
    past.style.color = '';
    message.style.color = '';
    
    input.disabled = false;
    btn1.disabled = false;

    attemptsLeft.innerText = 'Attempt: 0/5'
});

if(message.innerText==='You Lose.'){
    input.disabled = true;
    btn1.disabled = true;
}



