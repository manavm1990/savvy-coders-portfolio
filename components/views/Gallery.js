function getFiguresHTML(pics) {
  if (!pics.length) {
    return "<p>No pics yet! 😞</p>";
  }

  return pics
    .map(pic => {
      let figHTML = `
        <figure data-id=${pic.id}>
          <!-- TODO: Avoid using 'webp' for usage on Safari/iOS Browser. (https://caniuse.com/#search=webp). -->
          <!-- TODO: Add a field for some type of description and use that for alt attribute. -->
          <img src="${pic.src}" alt="" />
          <figcaption>${pic.caption || "No caption!"}
            <span class="fas fa-trash-alt"></span>
          </figcaption>;
      </figure>
      `;
      return figHTML;
    })
    .join(" ");
}

export default s => `
  <!-- Just a holding spot to capture the image - not to be seen. -->
  <canvas></canvas>

  <form id="modal--auth" class="modal is-hiding">
    <span class="fas fa-window-close"></span>
    <div>
      <label for="email">✉️:</label>
      <input type="email" id="email" placeholder="you@yourdomain.com"/>
    </div>

    <div>
      <label for="pass">Password:</label>
      <input type="password" id="pass" />
    </div>

    <div>
      <button type="button">Login</button>
      <button type="button">Sign Up</button>
    </div>
    <p class="error"></p>
  </form>

  <div id="modal--admin" class="modal is-hiding">
    <span class="fas fa-window-close"></span>
    <p>Yeah, you are authorized...maybe later there will be a form here for you to add a URL and a caption. 🤷🏾‍♂️⌛</p>
    <button id="sign-out">Sign Out</button>
  </div>

  <div id="modal--camera" class="modal is-hiding">
    <span class="fas fa-window-close"></span>
    <video></video>
    <div>
      <label for="caption">Caption?</label>
      <input type="text" id="caption" />
    </div>
    <button class="fas fa-camera-retro" id="take-pic"></button>
  </div>

  <div class="btns-container">
    <button id="add-pic">Add Photo From 📷</button>
    <button id="url-pic">Add Photo from URL</button>
  </div>

  <div class="input-file-container">
    <input type="file" id="upload-pic" accept="image/png, image/jpeg">
  </div>

  <div class="fotos">
    ${getFiguresHTML(s.pics)}
  </div>
  `;
