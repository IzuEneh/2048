import Grid from "./Grid"
import Tile from "./Tile"

const gameboard = document.getElementById("game-board")

const grid = new Grid(gameboard)
grid.randomEmptyCell(),tile = new Tile(gameboard)