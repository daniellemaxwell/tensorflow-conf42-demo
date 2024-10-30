const imgContainer = document.getElementById("image-container");
const uploadedImg = document.getElementById("image-upload");
const uploadIcon = document.getElementById("upload-icon")

// Listen for image upload
uploadedImg.addEventListener("change", async (e) => {
    const image = e.target.files[0];

    imgContainer.textContent = "";
    let imgURL = URL.createObjectURL(image);
    const imgEl = document.createElement("img");
    imgEl.src = imgURL;
    imgContainer.appendChild(imgEl);
    imgEl.setAttribute('id', "uploaded-image")
    getImagePredictions(imgEl);
});

function getImagePredictions(img) {
  cocoSsd.load().then(model => {
    model.detect(img).then(predictions => {
      predictions.forEach((prediction) => {
        const divEl = document.createElement("div");
        imgContainer.appendChild(divEl);
        divEl.innerHTML = `${prediction.class} - ${Math.round(prediction.score * 100)}%`;

        // Display image predictions
        divEl.style.color = "white";
        divEl.style.backgroundColor = "rgba(0, 0, 0, 0.5)"
        divEl.style.padding = "5px";
        divEl.style.borderRadius = "5px";
        divEl.style.fontSize = "16px";
        divEl.style.left = `${prediction.bbox[0]}px`;
        divEl.style.top = `${prediction.bbox[1]}px`
        divEl.style.position = "absolute";
        imgContainer.style.position = "relative";
      })
    })
  })
}