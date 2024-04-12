//הגדרת לוח המשחק
const size = 3; // לשינוי גודל הפאזל
const totalTiles = size * size;
const emptyTile = totalTiles;
document.getElementById('restart-button').addEventListener('click', restartGame);
let tiles = [];
for (let i = 1; i <= totalTiles; i++) {
    tiles.push(i);
}
tiles[emptyTile - 1] = '';

// מערבב את המספרים
function shuffleTiles() {
    for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
}// מגריל כל פעם לוח חדש
function renderBoard() {
    const board = document.getElementById('board');
    board.innerHTML = '';
    for (let i = 0; i < totalTiles; i++) {
        const tile = document.createElement('div');
        tile.className = 'tile';
        tile.innerHTML = tiles[i];
        board.appendChild(tile);
    }
}

// מאתחל את המשחק
function restartGame() {
    clearInterval(timerInterval);
    secondsRemaining = 60; //מאפס את זמן המשחק
    shuffleTiles();
    renderBoard();//מגריל לוח חדש
    startTimer();
    const moveCount = document.getElementById('move-count');
    moveCount.textContent = 0;
      const gameOverText = document.getElementById('game-over');
      gameOverText.style.display = 'none';
      document.addEventListener('keydown', handleKeyPress);
}

// מקשי חיצים
function handleKeyPress(event) {
    const moveCount = document.getElementById('move-count');
    moveCount.textContent = parseInt(moveCount.textContent) + 1;
    const emptyIndex = tiles.indexOf('');

    let newIndex;
    switch (event.key) {
        case 'ArrowUp':
            newIndex = emptyIndex + size;
            break;
        case 'ArrowDown':
            newIndex = emptyIndex - size;
            break;
        case 'ArrowLeft':
            newIndex = emptyIndex + 1;
            break;
        case 'ArrowRight':
            newIndex = emptyIndex - 1;
            break;
        default:
            return;
    }

    if (newIndex >= 0 && newIndex < totalTiles) {
        [tiles[emptyIndex], tiles[newIndex]] = [tiles[newIndex], tiles[emptyIndex]];
        renderBoard();

        if (isPuzzleSolved()) {
            win(); 
        }
    }
}


// טיימר
let secondsRemaining =60; // משנה את הזמן
let timerInterval;

function startTimer() {
    const timerDisplay = document.getElementById('timer');

    timerInterval = setInterval(() => {
        secondsRemaining--;
        timerDisplay.textContent = secondsRemaining;

        if (secondsRemaining <= 0) {
            clearInterval(timerInterval);
            gameOver();
        }
    }, 1000);
}

// מפעיל את המשחק
restartGame();
document.addEventListener('keydown', handleKeyPress);

// המשחק נגמר
function gameOver() {
    clearInterval(timerInterval);
    document.getElementById("losBip").play();
    const gameOverText = document.getElementById('game-over');
    gameOverText.textContent = 'GAME OVER';
    gameOverText.classList.add('game-over');
    gameOverText.style.display = 'block';
   document.removeEventListener("keydown",handleKeyPress);
}
//השחקן ניצח
function win() {

    const puzzleSolvedText = document.getElementById('puzzle-solved');
    puzzleSolvedText.classList.add('puzzle-solved');
    document.getElementById("winBip").play();

    clearInterval(timerInterval);
    openModal();

}

//קוד יעלי 
var modal = document.getElementById("myModal");

function openModal() {
    modal.style.display = "block";
}
span.onclick = function () {
    modal.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//האם הפאזל פתור
function isPuzzleSolved() {
  
    for (let i = 0; i < totalTiles - 1; i++) {
        console.log(tiles[i]);
        if (tiles[i] !== (i + 1)) {
            return false;
        }
    }
    return true;
}

