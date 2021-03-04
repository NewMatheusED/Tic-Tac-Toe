const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle' ;
var X = 0;
var O = 0
const placarX_span = document.getElementById('X_point');
const placarO_span = document.getElementById('O_point');
const WINNING_COMBINATION = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElement = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winning-message');
const winningMessage = document.querySelector('[data-text-winnig]');
const restart = document.getElementById('restart');
let circleTurn;

starGame()

restart.addEventListener('click', starGame)

function starGame() {
    circleTurn = false;
    cellElement.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        //cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true})
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
        if(circleTurn){
            O++
            placarO_span.innerHTML = O
        } else {
            X++
            placarX_span.innerHTML = X
        }
        console.log("Ganhou")
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    } 
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATION.some(combination => {
        return combination.every(index => {
            return cellElement[index].classList.contains(currentClass)
    
        })
    })
}

function endGame(draw) {
    if (draw) {
        winningMessage.innerHTML = "Empate!"
    } else {
        winningMessage.innerHTML = `${circleTurn ? "O" : "X"} Ganhou!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw() {
    return [...cellElement].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}