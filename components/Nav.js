import { Links } from "../store"

function linksBuilder(links) {
  return links.map(link => `<li><a href="./${link}" data-navigo>${link}</a></li>`).join("");
}

export default () =>
  `<nav>
    <span class="fas fa-hamburger is-hidden--desktop"></span>
      <ul class="is-hidden--mobile is-hidden--tablet is-shown--desktop">
        ${linksBuilder(Links)}
      </ul>
    </nav>
`;

