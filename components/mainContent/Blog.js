function generateArticlesHTML(posts) {
  return posts
    .map(
      post => `
      <article>
        <h2>${post.title}</h2>
        <p>${post.body}</p>
      </article>
    `
    )
    .join(" ");
}

export default ( { posts }) => `
    ${generateArticlesHTML(posts)}
`
