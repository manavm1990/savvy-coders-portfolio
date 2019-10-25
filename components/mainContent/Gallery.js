function getFiguresHTML(pics) {
  return pics
    .map(pic => {
      let figHTML = `
        <figure>
          <!-- TODO: Avoid using 'webp' for usage on Safari/iOS Browser. (https://caniuse.com/#search=webp) -->
          <img src="${pic.src}" alt="" />`;

      if (pic.calories) {
        figHTML += `<figcaption>${pic.calories}<span class="fas fa-trash-alt"></span></figcaption>`;
      }

      figHTML += `
      </figure>
      `;
      return figHTML;
    })
    .join(" ");
}

export default s => `
  <!-- Just a holding spot to capture the image - not to be seen. -->
  <canvas></canvas>

  <div id="modal" class="is-hiding">
    <video></video>

    <div>
      <label for="calories" placeholder="Don't Lie!">Calories?</label>
      <input type="number" id="calories" />
    </div>

    <button class="fas fa-camera-retro" id="take-pic"></button>
  </div>

  <div class="btns-container">
    <button id="add-pic">Add Photo From 📷</button>
    <button id="add-pic">Upload Photo From 💻</button>
    <button id="add-pic">Add Photo from URL</button>
  </div>

  <div class="fotos">
    ${getFiguresHTML(s.pics)}
  </div>
  `;
