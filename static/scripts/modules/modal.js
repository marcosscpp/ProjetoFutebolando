const modalBtn = document.querySelector("[data-modal-btn]");
const modalElement = document.querySelector("[data-modal]");
const closeBtn = document.querySelector("[data-close]");

export default function initModal() {
  modalElement
    .querySelectorAll("input")
    .forEach((input) => input.setAttribute("placeholder", ""));
  modalElement.addEventListener("click", (e) => {
    if (e.target === modalElement) {
      modalElement.classList.remove("ativo");
    }
  });

  modalBtn.addEventListener("click", () => {
    modalElement.classList.add("ativo");
  });
  closeBtn.addEventListener("click", () => {
    modalElement.classList.remove("ativo");
  });
}
