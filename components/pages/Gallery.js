function getFiguresHTML(images) {
  return images.map(
    image => `
      <figure>
        <!-- TODO: Add to modal 👆🏾 to ask for alt tag info. -->
        <!-- TODO: Avoid using 'webp' for usage on Safari/iOS Browser. (https://caniuse.com/#search=webp) -->
        <img src="${image}" alt="" />

        <!-- TODO: Add <figcaption>. (use modal 👆🏾) -->
      </figure>
`
  );
}

export default (s) => `
  ${getFiguresHTML(s.images)}
` || `
  <p>Fetching Images...</p>
`
