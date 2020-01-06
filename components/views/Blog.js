function generateArticlesHTML(posts) {
  return posts
    .map(
      ({title, body }) => `
      <article>
        <h2>${title}</h2>
        <p>${body}</p>
      </article>
    `
    )
    .join(" ");
}

export default ( { posts }) => `
    ${generateArticlesHTML(posts)}
`
