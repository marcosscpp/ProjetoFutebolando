export default function initScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", scrollTo);
  });
}
const configs = window.matchMedia("(max-width: 700px)").matches
  ? { behavior: "smooth", block: "start" }
  : { behavior: "smooth", block: "center" };

function scrollTo(event) {
  event.preventDefault();
  const href = event.currentTarget.getAttribute("href");
  const section = document.querySelector(href);
  console.log(section, href);
  section.scrollIntoView(configs);
}
