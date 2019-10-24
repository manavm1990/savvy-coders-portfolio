function getFiguresHTML(pics) {
  return pics.map(
    pic => `
      <figure>
        <!-- TODO: Add to modal 👆🏾 to ask for alt tag info. -->
        <!-- TODO: Avoid using 'webp' for usage on Safari/iOS Browser. (https://caniuse.com/#search=webp) -->
        <img src="${pic}" alt="" />

        <!-- TODO: Add <figcaption>. (use modal 👆🏾) -->
      </figure>
`
  ).join(" ");
}

export default s => {
 console.log('gallery got state', s)
  return `
  <!-- Just a holding spot to capture the image - not to be seen. -->
  <canvas></canvas>

  <div id="modal" class="is-hiding">
    <video></video>
    <button class="fas fa-camera-retro" id="take-pic"></button>
  </div>

  <button id="add-pic">Add Photo</button>

  <div class="fotos">
    ${getFiguresHTML(s.pics)}
  </div>
  `
};
