function updateGameBoard() {

    const rows = 3; 
    const columns = 3;
    const gameBoard = []; 

    for (let i = 0; i < rows; i++) {

        gameBoard[i] = [];

        for (let ii = 0; ii < columns; ii++) {

            let boardCell = cell();
            gameBoard[i].push(boardCell);
        }
    }

    
    const changeIcon = (row, column) => {

        gameBoard[row][column].addIcon();
    }


    const printBoard = () => {

        const arrayWithValues = [];

        for (let i = 0; i < rows; i++) {

            arrayWithValues[i] = [];

            for (let j = 0; j < columns; j++) {

                let cellValue = gameBoard[i][j].getIcon();
                arrayWithValues[i].push(cellValue);
            }
        }

        console.log(arrayWithValues);
    }

    return {changeIcon, gameBoard, printBoard}

    
}


function cell() {

    let value = 0; 

    const addIcon = () => value = 1;

    const getIcon = () => value;

    return {addIcon, getIcon};
}


function playGame() {

    const board = updateGameBoard();

    board.printBoard();
    
    // Closure here, don't need to add the board
    const playRound = (row, column) => {

        board.changeIcon(row, column);
        board.printBoard();
    }


    

    return {playRound};

}


const game = playGame();
