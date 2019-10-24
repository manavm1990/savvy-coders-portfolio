import * as mainContent from "./mainContent";

export default st => `
<main>
  ${mainContent[st.mainContent](st)}
</main>
`
