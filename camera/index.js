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

    const figHTML = `
      <figure>
        <!-- TODO: Add to modal 👆🏾 to ask for alt tag info. -->
        <!-- TODO: Avoid using 'webp' for usage on Safari/iOS Browser. (https://caniuse.com/#search=webp) -->
        <img src="${canvas.toDataURL("image/webp")}" alt="" />

        <!-- TODO: Add <figcaption>. (use modal 👆🏾) -->
      </figure>
    `;

    // Where is the closing <div> tag in st.main markup?
    const closingDivI = st.main.lastIndexOf("</div>");

    /**
     * We need to replace the value of st.main -
     * but do we replace the 'starter' `<p>` or just append after an existing `</figure>`? 🤔
     */
    st.main =
      // The indexOf() method returns the first index at which a given element can be found in the array, or -1 if it is not present. (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)
      st.main.indexOf(`<p>No photos yet!</p>`) === -1
        ?

        /**
         * `slice` from beginning of the markup until wherever `closingDivI` is 👆🏾.
         * Right there, toss in the `figHTML` and after that,
         * whatever was already there in the markup.
         */
        `${st.main.slice(0, closingDivI)}${figHTML}${st.main.slice(
            closingDivI
          )}`
        : st.main.replace(`<p>No photos yet!</p>`, figHTML);
  });
};
