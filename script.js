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

    const players = [
        {player: 'Player One', token: 'X'},
        {player: 'Player Two', token: 'O'}
        ];

    const switchPlayerTurns = (turnNumber) => {

        activePlayer = (turnNumber % 2 === 0) ? players[1].player : players[0].player;
        token = (turnNumber % 2 === 0) ? players[1].token : players[0].token;
    };
    

    const playRound = (row, column) => {

        let cellVal = gameBoardWithValues[row][column]; 
        if (cellVal === 'X' || cellVal === 'O') return;

        
        
        board.changeIcon(row, column, token);
        board.printBoard();
       

        if (turns >= 5) {

            let gameWon = checkGameWon(gameBoardWithValues, token);

            if (gameWon === true) {

                console.log(`You win ${activePlayer}`);
                return;
            }
        }

        turns++;
        switchPlayerTurns(turns);
        console.log(`${activePlayer} your move!`);
    }; 

    return {playRound};
}


function checkGameWon(board, token) {

    const checkHorizontalCombinations = (gameBoardToCheck) => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (gameBoardToCheck[i][j] === token) {

                    if (j === 2) return true; 
                    continue;
                }
            }   
        }
    }
    checkHorizontalCombinations(board);

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

    checkHorizontalCombinations(rearrangedArray);

    // Check diagonal combinations 
    const flattenedArray = board.flat();
    const diagTopRightToBottomLeft = flattenedArray.reduce((newArray, currentValue, index) => {
        if (index % 2 === 0) {
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


const game = playGame();

