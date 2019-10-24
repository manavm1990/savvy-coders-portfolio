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
    // Proxy 'watches' st and reacts to changes (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

    /**
     * Create a new Proxy by passing in the OBJECT LITERAL to be 'watched' along with a 'handler.'
     * In our case we are using a SET TRAP.
     *
     * This means that whenever there is an attempt to assign a value to a property
     * (i.e. when `camera` adds a 'pic),
     * updating of the state via `set()` will occur. (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/set)
     *
     * This approach reliably triggers re-renders AND
     * maintains architecture b/c `state` only gets updated from here.
     */
    const mainProxy = new Proxy(st, {
      set(st, k, v) {
        st[k] = v;
        render(st);
        return true;
      }
    });

    // `camera` receives 'fake' state
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
    state.Blog.posts = [];

    // 'response.data' is an Array of 'Post' Objects
    response.data.forEach(post => state.Blog.posts.push(post));

    // If there was a requested route (e.g. /blog, /contact, /about), then the 'params' property will exist.
    if (
      router.lastRouteResolved().params &&
      router.lastRouteResolved().params.page === "Blog"
    ) {
      render(state.Blog);
    }
  })
  .catch(err => console.log(err));
