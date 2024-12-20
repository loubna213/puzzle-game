


document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.img-option');
    let selectedImageSrc = null;

    images.forEach(img => {
        img.addEventListener('click', function() {
            // Remove selected class from all images
            images.forEach(i => i.classList.remove('img-selected'));
            // Add selected class to clicked image
            this.classList.add('img-selected');
            selectedImageSrc = this.src; // Store the src of the selected image
            document.getElementById('continue-btn').disabled = false; // Enable the continue button
        });
    });

    // Continue button event
    document.getElementById('continue-btn').addEventListener('click', function() {
        if (selectedImageSrc) {
            // Store the src of the selected image in localStorage
            localStorage.setItem('selectedImageSrc', selectedImageSrc);
            window.location.href = 'game.html'; // Redirect to the game or start the game initialization
        }
    });

});


let rows = 5;
let columns = 5;

let currTile;
let otherTile;

const selectedImageUrl = localStorage.getItem('selectedImageSrc');

function getFileName(selectedImageUrl) {
    // First, isolate the filename with extension using 'split('/') and 'pop()'
    const filenameWithExtension = selectedImageUrl.split('/').pop();
    // Now, remove the extension by splitting on '.' and taking the first part
    const filenameWithoutExtension = filenameWithExtension.split('.')[0];
    return filenameWithoutExtension;
}  // Retrieve the chosen image source



window.onload = function() {
    //initialize the 5x5 board
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            //<img>
            let tile = document.createElement("img");
            tile.src = "./images/blank.jpg";

            //DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart); //click on image to drag
            tile.addEventListener("dragover", dragOver);   //drag an image
            tile.addEventListener("dragenter", dragEnter); //dragging an image into another one
            tile.addEventListener("dragleave", dragLeave); //dragging an image away from another one
            tile.addEventListener("drop", dragDrop);       //drop an image onto another one
            tile.addEventListener("dragend", dragEnd);      //after you completed dragDrop

            document.getElementById("board").append(tile);
        }
    }

    //pieces
    let pieces = [];
    for (let i=1; i <= rows*columns; i++) {
        pieces.push(i.toString()); //put "1" to "25" into the array (puzzle images names)
    }
    pieces.reverse();
    for (let i =0; i < pieces.length; i++) {
        let j = Math.floor(Math.random() * pieces.length);

        //swap
        let tmp = pieces[i];
        pieces[i] = pieces[j];
        pieces[j] = tmp;
    }

    for (let i = 0; i < pieces.length; i++) {
        let tile = document.createElement("img");
        let imageName = getFileName(selectedImageUrl)
        tile.src = `./images/${imageName}/piece_` + pieces[i] + ".jpg";

        //DRAG FUNCTIONALITY
        tile.addEventListener("dragstart", dragStart); //click on image to drag
        tile.addEventListener("dragover", dragOver);   //drag an image
        tile.addEventListener("dragenter", dragEnter); //dragging an image into another one
        tile.addEventListener("dragleave", dragLeave); //dragging an image away from another one
        tile.addEventListener("drop", dragDrop);       //drop an image onto another one
        tile.addEventListener("dragend", dragEnd);      //after you completed dragDrop

        document.getElementById("pieces").append(tile);
    }
}

//DRAG TILES
function dragStart() {
    currTile = this; //this refers to image that was clicked on for dragging
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this; //this refers to image that is being dropped on
}

// Initialize a map to keep track of wrong placements at each position
// let wrongPlacementCounts = {};

// function dragDrop() {
//     otherTile = this; // The target where the piece is dropped

//     // Assuming each piece has a data-index for its correct position
//     let intendedIndex = otherTile.dataset.index;
//     let droppedPieceIndex = currTile.src.match(/piece_(\d+)\.jpg/)[1]; // Extracting the piece number from the filename

//     // Check if the dropped piece is correct
//     if (intendedIndex !== droppedPieceIndex) {
//         // Increment the wrong placement count for this position
//         wrongPlacementCounts[intendedIndex] = (wrongPlacementCounts[intendedIndex] || 0) + 1;

//         // Check if this position has reached 3 wrong placements
//         if (wrongPlacementCounts[intendedIndex] >= 3) {
//             alert("Game Over: Wrong piece placed three times in the same field.");
//             // Here you might want to disable further moves or reset the game
//             return; // Stop further execution
//         }
//     }

//     // Continue with swapping logic if not returned
//     let currImg = currTile.src;
//     let otherImg = otherTile.src;
//     currTile.src = otherImg;
//     otherTile.src = currImg;
// }




function dragEnd() {
    if (currTile.src.includes("blank")) {
        return;
    }
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;
}


function checkIfPuzzleIsSolved() {
    const board = document.getElementById('board'); // Assuming the board div has the id 'board'
    const images = board.querySelectorAll('img');
    let solved = true;
    let imageName = getFileName(selectedImageUrl)

    console.log(board)
    images.forEach((img, index) => {
        // Construct the expected src for each piece
        const expectedSrc = `file:///C:/Users/Packard%20bell/Desktop/puzzle_game/images/${imageName}/piece_${index + 1}.jpg`;
        if (img.src !== expectedSrc) {
            solved = false;
        }
    });

    if (solved) {
        alert('Congratulations! You solved the puzzle.');
    } else {
        alert('Game Over: Some pieces are not in the correct place.');
    }
}



document.getElementById('check-solution-btn').addEventListener('click', checkIfPuzzleIsSolved);
