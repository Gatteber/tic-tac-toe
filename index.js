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

   return { name, piece, isTurn};
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
    };
})();

//display module
const displayUpdate = (() => {

    //make players
    const playerOne = player("playerOne", "X");
    const playerTwo = player("playerTwo", "O");
    playerOne.isTurn = true;

    //get piece to play
    const getPiece = (p1Turn) => {
        playerOne.isTurn = !playerOne.isTurn;
        return p1Turn ? playerOne.piece : playerTwo.piece;
    }


    //strip id from square
    const stripNumber = (squareID) => {
        const string = JSON.stringify(squareID);
        const row = string.slice(1, 2);
        const column = string.slice(3, 4);
        gameBoard.finishedBoard[row][column].piece = getPiece(playerOne.isTurn);
        renderBoard(gameBoard.finishedBoard);
        checkIfWinner(gameBoard.finishedBoard);
    };

    //render array into board
    const renderBoard = (board) => {
        board.map(sq => {
            sq.map(loc => {
                const sqUp = document.getElementById(loc.pos);
                console.log(sqUp.innerHTML);
                    sqUp.innerHTML = loc.piece;
            });
        });
    };

    const getBoard = document.querySelectorAll('.square');
    getBoard.forEach(square => {
        square.addEventListener("click", () => {
            if (square.innerHTML == "") {
                stripNumber(square.id);
            }
        });
    });

    const checkIfWinner = (board) => {
        board.map(sq => {
            sq.map(loc => {
                // console.log(loc.X);
            });
        });
    }



    return {}

})();
