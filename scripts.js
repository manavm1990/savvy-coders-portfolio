// Remove the 'mobile hidden' class from the ul
const hamburger = document.querySelector(".fa-hamburger");
const hiddenUL = document.querySelector("ul");

hamburger.addEventListener("click", () => {
  // hiddenUL.classList.remove("is-hidden--mobile");
  hiddenUL.classList.toggle("is-hidden--mobile");
});
