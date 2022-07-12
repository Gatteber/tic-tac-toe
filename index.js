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


//gameboard constructor
const makeGameBoard = () => {
    let array = [];

    for( let i = 0; i < 3; i++) {
        array[i] = [];

        for (let j = 0; j < 3; j++) {
            array[i][j] = ".";
        };
    };
    return array;
};

//factory function to select piece locations
const getEventListeners = (board) => {
    board.forEach(square => {
        console.log(square)
    })
    return "done"
}

const getGameBoard = () => {
    const getBoard = () => document.querySelectorAll('square')
    return { getBoard }
}

const gameBoard = makeGameBoard();
const board = getGameBoard();

board.getBoard();
board.getEventListeners(board);
// getEventListeners(gbPlayer);




