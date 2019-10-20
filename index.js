import { Header, Nav, Main, Footer } from "./components";
import * as state from "./store";

import validate from "./validation";
import camera from "./camera";

// import single thing into variable
import router from "./router";

import axios from "axios";
import { capitalize } from "lodash";

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

  if (capitalize(router.lastRouteResolved().url.slice(1)) === "Contact") {
    validate(st);
  }

  if (capitalize(router.lastRouteResolved().url.slice(1)) === "Gallery") {
    const mainProxy = new Proxy(st, {
      set(st, main, markup) {
        st[main] = markup;
        render(st);
        return true;
      }
    });
    camera(mainProxy);
  }
}

router
  .on(":page", params => render(state[capitalize(params.page)]))
  .on("/", () => render())
  .resolve();

axios
  .get("https://jsonplaceholder.typicode.com/posts")
  .then(response => {
    // console.log("state.blog.main is: ", state.Blog.main);
    state.Blog.main = response.data;
    // console.log("state.blog.main is: ", state.Blog.main);
  })
  .catch(err => console.log(err));
