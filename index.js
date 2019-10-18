import { Header, Nav, Main, Footer } from "./components";
import * as state from "./store";

// import single thing into variable
import router from "./router";

function render(st = state.Home) {
  /**
   * Developer's Note: Since state.Links is static,
   * there is no reason to pass it in each time.
   */
  document.querySelector("#root").innerHTML = `
  ${Header(st)}
  ${Nav()}
  ${Main(st)}
  ${Footer()}
`;

  router.updatePageLinks();
}

router
  .on(":page", params =>
    render(
      state[
        `${params.page.slice(0, 1).toUpperCase()}${params.page
          .slice(1)
          .toLowerCase()}`
      ]
    )
  )
  .on("/", () => render())
  .resolve();

axios
  .get("https://jsonplaceholder.typicode.com/posts")
  .then(response => {
    console.log("state.blog.main is: ", state.Blog.main);
    state.Blog.main = response.data;
    console.log("state.blog.main is: ", state.Blog.main);
  })
  .catch(err => console.log(err));
