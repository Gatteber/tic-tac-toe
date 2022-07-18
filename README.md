# tic-tac-toe
A Tic-Tac-Toe App!


### Planning the Project
1.) Use 2D array knowledge to make a 3x3 array.
2.) Game pieces = null(unplayed), X(played), O(played)
3.) Add elements to the DOM, and tie them to a board.
4.) Make it so board auto-updates with information (needs a played class).

1_| _2 |_3
4_| _5 |_6
7 |  8 | 9
End of Task 1 goals.
Task 1 complete!

Task 2 goals:
1.) Add a turn class for each player
2.) add a variable for piece token (to use in stripNumber)
3.) switch between the two
4.) check for a win condition
Task 2 complete!

Task 3 goals:
1.) Decide how to handle the win condition and bugtest.
2.) if everything is ok, push to git
3.) Message box on bottom of the screen
4.) make button to reset game
5.) CPU? if yes, start with random move.


### Reflection
I've decided to stop here for now. While I understand the concept of minimax and how it works, I'm not sure how to implement it in a way that makes sense for my current level of skill. I'm struggling the most on how to link the score evaluation to a gameboard. I've got some understanding of dfs, but I'm really, really stuck on where to even start, and while I watched some videos of people coding it themselves, I wasn't able to wrap my head around how to get the score evaluation and what to do in each situation.

On the other hand, I was really proud that I accomplished this without any global code. I think a couple of my functions are kind of large, but I could finish almost everything I wanted. I got the switch cases idea from a friend, although I could have just used if cases, it was nice to learn what they were and how to apply them a little.

I'm also more comfortable with the functions I struggled with during the library project. I think I'm slowly starting to understand what it is that I need to do in code.

I will, without a doubt, come back to this and finish the minimax algorithm implementation when I've had some time away from the project. When I do, I look forward to making an unbeatable AI.


### Project Notes

player clicks square -> function to check if played -> update with player if it's their turn

click -> checkifturn (player) -> playPiece -> changeturn

Then
Check for winner??

Click -> 1.1
1.1 -> strip and into a map
map into array
update the screen

render obj, not array inside the obj is the square id


playerOne.isTurn = true;
playerTwo.isTurn = false;

player one = turn

getPiece(p1Turn) => {
    return (p1Turn ? playerOne.piece : playerTwo.piece)
    playerOne.myTurn(playerOne.isTurn);
    playerTwo.myTurn(playerTwo.isTurn);
}


[i][j]

num -> num +=
if 5
let count = 0
const check = () => {
        const renderBoard = (board) => {
        board.map(sq => {
            sq.map(loc => {
                console.log(loc.piece);
            });
        });
    };
    
}

current situation ->
winner is checked inside the switchCase() method. Should we bubble up to the checkIfWinner() method?