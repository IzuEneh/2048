import Grid from "./Grid.mjs"
import Tile from "./Tile.mjs"

const gameboard = document.getElementById("game-board")

const grid = new Grid(gameboard)
grid.randomEmptyCell(),tile = new Tile(gameboard)

function setupInput() {
    window.addEventListener("keydown", handleInput, { once: true })
}

async function handleInput(e) {
    switch (e) {
        case "ArrowUp":
            if (!canMoveUp()) {
                setupInput()
                return
            }
            await moveUp()
            break
        case "ArrowDown":
            if (!canMoveDown()) {
                setupInput()
                return
            }
            await moveDown()
            break
        case "ArrowLeft":
            if (!canMoveLeft()) {
                setupInput()
                return
            }
            await moveLeft()
            break
        case "ArrowRight":
            if (!canMoveRight()) {
                setupInput()
                return
            }
            await moveRight()
            break
        default:
            setupInput()
            return
    }


    grid.cells.forEach(cell => cell.mergeTiles())
    const newTile = new Tile(gameboard)
    grid.randomEmptyCell().tile = newTile

    if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
        newTile.waitForTransition(true).then(() => {
            alert("You Lose")
        })
        return
    }

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

function canMoveUp() {
    return canMove(grid.cellsByColumn)
}

function canMoveDown() {
    return canMove(grid.cellsByColumn.map( col => [...col].reverse()))
}

function canMoveLeft() {
    return canMove(grid.cellsByRow)
}

function canMoveRight() {
    return canMove(grid.cellsByRow.map( row => [...row].reverse()))
}

function canMove(cells) {
    return cells.some(group  => {
        return group.some((cells, index) => {
            if (index === 0) return false
            if (cell.tile == null) return false
            const moveToCell  = group[index - 1]
            return moveToCell.canAccept(cell.tile)
        })
    })
}