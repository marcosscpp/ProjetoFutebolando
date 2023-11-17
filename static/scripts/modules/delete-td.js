const deleteBtns = document.querySelectorAll("a[data-delete]");
export default function deleteTd() {
  deleteBtns.forEach((item) =>
    item.addEventListener("click", (event) => {

  
      const xhr = new XMLHttpRequest();
      xhr.open("GET", item.getAttribute("href"), true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          event.target.closest("tr").classList.add("disabled");
          setTimeout(() => {
            event.target.closest("tr").remove();
          }, 500);
        }
      };
      xhr.send();
    })
  );
}
