import { memesObject } from './memes.js';

function enablePhotoUpdate() {
  const imageInput = document.querySelector('#image-input');
  imageInput.addEventListener('change', function () {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      changeMemePicture(reader.result);
    })
    reader.readAsDataURL(this.files[0]);
  })
}

function createScreenshot() {
  const btnDownload = document.querySelector('#btn-download');
  btnDownload.addEventListener('click', () => {
    const screenshotPrint = document.querySelector('#screenshotZone');
    html2canvas(screenshotPrint)
      .then((canvas) => {
        const base64Image = canvas.toDataURL('image/png');

        let anchor = document.createElement('a');
        anchor.setAttribute('href', base64Image);
        anchor.setAttribute('download', 'my-meme.png');
        anchor.click();
        anchor.remove();
      });
  })
}

async function mapImageList() {
  return await memesObject;
}

async function createGallery(imageList) {
  const memeSelector = document.querySelector('#meme-list');
  imageList.forEach(picture => {
    let newOption = document.createElement('option');
    newOption.text = picture.name.toUpperCase();
    newOption.value = picture.path;

    memeSelector.appendChild(newOption);
  });
}

async function changeMemePicture(pathPhoto) {
  let displayImage = document.querySelector('#display-image');
  displayImage.style.backgroundImage = `url('${pathPhoto}')`;
}

function clearImageInput() {
  const imageInput = document.querySelector('#image-input');
  imageInput.value = '';
}

function selectPictureFromOptions() {
  const memeList = document.querySelector('#meme-list');
  memeList.addEventListener('change', (event) => {
    clearImageInput();
    changeMemePicture(event.target.value);
  });
}

async function main() {
  const memesImageList = await mapImageList();
  enablePhotoUpdate();
  selectPictureFromOptions();
  createScreenshot();
  await createGallery(memesImageList);
  await changeMemePicture(memesImageList[0].path);
}

main();