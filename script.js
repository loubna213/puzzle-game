
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
        console.log(selectedImageSrc)
        if (selectedImageSrc) {
            // Store the src of the selected image in localStorage
            localStorage.setItem('selectedImageSrc', selectedImageSrc);
            window.location.href = 'game.html'; // Redirect to the game or start the game initialization
        }
    });

});


// let rows = 5;
// let columns = 5;

// let currTile;
// let otherTile;

// const selectedImageUrl = localStorage.getItem('selectedImageSrc');

// function getFileName(selectedImageUrl) {
//     // First, isolate the filename with extension using 'split('/') and 'pop()'
//     const filenameWithExtension = selectedImageUrl.split('/').pop();
//     // Now, remove the extension by splitting on '.' and taking the first part
//     const filenameWithoutExtension = filenameWithExtension.split('.')[0];
//     return filenameWithoutExtension;
// }  // Retrieve the chosen image source



//DRAG TILES
// function dragStart() {
//     currTile = this; //this refers to image that was clicked on for dragging
// }

// function dragOver(e) {
//     e.preventDefault();
// }

// function dragEnter(e) {
//     e.preventDefault();
// }

// function dragLeave() {

// }

// function dragDrop() {
//     otherTile = this; //this refers to image that is being dropped on
// }

// let wrongPlacements = {};  // This object will track the number of wrong attempts for each field

// function dragDrop() {
//     otherTile = this; //this refers to the image that is being dropped on

//     // Assuming each tile in the board has a unique identifier, e.g., data-index
//     let tileIndex = otherTile.dataset.index;  // Get the index of the tile

//     if (!wrongPlacements[tileIndex]) {
//         wrongPlacements[tileIndex] = 0;  // Initialize if not already done
//     }

//     if (currTile.src.includes("blank")) {
//         return;  // No action if dragging from a blank
//     }

//     // Check if the piece dropped is the correct one
//     const correctSrc = `file:///C:/Users/Packard%20bell/Desktop/puzzle_game/images/${getFileName(selectedImageUrl)}/piece_${tileIndex + 1}.jpg`;
//     if (currTile.src !== correctSrc) {
//         wrongPlacements[tileIndex]++;
//         if (wrongPlacements[tileIndex] >= 3) {
//             alert("Game Over: You have placed the wrong piece three times in the same field.");
//             window.location.href = 'end.html';  // Redirect to the end page
//             return;
//         }
//     }

//     // Swap images if not a game over condition
//     let currImg = currTile.src;
//     let otherImg = otherTile.src;
//     currTile.src = otherImg;
//     otherTile.src = currImg;
// }


// function dragEnd() {
//     if (currTile.src.includes("blank")) {
//         return;
//     }
//     let currImg = currTile.src;
//     let otherImg = otherTile.src;
//     currTile.src = otherImg;
//     otherTile.src = currImg;
// }
