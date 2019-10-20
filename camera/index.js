function toggleModal(modal) {
  modal.classList.toggle("is-hiding");
  modal.classList.toggle("is-showing");
}

export default st => {
  const addPicBtn = document.querySelector("#add-pic");
  const modal = document.querySelector("#modal");
  const video = document.querySelector("video");

  const takePicBtn = document.querySelector("#take-pic");
  const canvas = document.querySelector("canvas");

  addPicBtn.addEventListener("click", () => {
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
  });

  takePicBtn.addEventListener("click", () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // This is what actually takes the picture from the webcam
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);

    toggleModal(modal);

    // TODO: Build template literal for figure and img...
    const figHTML = `
      <figure>
        <!-- TODO: Add to modal 👆🏾 to ask for alt tag info. -->
        <!-- TODO: Avoid using 'webp' for usage on Safari/iOS Browser. (https://caniuse.com/#search=webp) -->
        <img src="${canvas.toDataURL('image/webp')}" alt="" />

        <!-- TODO: Add <figcaption>. (use modal 👆🏾) -->
      </figure>
    `;

    // Remove <p> from st.main
    st.main = st.main.replace(`<p>No photos yet!</p>`, figHTML);
  });
};
