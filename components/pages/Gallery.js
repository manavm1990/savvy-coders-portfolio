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
  );
}

export default (s) => `
  <div class="fotos">
    ${getFiguresHTML(s.pics)}
  </div>
  `
