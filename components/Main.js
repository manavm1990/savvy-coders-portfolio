import * as pages from "./pages";

export default st => `
<main>
  ${pages[st.page](st)}
</main>
`
