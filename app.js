// get the seconds left, result, button
const timeLeftDisplay = document.querySelector("#time-left")
const resultDisplay = document.querySelector("#result")
const startButton = document.querySelector("#start-pause")

// get the grid squares
const gridSquares = document.querySelectorAll(".grid div")
const squareWidth = 9

// initialize frog at starting block
let currentIndex
for (let i=0; i<gridSquares.length; i++) {
	if (gridSquares[i].classList.contains("starting-block")) {
		currentIndex = i
		gridSquares[i].classList.add("frog")
		break
	}
}

// create key event listener
document.addEventListener("keyup", moveFrog)

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