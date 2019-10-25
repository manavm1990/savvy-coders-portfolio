import { db } from "../firebase";

function camera(st) {
  const modal = document.querySelector("#modal");

  const video = document.querySelector("video");
  const canvas = document.querySelector("canvas");

  toggleModal(modal);

  document
    .querySelector(".fa-window-close")
    .addEventListener("click", () => toggleModal(modal));

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

  document.querySelector("#take-pic").addEventListener("click", () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // This is what actually takes the picture from the webcam
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);

    toggleModal(modal);

    // Developer's Note: `push` will not work as it just `return`s `length` of Array
    st.pics = st.pics.concat([
      {
        src: canvas.toDataURL("image/webp"),
        calories: document.querySelector("#calories").value
      }
    ]);
  });
}

function toggleModal(modal) {
  modal.classList.toggle("is-hiding");
  modal.classList.toggle("is-showing");
}

export default st => {
  const delBtns = document.querySelectorAll(".fa-trash-alt");

  document.querySelector("#add-pic").addEventListener("click", () =>
    // Pass in st instead of just st.pics so that it can trigger the PROXY SET TRAP.
    camera(st)
  );

  // If no pics, let's get some - otherwise, no need to.
  if (!st.pics.length) {
    db.collection("pics")
      .get()
      .then(querySnapshot => st.pics = querySnapshot.docs.map(doc => doc.data()));
  }

  delBtns.forEach(delBtn => {
    delBtn.addEventListener("click", function() {
      /**
       * TODO: Use `this.closest('figure')` and
       * get 'id' from DATA ATTRIBUTE to delete from Firestore
       * (https://developer.mozilla.org/en-US/docs/Web/API/Element/closest)
       * (https://firebase.google.com/docs/firestore/manage-data/delete-data)
       */
      console.log(this.closest("figure"));
    });
  });
};
