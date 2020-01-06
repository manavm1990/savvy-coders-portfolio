import * as views from "./mainContent";

export default st => `
<main>
  ${views[st.mainContent](st)}
</main>
`
