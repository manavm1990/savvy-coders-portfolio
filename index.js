import { Header, Nav, Main, Footer } from "./components";
import * as state from "./store";

import validate from "./validation";
import posts from "./posts";
import pics from "./pics";

// import single thing into variable
import router from "./router";

import { auth } from "./firebase";

import { capitalize } from "lodash";

function getProxy(st) {
  return new Proxy(st, {
    set(st, k, v) {
      st[k] = v;
      render(st);
      return true;
    }
  });
}

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

  if (capitalize(router.lastRouteResolved().url.slice(1)) === "Blog") {
    posts(getProxy(st));
  }

  if (capitalize(router.lastRouteResolved().url.slice(1)) === "Gallery") {
    // Check auth status
    auth.onAuthStateChanged(user => {
      st.isAuth = Boolean(user);
    })

    // Proxy 'watches' st and reacts to changes (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
    pics(getProxy(st));
  }
}

router
  .on(":page", params => render(state[capitalize(params.page)]))
  .on("/", () => render())
  .resolve();
