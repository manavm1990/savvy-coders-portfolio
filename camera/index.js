export default () => {
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
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    const test = canvas.toDataURL("image/webp");
    document.querySelector("#test-img").src = test;

    toggleModal();
  });
};
