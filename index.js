//player factory function
const player = (name, piece) => {

    //turn tracker
    let isTurn = false;

   return { name, piece, isTurn };
};

//gameBoard module
const gameBoard = (() => {
    const makeGameBoard = () => {
        let array = [];
    
        for( let i = 0; i < 3; i++) {
            array[i] = [];
    
            for (let j = 0; j < 3; j++) {
                array[i][j] = {
                    piece: null,
                    pos: [i] + "." + [j],
                    X: i,
                    Y: j,
                };
            };
        };
        return array;
    };

    return { makeGameBoard };
})();

//display module
const displayUpdate = (() => {

    //render array into board
    const renderBoard = (board) => {
        board.map(sq => {
            sq.map(loc => {
                const sqUp = document.getElementById(loc.pos);
                    sqUp.innerHTML = loc.piece;
            });
        });
    };

    //win condition
    let count0 = 0;
    let count1 = 0;
    let count2 = 0;
    let diag1 = 0;
    let diag2 = 0;
    let xArray = [];
    let oArray = [];
    
    const checkIfWinner = (board) => {
        
        //reset arrays
        xArray = [];
        oArray = [];

        //make separate array for each piece
        board.map(sq => {
            sq.map(loc => {
                if (loc.piece == "X") {
                    xArray.push(loc);
                } else if (loc.piece == "O") {
                    oArray.push(loc);
                };
            });
        });

        if (switchCase(xArray) === true) {
            return true;
        } else if (switchCase(oArray) === true) {
            return true;
        };

        return false;
    }

    const switchCase = (array) => {
        count0 = 0; // reset counters for safety.
        count1 = 0;
        count2 = 0;
        diag1 = 0;
        diag2 = 0;

        //check x pos
        let n = 0;
        while (n < array.length) {
            let tempVar = array[n].X;
            switchCheckRow(tempVar);
            switchCheckDiag(array[n].pos)
            n++;
        };
        if (count0 === 3 || count1 === 3 || count2 === 3 || diag1 === 3 || diag2 === 3) {
            return true;
        };
        n = 0;
        count0 = 0;  //reset again to count y
        count1 = 0;
        count2 = 0;
        diag1 = 0;
        diag2 = 0;

        //check y pos
        while (n < array.length) {
            let tempVar = array[n].Y;
            switchCheckRow(tempVar);
            n++;
        };
        if (count0 === 3 || count1 === 3 || count2 === 3 || diag1 === 3 || diag2 === 3) {
            return true;
        };

        return false;
    }

    const switchCheckRow = (num) => {
        switch(num) {
            case 0:
                count0++;
                break;
            case 1:
                count1++;
                break;
            case 2:
                count2++;
                break;
        };
    };

    const switchCheckDiag = (pos) => {
        switch(pos) {
            case "0.0":
                diag1++;
                break;
            case "1.1":
                diag1++;
                diag2++;
                break;
            case "2.2":
                diag1++;
                break;
            case "0.2":
                diag2++;
                break;
            case "2.0":
                diag2++;
                break;
        };
    };

    return { renderBoard, checkIfWinner, }

})();

//game module
const game = (() => {

    //make players, gameboard, and turns
    let numOfTurns = 0;
    let finishedBoard = gameBoard.makeGameBoard();
    let gameOver = false;
    const playerOne = player("X", "X");
    const playerTwo = player("O", "O");
    const winDisplay = document.querySelector('.messagebox');
    playerOne.isTurn = true;

    const getPiece = (p1Turn) => {
        playerOne.isTurn = !playerOne.isTurn;
        playerTwo.isTurn = !playerTwo.isTurn;
        return p1Turn ? playerOne.piece : playerTwo.piece;
    };

    //main gameplay loop
    const playGame = (squareID) => {
        const string = JSON.stringify(squareID);
        const row = string.slice(1, 2);
        const column = string.slice(3, 4);
        finishedBoard[row][column].piece = getPiece(playerOne.isTurn);
        displayUpdate.renderBoard(finishedBoard);

        if (numOfTurns >= 4 && numOfTurns < 8 && !gameOver) {

            if (displayUpdate.checkIfWinner(finishedBoard)) {
                if (!playerOne.isTurn) {
                    playWinner(playerOne.name);
                    gameOver = true;
                } else {
                    playWinner(playerTwo.name);
                    gameOver = true;
                };
            };

        } else if (numOfTurns == 8) {
            winDisplay.innerHTML = "Tie Game!"
            gameOver = true;
            resetButton();
        };

        setTimeout(() => {
            if (playerTwo.isTurn && !gameOver) {
                cpuMinimax.cpuPlay();
            };
        }, 300);

        numOfTurns ++;
    };

    //select board
    const getBoard = document.querySelectorAll('.square');
    getBoard.forEach(square => {
        square.addEventListener("click", () => {
            if (square.innerHTML == "") {
                playGame(square.id);
            };
        });
    });

    //get winner + cleanup
    const playWinner = (playerName) => {
        winDisplay.innerHTML = playerName + " is the winner.";
        resetButton();
    };

    const resetButton = () => {
        const resetB = document.createElement('button');
        winDisplay.appendChild(resetB);
        resetB.innerHTML = "Click to play again";
        resetB.addEventListener("click", () => {
            resetB.parentNode.removeChild(resetB);
            winDisplay.innerHTML = "Click to play! You are X.";
            resetGame();
        });
    };

    const resetGame = () => {
        numOfTurns = 0;   
        finishedBoard.map(row => {
            row.map(sq => {
                sq.piece = null;
            });
        });
        playerOne.isTurn = true;
        playerTwo.isTurn = false;
        displayUpdate.renderBoard(finishedBoard);
        gameOver = false;
    };

    return { finishedBoard, getBoard, playGame }

})();

//dfs minimax attempt, will return to later
const cpuMinimax = (() => {



    const cpuPlay = () => {

        let cpuArray = game.finishedBoard;
        // let cpuSquare = "0.0";
        // cpu square is a string "row.col"
        game.playGame(getCpuMove(cpuArray));

    };

    const getCpuMove = (gameboard) => {
        let cpuMove = "0.0"; //fallback for testing
        let testArray = [];
        let gb = game.finishedBoard;

        //check if open space
        let cpuBoard = gameboard;
        cpuBoard.map(row => {
            row.map(sq => {
                if (sq.piece === null) {
                    // console.log(sq);
                    testMiniMax(gb, 0, false);
                    cpuMove = sq.pos;
                    testArray.push(sq);

                }
            })
        });

        // console.log(testArray);

        cpuBoard = game.finishedBoard;
        return cpuMove;
    }

    const testMiniMax = (board, depth, isMaxing) => {
        return 1;
    }

    return { cpuPlay, }

}
)();