function updateGameBoard() {

    const rows = 3; 
    const columns = 3;
    const arrayWithValues = [];
    const gameBoard = []; 

    for (let i = 0; i < rows; i++) {

        gameBoard[i] = [];

        for (let ii = 0; ii < columns; ii++) {

            let boardCell = cell();
            gameBoard[i].push(boardCell);
        }
    }

    
    const changeIcon = (row, column, token) => {

        gameBoard[row][column].addIcon(token);
    }


    const printBoard = () => {

        for (let i = 0; i < rows; i++) {

            arrayWithValues[i] = [];

            for (let j = 0; j < columns; j++) {

                let cellValue = gameBoard[i][j].getIcon();
                arrayWithValues[i].push(cellValue);
            }
        }

        console.log(arrayWithValues);
    }

    return {arrayWithValues, changeIcon, gameBoard, printBoard};

    
}


function cell() {

    let value = ''; 

    const addIcon = (token) => {

        value = token; 
        return value;
    };

    const getIcon = () => value;

    return {addIcon, getIcon};
}


function playGame() {

    const board = updateGameBoard();
    board.printBoard();

    let activePlayer = 'Player One';
    console.log(`${activePlayer} your move!`);

    const gameBoardWithValues = board.arrayWithValues;
    let token = 'X';
    let turns = 1;
    let gameOver = false; 

    const players = [
        {player: 'Player One', token: 'X'},
        {player: 'Player Two', token: 'O'}
        ];

    const switchPlayerTurns = (turnNumber) => {

        activePlayer = (turnNumber % 2 === 0) ? players[1].player : players[0].player;
        token = (turnNumber % 2 === 0) ? players[1].token : players[0].token;
    };
    

    const playRound = (row, column) => {

        const playerOne = document.querySelector('.player1');
        const playerTwo = document.querySelector('.player2');

        if (activePlayer === 'Player One') {

            playerOne.style.cssText = "background-color: white;"
            playerTwo.style.cssText = "background-color: #FF9E66;"

        } else {
            playerOne.style.cssText = "background-color: #FF9E66;"
            playerTwo.style.cssText = "background-color: white;"
        }

        let cellVal = gameBoardWithValues[row][column]; 
        if (cellVal === 'X' || cellVal === 'O') return cellVal;

        if (gameOver) return cellVal;
    
        board.changeIcon(row, column, token);
        board.printBoard();

        let tokenToDisplay = token;
       
        if (turns >= 5) {

            let gameWon = checkGameWon(gameBoardWithValues, token);

            if (gameWon === true) {

                const announcement = document.querySelector('.announce-winner');
                announcement.innerHTML = `You win ${activePlayer}`;
                console.log(`You win ${activePlayer}`);
                gameOver = true;
                return tokenToDisplay;
            }
        }

        turns++;
        switchPlayerTurns(turns);
        console.log(`${activePlayer} your move!`);

        return tokenToDisplay;
    }; 

    return {playRound};
}


function checkGameWon(board, token) {

    const checkHorizontalCombinations = (gameBoardToCheck) => {

        for (let i = 0; i < 3; i++) {
            if (gameBoardToCheck[i][0] === token && gameBoardToCheck[i][1] === token && gameBoardToCheck[i][2] === token) {
                return true;
            }
        }
        return false;
    }

    let horizontalCombination = checkHorizontalCombinations(board);
    if (horizontalCombination === true) {
        return true; 
    }


    // Check vertical combinations
    const rearrangedArray = [];

    const zerothIndexArray = board.reduce((newArray, currentArrayRow) => {
        newArray.push(currentArrayRow[0]);
        return newArray;
    },[]);
    rearrangedArray.push(zerothIndexArray);

    const firstIndexArray = board.reduce((newArray, currentArrayRow) => {
        newArray.push(currentArrayRow[1]);
        return newArray;
    },[]);
    rearrangedArray.push(firstIndexArray);

    const secondIndexArray = board.reduce((newArray, currentArrayRow) => {
        newArray.push(currentArrayRow[2]);
        return newArray;
    }, []);
    rearrangedArray.push(secondIndexArray);
    console.log(rearrangedArray);

    let verticalCombination = checkHorizontalCombinations(rearrangedArray);
    if (verticalCombination === true) {
        return true; 
    }


    // Check diagonal combinations 
    const flattenedArray = board.flat();
    const diagTopRightToBottomLeft = flattenedArray.reduce((newArray, currentValue, index) => {
        if (index % 2 === 0 && index !== 0) {
            newArray.push(currentValue);
        }
        return newArray;
    }, []);

    while (diagTopRightToBottomLeft.length > 3) {
        diagTopRightToBottomLeft.pop();
    }

    if (diagTopRightToBottomLeft[0] === diagTopRightToBottomLeft[1] && diagTopRightToBottomLeft[0] === diagTopRightToBottomLeft[2]) {
        return true;
    }

    const diagTopLeftToBottomRight = flattenedArray.reduce((newArray, currentValue, index) => {
        if (index === 0 || index % 4 === 0) {
            newArray.push(currentValue);
        }
        return newArray;
    }, []);

    while (diagTopLeftToBottomRight.length > 3) {
        diagTopLeftToBottomRight.pop();
    }

    if (diagTopLeftToBottomRight[0] === diagTopLeftToBottomRight[1] && diagTopLeftToBottomRight[0] === diagTopLeftToBottomRight[2]) {
        return true;
    }

    return false;
}


function updateScreen() {

    let game = playGame();

    const startDialog = document.getElementById('startDialog');
    window.addEventListener("load", () => {
        
        startDialog.showModal();
    });

    const gridDialog = document.querySelector('.gridDialog');
    const resetBtn = document.querySelector('.reset-button');
    const startBtn = document.getElementById('startButton');

    startBtn.addEventListener('click', () => {

        startDialog.close()
        gridDialog.showModal(); 
        // dialogButtons.showModal();
    });

    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, indexInNodeList) => {

        let row = Math.floor(indexInNodeList / 3);
        let col = indexInNodeList % 3;

        cell.setAttribute('data-row', row);
        cell.setAttribute('data-col', col);


        cell.addEventListener('click', (event) => {
            
            let row = event.target.getAttribute('data-row');
            let col = event.target.getAttribute('data-col');

            let token = game.playRound(row, col);
            cell.innerHTML = token;
        });
    });

    resetBtn.addEventListener('click', () => {
        
        resetBtn.addEventListener('click', () => {
            // Clear the game board
            cells.forEach((cell) => {
                cell.innerHTML = '';
            });

            // Re-initialize the game
            game = playGame();
        });
    });
    
    
}

updateScreen();

