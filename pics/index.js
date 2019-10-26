import { db } from "../firebase";

const dbCollection = db.collection("pics");

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

    const newPic = {
      src: canvas.toDataURL("image/webp"),
      calories: document.querySelector("#calories").value
    };

    // Write data
    dbCollection.add(newPic).then(docRef => {
      // Get the id in case we need to delete it
      newPic.id = docRef.id;
    });

    // Developer's Note: `push` will not work as it just `return`s `length` of Array
    // Wrap newPic in Array so we can use `concat()` and trigger PROXY's SET TRAP.
    st.pics = st.pics.concat([newPic]);
  });
}

function fileReader(f) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();

    r.addEventListener('load', () => {
      resolve(r.result);
    })

    r.addEventListener('error', (err) => {
      r.abort();
      reject(err)
    })

    r.readAsDataURL(f);
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
  document.querySelector("#upload-pic").addEventListener("change", function() {
    fileReader(this.files[0])
      .then(response => console.log(response))
      .catch(err => console.log(err));
  });

  // If no pics, let's get some - otherwise, no need to.
  if (!st.pics.length) {
    db.collection("pics")
      .get()
      .then(
        querySnapshot =>
          (st.pics = querySnapshot.docs.map(doc => {
            const pic = doc.data();
            pic.id = doc.id;
            return pic;
          }))
      );
  }

  delBtns.forEach(delBtn => {
    delBtn.addEventListener("click", function() {
      const figure = this.closest("figure");

      // https://firebase.google.com/docs/firestore/manage-data/delete-data
      dbCollection.doc(figure.dataset.id).delete().then(() => {

        // https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove
        figure.remove();
      });
    });
  });
};
