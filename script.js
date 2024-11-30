function initializeGame() {
    // Create an empty 3x3 board
    // We'll use null to represent empty cells
    return {
            board : [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ],

        // Keep track of current player
        currentPlayer : 'X',  // X starts first
        isGameOver: false,
        winningPlayer: null,
        makeMove(row,col){
            // validity of move
            if (this.board[row][col] === null) {
                this.board[row][col] = this.currentPlayer;

                // Use this to call methods within the object
                if (this.checkWin()) {
                    console.log(`Player ${this.currentPlayer} wins!`);
                    return true;
                }
                if (this.checkDraw()) {
                    console.log("It's a draw.");
                    return true;
                }

                // Simplified player switching
                this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
                return false;
            }
            return false; // Invalid move
        },
        checkWin(){
            // check rows
            for(let row of this.board){
                if(row.every(cell=>cell===this.currentPlayer)){
                    this.isGameOver = true;
                    this.winningPlayer = this.currentPlayer;
                    
                    return true;
                }
            }
            // check columns
            for(col = 0; col<3 ;col++){
                if(this.board.every(row=>row[col] === this.currentPlayer)){
                    this.isGameOver = true;
                    this.winningPlayer = this.currentPlayer;
                    return true;
                }
            }
            // check main diagonal
            if(this.board[0][0] == this.currentPlayer &&
                this.board[1][1] == this.currentPlayer &&
                this.board[2][2] == this.currentPlayer){
                    this.isGameOver = true;
                    this.winningPlayer = this.currentPlayer;
                    return true;
                }
            // check side diagonal

            if(this.board[0][2] == this.currentPlayer &&
                this.board[1][1] == this.currentPlayer &&
                this.board[2][0] == this.currentPlayer){
                    this.isGameOver = true;
                    this.winningPlayer = this.currentPlayer;
                    return true;
                }
            return false;
        },
        checkDraw(){
            return this.board.every(row=>row.every(cell=>cell!== null))
        },
        reset() {
            this.board = [
                [null, null, null],
                [null, null, null],
                [null, null, null]
            ];
            this.currentPlayer = 'X';
            this.isGameOver = false;
            this.winningPlayer = null;
        }
    };
}
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.querySelector('.status-display');
const resetButton = document.querySelector('.reset-button');
const winner = document.querySelector('.winner');
const game = initializeGame();
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        const row = Math.floor(index/3);
        const col = index % 3;

        // Attempt to make a move
        if (game.board[row][col] === null) {  // Check if cell is empty
            cell.textContent = game.currentPlayer;  // Update cell immediately
            game.makeMove(row, col);  // Make the move

            // Update status display
            statusDisplay.textContent = `Current Player: ${game.currentPlayer}`;
        }
        if(game.checkWin()){
            winner.textContent = `and the winner is:${game.currentPlayer}`         
            game.reset();
        // Clear board UI
            
        cells.forEach(cell => {
            cell.textContent = '';
        });
        }
        if(game.checkDraw()){
            winner.textContent = 'its a draw';         
            game.reset();
        // Clear board UI
            
        cells.forEach(cell => {
            cell.textContent = '';
        });
        }
    });
});
resetButton.addEventListener('click' , ()=>{
    game.reset();

     // Clear board UI
     cells.forEach(cell => {
        cell.textContent = '';
    });

    // Reset status display
    statusDisplay.textContent = 'Current Player: X';
});