const createGameboard = (function () {
    const player1 = createPlayer('X', "arlan");
    const player2 = createPlayer('O', "arlan");
    let makingMove = player1;
    let board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    const makeMove = function move(x, y) {
        board[x - 1][y - 1] = makingMove.mark;
        makingMove === player1 ? makingMove = player2 : makingMove = player1;
        console.log(checkForWin())
        return board;
    };
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
    return {board, makeMove, checkForWin}
})();

function createPlayer(mark, name) {
    return {mark, name}
}

// Test scenario
console.log(createGameboard.makeMove(1, 1));

console.log(createGameboard.makeMove(1, 2));
console.log(createGameboard.makeMove(2, 1));
console.log(createGameboard.makeMove(2, 2));
console.log(createGameboard.makeMove(3, 1));


