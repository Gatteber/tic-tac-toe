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


//gameBoard module
const gameBoard = (() => {
    const makeGameBoard = () => {
        let array = [];
    
        for( let i = 0; i < 3; i++) {
            array[i] = [];
    
            for (let j = 0; j < 3; j++) {
                array[i][j] = null;
            };
        };
        return array;
    };
    //create board array
    const finishedBoard = makeGameBoard();
    
    const playSquare = (clickedSquare, test) => {
        if (clickedSquare.innerHTML == "") {
            clickedSquare.innerHTML = "X";
        }
    };

    const getBoard = document.querySelectorAll('.square');
    const getEventListeners = getBoard.forEach(square => {
        square.addEventListener("click", () => {
            console.log(square.id);
            playSquare(square);
        });
    });

    const add = (a, b) => a + b;

    return {
        finishedBoard,
        getBoard,
        getEventListeners,
        add,
        playSquare,
    };
})();

//player factory function
const player = (name, piece) => {
    const test = () => console.log("test");

   return { name, piece, test, };
};

const playerOne = player("playerOne", "X");
const playerTwo = player("playerTwo", "O");


console.log(gameBoard.finishedBoard);




