// Object
import { Header, Nav, Main, Footer } from "./components";
import * as state from "./store";

// The uppercase "N" indicates that is a CONSTRUCTOR FUNCTION.
import Navigo from "navigo";
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
  // Developer's Note: ':page' can be whatever you want to name the key that comes into `params` Object Literal
  // TODO: Create a 404 page and route all 'bad routes' to that page.
  .on(":page", params =>
    render(
      state[
        `${params.page.slice(0, 1).toUpperCase()}${params.page
          .slice(1)
          .toLowerCase()}`
      ]
    )
  )
  .on("/", render())
  .resolve();
