function camera(st) {
  const modal = document.querySelector("#modal");
  const video = document.querySelector("video");

  const takePicBtn = document.querySelector("#take-pic");
  const canvas = document.querySelector("canvas");

  toggleModal(modal);

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

  takePicBtn.addEventListener("click", () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // This is what actually takes the picture from the webcam
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);

    toggleModal(modal);

    // Developer's Note: `push` will not work as it just `return`s `length` of Array
    st.pics = st.pics.concat([{
      src: canvas.toDataURL("image/webp"),
      calories: document.querySelector("#calories").value
    }]);
  });
}

function toggleModal(modal) {
  modal.classList.toggle("is-hiding");
  modal.classList.toggle("is-showing");
}

export default st => {
  document.querySelector("#add-pic").addEventListener("click", () =>
    // Pass in st instead of just st.pics so that it can trigger the PROXY SET TRAP.
    camera(st)
  );
};
