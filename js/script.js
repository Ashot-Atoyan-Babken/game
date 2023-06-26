let greenCircle = document.querySelector('.green-circle');
let step = document.querySelector('.step>p');
let score = document.querySelector('.score>p');
let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");
let result = 0;
let images = [
   'img/general image/red.jpg',
   'img/general image/green.jpg',
   'img/general image/blue.jpg',
   'img/general image/man.jpg',
   'img/general image/yellow.jpg'
];
let imageObj = [];
function getRandomImage() {
   return images[Math.floor(Math.random() * images.length)];
}
let imageSize = 50;
let canvasSize = 500;
let numRows = Math.floor(canvasSize / imageSize);
let numCols = Math.floor(canvasSize / imageSize);

for (let row = 0; row < numRows; row++) {
   for (let col = 0; col < numCols; col++) {
      let image = new Image();
      url = getRandomImage()
      image.src = url;

      let x = col * imageSize;
      let y = row * imageSize;
      let obj = {
         name: url,
         cordx: x,
         cordy: y
      }
      imageObj.push(obj);
      image.onload = function () {
         context.drawImage(image, x, y, imageSize, imageSize);
      };
   }
}

let sameArr = [];
let sameArr2 = [];
canvas.addEventListener("click", handleClick);
function getImage(x, y) {
   for (j = 0; j < imageObj.length; j++) {
      if (imageObj[j].cordx === x && imageObj[j].cordy === y) {
         let nameUrl = imageObj[j].name;
         return nameUrl;
      }
   }
}
function getNumber(x, y) {
   for (j = 0; j < imageObj.length; j++) {
      if (imageObj[j].cordx === x && imageObj[j].cordy === y) {

         return j;
      }
   }
}


function handleClick(event) {
   let count = 0;
   let rect = canvas.getBoundingClientRect();
   let cx = event.clientX - rect.left;
   let cy = event.clientY - rect.top;
   let sum = (Math.floor(cy / imageSize) * 10) + Math.ceil(cx / imageSize);
   let x = 0;
   let y = 0;
   let k = 0;
   for (i = 1; i < 101; i++) {
      if (i === sum) {
         function choose(x, y) {
            if (getImage(x, y) !== undefined) {
               let img = getImage(x, y);
               let img1 = getImage(x, y + imageSize);
               let img2 = getImage(x, y - imageSize)
               let img3 = getImage(x + imageSize, y);
               let img4 = getImage(x - imageSize, y)
               let imgArr = [img1, img2, img3, img4];
               for (c = 0; c < imgArr.length; c++) {
                  if (img == imgArr[c]) {
                     if (!sameArr.some(element => JSON.stringify(element) === JSON.stringify([x, y]))) {
                        sameArr.push([x, y]);
                     }
                     if (c == 0 && !sameArr.some(element => JSON.stringify(element) === JSON.stringify([x, y + imageSize]))) {
                        sameArr.push([x, y + imageSize]);
                     }
                     if (c == 1 && !sameArr.some(element => JSON.stringify(element) === JSON.stringify([x, y - imageSize]))) {
                        sameArr.push([x, y - imageSize]);
                     }
                     if (c == 2) {
                        if (!sameArr.some(element => JSON.stringify(element) === JSON.stringify([x + imageSize, y]))) {
                           sameArr.push([x + imageSize, y]);
                        }
                     }
                     if (c == 3 && !sameArr.some(element => JSON.stringify(element) === JSON.stringify([x - imageSize, y]))) {
                        sameArr.push([x - imageSize, y]);
                     }
                  }
               }
            }
            for (f = k; f < sameArr.length; f++) {
               k++
               choose(sameArr[f][0], sameArr[f][1]);
            }
            for (s = 0; s < sameArr.length; s++) {
               imageObj[getNumber(x, y)] = {
                  name: 0,
                  cordx: x,
                  cordy: y
               }
            }
            if (sameArr[0] !== -1) {
               sameArr2 = sameArr;
            }
         }
         choose(x, y)
      }

      sameArr = [];

      if (i % 10 === 0 && i !== 0) {
         x = 0;
         y += imageSize;
      } else {
         x += imageSize;
      }

   }

   sameArr2.sort((a, b) => a[1] - b[1]);
   count += sameArr2.length;


   for (let row = 0; row < sameArr2.length; row++) {
      for (let col = 0; col < sameArr2[row][1] / 50 + 1; col++) {
         let image = new Image();
         let x = sameArr2[row][0];
         let y = sameArr2[row][1] - col * 50;
         if (getNumber(x, y - imageSize) == undefined) {
            imageObj[getNumber(x, y)] = {
               name: 0,
               cordx: x,
               cordy: y
            }
         } else if (imageObj[getNumber(x, y - imageSize)].name == 0) {
            imageObj[getNumber(x, y)] = {
               name: 0,
               cordx: x,
               cordy: y
            }
         } else {
            image.src = getImage(x, y - imageSize);
            image.onload = function () {
               context.drawImage(image, x, y, imageSize, imageSize);
            };
            imageObj[getNumber(x, y)] = {
               name: getImage(x, y - imageSize),
               cordx: x,
               cordy: y
            }
         };
      }
   }

   for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
         let image = new Image();
         let x = col * imageSize;
         let y = row * imageSize;
         if (imageObj[getNumber(x, y)].name == 0) {
            url = getRandomImage()
            image.src = url;
            imageObj[getNumber(x, y)] = {
               name: url,
               cordx: x,
               cordy: y
            }
            image.onload = function () {
               context.drawImage(image, x, y, imageSize, imageSize);
            };
         }
      }
   }
   if (count * 2 >= 340) {
      alert('you win!!!')
      let ques = confirm('do you want to save your result')

      if (ques) {
         localStorage.setItem("count", count * 2);
         location.reload();
      }
      else {
         location.reload();
      }
   } else {
      result += count * 2
      greenCircle.style.width = result + 'px'

   }
   if (count === 0) {
      step.innerHTML -= 0;
   } else {
      step.innerHTML -= 1;

   }
   score.innerHTML = result;
   if (step.innerHTML == 0) {
      alert('you lose');
      let ques = confirm('do you want to save your result')
      if (ques) {
         localStorage.setItem("count", count * 2);
         location.reload();
      }
      else {
         location.reload();
      }
   }
}


function reset() {
   location.reload();
}
let localStorageGet = localStorage.getItem('count');
document.querySelector('.ball').innerHTML = localStorageGet
