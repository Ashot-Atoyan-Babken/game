

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




