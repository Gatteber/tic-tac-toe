// function make2DArray (rows, cols) {
//     let final = [];

//     for (let i = 0; i < rows; i++) {
//         final[i] = [];
        
//         for (let j = 0; j < cols; j++) {
//             final[i][j] = 0;
//         }
//     };
//     return final
// };

// let test = make2DArray(3, 3);
// test[0][1] = "hi";
// console.log(test);

// function checkForHi () {
//     for (let i = 0; i < test.length; i++) {
//         for (let j = 0; j < test[i].length; j++) {
//             console.log(test[i][j])
//         };
//     };
//     return false;
// }

// console.log(checkForHi());




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
    //create board array
    const finishedBoard = makeGameBoard();

    return {
        finishedBoard,
        makeGameBoard,
    };
})();

//display module
const displayUpdate = (() => {

    //make players
    // const playerOne = player("playerOne", "X");
    // const playerTwo = player("playerTwo", "O");
    // playerOne.isTurn = true;

    //get piece to play
    // const getPiece = (p1Turn) => {
    //     playerOne.isTurn = !playerOne.isTurn;
    //     return p1Turn ? playerOne.piece : playerTwo.piece;
    // }


    //strip id from square and log turn
    // let numOfTurns = 0;
    // const stripNumber = (squareID) => {
    //     const string = JSON.stringify(squareID);
    //     const row = string.slice(1, 2);
    //     const column = string.slice(3, 4);
    //     gameBoard.finishedBoard[row][column].piece = getPiece(playerOne.isTurn);
    //     renderBoard(gameBoard.finishedBoard);

    //     if (numOfTurns >= 4 && numOfTurns < 8) {
    //         if (checkIfWinner(gameBoard.finishedBoard) === true) {
    //             const winDisplay = document.querySelector('.messagebox');
    //             winDisplay.innerHTML = playerWinner + " is the winner!";
    //             console.log(gameBoard.finishedBoard);
    //         };
    //     } else if (numOfTurns == 8) {
    //         console.log("Game over!");
    //     };
    //     numOfTurns ++;
    // };

    //render array into board
    const renderBoard = (board) => {
        board.map(sq => {
            sq.map(loc => {
                const sqUp = document.getElementById(loc.pos);
                    sqUp.innerHTML = loc.piece;
            });
        });
    };

    // const getBoard = document.querySelectorAll('.square');
    // getBoard.forEach(square => {
    //     square.addEventListener("click", () => {
    //         if (square.innerHTML == "") {
    //             stripNumber(square.id);
    //         }
    //     });
    // });

    //win condition counters
    let count0 = 0;
    let count1 = 0;
    let count2 = 0;
    let diag1 = 0;
    let diag2 = 0;
    let xArray = [];
    let oArray = [];

    //winner check
    const checkIfWinner = (board) => {
        
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
        xArray = []; //reset array for each player.
        oArray = [];
        return false;
    }

    const switchCase = (array) => {
        count0 = 0;
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
        count0 = 0;
        count1 = 0;
        count2 = 0;

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

    return {
        renderBoard,
        checkIfWinner,
        
    }

})();

//game module
const game = (() => {

    //make players, gameboard, and turns
    let numOfTurns = 0;
    let finishedBoard = gameBoard.makeGameBoard();
    const playerOne = player("Player One", "X");
    const playerTwo = player("Player Two", "O");
    // let playerWinner = "";
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

        if (numOfTurns >= 4 && numOfTurns < 8) {

            if (displayUpdate.checkIfWinner(finishedBoard) === true) {
                if (playerOne.isTurn === false) {
                    playWinner(playerOne.name);
                } else {
                    playWinner(playerTwo.name);
                };
            };

        } else if (numOfTurns == 8) {
            const winDisplay = document.querySelector('.messagebox');
            winDisplay.innerHTML = "Tie Game!"
        };
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

    //get winner
    const playWinner = (playerName) => {
        const winDisplay = document.querySelector('.messagebox');
        winDisplay.innerHTML = playerName + " is the winner!";
    };

    // const getTurn  = () => {
    //     console.log(playerOne.isTurn);
    //     console.log(playerTwo.isTurn);
    // }

})();
