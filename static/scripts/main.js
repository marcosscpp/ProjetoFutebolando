import initBanner from "./modules/typer.js";
import initDropdown from "./modules/dropdown.js";
import initMobile from "./modules/mobile.js";
import Galeria from "./modules/galeria.js";
import initTable from "./modules/datatable-init.js";
import print from "./modules/print.js";
import deleteTd from "./modules/delete-td.js";
import initModal from "./modules/modal.js";
import StepForm from "./modules/form-class.js";
import initScroll from "./modules/scroll.js";

document.querySelector("header").classList.add("header-static");
if (window.location.pathname !== "/" && window.location.pathname !== "/home") {
  initTable();
  deleteTd();
  print();
} else {
  document.querySelector("header").classList.remove("header-static");
  initBanner();
  const galeria = new Galeria();
  const formulario = new StepForm();

}

initDropdown();
initMobile();
initModal();
initScroll();
