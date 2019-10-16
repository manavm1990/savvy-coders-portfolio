// Object
import { Header, Nav, Main, Footer } from "./components";
import * as state from "./store";

// The uppercase "N" indicates that is a CONSTRUCTOR FUNCTION.
import Navigo from "navigo";
import axios from "axios";

const router = new Navigo(location.origin);

/**
 * Currently, #root div is empty.
 * We want to grab that #root div.
 * We want to assign the markup that is contained in the components as the innerHTML of root.
 */
// The parameter st represents a piece of state
function render(st = state.Home) {
  /**
   * Developer's Note: Since state.Links is static,
   * there is no reason to pass it in each time.
   *
   * Instead, 'Nav' can import 'Links' directly.
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
