import { auth, db } from "../firebase";

const dbCollection = db.collection("pics");

function admin() {
  const modal = document.querySelector("#modal--admin");

  modal.querySelector("#sign-out").addEventListener("click", () => {
    auth
      .signOut()
      .then(() => {
        console.log('signed out')
        toggleModal(modal);
        authorize();
      })
      .catch(err => console.error("Sign Out error!", err.message));
  });

  toggleModal(modal);
}

function authorize() {
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
            admin();
          })
          .catch(err => {
            modal.querySelector(".error").textContent = err.message;
          });
      } else {
        // Must be the sign up button.
        auth.createUserWithEmailAndPassword(
          modal.querySelector("#email").value,
          modal.querySelector("#pass").value
        ).then(() => {
            toggleModal(modal);
            admin();
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

function camera(st) {
  const modal = document.querySelector("#modal--camera");

  const video = document.querySelector("video");
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

    // Developer's Note: `push` will not work as it just `return`s `length` of Array
    // Wrap newPic in Array so we can use `concat()` and trigger PROXY's SET TRAP.
    st.pics = st.pics.concat([ritePic(newPic)]);
  });
}

function fileReader(file) {
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

function ritePic(pic) {
  /**
   * Developer's Note: Since we are just using base64 URL encoded string,
   * if the pic is too big, it will error out!
   */
  dbCollection
    .add(pic)
    .then(docRef => {
      // Get the id in case we need to delete it
      pic.id = docRef.id;
    })
    .catch(() => (pic.caption = "This pic is too big! Try another!"));

  return pic;
}

function toggleModal(modal) {
  modal.classList.toggle("is-hiding");
  modal.classList.toggle("is-showing");
}

export default st => {
  const closeBtns = document.querySelectorAll(".fa-window-close");
  const delBtns = document.querySelectorAll(".fa-trash-alt");

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

  document.querySelector("#add-pic").addEventListener("click", () => {
    // Pass in st instead of just st.pics so that it can trigger the PROXY SET TRAP.
    camera(st);
  });

  document.querySelector("#upload-pic").addEventListener("change", function() {
    fileReader(this.files[0])
      .then(response => {
        const newPic = {
          src: response
        };

        // Developer's Note: `push` will not work as it just `return`s `length` of Array
        // Wrap newPic in Array so we can use `concat()` and trigger PROXY's SET TRAP.
        st.pics = st.pics.concat([ritePic(newPic)]);
      })
      .catch(err => console.log(err));
  });

  document.querySelector("#url-pic").addEventListener("click", () => {
    if (st.isAuth) {
      admin();
    } else {
      authorize();
    }
  });

  closeBtns.forEach(closeBtn => {
    closeBtn.addEventListener("click", function() {
      const modal = this.closest(".modal");
      toggleModal(modal);
    });
  });

  delBtns.forEach(delBtn => {
    delBtn.addEventListener("click", function() {
      const figure = this.closest("figure");

      // https://firebase.google.com/docs/firestore/manage-data/delete-data
      dbCollection
        .doc(figure.dataset.id)
        .delete()
        .then(() => {
          // https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove
          figure.remove();
        });
    });
  });
};
