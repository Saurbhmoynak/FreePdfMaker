var newImage,showImg;
function loadFile(event){
  showImg=document.getElementById('showImg');
  showImg.src=URL.createObjectURL(event.target.files[0]);

  newImage=document.createElement('img');
  newImage.src=URL.createObjectURL(event.target.files[0]);
  showImg.onload= function(){
    URL.revokeObjectURL(showImg.src)
  }
};

function pdfDown(){
  console.log(newImage)
  var doc = new jsPDF();
  doc.addImage(newImage,10,10);
  doc.save('ImgToPDF.pdf');
}



let files = [];
var button = document.querySelector('.top button');
var form = document.querySelector('form');
var container = document.querySelector('.image-field');
var text = document.querySelector('.inner');
var browse = document.querySelector('.select');
var input = document.querySelector('form input');

browse.addEventListener('click', () => input.click());
button.addEventListener('click', () => input.click());
input.addEventListener('change', () => {
  let file = input.files;

  for (let i = 0; i < file.length; i++){
    if (files.every(e => e.name !== file[i].name)) files.push(file[i]);
  }
  form.reset();
  showImages();
})

const showImages = () => {
  let images = '';
  files.forEach((e, i) => {
    images += `<div class="image">
    <img src="${URL.createObjectURL(e)}" alt="image">
    <span onclick="delImages(${i})">&times;</span>
  </div>`
  })
  
  container.innerHTML = images;
}

const delImages = index => {
  files.splice(index, 1)
  showImages();
}

form.addEventListener('dragover', e => {
  e.preventDefault()

  form.classList.add('dragover');
  text.innerHTML = 'Drop Images Here'
})

form.addEventListener('dragleave', e => {
  e.preventDefault()

  form.classList.add('dragover');
  text.innerHTML = 'Drag & Drop image here or<span class="select">Browse</span>';
})

form.addEventListener('drop',e => {
  e.preventDefault()

  form.classList.add('dragover');
  text.innerHTML = 'Drag & Drop image here or<span class="select">Browse</span>';

  let file = e.dataTransfer.files;
  for (let i = 0; i < file.length; i++){
    if (files.every(e => e.name !== file[i].name)) files.push(file[i]);
  }
  showImages();
})

