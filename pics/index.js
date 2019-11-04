import {
  dbConnection,
  handleAdminModal,
  handleCameraModal,
  handleLoginModal,
  readFile,
  ritePic,
  toggleModal
} from "./lib";

export default st => {
  const closeBtns = document.querySelectorAll(".fa-window-close");
  const delBtns = document.querySelectorAll(".fa-trash-alt");

  // If no pics, let's get some - otherwise, no need to.
  if (!st.pics.length) {
    dbConnection.get().then(
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
    handleCameraModal(st);
  });

  document.querySelector("#upload-pic").addEventListener("change", function() {
    readFile(this.files[0])
      .then(response => {
        const newPic = {
          src: response
        };

        /**
         * Developer's Note: There is no `reject` to `catch`.
         * This is b/c if there is an error,
         * it will come from firestore, and that will just be the caption.
         */
        ritePic(newPic).then(updatedPic => {
          // Developer's Note: `push` will not work as it just `return`s `length` of Array
          // Wrap newPic in Array so we can use `concat()` and trigger PROXY's SET TRAP.
          st.pics = st.pics.concat([updatedPic]);
        });
      })
  });

  document.querySelector("#url-pic").addEventListener("click", () => {
    if (st.isAuth) {
      handleAdminModal();
    } else {
      handleLoginModal();
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
      const fsId = figure.dataset.id;

      // https://firebase.google.com/docs/firestore/manage-data/delete-data
      dbConnection
        .doc(fsId)
        .delete()
        .then(() => {
          figure.remove();
        });
    });
  });
};
