export default class Galeria {
  constructor() {
    this.galeria = document.querySelector(".galeria-images");
    this.expandBtn = document.querySelector("[data-expand]");
    this.maxImage = 6;
    this.initExpandBtn();
    this.createImage(1, 3, false);
  }

  createImage(imgIndexStart, imgIndexEnd, disabled) {
    for (let imgIndex = imgIndexStart; imgIndex <= imgIndexEnd; imgIndex++) {
      const image = document.createElement("img");
      const path = `./static/image/galeria/galeria${imgIndex}.jpg`;
      image.setAttribute("src", path);
      if (disabled) image.classList.add("init");
      this.galeria.appendChild(image);
    }
  }

  disableImage() {
    const allNewImage = this.galeria.querySelectorAll(".init");
    allNewImage.forEach((image) => {
      image.classList.replace("init", "disabled");
      setTimeout(() => {
        image.remove();
      }, 200);
    });
  }

  initExpandBtn() {
    const btnClass = this.expandBtn.classList;
    this.expandBtn.addEventListener("click", () => {
      if (btnClass.contains("fa-chevron-down")) {
        this.galeria.classList.add("expand");
        this.createImage(
          this.galeria.childElementCount + 1,
          this.galeria.childElementCount + 3,
          true
        );

        if (this.galeria.childElementCount >= this.maxImage) {
          btnClass.replace("fa-chevron-down", "fa-chevron-up");
        }
      } else {
        this.galeria.classList.remove("expand");
        btnClass.replace("fa-chevron-up", "fa-chevron-down");
        this.disableImage();
      }
    });
  }
}
