import gallery from "../store/Gallery";

export default () => {
  const addPicBtn = document.querySelector("#add-pic");
  const video = document.querySelector("video");

  const modal = document.querySelector("#modal");
  addPicBtn.addEventListener("click", () => {
    modal.classList.toggle("is-hiding");
    modal.classList.toggle("is-showing");

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

        return "got that spit!";
      })
      .catch(function(err) {
        console.log("An error occurred: " + err);
      });
  });
};
