export default st => {
  const addPicBtn = document.querySelector("#add-pic");

  const canvas = document.querySelector("canvas");

  const modal = document.querySelector("#modal");
  const video = document.querySelector("video");
  const takePicBtn = document.querySelector("#take-pic");

  function toggleModal() {
    modal.classList.toggle("is-hiding");
    modal.classList.toggle("is-showing");
  }

  addPicBtn.addEventListener("click", () => {
    toggleModal();

    /**
     * `navigator` represents the browser.
     *
     * `mediaDevices` is another WPI allowing interfaces with...media devices 😏
     */
    navigator.mediaDevices
      // `getUserMedia prompts user for remission
      .getUserMedia({ video: true, audio: false })
      .then(function(localMediaStream) {
        // Get the stream into `<video>`
        video.srcObject = localMediaStream;

        // Start playing to see something! 😃
        video.play();
      })
      .catch(function(err) {
        console.log("An error occurred: " + err);
      });
  });

  takePicBtn.addEventListener("click", () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // This is what actually takes the picture from the webcam
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);

    // We just use <canvas> to capture image data
    const webp = canvas.toDataURL("image/webp");

    // Grab `.fotos`
    const fotos = document.querySelector(".fotos");

    // Remove <p> if it's there
    const fotosP = fotos.querySelector("p");
    if (fotosP) {
      fotosP.remove();
    }

    // Create figure and img tags with `webp` as `"src"`
    const figElem = document.createElement("figure");
    const imgElem = document.createElement("img");

    imgElem.src = webp;

    // Developer's Note: ParentNode.append() has no return value, whereas Node.appendChild() returns the appended Node object. (https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/append)
    fotos.append(figElem.appendChild(imgElem));

    toggleModal();
  });
};
