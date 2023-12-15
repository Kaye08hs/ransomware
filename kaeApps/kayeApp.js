const size = 3; // Adjust the size of the puzzle
  let puzzle = [];

  function initializePuzzle() {
    for (let i = 0; i < size * size; i++) {
      puzzle.push(i);
    }
    shufflePuzzle();
  }

  function shufflePuzzle() {
    for (let i = puzzle.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [puzzle[i], puzzle[j]] = [puzzle[j], puzzle[i]];
    }
    renderPuzzle();
  }

  function renderPuzzle() {
    const puzzleContainer = document.getElementById('puzzle-container');
    puzzleContainer.innerHTML = '';

    for (let i = 0; i < size * size; i++) {
      const piece = document.createElement('div');
      piece.className = 'puzzle-piece';
      piece.textContent = puzzle[i] === size * size - 1 ? '' : puzzle[i] + 1;
      piece.addEventListener('click', () => movePiece(i));
      puzzleContainer.appendChild(piece);
    }
  }

  function movePiece(index) {
    const emptyIndex = puzzle.indexOf(size * size - 1);
    const adjacentIndices = getAdjacentIndices(emptyIndex);

    if (adjacentIndices.includes(index)) {
      [puzzle[index], puzzle[emptyIndex]] = [puzzle[emptyIndex], puzzle[index]];
      renderPuzzle();
      if (isSolved()) {
        alert('Congratulations! Puzzle solved.');
      }
    }
  }

  function getAdjacentIndices(index) {
    const row = Math.floor(index / size);
    const col = index % size;
    const indices = [];

    if (row > 0) indices.push(index - size); // Up
    if (row < size - 1) indices.push(index + size); // Down
    if (col > 0) indices.push(index - 1); // Left
    if (col < size - 1) indices.push(index + 1); // Right

    return indices;
  }

  function isSolved() {
    for (let i = 0; i < size * size - 1; i++) {
      if (puzzle[i] !== i) {
        return false;
      }
    }
    return true;
  }
  initializePuzzle();

  function resetPuzzle() {
    puzzle = [];
    initializePuzzle();
  }

  document.getElementById('reset-button').addEventListener('click', resetPuzzle);