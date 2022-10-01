import Grid from "./Grid"
import Tile from "./Tile"

const gameboard = document.getElementById("game-board")

const grid = new Grid(gameboard)
grid.randomEmptyCell(),tile = new Tile(gameboard)

function setupInput() {
    window.addEventListener("keydown", handleInput, { once: true })
}

async function handleInput(e) {
    switch (e) {
        case "ArrowUp":
            await moveUp()
            break
        case "ArrowDown":
            await moveDown()
            break
        case "ArrowLeft":
            await moveLeft()
            break
        case "ArrowRight":
            await moveRight()
            break
        default:
            setupInput()
            return
    }

    // other code
    grid.cells.forEach(cell => cell.mergeTiles())

    setupInput()
}

function moveUp() {
    return slideTiles(grid.cellsByColumn)
}

function moveDown() {
    return slideTiles(grid.cellsByColumn.map(col => [...col].reverse()))
}

function moveLeft() {
    return slideTiles(grid.cellsByRow)
}

function moveRight() {
    return slideTiles(grid.cellsByRow.map(row => [...row].reverse()))
}


function slideTiles(cells) {
    return Promise.all(
        cells.flatMap(group => {
            const promises = []
            for (let i = 1; i < group.length; i++) {
                const cell = group[i]
                if (cell.tile == null) continue
                let lastValidCell
                for (let j = i - 1; j >= 0; j--) {
                    const moveToCell = group[j]
                    if (!moveToCell.canAccept(cell.tile)) break
                    lastValidCell = moveToCell
                }

                if (lastValidCell != null) {
                    promises.push(cell.tile.waitForTransition())
                    if (lastValidCell.tile != null) {
                        lastValidCell.mergeTile = cell.tile 
                    }else {
                        lastValidCell.tile = cell.tile
                    }
                    cell.tile = null
                }
            }

            return promises
        })
    )

}