// get the seconds left, result, button
const timeLeftDisplay = document.querySelector("#time-left")
const resultDisplay = document.querySelector("#result")
const startButton = document.querySelector("#start-pause")

// get the grid squares
const gridSquares = document.querySelectorAll(".grid div")
const squareWidth = 9

// get all logs
const logLefts = document.querySelectorAll(".log-left")
const logRights = document.querySelectorAll(".log-right")

// get all cars
const carLefts = document.querySelectorAll(".car-left")
const carRights = document.querySelectorAll(".car-right")

// initialize frog at starting block
let currentIndex
let timerId
for (let i=0; i<gridSquares.length; i++) {
	if (gridSquares[i].classList.contains("starting-block")) {
		currentIndex = i
		gridSquares[i].classList.add("frog")
		break
	}
}

// move the frog
function moveFrog(e) {
	// reset frog position
	gridSquares[currentIndex].classList.remove("frog")

	// get next square
	switch(e.key) {
		case "ArrowLeft":
			// update index if not on left border
			if (currentIndex % squareWidth !== 0) {
				currentIndex -= 1
			}
			break
		case "ArrowRight":
			// update index if not on right border
			if (currentIndex % squareWidth < squareWidth - 1) {
				currentIndex += 1
			}
			break
		case "ArrowUp":
			// update index if not on top border
			if (currentIndex - squareWidth >= 0) {
				currentIndex -= squareWidth
			}
			break
		case "ArrowDown":
			// update index if not on bottom border
			if (currentIndex + squareWidth < squareWidth * squareWidth) {
				currentIndex += squareWidth
			}
			break
	}

	// modify position
	gridSquares[currentIndex].classList.add("frog")
}

// move logs
function moveLogLeft(logLeft) {
	// move logs one square to left w/ wrap around
	switch (true) {
		case logLeft.classList.contains("l1"): {
			logLeft.classList.remove("l1")
			logLeft.classList.add("l2")
			break
		}
		case logLeft.classList.contains("l2"): {
			logLeft.classList.remove("l2")
			logLeft.classList.add("l3")
			break
		}
		case logLeft.classList.contains("l3"): {
			logLeft.classList.remove("l3")
			logLeft.classList.add("l4")
			break
		}
		case logLeft.classList.contains("l4") : {
			logLeft.classList.remove("l4")
			logLeft.classList.add("l5")
			break
		}
		case logLeft.classList.contains("l5"): {
			logLeft.classList.remove("l5")
			logLeft.classList.add("l1")
			break
		}
	}
}

function moveLogRight(logRight) {
	// move logs one space to right w/ wrap around
	switch(true) {
		case logRight.classList.contains("l1"): {
			logRight.classList.remove("l1")
			logRight.classList.add("l5")
			break
		}
		case logRight.classList.contains("l2"): {
			logRight.classList.remove("l2")
			logRight.classList.add("l1")
			break
		}
		case logRight.classList.contains("l3"): {
			logRight.classList.remove("l3")
			logRight.classList.add("l2")
			break
		}
		case logRight.classList.contains("l4"): {
			logRight.classList.remove("l4")
			logRight.classList.add("l3")
			break
		}
		case logRight.classList.contains("l5"): {
			logRight.classList.remove("l5")
			logRight.classList.add("l4")
			break
		}
	}
}

// move cars
function moveCarLeft(carLeft) {
	// move cars one square left w/ wrap around
	switch(true) {
		case carLeft.classList.contains("c1"): {
			carLeft.classList.remove("c1")
			carLeft.classList.add("c2")
			break
		}
		case carLeft.classList.contains("c2"): {
			carLeft.classList.remove("c2")
			carLeft.classList.add("c3")
			break
		}
		case carLeft.classList.contains("c3"): {
			carLeft.classList.remove("c3")
			carLeft.classList.add("c1")
			break
		}
	}
}

function moveCarRight(carRight) {
	// move cars one square right w/ wrap around
	switch(true) {
		case carRight.classList.contains("c1"): {
			carRight.classList.remove("c1")
			carRight.classList.add("c3")
			break
		}
		case carRight.classList.contains("c2"): {
			carRight.classList.remove("c2")
			carRight.classList.add("c1")
			break
		}
		case carRight.classList.contains("c3"): {
			carRight.classList.remove("c3")
			carRight.classList.add("c2")
			break
		}
	}
}

function autoMove() {
	logLefts.forEach(logLeft => moveLogLeft(logLeft))
	logRights.forEach(logRight => moveLogRight(logRight))
	carLefts.forEach(carLeft => moveCarLeft(carLeft))
	carRights.forEach(carRight => moveCarRight(carRight))

	// decrement timer
	timeLeftDisplay.textContent = parseInt(timeLeftDisplay.textContent) - 1
}

// check for loss (frog collision or time runs out)
function checkLoss () {
	// end game if there is a collision w/ car, water or if time runs out and not on red square
	if (gridSquares[currentIndex].classList.contains("l4") || gridSquares[currentIndex].classList.contains("l5") ||
		gridSquares[currentIndex].classList.contains("c1") ||
		(parseInt(timeLeftDisplay.textContent) === 0 && !gridSquares[currentIndex].classList.contains("ending-block"))) {
			resultDisplay.textContent = "You lose! GAME OVER"

			// stop moving cars and logs
			clearInterval(timerId)

			// stop checking for win
			clearInterval(winTimerId)

			// remove frog
			gridSquares[currentIndex].classList.remove("frog")

			// stop listening for arrow keys
			document.removeEventListener("keyup", moveFrog)
		}
}

lossTimerId = setInterval(checkLoss, 100)

// check for win
function checkWin() {
	// win if frog reaches end goal in time
	if (gridSquares[currentIndex].classList.contains("ending-block")) {
		resultDisplay.textContent = "Congratulations! YOU WIN!"

		// stop moving cars and logs
		clearInterval(timerId)

		// stop checking for losses
		clearInterval(lossTimerId)

		// stop listening for arrow keys
		document.removeEventListener("keyup", moveFrog)
	}
}

winTimerId = setInterval(checkWin, 100)

// start and stop the timer
startButton.addEventListener("click", () => {
	// resume/pause the game
	if (timerId) { // pause the game
		resultDisplay.textContent = "PAUSED"

		// pause timer
		clearInterval(timerId)
		timerId = null

		// stop listening for arrow keys
		document.removeEventListener("keyup", moveFrog)

	} else { // resume game
		resultDisplay.textContent = "PLAYING..."

		// resume timer
		timerId = setInterval(autoMove, 1000)

		// start listening for arrow keys
		document.addEventListener("keyup", moveFrog)
	}
})