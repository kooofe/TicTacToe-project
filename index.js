const createGameboard = (function () {
    const player1 = createPlayer('X', "arlan");
    const player2 = createPlayer('O', "arlan");
    let makingMove = player1;
    let board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    const dialogText = document.querySelector('.dialog-window');
    const makeBoard = function createPanels() {
        const container = document.querySelector('.main-container');
        for (let i = 0; i < 3; i++) {
            const row = document.createElement('div');
            row.classList.toggle('row');
            const rowData = [];
            for (let j = 0; j < 3; j++) {
                const item = document.createElement('div');
                const tile = document.createElement('img');
                tile.src = 'static/null.svg';
                item.append(tile);

                const index = i + j * 3; // 1D index calculation

                item.dataset.index = index;

                item.addEventListener("click", () => {
                    const rowIndex = Math.floor(index / 3);
                    const colIndex = index % 3;

                    if (board[rowIndex][colIndex] === 0) {
                        board[rowIndex][colIndex] = makingMove.mark;
                        if (makingMove.mark === 'X') {
                            tile.src = 'static/X.svg';
                        } else {
                            tile.src = 'static/O.svg';
                        }
                        makingMove === player1 ? makingMove = player2 : makingMove = player1;
                    }
                    if (!new Set([].concat.apply([], board)).has(0)) {
                        dialogText.textContent = "Draw"
                    } else {
                        if (checkForWin()!== null){
                            dialogText.textContent = (`${checkForWin()} Wins`)
                        }
                    }
                });
                row.append(item);
            }
            container.append(row);
        }
        return board;
    }
    const checkForWin = function check() {
        // Checks rows
        for (let row = 0; row < 3; row++) {
            let numbs = new Set(board[row])
            // If the set has length 1, there is only one unique element
            if (numbs.size === 1 && !numbs.has(0)) {
                return board[row][0];
            }
        }
        // Checks columns
        for (let column = 0; column < 3; column++) {
            let columnValues = [];
            for (let row = 0; row < 3; row++) {
                columnValues.push(board[row][column]);
            }
            let numbs = new Set(columnValues);
            if (numbs.size === 1 && !numbs.has(0)) {
                return columnValues[0];
            }
        }

        // Left to right diagonal
        if (board[1][1] !== 0) {
            if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
                return board[0][0];
            }
            // Right to left diagonal
            if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
                return board[0][2];
            }
        }
        return null;
    }
    return {board, makeBoard, checkForWin}
})();

function createPlayer(mark, name) {
    return {mark, name}
}

createGameboard.makeBoard();


