document.addEventListener('DOMContentLoaded', () => {
    const columns = 7;
    const rows = 6;
    let board = [];
    let currentPlayer = 'red';

    const gameBoard = document.getElementById('game-board');
    const resetButton = document.getElementById('reset');

    const createBoard = () => {
        for (let row = 0; row < rows; row++) {
            board[row] = [];
            for (let col = 0; col < columns; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = row;
                cell.dataset.col = col;
                gameBoard.appendChild(cell);
                board[row][col] = null;
            }
        }
    };

    const checkWin = () => {
        const directions = [
            { x: 0, y: 1 },
            { x: 1, y: 0 },
            { x: 1, y: 1 },
            { x: 1, y: -1 }
        ];

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
                const cell = board[row][col];
                if (cell) {
                    for (const { x, y } of directions) {
                        let count = 1;
                        for (let i = 1; i < 4; i++) {
                            const newRow = row + i * y;
                            const newCol = col + i * x;
                            if (
                                newRow >= 0 && newRow < rows &&
                                newCol >= 0 && newCol < columns &&
                                board[newRow][newCol] === cell
                            ) {
                                count++;
                                if (count === 4) return true;
                            } else {
                                break;
                            }
                        }
                    }
                }
            }
        }
        return false;
    };

    const makeMove = (row, col, player) => {
        board[row][col] = player;
        const cell = document.querySelector(`.cell[data-row='${row}'][data-col='${col}']`);
        cell.classList.add(player);
    };

    const playerMove = (col) => {
        for (let row = rows - 1; row >= 0; row--) {
            if (!board[row][col]) {
                makeMove(row, col, currentPlayer);
                if (checkWin()) {
                    alert(`${currentPlayer} wins!`);
                    resetBoard();
                } else {
                    currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
                    if (currentPlayer === 'yellow') {
                        setTimeout(computerMove, 500);
                    }
                }
                break;
            }
        }
    };

    const computerMove = () => {
        const availableCols = [];
        for (let col = 0; col < columns; col++) {
            if (!board[0][col]) {
                availableCols.push(col);
            }
        }

        const col = availableCols[Math.floor(Math.random() * availableCols.length)];
        playerMove(col);
    };

    const resetBoard = () => {
        gameBoard.innerHTML = '';
        board = [];
        createBoard();
        currentPlayer = 'red';
    };

    gameBoard.addEventListener('click', (e) => {
        if (e.target.classList.contains('cell')) {
            const col = e.target.dataset.col;
            if (currentPlayer === 'red') {
                playerMove(col);
            }
        }
    });

    resetButton.addEventListener('click', resetBoard);

    createBoard();

    const navSlide = () => {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav-links');
        const navLinks = document.querySelectorAll('.nav-links li');

        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
            burger.classList.toggle('toggle');
        });
    }

    navSlide();
});
