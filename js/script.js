

let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");
let x = 0;
let y = 0;

for (i = 0; i <= 100; i++) {
   let arr = ["darkorchid", "blue", "red", "green", "rgb(255, 187, 0)"]
   let color = Math.floor(Math.random() * 5);
   color = arr[color];
   context.strokeStyle = "white";
   context.strokeRect(x, y, 40, 40);
   context.fillStyle = color;
   context.fillRect(x, y, 40, 40);
   if (i % 10 === 0 && i !== 0) {
      x = 0;
      y += 40;
   } else {
      x += 40;
   }

}
canvas.addEventListener("click", handleClick);

function handleClick(event) {
   let rect = canvas.getBoundingClientRect();
   let cx = event.clientX - rect.left;
   let cy = event.clientY - rect.top;
   let sum = (Math.floor(cy / 40) * 10) + Math.ceil(cx / 40);
   let x = 0;
   let y = 0;
   for (i = 1; i < 101; i++) {
      if (i === sum) {
         let [r, g, b, a] = context.getImageData(x, y, 40, 40).data;
         let img = (`${r},${g},${b},${a}`);
         [r, g, b, a] = context.getImageData(x, y + 40, 40, 40).data;
         let img1 = (`${r},${g},${b},${a}`);
         [r, g, b, a] = context.getImageData(x, y - 40, 40, 40).data;
         let img2 = (`${r},${g},${b},${a}`);
         [r, g, b, a] = context.getImageData(x + 40, y, 40, 40).data;
         let img3 = (`${r},${g},${b},${a}`);
         [r, g, b, a] = context.getImageData(x - 40, y, 40, 40).data;
         let img4 = (`${r},${g},${b},${a}`);

         let imgArr = [img1, img2, img3, img4];

         for (c = 0; c < imgArr.length; c++) {
            if (img == imgArr[c]) {
               context.clearRect(x, y, 40, 40);
               if (c == 0) {
                  context.clearRect(x, y + 40, 40, 40);
               } else if (c == 1) {
                  context.clearRect(x, y - 40, 40, 40);
               } else if (c == 2) {
                  context.clearRect(x + 40, y, 40, 40);
               } else if (c == 3) {
                  context.clearRect(x - 40, y, 40, 40);
               }
            }
         }

      }
      if (i % 10 === 0 && i !== 0) {
         x = 0;
         y += 40;
      } else {
         x += 40;
      }
   }

}


let pause = document.querySelector('.pause').onclick = () => {

}

// let canvas = document.querySelector("canvas");
// let context = canvas.getContext("2d");
// let blockSize = 40;
// let rows = 10;
// let cols = 10;
// let blocks = [];

// // blokner
// for (let i = 0; i < rows; i++) {
//    for (let j = 0; j < cols; j++) {
//       let color = getRandomColor();
//       blocks.push({ x: j * blockSize, y: i * blockSize, color: color, removed: true });
//    }
// }


// function drawBlocks() {
//    blocks.forEach((block) => {
//       if (!block.removed) {
//          context.strokeStyle = "white";
//          context.strokeRect(block.x, block.y, blockSize, blockSize);
//          context.fillStyle = block.color;
//          context.fillRect(block.x, block.y, blockSize, blockSize);
//       }
//    });
// }

// // guyn
// function getRandomColor() {
//    let colors = ["darkorchid", "blue", "red", "green", "rgb(255, 187, 0)"];
//    return colors[Math.floor(Math.random() * colors.length)];
// }

// //jnjel
// function removeBlocks(indices) {
//    indices.forEach((index) => {
//       blocks[index].removed = true;
//    });
// }

// // stugum
// function checkNeighbors(row, col, targetColor, indicesToDelete) {
//    let index = row * cols + col;
//    if (row >= 0 && row < rows && col >= 0 && col < cols && !blocks[index].removed) {
//       if (blocks[index].color === targetColor && !indicesToDelete.includes(index)) {
//          indicesToDelete.push(index);
//          checkNeighbors(row - 1, col, targetColor, indicesToDelete);
//          checkNeighbors(row + 1, col, targetColor, indicesToDelete);
//          checkNeighbors(row, col - 1, targetColor, indicesToDelete);
//          checkNeighbors(row, col + 1, targetColor, indicesToDelete);
//       }
//    }
// }


// function handleClick(event) {
//    let rect = canvas.getBoundingClientRect();
//    let cx = event.clientX - rect.left;
//    let cy = event.clientY - rect.top;
//    let clickedBlockIndex = Math.floor(cy / blockSize) * cols + Math.floor(cx / blockSize);
//    let clickedBlockColor = blocks[clickedBlockIndex].color;
//    let indicesToDelete = [];


//    let row = Math.floor(clickedBlockIndex / cols);
//    let col = clickedBlockIndex % cols;
//    checkNeighbors(row, col, clickedBlockColor, indicesToDelete);


//    removeBlocks(indicesToDelete);


//    context.clearRect(0, 0, canvas.width, canvas.height);
//    drawBlocks();
// }


// drawBlocks();

// canvas.addEventListener("click", handleClick);
