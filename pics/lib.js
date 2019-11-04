import { auth, db } from "../firebase";

export const dbConnection = db.collection("pics");

export function handleAdminModal() {
  const modal = document.querySelector("#modal--admin");

  modal.querySelector("#sign-out").addEventListener("click", () => {
    auth
      .signOut()
      .then(() => {
        toggleModal(modal);
        handleLoginModal();
      })
      .catch(err => console.error("Sign Out error!", err.message));
  });

  toggleModal(modal);
}

export function handleLoginModal() {
  const modal = document.querySelector("#modal--auth");
  const error = modal.querySelector(".error");

  error.textContent = "";

  modal.querySelectorAll("button").forEach(btn =>
    btn.addEventListener("click", function() {
      if (this.textContent === "Login") {
        auth
          .signInWithEmailAndPassword(
            modal.querySelector("#email").value,
            modal.querySelector("#pass").value
          )
          .then(() => {
            toggleModal(modal);
            handleAdminModal();
          })
          .catch(err => {
            modal.querySelector(".error").textContent = err.message;
          });
      } else {
        // Must be the sign up button.
        auth
          .createUserWithEmailAndPassword(
            modal.querySelector("#email").value,
            modal.querySelector("#pass").value
          )
          .then(() => {
            toggleModal(modal);
            handleAdminModal();
          })
          .catch(err => {
            modal.querySelector(".error").textContent = err.message;
          });
      }
    })
  );

  modal.querySelectorAll("input").forEach(i => {
    // Clear error message if user tries again by focusing on input
    i.addEventListener("focus", () => {
      error.textContent = "";
    });
  });

  toggleModal(modal);
}

export function handleCameraModal(st) {
  const modal = document.querySelector("#modal--camera");
  const video = document.querySelector("video");
  const canvas = document.querySelector("canvas");

  toggleModal(modal);

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
      caption: document.querySelector("#caption").value
    };

    // ritePic will get add 'id' for us
    ritePic(newPic).then(updatedPic => {
      // Developer's Note: `push` will not work as it just `return`s `length` of Array
      // Wrap newPic in Array so we can use `concat()` and trigger PROXY's SET TRAP.
      st.pics = st.pics.concat([updatedPic]);
    });
  });
}

export function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    // The load event is fired when a file has been read successfully (MDN)
    reader.addEventListener("load", () => {
      // Send back the URL info from 👆🏾
      resolve(reader.result);
    });

    reader.addEventListener("error", err => {
      reject(err);
    });
  });
}

export function ritePic(pic) {
  return new Promise(resolve => {
    dbConnection
      .add(pic)
      .then(docRef => {
        // Get the id in case we need to delete it
        pic.id = docRef.id;
        resolve(pic);
      })
      .catch(err => {
        // Update `caption` with any error so we know it wasn't written to firestore.
        pic.caption = err.message;
        resolve(pic);
      });
  });
}

export function toggleModal(modal) {
  modal.classList.toggle("is-hiding");
  modal.classList.toggle("is-showing");
}
