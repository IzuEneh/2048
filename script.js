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
    return slideTiles(grid.cellsByColumn)
}

function slideTiles(cells) {
    cells.forEach(group => {
        for (let i = 1; i < group.length; i++) {
            const cell = group[i]
            
            let lastValidCell
            for (let j = i - 1; j >= 0; j--) {
                const moveToCell = group[j]
                if (!moveToCell.canAccept(cell.tile)) break
                lastValidCell = moveToCell
            }

            if (lastValidCell != null) {
                if (lastValidCell.tile != null) {
                    lastValidCell.mergeTile = cell.tile 
                }else {
                    lastValidCell.tile = cell.tile
                }
                cell.tile = null
            }
        }
    })
}