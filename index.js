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
    const test = () => console.log("test");

   return { name, piece, test, };
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
                    pos: [i] + "." + [j]
                };
            };
        };
        return array;
    };
    //create board array
    const finishedBoard = makeGameBoard();

    const playSquare = (clickedSquare) => {
        if (clickedSquare.innerHTML == "") {
           return clickedSquare.id
        };
    };

    // const getBoard = document.querySelectorAll('.square');
    // const getEventListeners = getBoard.forEach(square => {
    //     square.addEventListener("click", () => {
    //         console.log(square.id);
    //         playSquare(square);
    //     });
    // });

    const add = (a, b) => a + b;

    return {
        finishedBoard,
        // getBoard,
        // getEventListeners,
        add,
        playSquare,

    };
})();

//display module
const displayUpdate = (() => {

    //make players
    const playerOne = player("playerOne", "X");
    const playerTwo = player("playerTwo", "O");

    //get playSquare
    const { playSquare } = gameBoard;

    //strip id from square
    const stripNumber = (squareID) => {
        const string = JSON.stringify(squareID);
        const row = string.slice(1, 2);
        const column = string.slice(3, 4);
        gameBoard.finishedBoard[row][column].piece = playerOne.piece;
        renderBoard(gameBoard.finishedBoard);
    };

    //render array into board
    const renderBoard = (board) => {
        board.map(sq => {
            sq.map(loc => {
                const sqUp = document.getElementById(loc.pos)
                sqUp.innerHTML = loc.piece
            });
        });
    };

    const getBoard = document.querySelectorAll('.square');
    getBoard.forEach(square => {
        square.addEventListener("click", () => {
            // console.log(square.id);
            stripNumber(square.id);
        });
    });

    // console.log(gameBoard.finishedBoard);
    // console.log(playerOne);
    // console.log(playerTwo);
    // console.log(updateBoard())

    return { playSquare, }

})();











