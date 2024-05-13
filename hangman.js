const keyboarddiv = document.querySelector(".keyboard")
const wordDisplay = document.querySelector(".letters");
const guessText = document.querySelector(".guess b");
const hangmanImage = document.querySelector(".hang-view img")
const gameModel = document.querySelector(".lost-modal");
const playAgainBtn = document.querySelector(".play-again");

let currentword, correctLetters = [], wrongGuessCount = 0;
const maxGuessCount = 6;

const gameOver = (isVictory) => {
    const modalText = isVictory ? `You found the word :` : `The correct word was :`
    gameModel.querySelector("img").src = `hangman_images/images/${isVictory ? 'victory' : 'lost'}.gif`;
    gameModel.querySelector("h4").innerText = `${isVictory ? 'Congrats' : 'Game Over!'}`;
    gameModel.querySelector("p").innerHTML = ` ${modalText} <b> ${currentword}</b> `;
    gameModel.classList.add("show");
}

const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    wordDisplay.innerHTML = currentword.split("").map(() => `<li class="letter"></li>`).join("");
    gameModel.classList.remove("show");
    hangmanImage.src = `hangman_images/images/hangman-${wrongGuessCount}.svg`;
    guessText.innerText = `${wrongGuessCount}/${maxGuessCount}`;
    keyboarddiv.querySelectorAll("button").forEach(btn=>btn.disabled=false);
}

const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentword = word;
    console.log(word);
    document.querySelector(".hint b").innerText = hint;
    resetGame();
    wordDisplay.innerHTML = word.split("").map(() => `<li class="letter"></li>`).join("");
}
const initGame = (button, clickedLetter) => {
    if (currentword.includes(clickedLetter)) {
        [...currentword].forEach((letter, index) => {
            if (letter == clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guess")
            }
        })
    }
    else {
        // console.log(clickedLetter, " not exists in word");
        wrongGuessCount++;
        hangmanImage.src = `hangman_images/images/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true;
    guessText.innerText = `${wrongGuessCount}/${maxGuessCount}`;

    if (wrongGuessCount == maxGuessCount) return gameOver(false);
    if (correctLetters.length == currentword.length) return gameOver(true);
}

//creating keyboard buttons
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i)
    keyboarddiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord()
playAgainBtn.addEventListener("click", getRandomWord)