const printBtn = document.querySelector("[data-print]");
export default function print() {
  printBtn.addEventListener("click", () => {
    window.print();
  });
}
