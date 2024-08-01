const displayNumber = document.querySelector(".header__number");
const displayMessage = document.querySelector(".result__message");
const inputNumber = document.querySelector(".guess__number");
const score = document.querySelector(".result__score");
const hightestScore = document.querySelector(".result__highscore");
const againBtn = document.querySelector(".btn--again");
const checkBtn = document.querySelector(".btn--check");

let secretNumber = Math.floor(Math.random() * 20 + 1);
let maxScore = 10;
let highScore = 0;

// validate input to ensure it is a number between 1 and 20
inputNumber.addEventListener("input", () => {
  inputNumber.value = inputNumber.value.replace(/[^0-9]/g, "");

  if (inputNumber.value > 20 || inputNumber.value < 1) {
    inputNumber.value = "";
    displayMessage.textContent = "Between 1 and 20!";
  }
});

// Event listener for the check button
checkBtn.addEventListener("click", () => {
  const playerNumber = Number(inputNumber.value);

  // when there is no input
  if (!playerNumber) {
    displayMessage.textContent = "Write your number between 1 to 20!";

    // check if the player guessed the correct number
  } else if (playerNumber === secretNumber) {
    displayMessage.textContent = "🎉 Win!";
    document.querySelector("body").style.backgroundColor = "#60b347";
    displayNumber.textContent = secretNumber;

    // update the high score if the current score is higher
    if (maxScore > highScore) {
      highScore = maxScore;
      hightestScore.textContent = highScore;
    }

    // disable input and button after winning
    checkBtn.disabled = true;
    inputNumber.disabled = true;

    // when there is number greater than 20 or less than 1
  } else if (playerNumber > 20 || playerNumber < 1) {
    displayMessage.textContent = "Between 1 and 20!";
    inputNumber.value = "";

    // check if the input is outside the valid range
  } else if (playerNumber !== secretNumber) {
    if (maxScore > 1) {
      if (playerNumber > secretNumber) {
        displayMessage.textContent = "Too high!";
      } else {
        displayMessage.textContent = "Too low!";
      }
      maxScore -= 1;
      score.textContent = maxScore;
    } else {
      displayMessage.textContent = "You lost the game!";
      score.textContent = "0";
    }
  }
});

// event listener for the again button to reset the game
againBtn.addEventListener("click", () => {
  displayMessage.textContent = "Start guesing...";
  displayNumber.textContent = "?";
  maxScore = 10;
  score.textContent = maxScore;
  secretNumber = Math.floor(Math.random() * 20 + 1);
  document.querySelector("body").style.backgroundColor = "#000000";
  inputNumber.value = "";
  checkBtn.disabled = false;
  inputNumber.disabled = false;
});

// allow pressing Enter key to trigger the check button
document.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    checkBtn.click();
  }
});
