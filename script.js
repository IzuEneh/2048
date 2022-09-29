import Grid from "./Grid"
import Tile from "./Tile"

const gameboard = document.getElementById("game-board")

const grid = new Grid(gameboard)
grid.randomEmptyCell(),tile = new Tile(gameboard)

function setupInput() {
    window.addEventListener("keydown", handleInput, { once: true })
}

function handleInput(e) {
    switch (e) {
        case "ArrowUp":
            moveUp()
            break
        case "ArrowDown":
            moveDown()
            break
        case "ArrowLeft":
            moveLeft()
            break
        case "ArrowRight":
            moveRight()
            break
        default:
            setupInput()
            return
    }

    // other code

    setupInput()
}

function moveUp() {
    slideTiles(grid.cellsByColumn)
}